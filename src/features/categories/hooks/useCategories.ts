import { useContext } from "react";
import {
  CategoriesContext,
  type Category,
} from "../../../context/CategoriesContext";
import { useTasks } from "../../tasks/hooks/useTasks";
import type { DropResult } from "@hello-pangea/dnd";

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) throw new Error("useCategories out of CategoriesProvider");

  const { categories, setCategories } = context;
  const { deleteTaskByCategoryId } = useTasks();

  function addCategory(name: string) {
    setCategories((prevCategories) => [
      {
        name: name,
        id: crypto.randomUUID(),
        status: true,
      },
      ...prevCategories,
    ]);
  }

  function editCategory(categoryId: string, updateFields: Partial<Category>) {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id !== categoryId
          ? category
          : { ...category, ...updateFields },
      ),
    );
  }

  function deleteCategory(categoryId: string) {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== categoryId),
    );

    deleteTaskByCategoryId(categoryId);
  }

  function handleDragEndCategory(result: DropResult) {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    setCategories((prevCategories) => {
      const newCategories = [...prevCategories];

      const [updatedCategory] = newCategories.splice(source.index, 1);

      newCategories.splice(destination.index, 0, updatedCategory);

      return newCategories;
    });
  }

  return {
    categories,
    addCategory,
    editCategory,
    deleteCategory,
    handleDragEndCategory,
  };
}
