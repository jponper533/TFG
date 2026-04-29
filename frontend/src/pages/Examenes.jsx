import { useSearchParams, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './examenes.module.css';
import { EXAMENES_DELETE_ENDPOINT, FILTROS_EXAMENES_ENDPOINT } from "../../endpoints";
import navStyles from '../components/navigation/navigation.module.css';
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Examenes() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const trimestre = searchParams.get("trimestre");
    const asignatura = searchParams.get("asignatura");

    const [examenes, setExamenes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchExamenes = async () => {
            setLoading(true);

            try {
                const query = new URLSearchParams({
                    trimestre,
                    asignatura
                }).toString();

                const res = await fetch(`${FILTROS_EXAMENES_ENDPOINT}?${query}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) throw new Error("Error al cargar exámenes");

                const data = await res.json();
                setExamenes(data);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (trimestre && asignatura) {
            fetchExamenes();
        }

    }, [trimestre, asignatura, token]);

    const deleteExamen = async (id) => {
        try {
            setDeletingId(id);

            await fetch(`${EXAMENES_DELETE_ENDPOINT}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setExamenes(prev => prev.filter(e => e.id !== id));

        } catch (err) {
            console.error(err);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.titulo}>
                <h4>Exámenes</h4>
            </div>

            <button
                className={styles.volver}
                onClick={() => navigate("/asignaturas?trimestre=" + trimestre)}
            >
                Volver
            </button>

            {loading ? (
                <h2>Cargando...</h2>
            ) : (
                <div className={styles.contorno}>
                    <div className={styles.card}>
                        {examenes.map((ex) => (
                            <div key={ex.id} className={styles.userCard}>

                                <div className={styles.botonesytitulo}>
                                    <strong>
                                        {ex.asignatura?.nombre_asignatura}
                                    </strong>

                                    <div className={styles.botones}>
                                        <NavLink
                                            to={`/examenes-edit/${ex.id}`}
                                            className={navStyles.iconButton}
                                        >
                                            <MdEdit size={20} color="blue" />
                                        </NavLink>

                                        <button
                                            onClick={() => deleteExamen(ex.id)}
                                            className={navStyles.iconButton}
                                            disabled={deletingId === ex.id}
                                            style={{ opacity: deletingId === ex.id ? 0.5 : 1 }}
                                        >
                                            <FaTrash size={20} color="red" />
                                        </button>
                                    </div>
                                </div>

                                <p>Alumno: {ex.alumno?.name}</p>
                                <p>Profesor: {ex.profesor?.name}</p>
                                <p>Nota: {ex.nota}</p>
                                <p>Creacion: {ex.created_at.split("T")[0] || "Sin fecha"}</p>

                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}

export default Examenes;