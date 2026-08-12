
import { useTasks } from "../hooks/useTasks"

import type { Category } from "../../../context/CategoriesContext"
import { SingleTask } from "./SingleTask"
import type { Task } from "../../../context/TasksContext"
import { HeaderTasksSection } from "./HeaderTasksSection"


export function TasksSection({ category }: { category: Category }) {

  const { tasks, editTask, deleteTask, addTask } = useTasks()

  // const [search, setSearch] = useState("")
  // const [filters, setFilters] = useState("all")

  const categoryTasks = tasks.filter(task => task.categoryId === category.id)
  /*const filteredTasks = categoryTasks.filter(task => {
    const matchesSearch = task.text.toLowerCase().includes(search.toLowerCase())

    if(filters === "pending") return matchesSearch && !task.done;
    if(filters === "finished") return matchesSearch && task.done;
    return matchesSearch;
  })*/
  const filteredTasks = categoryTasks;

  function handleEditTask(taskId:string, updateField:Partial<Task>) {
    editTask(taskId, updateField)
  }

  function handleNewTask() {
    addTask("Nova tarefa", category.id)
  }

  return (
    <section className="w-full min-w-75 md:min-w-120 max-w-170 min-h-40 p-4 bg-secondary rounded-2xl flex flex-col gap-3">
      <div className="flex w-full justify-around items-start">
        <HeaderTasksSection category={category} handleNewTask={handleNewTask} />
      </div>
      <main className="flex flex-col gap-3">
        {filteredTasks.length > 0 ? filteredTasks.map(task =>
          <SingleTask key={task.id} task={task} onEdit={handleEditTask} onDelete={id => deleteTask(id)}/>
        ) : <h6 className="font-medium text-center mt-5">Sem resultados</h6>}
      </main>
    </section>
  )
}