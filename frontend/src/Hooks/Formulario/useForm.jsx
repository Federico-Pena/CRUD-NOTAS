import { useState } from 'react'

const useForm = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
    if (validationRules[name]) {
      validateField(name, value)
    }
  }

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

  const validateForm = () => {
    Object.keys(validationRules).forEach((name) => {
      validateField(name, values[name])
    })
    return Object.keys(errors).every((key) => !errors[key])
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
  }

  return { values, errors, handleChange, resetForm, validateForm }
}

export default useForm
