import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { useTasks } from "../hooks/useTasks";

export function CategoryListMenu() {
  const [isExpanded, setIsExpanded] = useState(true)

  const { categories, editCategory } = useCategories();
  const { tasks } = useTasks();

  function handleExpanded() {
    setIsExpanded(e => !e)
  }

  function quantityTasks(id: string):number {
    return tasks.filter(task => task.categoryId === id).length
  }


  return (
    <section>
      <header className="px-3 cursor-pointer w-full flex justify-between font-medium" onClick={handleExpanded}>
        <h4>Listas</h4>
        {isExpanded ? <ChevronDown color="#7a7a7a" size={25} className="rounded-full hover:bg-hover" /> : <ChevronUp color="#7a7a7a" size={25} className="rounded-full hover:bg-hover" />}
      </header>
      {isExpanded &&
        <nav className="mt-2 flex flex-col justify-end-safe">
          {categories.map(category =>
            <CategoryItem key={category.id} quantityTasks={() => quantityTasks(category.id)} isChecked={category.status} handleChecked={() => editCategory(category.id, { status: !category.status })} />
          )}
        </nav>}
    </section>
  )
}

function CategoryItem({ isChecked, handleChecked, quantityTasks }: { isChecked: boolean, handleChecked: () => void, quantityTasks: () => number }) {

  return (
    <button
      onClick={handleChecked}
      className="cursor-pointer max-w-[90%] px-3 py-1 flex justify-between items-center rounded-4xl hover:bg-hover">
      <input checked={isChecked} onChange={handleChecked} className="cursor-pointer" type="checkbox" />
      <p className="text-md font-light">Minhas tarefas</p>
      <span className="text-[12px]">{quantityTasks().toString()}</span>
    </button>
  )
}