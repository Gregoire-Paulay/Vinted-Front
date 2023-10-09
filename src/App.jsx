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

  // state de mes filtres
  const [search, setSearch] = useState("");
  const [fetchRangeValues, setFetchRangeValues] = useState([0, 10000]);
  const [sort, setSort] = useState("");

  const handleToken = (token, id) => {
    if (token) {
      Cookies.set("id", id, { expires: 15 });
      Cookies.set("token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("id");
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
        sort={sort}
        setSort={setSort}
        setFetchRangeValues={setFetchRangeValues}
        fetchRangeValues={fetchRangeValues}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              search={search}
              fetchRangeValues={fetchRangeValues}
              // priceMin={priceMin}
              // priceMax={priceMax}
              sort={sort}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer token={token} />} />
        <Route path="/signup" element={<SignUp handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/payment" element={<Payment token={token} />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
