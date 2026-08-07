import { ChevronUp } from "lucide-react";

export function CategoryListMenu() {

  return (
    <section>
      <header className="px-3 cursor-pointer w-full flex justify-between font-medium ">
        <h4>Listas</h4>
        <ChevronUp color="#7a7a7a" size={25} className="rounded-full hover:bg-hover" />
      </header>
      <nav className="mt-2 flex flex-col">
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
      </nav>
    </section>
  )
}

function CategoryItem() {

  return (
    <div className="cursor-pointer w-full px-3 py-1 flex justify-between items-center rounded-4xl hover:bg-hover">
      <input type="checkbox" name="" id="" />
      <p className="text-md font-light">Minhas tarefas</p>
      <span className="text-[12px]">5</span>
    </div>
  )
}