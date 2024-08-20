import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import PlayerContextProvider from './Context/PlayerContext.jsx'
import AuthContextProvider from './Context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <PlayerContextProvider>
    <AuthContextProvider>
      <App/>
    </AuthContextProvider>
    </PlayerContextProvider>
   
    </BrowserRouter>
  
  </StrictMode>,
)
