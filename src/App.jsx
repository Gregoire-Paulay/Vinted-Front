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

  // state de mes filtres
  const [search, setSearch] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState("");

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
        priceMin={priceMin}
        setPriceMin={setPriceMin}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        sort={sort}
        setSort={setSort}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              search={search}
              priceMin={priceMin}
              priceMax={priceMax}
              sort={sort}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<SignUp handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
