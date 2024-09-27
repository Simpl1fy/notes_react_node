import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './components/Navbar'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import ErrorPage from './error-page'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import { AuthProvider } from './components/useAuth'
import MobileCreateNote from './components/MobileCreateNote'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/create-note",
        element: <MobileCreateNote />
      }, 
      {
        index: true,
        element: <Navigate to="/home" replace={true}/>,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
