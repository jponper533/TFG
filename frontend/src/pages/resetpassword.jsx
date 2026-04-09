import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./login.module.css";

export default function ResetPassword() {
  const [params] = useSearchParams();

  const token = params.get("token");
  const email = params.get("email");

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          email,
          password,
          password_confirmation: passwordConfirmation,

        }),

      });

      if (!response.ok) {
        throw new Error("Error al actualizar la contraseña");
      }

      alert("Contraseña actualizada");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al actualizar la contraseña");
    }finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <h2 className={styles.titulo}>Nueva contraseña</h2>

        <input
          className={styles.input}
          type="password"
          placeholder="Nueva contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Confirmar contraseña"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        <button className={styles.boton} type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Cambiar contraseña"}
        </button>
      </form>
    </main>
  );
}