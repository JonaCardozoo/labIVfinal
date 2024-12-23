import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Canchas from "./Canchas/Canchas";
import Navbar from "./NavBar";
import Reservas from "./Reservas/Reservas";
import { Toaster } from "./components/ui/toaster"
import './index.css'
import NotFound from "./NotFound";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/canchas" element={<Canchas />} />
        <Route path="/reservas" element={<Reservas />} />

      </Routes>

      <Toaster />

    </Router>

  );
}

export default App;
