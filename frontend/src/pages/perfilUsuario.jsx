import styles from './login.module.css'

function PerfilUsuario() {
    return (
 <main className={styles.main}>
      <h1 className={styles.titulo}>TU PERFIL</h1>
      <form className={styles.formulario}>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className={styles.input}
          type="text"
          name="telefono"
          placeholder="Teléfono"
          required
        />

        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Contraseña"
          required
        />

        <button className={styles.boton} type="submit">
          Confirmar
        </button>
      </form>

      <form>
        <button
          type="button"
          className={styles.boton}
        >
          Volver
        </button>
      </form>
    </main>
    )
}

export default PerfilUsuario