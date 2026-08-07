import { useState } from "react";
import { CategoriesContext, type Category } from "./CategoriesContext";

export function CategoriesProvider({ children }: { children: React.ReactNode }) {

  const [categories, setCategories] = useState<Category[]>([
    {
      name: "Minhas tarefas",
      id: "initial",
      status: true
    }
  ])

  return (
    <CategoriesContext value={{ categories, setCategories }}>
      {children}
    </CategoriesContext>
  )

}