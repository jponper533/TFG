import styles from './usuariosAdmin.module.css'
import { useEffect, useState } from "react";
import { USUARIOS_INDEX_ENDPOINT } from '../../endpoints.js';

function UsuariosAdmin() {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);

        const token = localStorage.getItem("token");

        fetch(`${USUARIOS_INDEX_ENDPOINT}?page=${page}`, {
            signal: controller.signal,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setUsers(data.data || []);
                setTotalPages(data.last_page || 1);
            })
            .catch(err => {
                if (err.name !== "AbortError") {
                    console.error(err);
                }
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [page]);

    return (
        <main className={styles.main}>
            <h1> USUARIOS </h1>
            <div className={styles.contorno}>
                <div className={styles.card}>
                    {loading ? (
                        <h2>Cargando...</h2>
                    ) : (
                        <>
                            {users.map((user) => (
                                <div key={user.id} className={styles.userCard}>
                                    <strong>{user.name}</strong>
                                    <p>{user.email}</p>
                                    <p>{user.created_at || "Sin fecha de creación"}</p>
                                </div>
                            ))}
                        </>
                    )}
                </div>
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
            </div>
        </main>
    )
}

export default UsuariosAdmin