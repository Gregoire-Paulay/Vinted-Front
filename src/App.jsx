import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Import de mes Pages
import Home from "./page/Home";
import Offer from "./page/Offer";
import SignUp from "./page/SignUp";
import Login from "./page/Login";
import Publish from "./page/Publish";
import Payment from "./page/Payment";

// Import de mes Components
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [id, setId] = useState(Cookies.get("id") || null);

  // state de mes filtres
  const [search, setSearch] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState("");

  const handleTokenAndId = (token, id) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      setToken(token);
      Cookies.set("id", id, { expires: 15 });
      setId(id);
    } else {
      Cookies.remove("token");
      setToken(null);
      Cookies.remove("id");
      setId(null);
    }
  };

  return (
    <Router>
      <Header
        token={token}
        id={id}
        handleTokenAndId={handleTokenAndId}
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
        <Route path="/offer/:id" element={<Offer token={token} />} />
        <Route
          path="/signup"
          element={<SignUp handleTokenAndId={handleTokenAndId} />}
        />
        <Route
          path="/login"
          element={<Login handleTokenAndId={handleTokenAndId} />}
        />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/payment" element={<Payment token={token} />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
