import { useState } from "react";
import navStyles from "./navigation.module.css";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { LiaLanguageSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setDropdownOpen(false);            
    navigate("/");                     
  };

  return (
    <nav>
      <div className={navStyles.contenedorIconos}>
        {/* Botón de modo oscuro */}
        <button className={navStyles.iconButton}>
          <HiOutlineLightBulb size={26} color={"#FFD700"} />
        </button>

        {/* Botón de idioma */}
        <button className={navStyles.iconButton}>
          <LiaLanguageSolid size={26} />
        </button>

        {/* Icono de usuario */}
        <div className={navStyles.userContainer}>
          <button
            className={navStyles.iconButton}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FiUser size={26} />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className={navStyles.dropdown}>
              <button
                className={navStyles.dropdownButton}
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;