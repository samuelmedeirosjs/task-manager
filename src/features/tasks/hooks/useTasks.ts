import { useContext } from "react";
import { TasksContext, type Task } from "../../../context/TasksContext";

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasks out of TasksProvider");

  const { setTasks, tasks } = context;

  function addTask(text: string, categoryId: string) {
    setTasks((prevTasks) => [
      {
        text: text,
        done: false,
        id: crypto.randomUUID(),
        categoryId: categoryId,
      },
      ...prevTasks,
    ]);
  }

  function editTask(taskId: string, updateFields: Partial<Task>) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id !== taskId ? task : { ...task, ...updateFields },
      ),
    );
  }

  function deleteTask(taskId: string) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  return { tasks, addTask, editTask, deleteTask };
}
