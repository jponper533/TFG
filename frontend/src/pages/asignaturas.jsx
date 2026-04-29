import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./asignaturas.module.css";
import { ASIGNATURAS_ENDPOINT } from "../../endpoints";
import { useNavigate } from "react-router-dom";

function Asignaturas() {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const trimestre = searchParams.get("trimestre");
    const asignatura = searchParams.get("asignatura");

    const [data, setData] = useState([]);

    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchAsignaturas = async () => {
            try {
                const res = await fetch(ASIGNATURAS_ENDPOINT, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) throw new Error("Error al cargar asignaturas");

                const result = await res.json();
                setData(result);

            } catch (err) {
                console.error(err);
            }
        };

        fetchAsignaturas();
    }, []);

    const handleAsignatura = (id) => {
        const params = Object.fromEntries(searchParams.entries());

        if (id) {
            params.asignatura = id;
            setSearchParams(params);
            navigate(`/examenes?trimestre=${params.trimestre}&asignatura=${id}`);
        } else {
            delete params.asignatura;
        }
    };

    const asignaturasUnicas = Array.from(
        new Map(data.map(a => [a.id, a])).values()
    );

    return (
        <main className={styles.main}>
            <h1 className={styles.titulo}>Asignaturas</h1>

            <button
                className={styles.volver}
                onClick={() => navigate("/trimestres")}
            >
                Volver
            </button>

            <div className={styles.filtros}>
                {asignaturasUnicas.map((a) => (
                    <button
                        key={a.id}
                        className={styles.boton}
                        onClick={() => handleAsignatura(a.id)}
                    >
                        {a.nombre_asignatura}
                    </button>
                ))}
            </div>
        </main>
    );
}

export default Asignaturas;