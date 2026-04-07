import navStyles from "./navigation.module.css";
import { NavLink } from "react-router-dom";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { LiaLanguageSolid } from "react-icons/lia";




function Navigation() {
 
  return (
    <nav>
      {/* 2. Iconos */}
      <div className={navStyles.contenedorIconos}>
        {/* Botón de modo oscuro */}
        <button className={navStyles.iconButton}>
          <HiOutlineLightBulb
            size={26}
            color={"#FFD700"}
          />
        </button>


        {/* 3. Icono del icono idioma */}
        <button
          className={navStyles.iconButton}
        >
          <LiaLanguageSolid size={26} />
        </button>

        {/* 4. Icono de usuario */}
        <NavLink to="/login" className={navStyles.iconButton}>
          <FiUser size={26} />
        </NavLink>

      </div>
    </nav >
  );
}

export default Navigation;