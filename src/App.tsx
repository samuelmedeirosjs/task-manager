
import { SideBarMenu } from './components/layout/SideBarMenu';
import { TasksSection } from "./features/tasks/components/TasksSection";

import { useCategories } from "./features/categories/hooks/useCategories";

function App() {

  const { categories } = useCategories();

  return (
    <div className="w-screen h-screen text-white font-text flex overflow-x-hidden">
      <SideBarMenu />
        <main className="flex justify-start flex-1 items-start p-15 gap-5 overflow-x-auto">
          {categories.filter(c => c.status).map(category =>
            <TasksSection key={category.id} category={category} />
          )}
        </main>
    </div>
  )
}

export default App;