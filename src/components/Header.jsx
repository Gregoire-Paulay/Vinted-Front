import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = ({
  token,
  handleToken,
  search,
  setSearch,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  sort,
  setSort,
}) => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Logo Vinted" />
        </Link>

        <div className="search">
          <div>
            <span>
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              type="text"
              placeholder="Rechercher des articles"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
          <div className="sortPrice">
            <div>
              <p>Triez par prix :</p>
              <input
                type="checkbox"
                onClick={() => {
                  if (sort === "price-desc") {
                    setSort("price-asc");
                  } else {
                    setSort("price-desc");
                  }
                }}
              />
            </div>
            <div>
              <p>Prix entre :</p>
              <input
                type="text"
                placeholder="Prix Minimum"
                value={priceMin}
                onChange={(event) => {
                  setPriceMin(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Prix Maximum"
                value={priceMax}
                onChange={(event) => {
                  setPriceMax(event.target.value);
                }}
              />
            </div>
          </div>
        </div>

        {token ? (
          <button
            className="disconnect"
            onClick={() => {
              handleToken(null);
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <div className="sign-connect">
            <button
              onClick={() => {
                navigate("/signup");
              }}
            >
              S'inscrire
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Se connecter
            </button>
          </div>
        )}

        <button>Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
