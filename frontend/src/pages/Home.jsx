import styles from "./home.module.css";
import { useState, useEffect } from "react";

function Home() {
  const [usuarios, setUsuarios] = useState([]); // usamos array en lugar de null

  useEffect(() => {
    fetch("http://localhost:8000/api/usuariosApi")
      .then((response) => response.json())
      .then((json) => setUsuarios(json))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className={styles.main}>
      <h1>Bienvenido X</h1>
      <h2>Lista de Usuarios:</h2>
      {usuarios.length === 0 ? (
        <p>No hay usuarios disponibles</p>
      ) : (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>
              {usuario.name} - {usuario.email}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default Home;