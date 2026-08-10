import { Square, SquareCheckBig } from "lucide-react";
import type { Category } from "../../../context/CategoriesContext";

export function SingleCategory({ category, handleChecked, quantityTasks }: { category: Category, handleChecked: () => void, quantityTasks: () => { total: number} }) {

  const isChecked = category.status;

  return (
    <button
      onClick={handleChecked}
      className="cursor-pointer max-w-[90%] px-3 py-1 flex justify-between items-center rounded-4xl hover:bg-hover">
      {isChecked ? <SquareCheckBig color="var(--color-text)" /> : <Square color="var(--color-text)" />}
      <p className="text-md font-light">{category.name}</p>
      <span className="text-[12px]">{quantityTasks().total.toString()}</span>
    </button>
  )
}