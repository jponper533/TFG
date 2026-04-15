import { useState, useEffect } from "react";
import navStyles from "./navigation.module.css";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { LiaLanguageSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Navigation() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [users, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setDropdownOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8000/api/me", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();
      setUser(data);
    };

    getUser();
  }, []);

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


              <NavLink className={navStyles.enlacePerfil}
                to="/perfil-usuario"
              >
                <span>Ver perfil</span>
              </NavLink>

              {users?.role_id === 1 && (
                < NavLink className={navStyles.enlacePerfil}
                  to="/usuarios-admin"
                >
                  <span>Ver usuarios</span>
                </NavLink>
              )}
            </div>
          )}
        </div>
      </div>
    </nav >
  );
}

export default Navigation;