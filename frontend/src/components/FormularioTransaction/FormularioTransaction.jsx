import { useContext } from 'react'
import useForm from '../../Hooks/Formulario/useForm'
import { baseUrl } from '../../constantes'
import './FormularioTransaction.css'
import { UserContext } from '../../Context/UserContext'
const initialValues = {
  descripciónTransaction: '',
  montoTransaction: '',
  selectTransaction: ''
}
const validationRules = {
  descripciónTransaction: {
    minLength: 2,
    maxLength: 50
  },
  montoTransaction: {
    minLength: 1
  },
  selectTransaction: { required: true, message: 'El tipo es requerido' }
}
export const FormularioTransaction = ({ actualizarNueva }) => {
  const { values, errors, handleChange, validateForm } = useForm(initialValues, validationRules)
  const { user } = useContext(UserContext)
  const submitTransaction = async (e) => {
    e.preventDefault()
    const isValid = validateForm()
    console.log(isValid)
    if (isValid) {
      const { descripciónTransaction, montoTransaction, selectTransaction } = values
      const transaccion = {
        description: descripciónTransaction,
        amount: montoTransaction,
        type: selectTransaction
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: user.token
        },
        body: JSON.stringify(transaccion)
      }
      const res = await fetch(`${baseUrl}/api/transactions`, options)
      const data = await res.json()
      actualizarNueva(data)
    } else {
      return
    }
  }
  return (
    <form className='transactionForm' onSubmit={submitTransaction}>
      <header className='headerTransactionForm'>
        <h2>Nueva transacción</h2>
      </header>
      <main className='mainTransactionForm'>
        <label htmlFor='descripción'>Descripción</label>
        <input
          value={values.descripciónTransaction}
          id='descripción'
          className='inputTransactionForm'
          type='text'
          placeholder='Descripción'
          name='descripciónTransaction'
          onChange={handleChange}
        />
        {errors.descripciónTransaction && <samp>{errors.descripciónTransaction}</samp>}
        <label htmlFor='monto'>Monto</label>
        <input
          value={values.montoTransaction}
          id='monto'
          min={0}
          step={0.1}
          className='inputTransactionForm'
          type='number'
          placeholder='50'
          name='montoTransaction'
          onChange={handleChange}
        />
        {errors.montoTransaction && <samp>{errors.montoTransaction}</samp>}

        <label htmlFor=''>Tipo</label>
        <select
          value={values.selectTransaction}
          className='selectTransactionForm'
          name='selectTransaction'
          onChange={handleChange}
          id=''>
          <option value=''></option>
          <option value='ingreso'>Ingreso</option>
          <option value='gasto'>Gasto</option>
        </select>
        {errors.selectTransaction && <samp>{errors.selectTransaction}</samp>}
      </main>
      <footer className='footerTransactionForm'>
        <button title='Enviar transacción' className='btnTransactionForm'>
          Enviar
        </button>
      </footer>
    </form>
  )
}
