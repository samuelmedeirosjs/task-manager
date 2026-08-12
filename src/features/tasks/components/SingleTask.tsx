import { useRef, useState } from "react"
import type { Task } from "../../../context/TasksContext"
import { Circle, CircleCheckBig, Trash } from "lucide-react"
import { Draggable } from "@hello-pangea/dnd"

interface TaskProps {
  task: Task,
  onEdit: (taskId: string, updateField: Partial<Task>) => void,
  onDelete: (taskId: string) => void,
  index: number,
}

export function SingleTask({ task, onEdit, onDelete, index }: TaskProps) {

  const [isEditMode, setIsEditMode] = useState(task.text !== "Nova tarefa" ? false : true)
  const [text, setText] = useState(task.text)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleEditText(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value)
  }

  function handleBlur() {
    setIsEditMode(false)
    if (text !== '') {
      onEdit(task.id, { text: text })
    } else onDelete(task.id)
  }

  function handleDone() {
    onEdit(task.id, { done: !task.done })
  }

  function handleDelete() {
    onDelete(task.id)
  }

  function handleClickText() {
    if (!isEditMode) {
      setIsEditMode(true)
      inputRef.current?.focus()
    }
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {provided => (
        <div className="flex gap-2 bg-secondary rounded-2xl p-2" ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <button className="cursor-pointer" onClick={handleDone}>
            {task.done ? <CircleCheckBig /> : <Circle />}
          </button>
          <div className="cursor-pointer w-full" onClick={handleClickText}>
            {!isEditMode ? (
              <h4 className={`font-medium decoration-2 ${task.done ? "line-through" : ""}`}>{task.text}</h4>
            ) : (
              <input ref={inputRef} placeholder="Tarefa" autoFocus type="text" value={text} maxLength={50} onBlur={handleBlur} onChange={handleEditText}
                className="w-full" />
            )}
          </div>
          <button className="cursor-pointer" onClick={handleDelete}>
            <Trash size={15} color="#ff6467" />
          </button>
        </div>
      )}
    </Draggable>
  )
}