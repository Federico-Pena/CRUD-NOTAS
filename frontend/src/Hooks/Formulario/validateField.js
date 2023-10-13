export const validateField = (name, value, setErrors, validationRules) => {
  const rule = validationRules[name]
  if (rule) {
    if (rule && rule.minLength && value.trim().length < rule.minLength) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `Mínimo ${rule.minLength} caracteres`
      }))
      return
    }
    if (rule.maxLength && value.trim().length > rule.maxLength) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `Máximo ${rule.maxLength} caracteres`
      }))
      return
    }
    if (rule.pattern && !rule.pattern.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: rule.message || 'Formato no válido'
      }))
      return
    }
  }
  if (rule && rule.required && !value.trim().length) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: rule.message || 'Este campo es requerido'
    }))
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }))
  }
}
