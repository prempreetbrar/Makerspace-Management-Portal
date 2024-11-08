import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Landing from './Landing.tsx'
// @ts-ignore import will be used later
import Login from './Login'
// @ts-ignore import will be used later
import Signup from './Signup'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Landing/>
   {/* <Login/> */}
   {/* <Signup/> */}
  </StrictMode>,
)
