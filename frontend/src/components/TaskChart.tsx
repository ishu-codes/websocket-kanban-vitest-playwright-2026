import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Task } from "@/types/task";

const COLORS = ["#3b82f6", "#f59e0b", "#10b981"]; // blue, amber, emerald

interface Props {
  tasks: Task[];
}
export default function TaskChart({ tasks }: Props) {
  const data = [
    { name: "To Do", value: tasks.filter((t) => t.status === "To Do").length },
    { name: "In Progress", value: tasks.filter((t) => t.status === "In Progress").length },
    { name: "Done", value: tasks.filter((t) => t.status === "Done").length },
  ].filter((d) => d.value > 0);

  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "Done").length;
  const percentage = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">Progress</CardTitle>
        <p className="text-2xl font-bold">
          {percentage}% <span className="text-sm font-normal text-muted-foreground">completed</span>
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          {total > 0 ? (
            <ResponsiveContainer className="w-full h-full">
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "8px", border: "none" }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px" }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm italic">
              No tasks to visualize
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
