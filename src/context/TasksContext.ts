import { createContext } from "react";

export interface Task {
  text: string,
  id: string,
  categoryId: string,
  done: boolean,
}

interface TasksContextProps {
  tasks: Task[],
  setTasks: (newValue: Task[] | ((val: Task[]) => Task[])) => void
}

export const TasksContext = createContext<TasksContextProps | null>(null)