import { baseUrl } from '../constantes'

export const postNota = async (nota, token) => {
  const res = await fetch(`${baseUrl}/api/notas`, {
    method: 'POST',
    body: JSON.stringify(nota),
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  })
  const { data, error } = await res.json()
  return { data, error }
}
