import styles from './login.module.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { NOTICIAS_STORE_ENDPOINT, USUARIOS_INDEX_ENDPOINT } from '../../endpoints.js';

function CreateNoticia() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [autores, setAutores] = useState([]);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            titulo: "",
            descripcion: "",
            user_id: ""
        }
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchUsuarios = async () => {
            try {
                const res = await fetch(`${USUARIOS_INDEX_ENDPOINT}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json"
                    }
                });

                const data = await res.json();

                const lista = Array.isArray(data) ? data : data.data || [];
                const filtrados = lista.filter(u => u.role_id === 1 || u.role_id === 2);

                setAutores(filtrados);
            } catch (err) {
                console.error("Error cargando autores:", err);
            }
        };

        fetchUsuarios();
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(NOTICIAS_STORE_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Error al publicar la noticia");

            reset(); // limpia el formulario
            navigate("/home");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.main}>
            <h1 className={styles.titulo}>Crear Nueva Noticia</h1>

            <form className={styles.formulario} onSubmit={handleSubmit(onSubmit)}>
                
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Título de la noticia"
                    {...register("titulo", { required: "El título es obligatorio" })}
                />
                {errors.titulo && (
                    <p className={styles.error}>{errors.titulo.message}</p>
                )}

                <input
                    className={styles.input}
                    type="text"
                    placeholder="Descripción o contenido"
                    {...register("descripcion", { required: "La descripción es obligatoria" })}
                />
                {errors.descripcion && (
                    <p className={styles.error}>{errors.descripcion.message}</p>
                )}

                <select
                    className={styles.input}
                    {...register("user_id", { required: "Debes seleccionar un autor" })}
                >
                    <option value="">Selecciona quién publica...</option>
                    {autores.map((autor) => (
                        <option key={autor.id} value={autor.id}>
                            {autor.name}
                        </option>
                    ))}
                </select>
                {errors.user_id && (
                    <p className={styles.error}>{errors.user_id.message}</p>
                )}

                {error && <p className={styles.error}>{error}</p>}

                <button className={styles.boton} type="submit" disabled={loading}>
                    {loading ? "Publicando..." : "Publicar Noticia"}
                </button>
            </form>

            <button
                className={styles.boton}
                onClick={() => navigate("/home")}
            >
                Volver
            </button>
        </main>
    );
}

export default CreateNoticia;