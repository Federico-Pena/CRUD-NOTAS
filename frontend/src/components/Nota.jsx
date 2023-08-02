import './Nota.css'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
function Nota({ nota, openForm, quitarBorrada }) {
	const borrarNotas = (e) => {
		quitarBorrada(e.target.id)
	}
	const editarNotas = async () => {
		openForm(nota._id)
	}
	const fechaCreado = new Date(nota.createdAt)
	fechaCreado.setHours(fechaCreado.getHours())
	const fechaActualizado = new Date(nota.updatedAt)
	fechaActualizado.setHours(fechaActualizado.getHours())
	const options = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	}
	const formatter = new Intl.DateTimeFormat('es-UY', options)
	const creadaFormateada = formatter.format(fechaCreado)
	const actualizadaFormateada = formatter.format(fechaActualizado)
	return (
		<div className='containerNota'>
			<div className='tituloYbotonesNota'>
				<h3>{nota.titulo}</h3>
				<AiOutlineEdit onClick={editarNotas} className='btnEditar' />
				<AiOutlineDelete
					id={nota._id}
					onClick={borrarNotas}
					className='btnBorrar'
				/>
			</div>
			<div className='contenido'>
				<p>{nota.contenido}</p>
			</div>
			<div className='fechas'>
				<samp>Creado {creadaFormateada}</samp>
				{nota.createdAt !== nota.updatedAt && (
					<samp>Actualizado {actualizadaFormateada}</samp>
				)}
			</div>
		</div>
	)
}

export default Nota
