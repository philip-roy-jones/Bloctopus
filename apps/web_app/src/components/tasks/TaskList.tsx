import TaskItem from "./TaskItem"
import { Button } from "@/components/ui/button"
import { Task } from "@/types/Task"

export interface TaskListProps {
  tasks: Task[]
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div>
      <div className="container flex flex-col gap-4">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <div className="text-center text-gray-500">No tasks available</div>
        )}
      </div>
      <Button className="mt-4">Add New Task</Button>
    </div>
  )
}

export default TaskList