import { useState } from "react"
import { Plus } from "lucide-react"

import { useTasks } from "../hooks/useTasks"
import { SearchTasks } from "./SearchTasks"

import type { Category } from "../../../context/CategoriesContext"


export function TasksSection({ category }:{ category: Category }) {

  const { tasks } = useTasks()
  const activeCategoryTasks = tasks.filter(t => t.categoryId === category.id)

  const [search, setSearch] = useState("");
  const [tasksList, setTasksList] = useState(activeCategoryTasks)


  function handleSearch(e:React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
    if(e.target.value !== "") {
      setTasksList(activeCategoryTasks.filter(task => task.text.includes(e.target.value)))
    } else{
      setTasksList(activeCategoryTasks)
    }
  }

  return (
    <section className="w-full max-w-170 p-4 bg-secondary rounded-2xl flex flex-col gap-3">
      <div className="flex w-full justify-around items-start">
        <HeaderTasksSection categoryName={category.name} />
        <SearchTasks query={search} onChange={handleSearch}  />
      </div>
      <main>
        {tasksList.length > 0 ? tasksList.map(task => 
          <h2 key={task.id}>{task.text}</h2>
        ) : <h6 className="font-medium text-center mt-5">Todas as tarefas foram concluídas. Parabéns!</h6>}
      </main>
    </section>
  )
}

function HeaderTasksSection({ categoryName }:{ categoryName: string }) {
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