import { createContext } from "react";

export interface Category {
  name: string,
  id: string,
  status: boolean
}

interface CategoriesContextProps {
  categories: Category[],
  setCategories: (newValue: Category[] | ((val: Category[]) => Category[])) => void
}

export const CategoriesContext = createContext<CategoriesContextProps | null>(null)