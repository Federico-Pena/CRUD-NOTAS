import { useState, useEffect } from 'react'
import './Transactions.css'
import { Flecha } from '../../components/Icons/Flecha'
import DateRangeSelector from '../../components/DateRangeSelector/DateRangeSelector'
import { transacciones } from '../../constantes'
function generateRandomTransaction() {
  const descriptions = [
    'Salario',
    'Alquiler',
    'Comestibles',
    'Servicios',
    'Cena',
    'Compras',
    'Películas',
    'Transporte',
    'Factura de Teléfono',
    'Membresía de Gimnasio'
  ]
  const types = ['ingreso', 'gasto']
  const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)]
  const Transaction = {
    id: window.crypto.randomUUID(),
    description: getRandomElement(descriptions),
    amount: Math.floor(Math.random() * 1000) + 1,
    type: getRandomElement(types),
    date: new Date()
  }
  return Transaction
}
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
  useEffect(() => {
    const randomTransactionsArray = Array.from({ length: 20 }, generateRandomTransaction)
    setTransactions(randomTransactionsArray)
    setTotal(calculateTotal(randomTransactionsArray))
  }, [])

  return (
    <main className='mainDashboard'>
      <h2 className='titleDashboard'>Dashboard</h2>
      <article className='transactionArticle'>
        <DateRangeSelector
          options={transacciones}
          value={dateRange}
          onChange={(e) => setDateRange(e)}
        />
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

          {transactions?.map((transaction) => (
            <li key={transaction.id} className='elementTransactions'>
              <header className='headerTransactions'>{transaction.description}</header>
              <main
                className={`mainTransaction ${transaction.type === 'gasto' ? 'gasto' : 'ingreso'}`}>
                <span>$ {transaction.amount}</span>
                <span>
                  <Flecha />
                </span>
              </main>
              <footer>
                <span>{new Date(transaction.date).toLocaleDateString()}</span>
                <span>{new Date(transaction.date).toLocaleTimeString().substring(0, 5)} hs</span>
              </footer>
            </li>
          ))}
        </ul>
      </article>
    </main>
  )
}

export default Dashboard
