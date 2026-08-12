import React, { useState } from "react"
import { Plus } from "lucide-react"

import type { Category } from "../../../context/CategoriesContext"
import { useCategories } from "../../categories/hooks/useCategories"

export function HeaderTasksSection({ category, handleNewTask }: { category: Category, handleNewTask: () => void }) {

  const [isEditMode, setIsEditMode] = useState(category.name !== "Nova categoria" ? false : true)
  const [categoryName, setCategoryName] = useState(category.name)
  const { editCategory } = useCategories()

  function handleEditName(e: React.ChangeEvent<HTMLInputElement>) {
    setCategoryName(e.target.value);
  }

  function handleClickText() {
    if (!isEditMode) {
      setIsEditMode(true);
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