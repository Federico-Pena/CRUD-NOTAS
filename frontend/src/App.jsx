import { useContext } from 'react'
import './App.css'
import { UserContext } from './Context/UserContext'
import { FormLoginRegister } from './components/FormLoginRegister/FormLoginRegister'
import { PageNotas } from './pages/PageNotas'
function App() {
  const { user, logoutUser } = useContext(UserContext)

  return (
    <div className='mainApp'>
      {!user ? (
        <FormLoginRegister />
      ) : (
        <button className='btnLogOut' onClick={logoutUser}>
          LogOut
        </button>
      )}
      {user ? <PageNotas /> : null}
    </div>
  )
}

export default App
