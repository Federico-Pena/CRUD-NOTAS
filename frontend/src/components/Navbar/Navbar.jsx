import { useContext, useState } from 'react'
import './Navbar.css'
import { MenuOpen } from '../Icons/MenuOpen'
import { MenuClosed } from '../Icons/MenuClosed'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { User } from '../Icons/User'

export const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const { user, logoutUser, deleteUser } = useContext(UserContext)

  return (
    <header className='headerNav'>
      <Link to={'/'}>
        <img
          className='logoNav'
          src='/assets/icon-192.png'
          alt='Imagen pantalla con código de programación'
        />
      </Link>
      <nav className={`nav ${navbarOpen ? 'nav_open' : ''}`}>
        <ul className='ulNav'>
          <li className='ulLi'>
            <Link
              className='liA'
              preventScrollReset={true}
              to='/'
              onClick={() => setNavbarOpen(false)}>
              Notas
            </Link>
          </li>
          <li className='ulLi'>
            <Link
              className='liA'
              preventScrollReset={true}
              to='/Ganancias'
              onClick={() => setNavbarOpen(false)}>
              Ganancias
            </Link>
          </li>
          <li className='btns'>
            <span>
              <User />
            </span>
            <button title='Cerrar Sesión' className='btnLogOut' onClick={logoutUser}>
              Cerrar sesión
            </button>
            <button title='Eliminar cuenta' className='btnEliminarCuenta' onClick={deleteUser}>
              Eliminar Cuenta
            </button>
          </li>
        </ul>
      </nav>
      <div
        className={`divMenu ${navbarOpen ? 'open' : 'closed'}`}
        onClick={() => setNavbarOpen(!navbarOpen)}>
        <span className='burger'> {navbarOpen ? <MenuOpen /> : <MenuClosed />}</span>
      </div>
    </header>
  )
}
