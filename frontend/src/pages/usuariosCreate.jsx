import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    USUARIOS_STORE_ENDPOINT,
    ROLES_ENDPOINT
} from '../../endpoints.js';

import styles from './login.module.css';

function CrearUsuario() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [roles, setRoles] = useState([]);

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        telefono: "",
        role_id: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        const getRoles = async () => {
            try {
                const res = await fetch(ROLES_ENDPOINT, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await res.json();

                setRoles(Array.isArray(data) ? data : data.data || []);
            } catch (err) {
                setError("Error al cargar roles");
            }
        };

        getRoles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(USUARIOS_STORE_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(user),
            });

            if (!res.ok) {
                throw new Error("Error al crear el usuario");
            }

            await res.json();

            navigate("/home");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.main}>
            <h1 className={styles.titulo}>Crear usuario</h1>

            <form className={styles.formulario} onSubmit={handleSubmit}>

                <input
                    className={styles.input}
                    type="text"
                    placeholder="Nombre"
                    value={user.name}
                    onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                    }
                    required
                />

                <input
                    className={styles.input}
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                    required
                />

                <input
                    className={styles.input}
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                    required
                />

                <input
                    className={styles.input}
                    type="text"
                    placeholder="Teléfono"
                    value={user.telefono}
                    onChange={(e) =>
                        setUser({ ...user, telefono: e.target.value })
                    }
                />

                {/* ROLES */}
                <select
                    className={styles.input}
                    value={user.role_id}
                    onChange={(e) =>
                        setUser({ ...user, role_id: e.target.value })
                    }
                    required
                >
                    <option value="">Selecciona un rol</option>

                    {Array.isArray(roles) &&
                        roles.map((rol) => (
                            <option key={rol.id} value={rol.id}>
                                {rol.nombre}
                            </option>
                        ))}
                </select>

                {error && <p className={styles.error}>{error}</p>}

                <button className={styles.boton} type="submit">
                    {loading ? "Creando..." : "Crear usuario"}
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

export default CrearUsuario;