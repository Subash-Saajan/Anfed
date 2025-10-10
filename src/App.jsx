import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Events from "./Pages/Events";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import AdminLogin from "./Pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import EventForm from "./components/EventForm";
import AdminBubble from "./components/AdminBubble";
import About from "./Pages/About";
import Footer from "./components/Footer";
import Farmers from "./Pages/Farmers";
import Event from "./Pages/Event"; // import the new Event page
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/farmers" element={<Farmers />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-xl font-bold mb-4">
                    Admin — Create event
                  </h1>
                  <EventForm />
                </div>
              </ProtectedRoute>
            }
          />
          {/* New route for individual event page */}
          <Route path="/event/:id" element={<Event />} />
        </Routes>
      </main>
      <Footer />
      <AdminBubble />
    </BrowserRouter>
  );
}
