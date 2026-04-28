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

    const handleAsignatura = (nombre) => {
        const params = Object.fromEntries(searchParams.entries());

        if (nombre) {
            params.asignatura = nombre;
        } else {
            delete params.asignatura;
        }

        setSearchParams(params);
    };

    const nombresUnicos = [...new Set(data.map(a => a.nombre_asignatura))];

    return (
        <main className={styles.main}>
            <h1 className={styles.titulo}>Asignaturas</h1>

            <p className={styles.info}>
                Trimestre seleccionado: {trimestre || "Ninguno"}
            </p>

            <div className={styles.filtros}>
                {nombresUnicos.map((nombre) => (
                    <button
                        key={nombre}
                        className={styles.boton}
                        onClick={() => handleAsignatura(nombre)}
                    >
                        {nombre}
                    </button>
                ))}
            </div>

                  <button
                    className={styles.volver}
                    onClick={() => navigate("/trimestres")}
                  >
                    Volver
                  </button>
        </main>
    );
}

export default Asignaturas;