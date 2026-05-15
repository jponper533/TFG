import { useState, useEffect, useRef } from "react";
import navStyles from "./navigation.module.css";
import { FiUser } from "react-icons/fi";
import { useNavigate, NavLink } from "react-router-dom";
import { USUARIOS_ME_ENDPOINT, RESET_DATA_ENDPOINT } from "../../../endpoints";

function Navigation() {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [users, setUser] = useState(null);

  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setDropdownOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const getUser = async () => {

      const token = localStorage.getItem("token");

      try {

        const res = await fetch(USUARIOS_ME_ENDPOINT, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await res.json();
        setUser(data);

      } catch (error) {
        console.error("Error obteniendo usuario:", error);
      }
    };

    getUser();
  }, []);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  return (
    <nav>
      <div className={navStyles.contenedorIconos}>

        {/* Usuario */}
        <div
          className={navStyles.userContainer}
          ref={dropdownRef}
        >

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

              <NavLink
                className={navStyles.enlacePerfil}
                to="/perfil-usuario"
                onClick={() => setDropdownOpen(false)}
              >
                <span>Ver perfil</span>
              </NavLink>

              {users?.role_id === 1 && (
                <>
                  <NavLink
                    className={navStyles.enlacePerfil}
                    to="/usuarios-admin"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span>Ver usuarios</span>
                  </NavLink>

                  <button
                    className={navStyles.dropdownButton}
                    onClick={async () => {
                      const confirmReset = window.confirm(
                        "¿Seguro que quieres borrar todos los datos?"
                      );

                      if (!confirmReset) return;

                      try {
                        const token = localStorage.getItem("token");

                        const res = await fetch(RESET_DATA_ENDPOINT, {
                          method: "DELETE",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                        });

                        const data = await res.json();

                        if (!res.ok) {
                          throw new Error(data.message);
                        }

                        alert("Datos eliminados correctamente");
                        setDropdownOpen(false);

                      } catch (error) {
                        console.error(error);
                        alert("Error al resetear los datos");
                      }
                    }}
                  >
                    Nuevo curso
                  </button>
                </>
              )}

            </div>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navigation;