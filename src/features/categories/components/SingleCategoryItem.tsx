import { Square, SquareCheckBig, Trash } from "lucide-react";
import type { Category } from "../../../context/CategoriesContext";
import { Draggable } from "@hello-pangea/dnd";

interface SingleCategoryProps {
  category: Category,
  handleChecked: () => void,
  quantityTasks: () => { total: number },
  isDeleteMode: boolean,
  index: number
}

export function SingleCategoryItem({ category, handleChecked, quantityTasks, isDeleteMode, index }: SingleCategoryProps) {

  const isChecked = category.status;

  return (
    <Draggable draggableId={category.id} index={index}>
      {provided => (
        <div
          onClick={handleChecked}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`cursor-pointer max-w-[90A%] px-3 py-1 flex justify-between items-center rounded-4xl hover:bg-hover ${isDeleteMode ? "text-red-400" : ""}`}>
          {
            !isDeleteMode ? (
              isChecked ? <SquareCheckBig color="var(--color-text)" /> : <Square color="var(--color-text)" />
            ) : (
              <Trash color="#ff6467" />
            )
          }
          <p className="text-md font-light">{category.name}</p>
          <span className="text-[12px]">{quantityTasks().total.toString()}</span>
        </div>
      )}
    </Draggable>
  )
}