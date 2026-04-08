import "./styles/stylesGlobales.css";
import { Routes, Route } from "react-router-dom";
import BigLayout from "./pages/BigLayout.jsx";
import SobreNosotros from "./pages/sobre-nosotros.jsx";
import Contactos from "./pages/contactos.jsx";
import Login from "./pages/login.jsx";
import ProtectedRoute from "./components/rutaProtegida.jsx"; // nuevo

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Rutas protegidas */}
      <Route path="/" element={<ProtectedRoute><BigLayout /></ProtectedRoute>}>
        <Route path="sobre-nosotros" element={<SobreNosotros />} />
        <Route path="contactos" element={<Contactos />} />
      </Route>
    </Routes>
  );
}

export default App;