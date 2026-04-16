import "./styles/stylesGlobales.css";
import { Routes, Route } from "react-router-dom";
import BigLayout from "./pages/BigLayout.jsx";
import SobreNosotros from "./pages/sobre-nosotros.jsx";
import Contactos from "./pages/contactos.jsx";
import Login from "./pages/login.jsx";
import ProtectedRoute from "./components/rutaProtegida.jsx";
import ForgotPassword from "./pages/forgotpassword.jsx";
import ResetPassword from "./pages/resetpassword.jsx";
import Home from "./pages/home.jsx";
import PerfilUsuario from "./pages/perfilUsuario.jsx";
import UsuariosAdmin from "./pages/usuariosAdmin.jsx";
import UsuariosEdit from "./pages/usuariosEdit.jsx";


function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Rutas protegidas */}
      <Route path="/" element={<ProtectedRoute><BigLayout /></ProtectedRoute>}>
        <Route path="home" index element={<Home />} />
        <Route path="sobre-nosotros" element={<SobreNosotros />} />
        <Route path="contactos" element={<Contactos />} />
        <Route path="perfil-usuario" element={<PerfilUsuario />} />
        <Route path="usuarios-admin" element={<UsuariosAdmin />} />
        <Route path="usuarios-edit/:id" element={<UsuariosEdit />} />
      </Route>
    </Routes>
  );
}

export default App;