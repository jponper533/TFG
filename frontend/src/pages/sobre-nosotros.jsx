import styles from './sobre-nosotros.module.css'
import logo from "/logo.png";

function SobreNosotros() {
    return (
        <main className={styles.main}>
            <div className={styles.titulo}>
                <h4>  SOBRE NOSOTROS  </h4>
            </div>
            <div className={styles.sobreNosotrosArribaContainer}>

                <div className={styles.imagenContainer}>
                    <img src={logo} alt="logo" className={styles.imagen} />
                </div>
                <div className={styles.textoContainerArriba}>
                    <span>Bienvenido al portal oficial de gestión académica de Note-book, una plataforma 
                        diseñada para facilitar el seguimiento, consulta y administración de las calificaciones de los estudiantes.

                        Desde este espacio, alumnos, profesores y personal autorizado pueden acceder de forma 
                        rápida y segura a toda la información relacionada con los exámenes y evaluaciones del 
                        curso académico.
                        <span></span>
                        <h2>¿Qué puedes hacer en esta plataforma?</h2>
                        Consultar notas de exámenes y evaluaciones.
                        Ver el historial académico del alumno.
                        Descargar boletines y reportes de calificaciones.
                        Revisar fechas de exámenes y recuperaciones.
                        Gestionar incidencias o solicitudes de revisión.
                        Acceder desde cualquier dispositivo, en cualquier momento.
                        Acceso seguro y personalizado


                        Cada usuario dispone de un acceso privado mediante usuario y contraseña, 
                        garantizando la confidencialidad y protección de los datos académicos.
                    </span>
                </div>
                <div className={styles.textoContainerAbajo}>
                    <span>

                        <h3>Para estudiantes</h3>

                        Consulta tus resultados en tiempo real, revisa tus progresos y mantente informado sobre próximas 
                        evaluaciones y publicaciones de notas.

                        <h3>Para profesores</h3>

                        Gestiona calificaciones, publica resultados, organiza evaluaciones y realiza el 
                        seguimiento académico de manera eficiente.

                        <h3>Soporte y asistencia</h3>

                        Si tienes problemas para acceder a la plataforma o necesitas ayuda, puedes contactar con el equipo 
                        de soporte académico de Note-Book a través del correo electrónico o del departamento de administración.</span>
                </div>
            </div>
        </main>
    )
}

export default SobreNosotros