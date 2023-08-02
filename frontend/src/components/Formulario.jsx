import { useState } from 'react'
import './Formulario.css'
import { postNota } from '../services/postNota'

function Formulario({ setearNotas }) {
	const [titulo, setTitulo] = useState('')
	const [contenido, setContenido] = useState('')
	const [error, setError] = useState('')

	const submitForm = async (e) => {
		e.preventDefault()
		let nota = {
			titulo,
			contenido,
		}
		if (titulo.trim() && contenido.trim()) {
			try {
				const data = await postNota(nota)
				setearNotas(data)
			} catch (error) {
				setError('Error al guardar nota')
				setTimeout(() => {
					setError('')
				}, 2000)
			}
		} else {
			setError('Complete los campos')
			setTimeout(() => {
				setError('')
			}, 2000)
		}

		e.target.reset()
	}
	return (
		<form className='formulario' onSubmit={submitForm}>
			<h2>Agrega una nota</h2>
			{error && <span>{error}</span>}
			<label htmlFor='titulo'>
				Titulo
				<input
					type='text'
					id='titulo'
					placeholder='Titulo'
					onChange={(e) => setTitulo(e.target.value)}
				/>
			</label>
			<label htmlFor='contenido'>
				Contenido
				<textarea
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

export default Formulario
