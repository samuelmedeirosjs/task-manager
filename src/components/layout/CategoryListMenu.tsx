import { ChevronUp, ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import { useCategories } from "../../features/categories/hooks/useCategories";
import { useTasks } from "../../features/tasks/hooks/useTasks";
import { SingleCategory } from "../../features/categories/components/SingleCategory";

export function CategoryListMenu() {
  const [isExpanded, setIsExpanded] = useState(true)

  const { categories, editCategory, addCategory } = useCategories();
  const { tasks } = useTasks();

  function handleExpanded() {
    setIsExpanded(e => !e)
  }

  function quantityTasks(id: string): { total: number } {
    return {
      total: tasks.filter(task => task.categoryId === id).length,
      // pending: tasks.filter(task => task.categoryId === id && task.done).length
    }
  }

  function handleNewCategory() {
    addCategory("Nova categoria")
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
            <SingleCategory key={category.id}  quantityTasks={() => quantityTasks(category.id)} category={category} handleChecked={() => editCategory(category.id, { status: !category.status })} />
          )}
        </nav>
      }
      <button onClick={handleNewCategory} className="flex w-full gap-2 mt-2 text-text font-medium px-3 py-1 items-center rounded-4xl hover:bg-hover cursor-pointer">
        <Plus color="var(--color-text)"/> Criar nova lista
      </button>
    </section>
  )
}