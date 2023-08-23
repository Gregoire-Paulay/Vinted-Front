import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./page/Home";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

const App = () => {
  return (
    <Router>
      <Header title="My project" />
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
