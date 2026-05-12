import { useSearchParams, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './examenes.module.css';
import { EXAMENES_DELETE_ENDPOINT, FILTROS_EXAMENES_ENDPOINT, USUARIOS_ME_ENDPOINT } from "../../endpoints";
import navStyles from '../components/navigation/navigation.module.css';
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ExportarExamenesPDF from "../components/exportarExamenes";

function Examenes() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const trimestre = searchParams.get("trimestre");
    const asignatura = searchParams.get("asignatura");

    const [examenes, setExamenes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [users, setUser] = useState(null);

    // 🔥 MODAL STATE
    const [showModal, setShowModal] = useState(false);
    const [examenToDelete, setExamenToDelete] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const getUser = async () => {
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

    // 🔥 ABRIR MODAL
    const openDeleteModal = (id) => {
        setExamenToDelete(id);
        setShowModal(true);
    };

    // 🔥 CONFIRMAR BORRADO
    const confirmDelete = async () => {
        try {
            setDeletingId(examenToDelete);

            await fetch(`${EXAMENES_DELETE_ENDPOINT}/${examenToDelete}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setExamenes(prev => prev.filter(e => e.id !== examenToDelete));

        } catch (err) {
            console.error(err);
        } finally {
            setDeletingId(null);
            setShowModal(false);
            setExamenToDelete(null);
        }
    };

    return (
        <main className={styles.main}>

            <div className={styles.titulo}>
                <h4>Exámenes</h4>
            </div>

            <div className={styles.botones}>

                <div className={styles.crearUsuario}>
                    {((users?.role_id === 1 || users?.role_id === 2)) && (
                        <NavLink to={`/examenes-create`} className={navStyles.iconButton}>
                            Crear examen
                        </NavLink>
                    )}
                </div>

                <button
                    className={styles.volver}
                    onClick={() => navigate("/asignaturas?trimestre=" + trimestre)}
                >
                    Volver
                </button>

                {examenes.length > 0 && (
                    <ExportarExamenesPDF
                        targetId="examenes-cards"
                        fileName="examenes.pdf"
                        buttonText="Descargar PDF"
                    />
                )}
            </div>

            {loading ? (
                <h2>Cargando...</h2>
            ) : examenes.length === 0 ? (
                <h4>No hay ningún examen para mostrar</h4>
            ) : (
                <div className={styles.contorno}>
                    <div id="examenes-cards" className={styles.card}>
                        {examenes.map((ex) => (
                            <div key={ex.id} className={styles.userCard}>

                                <div className={styles.botonesytitulo}>
                                    <strong>{ex.asignatura?.nombre_asignatura}</strong>

                                    {((users?.role_id === 1 || users?.role_id === 2)) && (
                                        <div className={styles.botones}>
                                            <NavLink
                                                to={`/examenes-edit/${ex.id}?trimestre=${trimestre}&asignatura=${asignatura}`}
                                                className={navStyles.iconButton}
                                            >
                                                <MdEdit size={20} color="blue" />
                                            </NavLink>

                                            <button
                                                onClick={() => openDeleteModal(ex.id)}
                                                className={navStyles.iconButton}
                                            >
                                                <FaTrash size={20} color="red" />
                                            </button>
                                        </div>
                                    )}
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
            
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3>¿Seguro que quieres borrar este examen?</h3>

                        <div className={styles.modalButtons}>
                            <button
                                onClick={confirmDelete}
                                disabled={deletingId !== null}
                                className={styles.btnDelete}
                            >
                                Sí, borrar
                            </button>

                            <button
                                onClick={() => setShowModal(false)}
                                className={styles.btnCancel}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
}

export default Examenes;