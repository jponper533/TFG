import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/contactos");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const name = e.target.name.value;
    const password = e.target.password.value;

    try {
      const resultado = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      if (!resultado.ok) throw new Error("Usuario o contraseña incorrectos");

      const data = await resultado.json();
      console.log("Login exitoso:", data);

      localStorage.setItem("token", data.token);
      navigate("/contactos");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.titulo}>INICIO DE SESIÓN</h1>
      <form className={styles.formulario} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Usuario"
          required
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Contraseña"
          required
        />

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


//    useEffect(() => {
//         fetch("http://localhost:8000/api/usuariosApi")
//             .then((response) => response.json())
//             .then((json) => setUsuarios(json))
//             .catch((error) => console.error(error));
//     }, []);