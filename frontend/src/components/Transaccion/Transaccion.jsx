import { useContext } from 'react'
import { baseUrl } from '../../constantes'
import { Flecha } from '../Icons/Flecha'
import { UserContext } from '../../Context/UserContext'

export const Transaccion = ({ transaction, actualizarEliminada }) => {
  const { user } = useContext(UserContext)
  const handleDelete = async () => {
    const options = {
      method: 'DELETE',
      headers: {
        authorization: user.token
      }
    }
    const res = await fetch(`${baseUrl}/api/transactions/${transaction._id}`, options)
    const data = await res.json()
    actualizarEliminada(data)
  }
  return (
    <li className='elementTransactions'>
      <header className='headerTransactions'>{transaction.description}</header>
      <main className={`mainTransaction ${transaction.type === 'gasto' ? 'gasto' : 'ingreso'}`}>
        <span>$ {transaction.amount}</span>
        <span>
          <Flecha />
        </span>
        <button onClick={handleDelete}>eliminar</button>
      </main>
      <footer>
        <span>{new Date(transaction.date).toLocaleDateString()}</span>
        <span>{new Date(transaction.date).toLocaleTimeString().substring(0, 5)} hs</span>
      </footer>
    </li>
  )
}
