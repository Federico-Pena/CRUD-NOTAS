import { useEffect, useState } from 'react'
import './Formulario.css'
import { putNota } from '../services/putNota'

function FormularioEditar({ nota, actualizarNotas }) {
	const [titulo, setTitulo] = useState('')
	const [contenido, setContenido] = useState('')
	const [error, setError] = useState('')

	useEffect(() => {
		const { titulo, contenido } = nota
		setContenido(contenido)
		setTitulo(titulo)
	}, [nota])

	const submitForm = async (e) => {
		const { _id } = nota
		e.preventDefault()
		let notaEditada = {
			titulo,
			contenido,
		}
		if (titulo.trim() && contenido.trim()) {
			try {
				const data = await putNota(notaEditada, _id)
				actualizarNotas(data)
			} catch (error) {
				setError('Ocurrió un error el editar la nota')
				setTimeout(() => {
					setError('')
				}, 2000)
			}
		} else {
			setError('Campos vacíos')
			setTimeout(() => {
				setError('')
			}, 2000)
		}

		e.target.reset()
		setTitulo('')
		setContenido('')
	}
	return (
		<form className='formulario' onSubmit={submitForm}>
			<h2>Editar nota</h2>
			{error && <span>{error}</span>}
			<label htmlFor='titulo'>
				Titulo
				<input
					type='text'
					id='titulo'
					placeholder='Titulo'
					value={titulo}
					onChange={(e) => setTitulo(e.target.value)}
				/>
			</label>
			<label htmlFor='contenido'>
				Contenido
				<textarea
					value={contenido}
					type='text'
					id='contenido'
					placeholder='Contenido'
					onChange={(e) => setContenido(e.target.value)}
				/>
			</label>
			<button>Enviar</button>
		</form>
	)
}

export default FormularioEditar
