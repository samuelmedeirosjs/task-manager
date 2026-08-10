import type { Category } from "../../../context/CategoriesContext"

interface DeleteCategoryModalProps {
  isModalDeleteOpen: boolean,
  category: Category | null,
  onClose: () => void,
  onConfirm: () => void
}

export default function DeleteCategoryModal({ isModalDeleteOpen, category, onClose, onConfirm }: DeleteCategoryModalProps) {

  return isModalDeleteOpen && (
    <div className="w-screen h-screen absolute top-0 left-0 flex items-center justify-center bg-black/60">
      <section className="bg-primary rounded-2xl w-full max-w-110 p-5 flex flex-col items-center justify-center gap-10">
        <div className="">
          <h1 className="font-bold text-xl text-center">Confirmar exclusão</h1>
          <p className="font-medium text-center">Todos as tarefas da lista {category?.name} serão perdidas.</p>
        </div>
        <div className="flex justify-around w-full">
          <button className="cursor-pointer font-medium text-red-400 w-full" onClick={onConfirm}>Excluir</button>
          <button className="cursor-pointer font-medium w-full" onClick={onClose}>Cancelar</button>
        </div>
      </section>
    </div>
  )
}