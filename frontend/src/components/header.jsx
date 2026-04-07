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
        
        
       <Link to="/" className={clasesHeader.enlace}>
          <img
            src={logo}
            alt="Logo"
            className={clasesHeader.logo}
          />
        </Link>
       
       <Link to="/" className={clasesHeader.enlace}>
        <h1 className={clasesHeader.title}>NOTE-BOOK</h1>
        </Link>
      </div>

      <Navigation />
    </header>
  );
}

export default Header;