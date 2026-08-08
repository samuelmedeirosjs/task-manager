import { CategoryListMenu } from "./CategoryListMenu";
import { NewTaskButton } from "../ui/NewTaskButton";

export function SideBarMenu() {

  return (
    <aside className="flex w-full flex-col gap-7 max-w-65 p-5 border-amber-50">
      <h3 className="text-white font-title text-xl">Task Manager</h3>
      <NewTaskButton />
      <CategoryListMenu />
    </aside>
  )
}