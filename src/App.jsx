import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Import de mes Pages
import Home from "./page/Home";
import Offer from "./page/Offer";
import SignUp from "./page/SignUp";
import Login from "./page/Login";

// Import de mes Components
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [token, setToken] = useState(Cookies.get("token") || null);

  const [search, setSearch] = useState("");

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  return (
    <Router>
      <Header
        token={token}
        handleToken={handleToken}
        search={search}
        setSearch={setSearch}
      />

      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<SignUp handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
