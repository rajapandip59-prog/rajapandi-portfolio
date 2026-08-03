import React, { useState } from "react";
import { usePortfolioData } from "@/context/PortfolioDataContext";
import { Message } from "@/types/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Mail, Search, Trash2, CheckCircle, MailOpen, Reply, Filter } from "lucide-react";
import { toast } from "sonner";

export const MessagesTab: React.FC = () => {
  const { messages, toggleMessageRead, deleteMessage } = usePortfolioData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "read">("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "unread"
        ? !msg.isRead
        : msg.isRead;

    return matchesSearch && matchesStatus;
  });

  const handleOpenMessage = (msg: Message) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      toggleMessageRead(msg.id);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this message?")) {
      await deleteMessage(id);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
      toast.success("Message deleted.");
    }
  };

  const handleReply = (email: string, subject?: string) => {
    window.location.href = `mailto:${email}?subject=Re: ${encodeURIComponent(subject || "Inquiry response")}`;
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Mail className="w-6 h-6 text-primary" /> Contact Form Inquiries
          </h2>
          <p className="text-sm text-slate-400">View messages submitted by visitors from public portfolio</p>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search sender name, email, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-slate-950 border-slate-700 text-white text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          {(["all", "unread", "read"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                statusFilter === filter
                  ? "bg-primary text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {filter} ({filter === "all" ? messages.length : filter === "unread" ? messages.filter((m) => !m.isRead).length : messages.filter((m) => m.isRead).length})
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      {filteredMessages.length === 0 ? (
        <div className="text-center py-12 text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
          No messages match your criteria.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleOpenMessage(msg)}
              className={`cursor-pointer group relative p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 ${
                msg.isRead
                  ? "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                  : "bg-primary/10 border-primary/40 hover:border-primary/60 shadow-md shadow-primary/5"
              }`}
            >
              <div className="overflow-hidden space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{msg.name}</span>
                  <span className="text-xs text-slate-400">• {msg.email}</span>
                  {!msg.isRead && (
                    <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-semibold">
                      New
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-semibold text-slate-200">{msg.subject || "No Subject"}</h4>
                <p className="text-xs text-slate-400 line-clamp-1">{msg.message}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => handleDelete(msg.id, e)}
                  className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Reader Modal */}
      <Dialog open={Boolean(selectedMessage)} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-lg">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MailOpen className="w-5 h-5 text-primary" />
                  {selectedMessage.subject || "Contact Form Inquiry"}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">{selectedMessage.name}</p>
                    <p className="text-xs text-slate-400">{selectedMessage.email}</p>
                  </div>
                  <span className="text-xs text-slate-400">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                <Button
                  variant="outline"
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
                <Button
                  onClick={() => handleReply(selectedMessage.email, selectedMessage.subject)}
                  className="bg-primary hover:bg-primary/90 text-white gap-2"
                >
                  <Reply className="w-4 h-4" /> Reply via Email
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
