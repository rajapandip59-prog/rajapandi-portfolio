import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  acceptPdf?: boolean;
  bucketName?: string;
  maxSizeMB?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = "Upload Image",
  acceptPdf = false,
  bucketName = "portfolio-assets",
  maxSizeMB = 5,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compress image using HTML Canvas
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          // Quality 0.82
          const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
          resolve(dataUrl);
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileProcess = async (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File size exceeds limit of ${maxSizeMB}MB`);
      return;
    }

    const isPdf = file.type === "application/pdf";
    const isImg = file.type.startsWith("image/");

    if (!isImg && !(acceptPdf && isPdf)) {
      toast.error(acceptPdf ? "Please upload an image or PDF file." : "Please upload a valid image file.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(20);

    try {
      if (isPdf) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const pdfDataUrl = reader.result as string;
          setUploadProgress(100);
          onChange(pdfDataUrl);
          setIsUploading(false);
          toast.success("PDF file uploaded successfully!");
        };
        return;
      }

      setUploadProgress(50);
      const compressedDataUrl = await compressImage(file);
      setUploadProgress(80);

      // Upload to Supabase bucket if configured
      if (isSupabaseConfigured && supabase) {
        try {
          const fileExt = file.name.split(".").pop();
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(filePath, file, { upsert: true });

          if (!uploadError) {
            const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
            if (data?.publicUrl) {
              onChange(data.publicUrl);
              setUploadProgress(100);
              setIsUploading(false);
              toast.success("File uploaded to storage!");
              return;
            }
          }
        } catch {
          // Fallback to compressed Data URL
        }
      }

      // Local storage fallback Data URL
      onChange(compressedDataUrl);
      setUploadProgress(100);
      setIsUploading(false);
      toast.success("Image processed & ready!");
    } catch {
      setIsUploading(false);
      toast.error("Failed to process file.");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-slate-300">{label}</label>}

      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-900/60 p-3 flex items-center justify-between gap-4">
          {value.startsWith("data:application/pdf") || value.endsWith(".pdf") ? (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">PDF Document</p>
                <p className="text-xs text-slate-400">Ready to download / view</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <img
                src={value}
                alt="Uploaded asset"
                className="w-14 h-14 object-cover rounded-lg border border-slate-700 bg-slate-950"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">Image loaded</p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Optimized
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs border-slate-700 hover:bg-slate-800 text-slate-200"
            >
              Replace
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => onChange("")}
              className="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
            isDragging
              ? "border-primary bg-primary/10 scale-[1.01]"
              : "border-slate-700 bg-slate-900/40 hover:border-slate-500 hover:bg-slate-900/80"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-3 py-2">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-sm text-slate-300">Processing file... {uploadProgress}%</p>
              <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300">
                {acceptPdf ? <FileText className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
              </div>
              <p className="text-sm font-medium text-slate-200">
                Click or drag & drop file to upload
              </p>
              <p className="text-xs text-slate-400">
                {acceptPdf ? "Supports PNG, JPG, WEBP, SVG & PDF (Max 5MB)" : "Supports PNG, JPG, WEBP & SVG (Max 5MB)"}
              </p>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptPdf ? "image/*,.pdf" : "image/*"}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileProcess(e.target.files[0]);
          }
        }}
        className="hidden"
      />

      <div className="flex justify-end mt-1">
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          <ImageIcon className="w-3.5 h-3.5" />
          {showUrlInput ? "Hide image URL input" : "Or use image URL link"}
        </button>
      </div>

      {showUrlInput && (
        <div className="mt-2 flex gap-2">
          <Input
            placeholder="Paste image/PDF URL here (e.g. https://...)"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-slate-900 border-slate-700 text-sm"
          />
        </div>
      )}
    </div>
  );
};
