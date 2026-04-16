import { useEffect, useState } from "react";
import styles from "./home.module.css";
import MyCalendar from "../components/calendar.jsx";
import { NOTICIAS_INDEX_ENDPOINT, USUARIOS_ME_ENDPOINT } from '../../endpoints.js';

function Home() {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [users, setUser] = useState(null);

    useEffect(() => {
        setLoading(true);

        fetch(`${NOTICIAS_INDEX_ENDPOINT}?page=${page}`)
            .then(res => res.json())
            .then(data => {
                setNoticias(data.data || []);
                setTotalPages(data.last_page || 1);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error:", err);
                setLoading(false);
            });
    }, [page]);

    useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${USUARIOS_ME_ENDPOINT}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();
      setUser(data);
    };

    getUser();
  }, []);

    
    return (
        
        <main className={styles.main}>
            
            <h1>Bienvenido {users?.name || "Usuario"}</h1>
            <h2>Calendario</h2>
            <div className={styles.calendario}>

                <MyCalendar />
            </div>
            <h2 className={styles.title}>TABLÓN DE ANUNCIOS</h2>
            <div className={styles.tablonNoticias}>

                <div className={styles.card}>
                    {loading ? (
                        <p>Cargando...</p>
                    ) : (
                        <>
                            <ul>
                                {noticias.map((noticia, index) => (
                                    <li key={index}>
                                        <strong>{noticia.titulo}</strong>
                                        <p>{noticia.descripcion}</p>
                                        <p>{noticia.users?.name || "Sin usuario"}</p>
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.pagination}>
                                <button
                                    onClick={() => setPage(page - 1)}
                                    disabled={page === 1}
                                >
                                    ← Anterior
                                </button>

                                <span>
                                    Página {page} de {totalPages}
                                </span>

                                <button
                                    onClick={() => setPage(page + 1)}
                                    disabled={page === totalPages}
                                >
                                    Siguiente →
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Home;