import { useContext } from "react";
import { TasksContext, type Task } from "../../../context/TasksContext";
import type { DropResult } from "@hello-pangea/dnd";

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

  function deleteTaskByCategoryId(categoryId: string) {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.categoryId !== categoryId),
    );
  }

  function handleDragEndTask(result: DropResult) {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const finishedColumn = destination.droppableId;

    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];

      const taskIndexInGlobal = newTasks.findIndex(
        (task) => task.id === draggableId,
      );
      if (taskIndexInGlobal === -1) return prevTasks;

      const [removedTask] = newTasks.splice(taskIndexInGlobal, 1);

      const updatedTask: Task = {
        ...removedTask,
        categoryId: finishedColumn,
      };

      const destinationTasks = newTasks.filter(
        (task) => task.categoryId === finishedColumn,
      );

      const targetTaskAtDestination = destinationTasks[destination.index];
      if (targetTaskAtDestination) {
        const finalInsertIndex = newTasks.findIndex(
          (task) => task.id === targetTaskAtDestination.id,
        );
        newTasks.splice(finalInsertIndex, 0, updatedTask);
      } else {
        newTasks.push(updatedTask);
      }

      return newTasks;
    });
  }

  return {
    tasks,
    addTask,
    editTask,
    deleteTask,
    deleteTaskByCategoryId,
    setTasks,
    handleDragEndTask,
  };
}
