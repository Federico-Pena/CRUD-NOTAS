import { baseUrl } from '../constantes'

export const postNota = async (nota) => {
  const res = await fetch(`${baseUrl}/api/notas`, {
    method: 'POST',
    body: JSON.stringify(nota),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const { data, error } = await res.json()
  return { data, error }
}
