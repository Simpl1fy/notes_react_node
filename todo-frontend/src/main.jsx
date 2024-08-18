import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Form from './components/Form.jsx'
import Navbar from './components/navbar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <Form />
  </StrictMode>,
)
