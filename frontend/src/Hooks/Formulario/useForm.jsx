import { useState } from 'react'
import { validateField } from './validateField'

const useForm = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({ error: 'campos vacíos' })
  const handleChange = (e) => {
    setErrors({})
    const { name, value } = e.target
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
    if (validationRules[name]) {
      validateField(name, value, setErrors, validationRules)
    }
  }
  const validateForm = () => {
    Object.keys(validationRules).forEach((name) => {
      validateField(name, values[name], setErrors, validationRules)
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
