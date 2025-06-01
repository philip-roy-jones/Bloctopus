import { createContext } from "react"
import { Task } from "@/types/Task"

export type AppContextType = {
  tasks: Task[] | []
}

export const AppContext = createContext<AppContextType | undefined>(undefined)