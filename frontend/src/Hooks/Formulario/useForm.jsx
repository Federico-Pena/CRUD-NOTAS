import { useState } from 'react'

/*
  Hook: useForm

  Este hook facilita la gestión de formularios en React. Proporciona estados para los valores de los campos,
  manejo de cambios, restablecimiento del formulario, validación básica y manejo de errores.

  Parámetros:
    - initialValues: Un objeto que contiene los valores iniciales de los campos del formulario.
    - validationRules: Un objeto que contiene reglas de validación para los campos del formulario.

  Retorna:
    Un objeto con estados y funciones para gestionar un formulario, incluyendo manejo de errores.

  Uso:
    const validationRules = {
      nombre: { required: true, message: 'El nombre es requerido' },
      email: { required: true, message: 'El email es requerido' },
      // Agregar más reglas de validación según tus necesidades
    };

    const { values, errors, handleChange, resetForm, handleSubmit } = useForm(
      { nombre: '', email: '' },
      validationRules
    );

    <form onSubmit={handleSubmit}>
      <input type="text" name="nombre" value={values.nombre} onChange={handleChange} />
      {errors.nombre && <div style={{ color: 'red' }}>{errors.nombre}</div>}
      <input type="text" name="email" value={values.email} onChange={handleChange} />
      {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
      <button type="submit">Enviar</button>
      <button type="button" onClick={resetForm}>Restablecer</button>
    </form>
*/

const useForm = (initialValues, validationRules) => {
  // Estado para los valores de los campos del formulario
  const [values, setValues] = useState(initialValues)

  // Estado para los errores del formulario
  const [errors, setErrors] = useState({})

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
    if (validationRules[name]) {
      // Validar el campo al cambiar
      validateField(name, value)
    }
  }

  // Función para validar un campo específico
  const validateField = (name, value) => {
    const rule = validationRules[name]
    if (value.trim().length < 2) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'Mínimo 2 caracteres'
      }))
      return
    }
    if (rule.required && !value.trim().length) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: rule.message || 'Este campo es requerido'
      }))
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }))
    }
  }

  // Función para validar todo el formulario y actualizar los errores
  const validateForm = () => {
    Object.keys(validationRules).forEach((name) => {
      validateField(name, values[name])
    })
    return Object.keys(errors).every((key) => !errors[key]) // Devuelve true si no hay errores
  }

  // Función para restablecer el formulario a los valores iniciales y borrar los errores
  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
  }

  return { values, errors, handleChange, resetForm, validateForm }
}

export default useForm
