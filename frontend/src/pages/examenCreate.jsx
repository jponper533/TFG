import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    USUARIOS_INDEX_ENDPOINT,
    EXAMENES_STORE_ENDPOINT,
    ASIGNATURAS_ENDPOINT
} from "../../endpoints.js";

import styles from "./login.module.css";

function CrearExamen() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [usuarios, setUsuarios] = useState([]);
    const [asignaturas, setAsignaturas] = useState([]);

    const navigate = useNavigate();

    const [examen, setExamen] = useState({
        user_id: "",
        alumno_id: "",
        asignatura_id: "",
        nota: "",
        id_trimestre: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        const getUsuarios = async () => {
            try {
                const res = await fetch(USUARIOS_INDEX_ENDPOINT, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await res.json();
                setUsuarios(Array.isArray(data) ? data : data.data || []);
            } catch (err) {
                setError("Error al cargar usuarios");
            }
        };

        const getAsignaturas = async () => {
            try {
                const res = await fetch(ASIGNATURAS_ENDPOINT, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await res.json();
                setAsignaturas(Array.isArray(data) ? data : data.data || []);
            } catch (err) {
                console.log(err);
            }
        };

        getUsuarios();
        getAsignaturas();

    }, []);

    const profesores = usuarios.filter(u => u.role_id !== 3);
    const alumnos = usuarios.filter(u => u.role_id === 3);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(EXAMENES_STORE_ENDPOINT, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(examen),
            });

            if (!res.ok) {
                throw new Error("Error al crear el examen");
            }

            await res.json();
            navigate("/trimestres");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }

        console.log(examen);
    };

    return (
        <main className={styles.main}>
            <h1 className={styles.titulo}>Crear examen</h1>

            <form className={styles.formulario} onSubmit={handleSubmit}>

                {/* PROFESOR */}
                <select
                    className={styles.input}
                    value={examen.user_id}
                    onChange={(e) =>
                        setExamen({ ...examen, user_id: e.target.value })
                    }
                    required
                >
                    <option value="">Selecciona profesor</option>
                    {profesores.map((prof) => (
                        <option key={prof.id} value={prof.id}>
                            {prof.name}
                        </option>
                    ))}
                </select>

                {/* ALUMNO */}
                <select
                    className={styles.input}
                    value={examen.alumno_id}
                    onChange={(e) =>
                        setExamen({ ...examen, alumno_id: e.target.value })
                    }
                    required
                >
                    <option value="">Selecciona alumno</option>
                    {alumnos.map((al) => (
                        <option key={al.id} value={al.id}>
                            {al.name}
                        </option>
                    ))}

                </select>
                {/* ASIGNATURA */}
                <select
                    className={styles.input}
                    value={examen.asignatura_id}
                    onChange={(e) =>
                        setExamen({ ...examen, asignatura_id: e.target.value })
                    }
                    required
                >
                    <option value="">Selecciona asignatura</option>
                    {asignaturas.map((asig) => (
                        <option key={asig.id} value={asig.id}>
                            {asig.nombre_asignatura}
                        </option>
                    ))}
                </select>

                {/* NOTA */}
                <input
                    className={styles.input}
                    type="number"
                    placeholder="Nota"
                    min="0"
                    max="10"
                    value={examen.nota}
                    onChange={(e) =>
                        setExamen({ ...examen, nota: e.target.value })
                    }
                    required
                />

                {/* TRIMESTRE */}
                <select
                    className={styles.input}
                    value={examen.id_trimestre}
                    onChange={(e) =>
                        setExamen({ ...examen, id_trimestre: e.target.value })
                    }
                    required
                >
                    <option value="">Selecciona trimestre</option>
                    <option value="1">Trimestre 1</option>
                    <option value="2">Trimestre 2</option>
                    <option value="3">Trimestre 3</option>
                </select>

                {error && <p className={styles.error}>{error}</p>}

                <button className={styles.boton} type="submit">
                    {loading ? "Creando..." : "Crear examen"}
                </button>

            </form>

            <button
                className={styles.boton}
                onClick={() => navigate("/trimestres")}
            >
                Volver
            </button>
        </main>
    );
}

export default CrearExamen;