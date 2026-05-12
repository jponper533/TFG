import styles from "./contactos.module.css";

function Contactos() {
    return (
        <main className={styles.main}>
            <div className={styles.titlebox}>
                <h1>SOPORTE</h1>
            </div>

            <div className={styles.contentbox}>
                <p>
                    En Note-Book estamos disponibles para ayudarte con cualquier duda,
                    incidencia o consulta relacionada con la plataforma de gestión de notas
                    y servicios académicos. Si dispone de cualquier problema no dude en contactarnos
                    y el servicio tecnico lo ayudara lo antes posible. Gracias por 
                    confiar en Note-Book
                </p>

                <div className={styles.contact}>
                    <p><strong>Numero contacto:</strong> 620 68 10 16</p>
                    <p><strong>Correo de contacto:</strong> javierponceperez05@gmail.com</p>
                    <p><strong>Horario:</strong> Lunes a Viernes
                        09:00 - 18:00</p>
                </div>

                <div className={styles.problemas}>
                <h4>¿En qué podemos ayudarte?</h4>
                    <ul>
                        <li>
                            Problemas de acceso a la plataforma.
                        </li>
                        <li>
                            Recuperación de contraseña.
                        </li>
                        <li>
                            Consultas sobre calificaciones y exámenes.
                        </li>
                        <li>
                            Soporte técnico.
                        </li>
                        <li>
                            Información académica general.
                        </li>

                    </ul>

                    <p className={styles.final}>Nuestro equipo intentará responder todas las consultas lo antes posible para ofrecer una atención rápida y eficaz.</p>

                </div>
            </div>
        </main>
    )
}

export default Contactos