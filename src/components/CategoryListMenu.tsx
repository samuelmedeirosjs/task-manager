import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

export function CategoryListMenu() {
  const [isExpanded, setIsExpanded] = useState(true)

  function handleExpanded() {
    setIsExpanded(e => !e)
  }

  return (
    <section>
      <header className="px-3 cursor-pointer w-full flex justify-between font-medium" onClick={handleExpanded}>
        <h4>Listas</h4>
        {isExpanded ? <ChevronDown color="#7a7a7a" size={25} className="rounded-full hover:bg-hover" /> : <ChevronUp color="#7a7a7a" size={25} className="rounded-full hover:bg-hover" />}
      </header>
      {isExpanded && <nav className="mt-2 flex flex-col justify-end-safe">
        <CategoryItem isChecked={isChecked} handleChecked={() => setIsChecked(c => !c)} />
      </nav>}
    </section>
  )
}

function CategoryItem({ isChecked, handleChecked }: { isChecked: boolean, handleChecked: () => void}) {

  return (
    <button
      onClick={handleChecked}
      className="cursor-pointer max-w-[90%] px-3 py-1 flex justify-between items-center rounded-4xl hover:bg-hover">
      <input checked={isChecked} className="cursor-pointer" type="checkbox" />
      <p className="text-md font-light">Minhas tarefas</p>
      <span className="text-[12px]">5</span>
    </button>
  )
}