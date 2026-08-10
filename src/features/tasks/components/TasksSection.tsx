import React, { useState } from "react"
import { Plus } from "lucide-react"

import { useTasks } from "../hooks/useTasks"
import { SearchTasks } from "./SearchTasks"

import type { Category } from "../../../context/CategoriesContext"
import { SingleTask } from "./SingleTask"
import type { Task } from "../../../context/TasksContext"
import { useCategories } from "../../categories/hooks/useCategories"


export function TasksSection({ category }: { category: Category }) {

  const { tasks, editTask, deleteTask, addTask } = useTasks()

  const [search, setSearch] = useState("")
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

  function handleEditTask(taskId:string, updateField:Partial<Task>) {
    editTask(taskId, updateField)
  }

  function handleNewTask() {
    addTask("Nova tarefa", category.id)
  }

  return (
    <section className="w-full max-w-170 p-4 bg-secondary rounded-2xl flex flex-col gap-3">
      <div className="flex w-full justify-around items-start">
        <HeaderTasksSection category={category} handleNewTask={handleNewTask} />
        <SearchTasks query={search} handleFilter={handleFilter} onChange={handleSearch} filters={filters} />
      </div>
      <main className="flex flex-col gap-3">
        {filteredTasks.length > 0 ? filteredTasks.map(task =>
          <SingleTask key={task.id} task={task} onEdit={handleEditTask} onDelete={id => deleteTask(id)}/>
        ) : <h6 className="font-medium text-center mt-5">Sem resultados</h6>}
      </main>
    </section>
  )
}

function HeaderTasksSection({ category, handleNewTask }: { category: Category, handleNewTask: () => void }) {

  const [isEditMode, setIsEditMode] = useState(category.name !== "Nova categoria" ? false : true)
  const [categoryName, setCategoryName] = useState(category.name)
  const { editCategory } = useCategories()

  function handleEditName(e: React.ChangeEvent<HTMLInputElement>) {
    setCategoryName(e.target.value);
  }

  function handleClickText() {
    if(isEditMode) {
      setIsEditMode(false);
    } else setIsEditMode(true);
  }

  function handleBlur() {
    editCategory(category.id, { name: categoryName })
    setIsEditMode(false)
  }

  return (
    <header className="flex flex-col gap-3 items-start w-full">
      <div onClick={handleClickText}>
        {
          !isEditMode ? <h2>{categoryName}</h2> : (
            <input autoFocus maxLength={15} type="text" value={categoryName} onBlur={handleBlur} onChange={handleEditName}/>
          )
        }
      </div>
      <button onClick={handleNewTask} className="cursor-pointer w-full text-text flex justify-start items-center gap-2 font-medium hover:bg-text/15 p-1 px-2 rounded-4xl">
        <Plus size={20} />Adicionar uma tarefa
      </button>
    </header>
  )
}