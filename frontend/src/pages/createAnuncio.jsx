import styles from './login.module.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NOTICIAS_STORE_ENDPOINT, USUARIOS_INDEX_ENDPOINT } from '../../endpoints.js'; 

function CreateNoticia() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [autores, setAutores] = useState([]);
    const navigate = useNavigate();

    const [noticia, setNoticia] = useState({
        titulo: "",
        descripcion: "",
        user_id: "" 
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        const fetchUsuarios = async () => {
            try {
                // Asumo que tienes un endpoint que devuelve la lista de usuarios
                const res = await fetch(`${USUARIOS_INDEX_ENDPOINT}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json"
                    }
                });
                const data = await res.json();
                
                // Filtramos en el cliente si la API no lo hace
                const lista = Array.isArray(data) ? data : data.data || [];
                const filtrados = lista.filter(u => u.role_id === 1 || u.role_id === 2);
                
                setAutores(filtrados);
            } catch (err) {
                console.error("Error cargando autores:", err);
            }
        };

        fetchUsuarios();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                body: JSON.stringify(noticia), 
            });

            if (!res.ok) throw new Error("Error al publicar la noticia");

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

            <form className={styles.formulario} onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Título de la noticia"
                    value={noticia.titulo}
                    onChange={(e) => setNoticia({ ...noticia, titulo: e.target.value })}
                    required
                />

                <input
                    className={styles.input}
                    placeholder="Descripción o contenido"
                    value={noticia.descripcion}
                    onChange={(e) =>
                        setNoticia({ ...noticia, descripcion: e.target.value })
                    }
                    required
                />

                {/* 2. Select para elegir el autor */}
                <select
                    className={styles.input}
                    value={noticia.user_id}
                    onChange={(e) => setNoticia({ ...noticia, user_id: e.target.value })}
                    required
                >
                    <option value="">Selecciona quién publica...</option>
                    {autores.map((autor) => (
                        <option key={autor.id} value={autor.id}>
                            {autor.name}
                        </option>
                    ))}
                </select>

                {error && <p className={styles.error}>{error}</p>}

                <button className={styles.boton} type="submit" disabled={loading}>
                    {loading ? "Publicando..." : "Publicar Noticia"}
                </button>
            </form>

            <button className={styles.boton} onClick={() => navigate("/home")}>
                Volver
            </button>
        </main>
    );
}

export default CreateNoticia;