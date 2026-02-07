import { useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { PaperclipIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Task, TaskCategory, TaskPriority } from "@/types/task";
import { useTaskStore } from "@/store/useTaskStore";

interface Props {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  task?: Task;
}

const VALID_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

export default function TaskModal({ isOpen, onClose, task }: Props) {
  const { createTask, updateTask } = useTaskStore();
  const [formData, setFormData] = useState<Task>({
    _id: "",
    title: "",
    description: "",
    status: "To Do",
    priority: "Medium",
    category: "Feature",
    attachments: [],
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (task) {
      setFormData({
        _id: task._id || "",
        title: task.title || "",
        description: task.description || "",
        status: task.status || "To Do",
        priority: task.priority || "Medium",
        category: task.category || "Feature",
        attachments: task.attachments || [],
      });
    } else {
      setFormData({
        _id: "",
        title: "",
        description: "",
        status: "To Do",
        priority: "Medium",
        category: "Feature",
        attachments: [],
      });
    }
  }, [task, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      updateTask(formData);
    } else {
      createTask(formData);
    }
    onClose(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!VALID_FILE_TYPES.includes(file.type)) {
      toast.error("Unsupported file format.", {
        description: `Please upload ${VALID_FILE_TYPES.map((t) => t.split("/")[1].toUpperCase()).join(", ")}`,
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, attachments: [...prev.attachments, reader.result] }));
    };
    reader.readAsDataURL(file);
  };

  const removeAttachment = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments?.filter((_, i) => i !== index),
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Create New Task"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="What needs to be done?"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Add more details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(v) => setFormData({ ...formData, priority: v as TaskPriority })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(v) => setFormData({ ...formData, category: v as TaskCategory })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bug">Bug</SelectItem>
                  <SelectItem value="Feature">Feature</SelectItem>
                  <SelectItem value="Enhancement">Enhancement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-3">
            <Label>Attachments</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="relative overflow-hidden"
                onClick={() => fileInputRef.current?.click()}
              >
                <PaperclipIcon className="h-4 w-4 mr-2" />
                Upload File
                <input ref={fileInputRef} id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
              </Button>
              <span className="text-xs text-muted-foreground">JPG, PNG or PDF (max 5MB)</span>
            </div>

            {formData.attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.attachments.map((att, i) => (
                  <div key={i} className="relative group">
                    {att?.startsWith("data:image") ? (
                      <img src={att} alt="preview" className="h-16 w-16 object-cover rounded border border-slate-200" />
                    ) : (
                      <div className="h-16 w-16 flex items-center justify-center bg-slate-100 rounded border border-slate-200">
                        <PaperclipIcon className="h-6 w-6 text-slate-400" />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeAttachment(i)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <XIcon className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{task ? "Save Changes" : "Create Task"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
