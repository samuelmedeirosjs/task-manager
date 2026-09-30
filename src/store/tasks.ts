import type { DropResult } from "@hello-pangea/dnd";
import { create } from "zustand";
import { persist } from "zustand/middleware"

interface Task {
  text: string;
  id: string;
  categoryId: string;
  done: boolean;
}

interface TaskStore {
  tasks: Task[];
  addTask: (text: string, categoryId: string) => void;
  editTask: (taskId: string, updateFields: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  deleteTaskByCategoryId: (categoryId: string) => void;
  handleDragEndTask: (result: DropResult) => void;
}

export const useStoreTasks = create<TaskStore>()(
  persist(
  (set) => ({
  tasks: [
    {
      text: "Minha primeira tarefa",
      done: false,
      categoryId: "initial",
      id: crypto.randomUUID(),
    },
  ],

  addTask: (text: string, categoryId: string) =>
    set(({ tasks }) => ({
      tasks: [
        {
          text: text,
          done: false,
          id: crypto.randomUUID(),
          categoryId: categoryId,
        },
        ...tasks,
      ],
    })),

  editTask: (taskId: string, updateFields: Partial<Task>) =>
    set(({ tasks }) => ({
      tasks: tasks.map((task) =>
        task.id === taskId ? { ...task, ...updateFields } : task,
      ),
    })),

  deleteTask: (taskId: string) =>
    set(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== taskId),
    })),

  deleteTaskByCategoryId: (categoryId: string) =>
    set(({ tasks }) => ({
      tasks: tasks.filter((task) => task.categoryId !== categoryId),
    })),

  handleDragEndTask: (result: DropResult) =>
    set(({ tasks }) => {
      const { destination, source, draggableId } = result;
      if (!destination) return { tasks: tasks };
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
        return { tasks: tasks };

      const finishedColumn = destination.droppableId;

      const newTasks = [...tasks];

      const taskIndexInGlobal = newTasks.findIndex(
        (task) => task.id === draggableId,
      );
      if (taskIndexInGlobal === -1) return { tasks: tasks };

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

      return { tasks: newTasks };
    }),
}),
{
  name: "tasks",
}));
