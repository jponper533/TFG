import "./styles/stylesGlobales.css";
import { Routes, Route, Navigate } from "react-router-dom"
import BigLayout from "./pages/BigLayout.jsx";
import SobreNosotros from "./pages/sobre-nosotros.jsx";
import Contactos from "./pages/contactos.jsx";
import Home from "./pages/Home.jsx";




function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<BigLayout />} >

          {/* RUTAS NORMALES */}
          <Route index element={<Home />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/contactos" element={<Contactos />} />
        </Route>

      </Routes>
    </>
  )
}

export default App