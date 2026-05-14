import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    USUARIOS_INDEX_ENDPOINT,
    EXAMENES_STORE_ENDPOINT,
    MODULOS_POR_PROFESOR_ENDPOINT,
    USUARIOS_ME_ENDPOINT
} from "../../endpoints.js";

import styles from "./login.module.css";

function CrearExamen() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [usuarios, setUsuarios] = useState([]);
    const [asignaturas, setAsignaturas] = useState([]);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [examen, setExamen] = useState({
        user_id: "",
        alumno_id: "",
        asignatura_id: "",
        nota: "",
        id_trimestre: ""
    });

    useEffect(() => {

        const getUser = async () => {
            try {
                const res = await fetch(USUARIOS_ME_ENDPOINT, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();
                setUser(data);

                setExamen(prev => ({
                    ...prev,
                    user_id: data.id
                }));

            } catch (err) {
                console.error(err);
            }
        };

        const getUsuarios = async () => {
            try {
                const res = await fetch(USUARIOS_INDEX_ENDPOINT, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();
                setUsuarios(Array.isArray(data) ? data : data.data || []);
            } catch (err) {
                console.error(err);
            }
        };

        getUser();
        getUsuarios();

    }, [token]);

    useEffect(() => {

        if (!user?.id) return;

        const getAsignaturas = async () => {
            try {
                const res = await fetch(
                    `${MODULOS_POR_PROFESOR_ENDPOINT}/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await res.json();

                const normalizadas = Array.isArray(data)
                    ? data.map(a => ({
                        id: a.asignatura_id ?? a.id,
                        nombre: a.asignatura?.nombre_asignatura ?? a.nombre_asignatura
                    }))
                    : [];

                setAsignaturas(normalizadas);

            } catch (err) {
                console.error(err);
            }
        };

        getAsignaturas();

    }, [user, token]);

    const alumnos = usuarios.filter(u => u.role_id == 3);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(EXAMENES_STORE_ENDPOINT, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(examen),
            });
            const responseData = await res.json();

            if (!res.ok) {
                // Laravel validation errors (422)
                if (res.status === 422) {
                    const firstError = Object.values(responseData.errors)[0]?.[0];
                    throw new Error(firstError || "Error de validación");
                }

                throw new Error(responseData.message || "Error al crear el usuario");
            };
            navigate("/trimestres");

        } catch (err) {

            if (err.message === "Failed to fetch") {
                setError("No se pudo conectar con el servidor");
            } else {
                setError(err.message);
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.main}>
            <h1 className={styles.titulo}>Crear examen</h1>

            {/* PROFESOR */}
            <div className={styles.info}>
                <strong>Profesor:</strong> {user?.name}
            </div>

            <form className={styles.formulario} onSubmit={handleSubmit}>

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
                            {asig.nombre}
                        </option>
                    ))}
                </select>

                {/* NOTA */}
                <input
                    className={styles.input}
                    type="number"
                    min="0"
                    max="10"
                    placeholder="Nota"
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