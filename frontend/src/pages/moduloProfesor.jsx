import { useEffect, useState } from 'react'
import styles from './modulosProf.module.css'
import {
    ASIGNATURAS_ENDPOINT,
    MODULOS_DELETE_ENDPOINT,
    MODULOS_ENDPOINT
} from '../../endpoints'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function ModuloProfesor() {
    const [asignaturas, setAsignaturas] = useState([])
    const [seleccionadas, setSeleccionadas] = useState([])
    const navigate = useNavigate()
    
    const { id } = useParams()
    const profesorId = id

    const token = localStorage.getItem('token')

    useEffect(() => {
        fetch(ASIGNATURAS_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setAsignaturas(data))
    }, [token])

    useEffect(() => {
        fetch(`${MODULOS_ENDPOINT}/${profesorId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {

                const ids = data.map(m => Number(m.asignatura_id))
                setSeleccionadas(ids)
            })
    }, [profesorId, token])

    const handleCheckbox = async (asignaturaId, checked) => {
        const idNum = Number(asignaturaId)

        if (checked) {
            const res = await fetch(MODULOS_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    profesorId,
                    asignaturaId: idNum
                })
            })

            if (res.ok) {
                setSeleccionadas(prev => [...prev, idNum])
            }

        } else {
            const res = await fetch(
                `${MODULOS_DELETE_ENDPOINT}/${profesorId}/${idNum}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (res.ok) {
                setSeleccionadas(prev =>
                    prev.filter(id => id !== idNum)
                )
            }
        }
    }

    return (
        <main className={styles.main}>
            <div className={styles.titulo}>
                <h4>MODULOS DEL PROFESOR</h4>
            </div>

            <div className={styles.asignaturas}>
                {asignaturas.map(asig => (
                    <label key={asig.id}>
                        <input
                            type="checkbox"
                            checked={seleccionadas.includes(Number(asig.id))}
                            onChange={(e) =>
                                handleCheckbox(asig.id, e.target.checked)
                            }
                        />
                        {asig.nombre_asignatura}
                    </label>
                ))}
            </div>

      <button
        className={styles.boton}
        onClick={() => navigate("/usuarios-admin")}
      >
        Volver
      </button>
        </main>
    )
}

export default ModuloProfesor