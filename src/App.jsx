import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Club from "./pages/Club.jsx";
import Activitats from "./pages/Activitats.jsx";
import Noticies from "./pages/Noticies.jsx";
import Galeria from "./pages/Galeria.jsx";
import Contacte from "./pages/Contacte.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/club" element={<Club />} />
        <Route path="/activitats" element={<Activitats />} />
        <Route path="/noticies" element={<Noticies />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/contacte" element={<Contacte />} />
      </Route>
    </Routes>
  );
}
