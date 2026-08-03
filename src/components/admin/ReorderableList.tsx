import React, { useState } from "react";
import { GripVertical, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReorderableListProps<T extends { id: string }> {
  items: T[];
  onReorder: (newItems: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function ReorderableList<T extends { id: string }>({
  items,
  onReorder,
  renderItem,
}: ReorderableListProps<T>) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const updated = [...items];
    const itemToMove = updated[draggedIndex];
    updated.splice(draggedIndex, 1);
    updated.splice(index, 0, itemToMove);

    setDraggedIndex(index);
    onReorder(updated);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onReorder(updated);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className={`group relative flex items-center gap-3 bg-slate-900/80 border rounded-xl p-3 transition-all duration-200 ${
            draggedIndex === index
              ? "border-primary shadow-lg bg-slate-800 scale-[1.01]"
              : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-200 cursor-grab active:cursor-grabbing p-1">
            <GripVertical className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">{renderItem(item, index)}</div>

          <div className="flex flex-col gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={index === 0}
              onClick={() => moveItem(index, "up")}
              className="h-6 w-6 text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={index === items.length - 1}
              onClick={() => moveItem(index, "down")}
              className="h-6 w-6 text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
