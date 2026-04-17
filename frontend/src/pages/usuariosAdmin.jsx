import styles from './usuariosAdmin.module.css'
import { useEffect, useState } from "react";
import { USUARIOS_INDEX_ENDPOINT, USUARIOS_DELETE_ENDPOINT } from '../../endpoints.js';
import { MdEdit } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import navStyles from '../components/navigation/navigation.module.css';

function UsuariosAdmin() {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchUsers = async () => {
            setLoading(true);

            try {
                const token = localStorage.getItem("token");

                const res = await fetch(
                    `${USUARIOS_INDEX_ENDPOINT}?page=${page}`,
                    {
                        signal: controller.signal,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );

                const data = await res.json();

                setUsers(data.data || []);
                setTotalPages(data.last_page || 1);

            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error(err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();

        return () => controller.abort();
    }, [page]);

    const deleteUser = async (id) => {
        const token = localStorage.getItem("token");

        const confirmDelete = window.confirm(
            "¿Seguro que quieres eliminar este usuario?"
        );

        if (!confirmDelete) return;

        setDeletingId(id);

        try {
            const res = await fetch(`${USUARIOS_DELETE_ENDPOINT}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error("Error al eliminar usuario");
            }

            setUsers(prev => prev.filter(user => user.id !== id));

        } catch (err) {
            console.error(err);
            alert("No se pudo eliminar el usuario");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <main className={styles.main}>
            <h1>USUARIOS</h1>

<div className={styles.crearUsuario}>
            <NavLink
                to={`/usuarios-create`}
                className={navStyles.iconButton}
            >
                Crear usuario 
            </NavLink>
</div>
            <div className={styles.contorno}>
                <div className={styles.card}>
                    {loading ? (
                        <h2>Cargando...</h2>
                    ) : (
                        users.map((user) => (
                            <div key={user.id} className={styles.userCard}>
                                <div className={styles.botonesytitulo}>
                                    <strong>{user.name}</strong>

                                    <div className={styles.botones}>
                                        <NavLink
                                            to={`/usuarios-edit/${user.id}`}
                                            className={navStyles.iconButton}
                                            target="_blank"
                                        >
                                            <MdEdit size={20} color="blue" />
                                        </NavLink>

                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className={navStyles.iconButton}
                                            disabled={deletingId === user.id}
                                            style={{ opacity: deletingId === user.id ? 0.5 : 1 }}
                                        >
                                            <FaTrash size={20} color="red" />
                                        </button>
                                    </div>
                                </div>

                                <p>{user.email}</p>
                                <p>{user.created_at || "Sin fecha de creación"}</p>
                            </div>
                        ))
                    )}
                </div>

                <div className={styles.pagination}>
                    <button
                        onClick={() => setPage(p => Math.max(p - 1, 1))}
                        disabled={page === 1}
                    >
                        ← Anterior
                    </button>

                    <span>
                        Página {page} de {totalPages}
                    </span>

                    <button
                        onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                    >
                        Siguiente →
                    </button>
                </div>
            </div>
        </main>
    );
}

export default UsuariosAdmin;