import { USUARIOS_SHOW_ENDPOINT, USUARIOS_UPDATE_ENDPOINT } from '../../endpoints.js';
import styles from './login.module.css';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UsuariosEdit() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    email: "",
    telefono: "",
    password: ""
  });

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`${USUARIOS_SHOW_ENDPOINT}/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error("Error al cargar usuario");

        const data = await res.json();

        setForm({
          email: data.email || "",
          telefono: data.telefono || "",
          password: ""
        });

      } catch (err) {
        setError(err.message);
      }
    };

    getUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${USUARIOS_UPDATE_ENDPOINT}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error al actualizar usuario");

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
      <h1 className={styles.titulo}>
        EDITAR USUARIO
      </h1>

      <form className={styles.formulario} onSubmit={handleSubmit}>

        {/* EMAIL */}
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Nueva contraseña (opcional)"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* TELEFONO */}
        <input
          className={styles.input}
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={(e) =>
            setForm({ ...form, telefono: e.target.value })
          }
          required
        />

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.boton} type="submit">
          {loading ? "Guardando..." : "Confirmar cambios"}
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

export default UsuariosEdit;