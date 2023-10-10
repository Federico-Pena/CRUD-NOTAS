export function calcularDiferenciaTiempo(createdAt, updatedAt) {
  const ahora = new Date()
  const creado = new Date(createdAt)
  const actualizado = new Date(updatedAt)
  const diferenciaCreado = calcularDiferencia(creado, ahora)
  const diferenciaActualizado = calcularDiferencia(actualizado, ahora)
  return {
    creado: `Creado hace: ${diferenciaCreado}`,
    actualizado: `Actualizado hace: ${diferenciaActualizado}`
  }
}
function calcularDiferencia(fechaInicio, fechaFin) {
  const unDiaEnMilisegundos = 1000 * 60 * 60 * 24
  const unaHoraEnMilisegundos = 1000 * 60 * 60
  const unMinutoEnMilisegundos = 1000 * 60
  const diferenciaEnMilisegundos = fechaFin - fechaInicio
  const días = Math.floor(diferenciaEnMilisegundos / unDiaEnMilisegundos)
  const horas = Math.floor((diferenciaEnMilisegundos % unDiaEnMilisegundos) / unaHoraEnMilisegundos)
  const minutos = Math.floor(
    (diferenciaEnMilisegundos % unaHoraEnMilisegundos) / unMinutoEnMilisegundos
  )

  if (días > 0) {
    return `${días} día`
  } else if (días > 2) {
    return `${días} días`
  } else if (horas > 0) {
    return `${horas} hora`
  } else if (horas > 2) {
    return `${horas} horas`
  } else if (minutos < 2) {
    return `${minutos} minuto`
  } else {
    return `${minutos} minutos`
  }
}
