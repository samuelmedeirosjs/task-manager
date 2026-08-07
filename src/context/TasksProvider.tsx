import { createContext } from "react";


export const TasksProvider = createContext([
  {
    text: "Minha primeira tarefa",
    id: crypto.randomUUID(),
    categoryId: "initial",
    done: false,
  }
])