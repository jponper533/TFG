import styles from "./trimestres.module.css";
import { useNavigate } from "react-router-dom";

function Trimestres() {

    const navigate = useNavigate();

    const handleClick = (trimestre) => {
        navigate(`/asignaturas?trimestre=${trimestre}`);
    };

    return (
        <main className={styles.main}>
            <h1>TRIMESTRES</h1>

            <div className={styles.contorno}>

                <div
                    className={styles.userCard}
                    onClick={() => handleClick(1)}
                >
                    <h2>1er Trimestre</h2>
                </div>

                <div
                    className={styles.userCard}
                    onClick={() => handleClick(2)}
                >
                    <h2>2do Trimestre</h2>
                </div>

                <div
                    className={styles.userCard}
                    onClick={() => handleClick(3)}
                >
                    <h2>3er Trimestre</h2>
                </div>

            </div>

            <button
                className={styles.volver}
                onClick={() => navigate("/home")}
            >
                Volver
            </button>
        </main>
    );
}

export default Trimestres;