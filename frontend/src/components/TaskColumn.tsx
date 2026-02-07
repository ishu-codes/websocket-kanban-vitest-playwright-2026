import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import type { Task } from "@/types/task";
import TaskCard from "./TaskCard";
import { Card } from "@/components/ui/card";

interface Props {
  id: string;
  title: string;
  tasks: Task[];
}

export default function TaskColumn({ id, title, tasks }: Props) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <Card className="min-h-125 p-4 rounded-xl border">
      <h2 className="font-semibold mb-2 flex justify-between items-center">
        {title}
        <span className="px-2 py-0.5 rounded-full text-xs border shadow-sm">{tasks.length}</span>
      </h2>
      <div ref={setNodeRef} className="space-y-4">
        <SortableContext items={tasks.map((t) => t._id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </SortableContext>
      </div>
    </Card>
  );
}
