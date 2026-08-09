import { useState } from "react"
import type { Task } from "../../../context/TasksContext"
import { Circle, CircleCheckBig, Trash } from "lucide-react"

interface TaskProps {
  task: Task,
  onEdit: (taskId:string, updateField:Partial<Task>) => void,
  onDelete: (taskId:string) => void,
}

export function SingleTask({ task, onEdit, onDelete}: TaskProps) {

  const [isEditMode, setIsEditMode] = useState(false)
  const [text, setText] = useState(task.text)

  function handleEditText(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value)
  }
  
  function handleBlur() {
    setIsEditMode(false)
    onEdit(task.id, { text: text })
  }

  function handleDone() {
    onEdit(task.id, { done: !task.done })
  }

  function handleDelete() {
    onDelete(task.id)
  }

  return (
    <div className="flex gap-2">
      <button className="cursor-pointer" onClick={handleDone}>
        {task.done ? <CircleCheckBig /> : <Circle />} 
      </button>
      <div className="cursor-pointer w-full">
        {!isEditMode ? (
          <h4 className={`font-medium decoration-2 ${task.done ? "line-through" : ""}`} onClick={() => setIsEditMode(true)}>{task.text}</h4>
        ) : (
          <input autoFocus type="text" value={text} maxLength={50} onBlur={handleBlur} onChange={handleEditText} 
          className="w-full"/>
        )}
      </div>
      <button className="cursor-pointer" onClick={handleDelete}>
        <Trash size={15} color="#ff6467" />
      </button>
    </div>
  )
}