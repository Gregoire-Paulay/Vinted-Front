import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import de mes Pages
import Home from "./page/Home";
import Offer from "./page/Offer";

// Import de mes Components
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
