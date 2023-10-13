import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './Context/UserContext.jsx'
import { MensajeProvider } from './Context/ModalContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MensajeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </MensajeProvider>
  </React.StrictMode>
)
