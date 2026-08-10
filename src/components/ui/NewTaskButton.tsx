import { Plus } from 'lucide-react';
import { useTasks } from "../../features/tasks/hooks/useTasks";
import { useCategories } from "../../features/categories/hooks/useCategories";

export function NewTaskButton() {

  const { addTask } = useTasks();
  const { categories } = useCategories();
  const firstActiveCategory = categories.filter(category => category.status)[0]

  return (
    <button onClick={() => firstActiveCategory && addTask("Nova tarefa", firstActiveCategory.id)} className="cursor-pointer w-25 rounded-2xl bg-button hover:bg-button-hover transition">
      <span className="w-full py-3.5 px-4 flex justify-around items-center font-medium text-[13px]">
        <Plus size={25} /> Criar
      </span>
    </button>
  )
}