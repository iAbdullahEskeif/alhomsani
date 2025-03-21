import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ClassicCars from "./pages/ClassicCars";
import LuxuryCars from "./pages/LuxuryCars";
import ElectricalCars from "./pages/ElectricalCars";
import SignUpModal from "./components/SignupModal.jsx"

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUpModal />} />
                <Route path="/classiccars" element={<ClassicCars />} />
                <Route path="/electricalcars" element={<ElectricalCars />} />
                <Route path="/luxurycars" element={<LuxuryCars />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
