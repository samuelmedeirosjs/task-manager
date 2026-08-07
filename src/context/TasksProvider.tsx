import { useState } from "react";
import { TasksContext, type Task  } from "./TasksContext";

export function TaskProvider({ children }: { children: React.ReactNode }) {
  
  const [tasks, setTasks] = useState<Task[]>([
    {
      text: "Minha primeira tarefa",
      done: false,
      categoryId: "initial",
      id: crypto.randomUUID(),
    }
  ])

  return (
    <TasksContext value={{ tasks, setTasks }}>
      {children}
    </TasksContext>
  )
}