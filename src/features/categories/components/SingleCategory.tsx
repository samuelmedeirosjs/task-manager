import { Square, SquareCheckBig, Trash } from "lucide-react";
import type { Category } from "../../../context/CategoriesContext";

interface SingleCategoryProps {
  category: Category,
  handleChecked: () => void,
  quantityTasks: () => { total:number },
  isDeleteMode: boolean
}

export function SingleCategory({ category, handleChecked, quantityTasks, isDeleteMode }: SingleCategoryProps) {

  const isChecked = category.status;

  return (
    <button
      onClick={handleChecked}
      className={`cursor-pointer max-w-[90%] px-3 py-1 flex justify-between items-center rounded-4xl hover:bg-hover ${isDeleteMode ? "text-red-400" : ""}`}>
      {
        !isDeleteMode ? (
          isChecked ? <SquareCheckBig color="var(--color-text)" /> : <Square color="var(--color-text)" />
        ) : (
          <Trash color="#ff6467"/>
        )
      }
      <p className="text-md font-light">{category.name}</p>
      <span className="text-[12px]">{quantityTasks().total.toString()}</span>
    </button>
  )
}