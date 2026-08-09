import { Search } from "lucide-react";


interface SearchTasksProps {
  query: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  filters: string,
  handleFilter: (filter:string) => void
}

export function SearchTasks({ query, onChange, filters, handleFilter }: SearchTasksProps) {
  
  return (
    <div className="">
      <div className="flex items-center gap-2">
        <Search color="var(--color-text)" size={20} />
        <input type="text" value={query} onChange={onChange} 
        className="outline-0 border-text border-b max-w-40"/>
      </div>
      <div className="flex gap-1">
        <button aria-pressed={filters === "all"} onClick={() => handleFilter("all")} className="text-sm cursor-pointer hover:text-text aria-pressed:text-text">Todos</button> |
        <button aria-pressed={filters === "pending"} onClick={() => handleFilter("pending")} className="text-sm cursor-pointer hover:text-text aria-pressed:text-text">Pendentes</button> |
        <button aria-pressed={filters === "finished"} onClick={() => handleFilter("finished")} className="text-sm cursor-pointer hover:text-text aria-pressed:text-text">Concluídos</button>
      </div>
    </div>
  )
}