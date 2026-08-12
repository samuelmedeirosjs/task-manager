
import { SideBarMenu } from './components/layout/SideBarMenu';
import { SingleCategory } from "./features/categories/components/SingleCategory";

import { useCategories } from "./features/categories/hooks/useCategories";
import { DragDropContext } from "@hello-pangea/dnd";
import { useTasks } from "./features/tasks/hooks/useTasks";

function App() {

  const { categories } = useCategories();
  const { handleDragEndTask } = useTasks();

  return (
    <div className="w-screen h-screen text-white font-text flex">
      <SideBarMenu />
      <main className="flex justify-start flex-1 items-start p-15 gap-5 overflow-x-auto">
        <DragDropContext onDragEnd={handleDragEndTask}>
          {categories.filter(c => c.status).map(category =>
            <SingleCategory key={category.id} category={category} />
          )}
        </DragDropContext>
      </main>
    </div>
  )
}

export default App;