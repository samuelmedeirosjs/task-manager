import { createContext, type Dispatch, type SetStateAction } from "react";

export type Category = {
  name: string,
  id: string,
  status: boolean
}

interface CategoriesContextProps {
  categories: Category[],
  setCategories: Dispatch<SetStateAction<Category[]>>,
}

export const CategoriesContext = createContext<CategoriesContextProps | []>([])