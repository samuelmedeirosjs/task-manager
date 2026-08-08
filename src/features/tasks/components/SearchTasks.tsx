import { Search } from "lucide-react";


interface SearchTasksProps {
  query: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export function SearchTasks({ query, onChange }: SearchTasksProps) {

  return (
    <div className="flex items-center gap-2">
      <Search color="var(--color-text)" size={20} />
      <input type="text" value={query} onChange={onChange} 
        className="outline-0 border-text border-b max-w-40"/>
    </div>
  )
}