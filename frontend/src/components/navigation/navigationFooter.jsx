import navStyles from "./navigationFooter.module.css";
import { NavLink } from "react-router-dom";
import { SiGoogleclassroom } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";

function NavigationFooter() {
    return (
        <nav className={navStyles.navContainer}>

            {/* 1. icono de classroom */}
            <NavLink
                to="https://classroom.google.com/"
                className={navStyles.iconButton}
                target="_blank"
                rel="classroom"
            >
                <SiGoogleclassroom size={20} />
            </NavLink>

            {/* 2. Logo Email */}
            <NavLink
                to="https://mail.google.com/"
                className={navStyles.iconButton}
                target="_blank"
                rel="MdEmail"
            >
                <MdEmail size={20} />
            </NavLink>

                        {/* 2. Logo Email */}
            <NavLink
                to="/contactos"
                className={navStyles.iconButton}
                rel="MdEmail"
            >
                <BsFillTelephoneFill size={20} />
            </NavLink>


            {/* 4. Sobre nosotros */}
            <NavLink
                to="/sobre-nosotros"
                className={navStyles.iconButton}
            >
                <h6>SOBRE NOSOTROS</h6>
            </NavLink>

        </nav>
    )
}

export default NavigationFooter;