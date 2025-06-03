import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { CalendarDay } from "@/components/tasks/CalendarDay";
import TaskList from "@/components/tasks/TaskList";

const PlannerPage: React.FC = () => {
  const { tasks } = useAppContext();

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-2">
        <TaskList tasks={tasks} />
      </div>
      <div className="col-span-10">
        <CalendarDay />
      </div>
    </div>
  );
};

export default PlannerPage;
