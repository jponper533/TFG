import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./login.module.css";
import { LOGIN_ENDPOINT } from '../../endpoints.js';

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/contactos");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);


    const { name, password } = data;

    try {
      const resultado = await fetch(`${LOGIN_ENDPOINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      if (!resultado.ok) throw new Error("Usuario o contraseña incorrectos");

      const responseData = await resultado.json();
      console.log("Login exitoso:", responseData);

      localStorage.setItem("token", responseData.token);
      navigate("/home");

      window.location.reload();
    } catch (err) {

      if (err.message === "Failed to fetch") {
        setError("No se pudo conectar con el servidor");
      } else {
        setError(err.message);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.titulo}>INICIO DE SESIÓN</h1>

      <form className={styles.formulario} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.input}
          type="text"
          placeholder="Usuario"

          {...register("name", { required: true })}
        />
        {errors.name && <p className={styles.error}>Nombre obligatorio</p>}
        <input
          className={styles.input}
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: true })}

        />
        {errors.password && <p className={styles.error}>Contraseña obligatoria</p>}
        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.boton} type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>

      <form>
        <button
          type="button"
          className={styles.boton}
          disabled={loading}
          onClick={() => navigate("/forgot-password")}
        >
          ¿Olvidaste tu contraseña?
        </button>
      </form>
    </main>
  );
}

export default Login;