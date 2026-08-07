import { SideBarMenu } from './components/SideBarMenu';
import { CategoriesProvider } from "./context/CategoriesProvider";
import { TasksProvider } from "./context/TasksProvider";

function App() {

  return (
    <CategoriesProvider>
      <TasksProvider>
        <div className="w-screen h-screen bg-primary text-white font-text">
          <SideBarMenu />
        </div>
      </TasksProvider>
    </CategoriesProvider>
  )
}

export default App
