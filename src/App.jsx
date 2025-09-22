import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Events from "./Pages/Events";
import Home from "./Pages/Home";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
