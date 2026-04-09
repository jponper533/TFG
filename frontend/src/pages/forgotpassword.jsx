import { useState } from "react";
import styles from "./login.module.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el email");
      }

      alert("Email enviado");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al enviar el email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <h2 className={styles.titulo}>Recuperar contraseña</h2>
        <input
          className={styles.input}
          type="email"
          placeholder="Tu email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className={styles.boton} type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Enviar"}
        </button>
      </form>
    </main>
  );
}