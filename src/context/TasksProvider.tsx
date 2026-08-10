import { TasksContext, type Task } from "./TasksContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

export function TasksProvider({ children }: { children: React.ReactNode }) {

  const [ tasks, setTasks ] = useLocalStorage<Task[]>("tasks", [
    {
    text: "Minha primeira tarefa",
    done: false,
    categoryId: "initial",
    id: crypto.randomUUID(),
    }
  ]);

  return (
    <TasksContext value={{ tasks, setTasks }}>
      {children}
    </TasksContext>
  )
}