import { useContext } from "react";
import {
  CategoriesContext,
  type Category,
} from "../../../context/CategoriesContext";

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) throw new Error("useCategories out of CategoriesProvider");

  const { categories, setCategories } = context;

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
  }

  return { categories, addCategory, editCategory, deleteCategory };
}
