
import { SideBarMenu } from './components/layout/SideBarMenu';
import { TasksSection } from "./features/tasks/components/TasksSection";

import { useCategories } from "./features/categories/hooks/useCategories";

function App() {

  const { categories } = useCategories();
  // const categories = [{ id: "2221", name: "Coluna 1", status: true }, { id: "2221", name: "Coluna 1", status: true }, { id: "2221", name: "Coluna 1", status: true }]

  return (
    <div className="w-screen h-screen bg-primary text-white font-text flex">
      <SideBarMenu />
        <main className="w-full flex p-15 gap-5">
          {categories.filter(c => c.status).map(category =>
            <TasksSection key={category.id} category={category} />
          )}
        </main>
    </div>
  )
}

export default App
