import { Plus } from 'lucide-react';

export function NewTaskButton() {

  return (
    <button className="cursor-pointer w-25 rounded-2xl bg-button hover:bg-button-hover transition">
      <span className="w-full py-3.5 px-4 flex justify-around items-center font-medium text-[13px]">
        <Plus size={25} /> Criar
      </span>
    </button>
  )
}