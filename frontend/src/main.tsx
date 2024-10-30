import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Landing from './Landing.tsx'
import Login from './Login'
import Signup from './Signup'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Landing/>
   {/* <Login/> */}
   {/* <Signup/> */}
  </StrictMode>,
)
