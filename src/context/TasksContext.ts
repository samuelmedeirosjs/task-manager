import { createContext, type Dispatch, type SetStateAction } from "react";

export type Task = {
  text: string,
  id: string,
  categoryId: string,
  done: boolean,
}

interface TasksContextProps {
  tasks: Task[],
  setTasks: Dispatch<SetStateAction<Task[]>>
}

export const TasksContext = createContext<TasksContextProps | []>([])