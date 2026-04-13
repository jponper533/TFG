import clasesHeader from "./header.module.css";
import Navigation from "./navigation/navigation.jsx";
import logo from "/logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      className={`${clasesHeader.header} ${clasesHeader["background-header"]}`}
    >

      <div className={clasesHeader.logoContainer}>


        <Link to="/home" className={clasesHeader.enlace}>
          <img
            src={logo}
            alt="Logo"
            className={clasesHeader.logo}
          />
        </Link>
        <div className={clasesHeader.tituloContainer}>
          <Link to="/home" className={clasesHeader.enlace}>
            <p className={clasesHeader.title}>NOTE-BOOK</p>
          </Link>
        </div>
      </div>

      <Navigation />
    </header>
  );
}

export default Header;