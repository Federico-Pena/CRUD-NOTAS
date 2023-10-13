import { useState, useEffect, useContext } from 'react'
import './Transactions.css'
import { Flecha } from '../../components/Icons/Flecha'
import DateRangeSelector from '../../components/DateRangeSelector/DateRangeSelector'
import { transacciones } from '../../constantes'
import { FormularioTransaction } from '../../components/FormularioTransaction/FormularioTransaction'
import useFetchData from '../../Hooks/Fetch/useFetchData'
import Spinner from '../../components/Spinner/Spinner'
import { ModalContext } from '../../Context/ModalContext'
import { Toast } from '../../components/Toast/Toast'
import { Transaccion } from '../../components/Transaccion/Transaccion'

const calculateTotal = (transactions) => {
  const total = transactions.reduce((accumulator, transaction) => {
    const amount = transaction.type === 'gasto' ? -transaction.amount : transaction.amount
    return accumulator + amount
  }, 0)

  return total
}

const Dashboard = () => {
  const [transactions, setTransactions] = useState([])
  const [total, setTotal] = useState(0)
  const [dateRange, setDateRange] = useState('Todas')
  const [form, setForm] = useState(false)
  const { data, loading } = useFetchData(`/api/transactions`)
  const { mensaje, setMensaje } = useContext(ModalContext)

  useEffect(() => {
    console.log(data)
    if (data && data.length) {
      setTransactions(data)
      setTotal(calculateTotal(data))
    }
  }, [data])

  const actualizarNueva = (res) => {
    const { data, error } = res
    if (error) {
      setMensaje(error)
    } else {
      const nuevoArray = transactions.concat(data).sort((a, b) => (b.date > a.date ? 1 : -1))
      setTransactions(nuevoArray)
      setMensaje('Transacción ingresada con éxito')
      setForm(false)
      setTotal(calculateTotal(nuevoArray))
    }
  }
  const actualizarEliminada = (res) => {
    const { data, error } = res
    if (error) {
      setMensaje(error)
    } else {
      const filtradas = transactions.filter((tran) => tran._id !== data._id)
      setTransactions(filtradas.sort((a, b) => (b.date > a.date ? 1 : -1)))
      setMensaje('Transacción eliminada con éxito')
      setTotal(calculateTotal(filtradas))
    }
  }
  return (
    <main className='mainDashboard'>
      {mensaje && <Toast mensaje={mensaje} setMensaje={setMensaje} />}
      <h2 className='titleDashboard'>Dashboard</h2>

      {loading ? (
        <Spinner />
      ) : (
        <article className='transactionArticle'>
          <DateRangeSelector
            options={transacciones}
            value={dateRange}
            onChange={(e) => setDateRange(e)}
          />
          <button onClick={() => setForm(!form)}>
            {form ? 'Cerrar Formulario' : 'Agregar Nueva'}
          </button>
          {form && <FormularioTransaction actualizarNueva={actualizarNueva} />}
          <ul className='listTransactions'>
            <li className='elementTransactions top'>
              <header className='headerTransactions'>Descripción</header>
              <main className='mainTransaction'>Detalle</main>
              <footer className={`balance`}>
                Balance
                <span className='titleTransaction'>{dateRange}</span>
                <span className={total > 0 ? 'positivo' : 'negativo'}>
                  $ {total} {total > 0 ? '🤑' : '🥲'}
                </span>
              </footer>
            </li>
            {transactions.map((transaction) => (
              <Transaccion
                actualizarEliminada={actualizarEliminada}
                key={transaction._id}
                transaction={transaction}
              />
            ))}
          </ul>
        </article>
      )}
    </main>
  )
}

export default Dashboard
