import {
    EXAMENES_SHOW_ENDPOINT,
    EXAMENES_UPDATE_ENDPOINT,
    USUARIOS_INDEX_ENDPOINT,
    ASIGNATURAS_ENDPOINT
} from '../../endpoints.js';

import styles from './login.module.css';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ExamenEdit() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [usuarios, setUsuarios] = useState([]);
    const [asignaturas, setAsignaturas] = useState([]);
    const trimestre = new URLSearchParams(window.location.search).get("trimestre");
    const asignatura = new URLSearchParams(window.location.search).get("asignatura");

    const [form, setForm] = useState({
        user_id: "",
        alumno_id: "",
        asignatura_id: "",
        nota: "",
        id_trimestre: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        const getExamen = async () => {
            try {
                const res = await fetch(`${EXAMENES_SHOW_ENDPOINT}/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!res.ok) throw new Error("Error al cargar examen");

                const data = await res.json();

                setForm({
                    user_id: data.user_id || "",
                    alumno_id: data.alumno_id || "",
                    asignatura_id: data.asignatura_id || "",
                    nota: data.nota || "",
                    id_trimestre: data.id_trimestre || ""
                });

            } catch (err) {
                setError(err.message);
            }
        };

        const getUsuarios = async () => {
            try {
                const res = await fetch(USUARIOS_INDEX_ENDPOINT, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await res.json();
                setUsuarios(Array.isArray(data) ? data : data.data || []);
            } catch (err) {
                setError("Error usuarios");
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
                setError("Error asignaturas");
            }
        };

        getExamen();
        getUsuarios();
        getAsignaturas();

    }, [id]);

    const profesores = usuarios.filter(u => u.role_id !== 3);
    const alumnos = usuarios.filter(u => u.role_id === 3);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");

        try {

            const payload = {
                user_id: Number(form.user_id),
                alumno_id: Number(form.alumno_id),
                asignatura_id: Number(form.asignatura_id),
                nota: Number(form.nota),
                id_trimestre: Number(form.id_trimestre)
            };

            const res = await fetch(`${EXAMENES_UPDATE_ENDPOINT}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Error al actualizar examen");

            await res.json();

            navigate(`/examenes?trimestre=${trimestre}&asignatura=${asignatura}`);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.main}>
            <h1 className={styles.titulo}>EDITAR EXAMEN</h1>

            <form className={styles.formulario} onSubmit={handleSubmit}>

                {/* PROFESOR */}
                <select
                    className={styles.input}
                    value={form.user_id}
                    onChange={(e) =>
                        setForm({ ...form, user_id: e.target.value })
                    }
                >
                    <option value="">Profesor</option>
                    {profesores.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                </select>

                {/* ALUMNO */}
                <select
                    className={styles.input}
                    value={form.alumno_id}
                    onChange={(e) =>
                        setForm({ ...form, alumno_id: e.target.value })
                    }
                >
                    <option value="">Alumno</option>
                    {alumnos.map((a) => (
                        <option key={a.id} value={a.id}>
                            {a.name}
                        </option>
                    ))}
                </select>

                {/* ASIGNATURA */}
                <select
                    className={styles.input}
                    value={form.asignatura_id}
                    onChange={(e) =>
                        setForm({ ...form, asignatura_id: e.target.value })
                    }
                >
                    <option value="">Asignatura</option>
                    {asignaturas.map((as) => (
                        <option key={as.id} value={as.id}>
                            {as.nombre_asignatura}
                        </option>
                    ))}
                </select>

                {/* NOTA */}
                <input
                    className={styles.input}
                    type="number"
                    value={form.nota}
                    onChange={(e) =>
                        setForm({ ...form, nota: e.target.value })
                    }
                />

                {/* TRIMESTRE */}
                <select
                    className={styles.input}
                    value={form.id_trimestre}
                    onChange={(e) =>
                        setForm({ ...form, id_trimestre: e.target.value })
                    }
                >
                    <option value="">Trimestre</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>

                {error && <p className={styles.error}>{error}</p>}

                <button className={styles.boton} type="submit">
                    {loading ? "Guardando..." : "Actualizar examen"}
                </button>

            </form>

            <button
                className={styles.volver}
                onClick={() => navigate("/examenes?trimestre=" + trimestre + "&asignatura=" + asignatura)}
            >
                Volver
            </button>
        </main>
    );
}

export default ExamenEdit;