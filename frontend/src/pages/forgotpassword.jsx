import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { FORGOT_PASSWORD_ENDPOINT } from "../../endpoints";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(FORGOT_PASSWORD_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el email");
      }

      // Abrir modal en vez de alert
      setShowModal(true);
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al enviar el email");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
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

      <button
        className={styles.boton}
        onClick={() => navigate("/")}
      >
        Volver
      </button>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Email enviado</h3>
            <p>Revisa tu bandeja de entrada para recuperar tu contraseña.</p>

            <button
              className={styles.boton}
              onClick={handleCloseModal}
            >
              Cerrar
            </button>

          </div>
        </div>
      )}
    </main>
  );
}