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

  // 3. Cambiamos 'e' por 'data' y quitamos el e.preventDefault()
  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    // react-hook-form ya nos entrega los datos limpios en un objeto
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.titulo}>INICIO DE SESIÓN</h1>
      {/* 4. Envolvemos nuestra función con el handleSubmit del hook */}
      <form className={styles.formulario} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.input}
          type="text"
          placeholder="Usuario"
          /* 5. Registramos los inputs y sus validaciones básicas */
          {...register("name", { required: true })}
        />
        {errors.name && <p>Nombre obligatorio</p>}
        <input
          className={styles.input}
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: true })}

        />
        {errors.password && <p>Contraseña obligatoria</p>}
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