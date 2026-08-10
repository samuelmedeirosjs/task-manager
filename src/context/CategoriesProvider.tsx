import { CategoriesContext, type Category } from "./CategoriesContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

export function CategoriesProvider({ children }: { children: React.ReactNode }) {

  const [categories, setCategories] = useLocalStorage<Category[]>("categories", [
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