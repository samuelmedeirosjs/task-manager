import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { CategoriesProvider } from "./context/CategoriesProvider.tsx"
import { TasksProvider } from "./context/TasksProvider.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CategoriesProvider>
      <TasksProvider>
        <App />
      </TasksProvider>
    </CategoriesProvider>
  </StrictMode>,
)
