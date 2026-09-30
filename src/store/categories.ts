import type { DropResult } from "@hello-pangea/dnd";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Category } from "../context/CategoriesContext";

interface CategoryStore {
  categories: Category[];
  addCategory: (name: string) => void;
  editCategory: (categoryId: string, updateFields: Partial<Category>) => void;
  deleteCategory: (categoryId: string) => void;
  handleDragEndTask: (result: DropResult) => void;
}

export const useStoreCategories = create<CategoryStore>()(
  persist(
    (set) => ({
      categories: [
        {
          name: "Minhas tarefas",
          id: "initial",
          status: true,
        },
      ],

      addCategory: (name: string) =>
        set(({ categories }) => ({
          categories: [
            {
              name: name,
              id: crypto.randomUUID(),
              status: true,
            },
            ...categories,
          ],
        })),

      editCategory: (categoryId: string, updateFields: Partial<Category>) =>
        set(({ categories }) => ({
          categories: categories.map((category) =>
            category.id === categoryId
              ? { ...category, ...updateFields }
              : category,
          ),
        })),

      deleteCategory: (categoryId: string) =>
        set(({ categories }) => ({
          categories: categories.filter(
            (category) => category.id !== categoryId,
          ),
        })),

      handleDragEndTask: (result: DropResult) => {
        const { destination, source } = result;
        if (!destination) return;
        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        )
          return;

        set(({ categories }) => {
          const newCategories = [...categories];

          const [updatedCategory] = newCategories.splice(source.index, 1);

          newCategories.splice(destination.index, 0, updatedCategory);

          return {
            categories: newCategories,
          };
        });
      },
    }),
    {
      name: "categories",
    },
  ),
);
