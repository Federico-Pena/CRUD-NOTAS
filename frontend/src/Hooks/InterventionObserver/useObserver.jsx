/*
  Custom Hook: useObserver

  Este hook utiliza la API Intersection Observer para determinar si un elemento es visible
  en la ventana gráfica del usuario. Devuelve un objeto con la propiedad `visible` que indica
  si el elemento observado está actualmente en la pantalla.

  Parámetros:
    - observado: El elemento que se va a observar para determinar su visibilidad.
    - options: Opciones de configuración para el Intersection Observer, como umbrales y raíces.

  Uso en Componentes:
    const { visible } = useObserver({ observado: miElemento, options: { threshold: 0.5 } });

  Resultados:
    - `visible`: Un booleano que indica si el elemento observado está actualmente en la pantalla.

  Ejemplo de uso en un componente:
    const MiComponente = () => {
      const miElemento = useRef();
      const { visible } = useObserver({ observado: miElemento.current, options: { threshold: 0.5 } });

      return (
        <div ref={miElemento}>
          {visible ? <p>El elemento es visible</p> : <p>El elemento no es visible</p>}
        </div>
      );
    };

  Nota: Asegúrate de gestionar adecuadamente el elemento observado en tu componente.
*/
import { useEffect, useState } from 'react'

export const useObserver = ({ observado, options }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const esVisible = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      })
    }

    const observer = new IntersectionObserver(esVisible, options)

    // Comienza a observar el elemento cuando el componente se monta
    observado && observer.observe(observado)

    // Detiene la observación cuando el componente se desmonta o cuando el elemento observado cambia
    return () => observado && observer.unobserve(observado)
  }, [observado, options])

  return { visible }
}
