import { useContext } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserContext } from './Context/UserContext'
import { FormLoginRegister } from './components/FormLoginRegister/FormLoginRegister'
import { PageNotas } from './pages/PageNotas'
import { Navbar } from './components/Navbar/Navbar'
import { NotasProvider } from './Context/NotasContext'
function App() {
  const { user } = useContext(UserContext)

  return (
    <main className='mainApp'>
      <BrowserRouter>
        {user ? <Navbar /> : null}
        <Routes>
          <Route
            path={'/'}
            element={
              user ? (
                <NotasProvider>
                  <PageNotas />
                </NotasProvider>
              ) : (
                <FormLoginRegister />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
