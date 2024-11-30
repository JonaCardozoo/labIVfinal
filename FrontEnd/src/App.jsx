import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Canchas from "./Canchas";
import Navbar from "./NavBar";
import Reservas from "./Reservas";
import AgregarReserva from "./AgregarReserva";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/canchas" element={<Canchas />} />
        <Route path="/reservas" element={<Reservas />} />

      </Routes>
    </Router>

  );
}

export default App;
