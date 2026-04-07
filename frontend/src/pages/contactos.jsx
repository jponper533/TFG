import styles from "./contactos.module.css";

function Contactos() {
    return (
        <main className={styles.main}>
            <div className={styles.titlebox}>
                <h1>SOPORTE</h1>
            </div>

            <div className={styles.contentbox}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
                    Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
                    Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
                    conubia nostra, per inceptos himenaeos.
                </p>

                <div className={styles.contact}>
                    <p><strong>Numero contacto:</strong> XXX-XXX-XXX</p>
                    <p><strong>Correo de contacto:</strong> javier@gmail.com</p>
                </div>
            </div>
        </main>
    )
}

export default Contactos