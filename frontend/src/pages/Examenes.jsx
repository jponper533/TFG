import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './sobre-nosotros.module.css';
import { FILTROS_EXAMENES_ENDPOINT } from "../../endpoints";

function Examenes() {

    const [searchParams] = useSearchParams();

    const trimestre = searchParams.get("trimestre");
    const asignatura = searchParams.get("asignatura");

    const [examenes, setExamenes] = useState([]);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchExamenes = async () => {
            try {
                const query = new URLSearchParams({
                    trimestre,
                    asignatura
                }).toString();

                const res = await fetch(`${FILTROS_EXAMENES_ENDPOINT}?${query}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) throw new Error("Error al cargar exámenes");

                const data = await res.json();
                setExamenes(data);

            } catch (err) {
                console.error(err);
            }
        };

        if (trimestre && asignatura) {
            fetchExamenes();
        }

    }, [trimestre, asignatura, token]);

    return (
        <main className={styles.main}>
            <div className={styles.titulo}>
                <h4>Exámenes</h4>
            </div>

            <ul>
                {examenes.map((ex) => (
                    <li key={ex.id}>
                        {ex.asignatura.nombre_asignatura} - {ex.nota}
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default Examenes;