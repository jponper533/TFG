import { USUARIOS_UPDATE_ENDPOINT } from '../../endpoints.js';
import styles from './login.module.css'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { USUARIOS_ME_ENDPOINT } from '../../endpoints.js';

function PerfilUsuario() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    telefono: ""
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const email = e.target.email.value;
    const password = e.target.password.value;
    const telefono = e.target.telefono.value;

    const token = localStorage.getItem("token");

    try {
      const resultado = await fetch(`${USUARIOS_UPDATE_ENDPOINT}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ email, password, telefono }),
      });

      if (!resultado.ok) throw new Error("Error al actualizar el perfil");

      const data = await resultado.json();
      console.log("Actualización exitosa:", data);

      navigate("/home");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.titulo}>TU PERFIL</h1>

      <form className={styles.formulario} onSubmit={handleSubmit}>
        <input className={styles.input} 
        type="email" 
        name="email" 
        required placeholder='email'  
        value={user?.email || ""}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        />


        <input className={styles.input} 
        type="password" name="password" 
        placeholder='password' 
        />

        <input className={styles.input} 
        type="text" 
        name="telefono" 
        required placeholder='telefono'  
        value={user?.telefono || ""}
        onChange={(e) => setUser({ ...user, telefono: e.target.value })}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.boton} type="submit">
          {loading ? "Cargando..." : "Confirmar"}
        </button>
      </form>

      <button className={styles.boton} onClick={() => navigate("/home")}>
        Volver
      </button>
    </main>
  )
}

export default PerfilUsuario;