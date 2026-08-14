import { ChevronUp, ChevronDown, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCategories } from "../../features/categories/hooks/useCategories";
import { useTasks } from "../../features/tasks/hooks/useTasks";
import { SingleCategoryItem } from "../../features/categories/components/SingleCategoryItem";
import type { Category } from "../../context/CategoriesContext";
import DeleteCategoryModal from "../../features/categories/components/DeleteCategoryModal";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

export function CategoryListMenu() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isDeleteMode, setIsDeleteMode] = useState(false)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [toDeleteCategory, setToDeleteCategory] = useState<Category | null>(null)

  const { categories, editCategory, addCategory, deleteCategory, handleDragEndCategory } = useCategories();
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

  function handleChecked(category: Category) {
    if (!isDeleteMode) {
      editCategory(category.id, { status: !category.status })
    } else {
      setToDeleteCategory(category)
      setIsModalDeleteOpen(true)
    }
  }

  function handleConfirmDelete() {
    if (toDeleteCategory) deleteCategory(toDeleteCategory.id)
    setIsModalDeleteOpen(false);
    setIsDeleteMode(false);
  }

  function handleCancelDelete() {
    setIsModalDeleteOpen(false);
    setIsDeleteMode(false);
  }

  return (
    <DragDropContext onDragEnd={handleDragEndCategory}>
      <section>
        <header className="px-3 cursor-pointer w-full flex justify-between font-medium" onClick={handleExpanded}>
          <h4>Listas</h4>
          {isExpanded ? <ChevronDown color="#7a7a7a" size={25} className="rounded-full hover:bg-hover" /> : <ChevronUp color="#7a7a7a" size={25} className="rounded-full hover:bg-hover" />}
        </header>
        {isExpanded &&
          <nav className="mt-2 flex flex-col justify-end-safe">
            <Droppable droppableId="nav-sidebar">
              {provided => (
                <div className="flex flex-col" ref={provided.innerRef} {...provided.droppableProps}>
                  {categories.length > 0 ? categories.map((category, index) =>
                    <SingleCategoryItem index={index} key={category.id} isDeleteMode={isDeleteMode} quantityTasks={() => quantityTasks(category.id)} category={category} handleChecked={() => handleChecked(category)} />
                  ) : <h6 className="font-medium text-center mt-5">Sem resultados</h6>}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </nav>
        }
        <button onClick={handleNewCategory} className="flex w-full gap-2 mt-2 text-text font-medium px-3 py-1 items-center rounded-4xl hover:bg-hover cursor-pointer">
          <Plus color="var(--color-text)" /> Criar nova lista
        </button>
        <button onClick={() => setIsDeleteMode(s => !s)} className="flex w-full gap-2 mt-2 text-red-400 font-medium px-3 py-1 items-center rounded-4xl hover:bg-hover cursor-pointer">
          <Trash2 color="#ff6467" /> {!isDeleteMode ? "Excluir lista" : "Cancelar"}
        </button>

        <DeleteCategoryModal onConfirm={() => handleConfirmDelete()} category={toDeleteCategory} onClose={() => handleCancelDelete()} isModalDeleteOpen={isModalDeleteOpen} />
      </section>
    </DragDropContext>
  )
}