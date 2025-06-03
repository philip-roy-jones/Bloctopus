import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import NewTask from "@/components/tasks/NewTask";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TaskListItem from "@/components/tasks/TaskListItem";
import { Card, CardContent } from "@/components/ui/card";

const HomePage: React.FC = () => {
  const { tasks } = useAppContext();
  const [newTaskUi, setNewTaskUi] = useState<boolean>(false);

  return (
    <div className="max-w-xl mx-auto p-6 pt-3">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <p className="text-sm text-muted-foreground mb-4">{tasks.length} tasks</p>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))}

        {newTaskUi && (
          <Card>
            <CardContent>
              <NewTask onClose={() => setNewTaskUi(false)} />
            </CardContent>
          </Card>
        )}

        {!newTaskUi && (
          <div className="flex items-center gap-2 pb-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setNewTaskUi(!newTaskUi)}
            >
              <Plus className="w-4 h-4 text-muted-foreground" />
              Add a Task
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
