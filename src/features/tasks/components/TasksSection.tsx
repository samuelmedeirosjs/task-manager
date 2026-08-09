import { useState } from "react"
import { Plus } from "lucide-react"

import { useTasks } from "../hooks/useTasks"
import { SearchTasks } from "./SearchTasks"

import type { Category } from "../../../context/CategoriesContext"


export function TasksSection({ category }: { category: Category }) {

  const { tasks } = useTasks()

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState("all")

  const categoryTasks = tasks.filter(task => task.categoryId === category.id)
  const filteredTasks = categoryTasks.filter(task => {
    const matchesSearch = task.text.toLowerCase().includes(search.toLowerCase())

    if(filters === "pending") return matchesSearch && !task.done;
    if(filters === "finished") return matchesSearch && task.done;
    return matchesSearch;
  })

  function handleFilter(filter: string) {
    setFilters(filter)
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  return (
    <section className="w-full max-w-170 p-4 bg-secondary rounded-2xl flex flex-col gap-3">
      <div className="flex w-full justify-around items-start">
        <HeaderTasksSection categoryName={category.name} />
        <SearchTasks query={search} handleFilter={handleFilter} onChange={handleSearch} filters={filters} />
      </div>
      <main>
        {filteredTasks.length > 0 ? filteredTasks.map(task =>
          <h2 key={task.id}>{task.text}</h2>
        ) : <h6 className="font-medium text-center mt-5">Sem resultados</h6>}
      </main>
    </section>
  )
}

function HeaderTasksSection({ categoryName }: { categoryName: string }) {
  return (
    <header className="flex flex-col gap-3 items-start w-full">
      <div>
        <h2>{categoryName}</h2>
      </div>
      <button className="cursor-pointer w-full text-text flex justify-start items-center gap-2 font-medium hover:bg-text/15 p-1 px-2 rounded-4xl">
        <Plus size={20} />Adicionar uma tarefa
      </button>
    </header>
  )
}