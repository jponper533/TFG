import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

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

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            telefono: "",
            role_id: ""
        }
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

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(USUARIOS_STORE_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });

            const responseData = await res.json();

            if (!res.ok) {
                // Laravel validation errors (422)
                if (res.status === 422) {
                    const firstError = Object.values(responseData.errors)[0]?.[0];
                    throw new Error(firstError || "Error de validación");
                }

                throw new Error(responseData.message || "Error al crear el usuario");
            }

            reset();
            navigate("/usuarios-admin");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.main}>
            <h1 className={styles.titulo}>Crear usuario</h1>

            <form className={styles.formulario} onSubmit={handleSubmit(onSubmit)}>

                <input
                    className={styles.input}
                    type="text"
                    placeholder="Nombre"
                    {...register("name", {
                        required: "El nombre es obligatorio"
                    })}
                />
                {errors.name && (
                    <p className={styles.error}>{errors.name.message}</p>
                )}

                <input
                    className={styles.input}
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                        required: "El email es obligatorio"
                    })}
                />
                {errors.email && (
                    <p className={styles.error}>{errors.email.message}</p>
                )}

                <input
                    className={styles.input}
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                        required: "La contraseña es obligatoria"
                    })}
                />
                {errors.password && (
                    <p className={styles.error}>{errors.password.message}</p>
                )}

                <input
                    className={styles.input}
                    type="text"
                    placeholder="Teléfono"
                    {...register("telefono")}
                />

                <select
                    className={styles.input}
                    {...register("role_id", {
                        required: "Debes seleccionar un rol"
                    })}
                >
                    <option value="">Selecciona un rol</option>

                    {Array.isArray(roles) &&
                        roles.map((rol) => (
                            <option key={rol.id} value={rol.id}>
                                {rol.nombre}
                            </option>
                        ))}
                </select>

                {errors.role_id && (
                    <p className={styles.error}>{errors.role_id.message}</p>
                )}

                {error && <p className={styles.error}>{error}</p>}

                <button className={styles.boton} type="submit" disabled={loading}>
                    {loading ? "Creando..." : "Crear usuario"}
                </button>

            </form>

            <button
                className={styles.boton}
                onClick={() => navigate("/usuarios-admin")}
            >
                Volver
            </button>
        </main>
    );
}

export default CrearUsuario;