import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MakeClass } from "./pages/MakeClass";
import { Room } from "./pages/Room";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/make" element={<MakeClass />} />
        <Route path="/class/:id/:name" element={<Room />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
