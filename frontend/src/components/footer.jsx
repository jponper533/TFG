import clasesFooter from "./footer.module.css";
import NavigationFooter from "./navigation/navigationFooter";
import logo from "/logo.png";


function Footer() {
    return (
        <footer className={`${clasesFooter.footer} ${clasesFooter["color-fondo"]}`}>
            <div className={clasesFooter.logoContainer}>
                <img src={logo} alt="Logo" className={clasesFooter.logo} />
            </div>
            <NavigationFooter />
        </footer>
    )
}

export default Footer