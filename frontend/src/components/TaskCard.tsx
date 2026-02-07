import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, Edit, Paperclip } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTaskStore } from "@/store/useTaskStore";
import type { Task, TaskPriority } from "@/types/task";
import TaskModal from "./TaskModal";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const { deleteTask } = useTaskStore();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityColor = (p: TaskPriority) => {
    if (p === "High") return "bg-red-500 hover:bg-red-600";
    if (p === "Medium") return "bg-amber-500 hover:bg-amber-600";
    return "bg-emerald-500 hover:bg-emerald-600";
  };

  return (
    <>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <Card className="group bg-accent cursor-grab active:cursor-grabbing hover:shadow-md transition-all">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="font-bold leading-tight">{task.title}</CardTitle>
            <div
              className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsEditOpen(true)}>
                <Edit className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => deleteTask(task._id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="">
            {task.description && (
              <CardDescription className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {task.description}
              </CardDescription>
            )}
            <div className="flex justify-between items-center gap-2">
              <div className="flex gap-1.5 overflow-hidden">
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 whitespace-nowrap">
                  {task.category}
                </Badge>
                {task.attachments?.length > 0 && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 flex gap-1 items-center">
                    <Paperclip className="h-2.5 w-2.5" />
                    {task.attachments.length}
                  </Badge>
                )}
              </div>
              <Badge className={`${getPriorityColor(task.priority)} text-[10px] px-1.5 py-0 border-0`}>
                {task.priority}
              </Badge>
            </div>
            {task.attachments && task.attachments.length > 0 && task.attachments[0].startsWith("data:image") && (
              <div className="mt-3 overflow-hidden rounded-md border border-slate-100">
                <img src={task.attachments[0]} alt="attachment" className="w-full h-24 object-cover" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <TaskModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} task={task} />
    </>
  );
}
