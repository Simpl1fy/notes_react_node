import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './components/navbar'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from './error-page'
import Form from './components/Form'


const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar /><Form /></>,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
