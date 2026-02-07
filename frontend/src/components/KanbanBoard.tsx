import { useState, useEffect } from "react";
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/store/useTaskStore";
import TaskChart from "./TaskChart";
import TaskColumn from "./TaskColumn";
import TaskModal from "./TaskModal";
import { ModeToggle } from "./ModeToggle";

const COLUMNS = ["To Do", "In Progress", "Done"];

export default function KanbanBoard() {
  const { tasks, isLoading, init, moveTask } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    init();
  }, [init]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    let newStatus = over.id;

    // If dropped over a task, get that task's status
    const overTask = tasks.find((t) => t._id === over.id);
    if (overTask) {
      newStatus = overTask.status;
    }

    const task = tasks.find((t) => t._id === taskId);
    if (COLUMNS.includes(newStatus) && task?.status !== newStatus) {
      moveTask(taskId, newStatus);
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Kanban Board</h1>
          <p className="text-muted-foreground">Real-time task management</p>
        </div>
        <div className="flex gap-4">
          <ModeToggle />
          <Button onClick={() => setIsModalOpen(true)}>Add Task</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            {COLUMNS.map((column) => (
              <TaskColumn key={column} id={column} title={column} tasks={tasks.filter((t) => t.status === column)} />
            ))}
          </DndContext>
        </div>
        <div className="lg:col-span-1">
          <TaskChart tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
