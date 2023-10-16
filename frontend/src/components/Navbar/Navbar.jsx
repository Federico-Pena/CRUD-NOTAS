import { useContext } from 'react'
import './Navbar.css'
import { UserContext } from '../../Context/UserContext'
import { User } from '../Icons/User'

export const Navbar = () => {
  const { logoutUser, deleteUser } = useContext(UserContext)

  return (
    <header className='headerNav'>
      <section className='sectionHeader'>
        <figure>
          <img
            title='Logo notas app'
            className='logoNav'
            src='/assets/icon-192.png'
            alt='Logo notas app'
          />
        </figure>
        <div className='btns'>
          <span>
            <User />
          </span>
          <button type='button' title='Cerrar Sesión' className='btnLogOut' onClick={logoutUser}>
            Cerrar sesión
          </button>
          <button
            type='button'
            title='Eliminar cuenta'
            className='btnEliminarCuenta'
            onClick={deleteUser}>
            Eliminar Cuenta
          </button>
        </div>
      </section>
    </header>
  )
}
