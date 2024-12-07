import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar                           from "./components/Navbar";
import Home                             from "./pages/Home";
import About                            from "./pages/About";
import Contact                          from "./pages/Contact";
import ClassicCars                      from "./pages/ClassicCars";
import LuxuryCars                       from "./pages/LuxuryCars";
import ElectricalCars                   from "./pages/ElectricalCars";
import SignUpModal                      from "./components/SignupModal.jsx"
import AuthProvider from "react-auth-kit";

function App() {
  return (

    <AuthProvider
    authType={'localstorage'} // or 'sessionstorage' / 'cookie'
    authName={'_auth'}
    cookieDomain={window.location.hostname}
    cookieSecure={false}>

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
    </AuthProvider> 
  );
}

export default App;
