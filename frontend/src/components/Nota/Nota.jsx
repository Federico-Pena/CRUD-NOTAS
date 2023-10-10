import { useState } from 'react'
import { calcularDiferenciaTiempo } from '../../helpers/calcularDiferenciaTiempo'
import { putNota } from '../../services/putNota'
import './Nota.css'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
function Nota({ nota, openForm, quitarBorrada, marcarCompletada }) {
  const [error, setError] = useState('')

  const borrarNotas = (e) => {
    quitarBorrada(e.target.id)
  }
  const editarNotas = () => {
    window.scrollTo(0, 0)
    openForm(nota)
  }
  const editarCompletada = async (check) => {
    const notaNueva = {
      titulo: nota.titulo,
      contenido: nota.contenido,
      completada: check
    }
    const { data, error } = await putNota(notaNueva, nota._id)
    if (data) {
      marcarCompletada(data)
    }
    if (error) {
      setError(error)
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }

  const fechaCreado = new Date(nota.createdAt)
  const fechaActualizado = new Date(nota.updatedAt)
  const fechas = calcularDiferenciaTiempo(fechaCreado, fechaActualizado)
  return (
    <div className={`containerNota ${nota.completada ? 'completada' : ''}`}>
      <div className='tituloYbotonesNota'>
        <input
          type='checkbox'
          defaultChecked={nota.completada}
          name='completada'
          id=''
          onChange={(e) => editarCompletada(e.target.checked)}
        />
        <h3>{error ? error : nota.titulo}</h3>
        <AiOutlineEdit onClick={editarNotas} className='btnEditar' />
        <AiOutlineDelete id={nota._id} onClick={borrarNotas} className='btnBorrar' />
      </div>
      <div className='contenido'>
        <p>{nota.contenido}</p>
      </div>
      <div className='fechas'>
        <samp>{fechas.creado}</samp>
        {nota.createdAt !== nota.updatedAt && <samp>{fechas.actualizado}</samp>}
      </div>
    </div>
  )
}

export default Nota
