import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

import PriceRange from "./PriceRange";

const Header = ({
  token,
  handleToken,
  search,
  setSearch,
  setFetchRangeValues,
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
              <div className="checkbox">
                <input
                  type="checkbox"
                  name="price"
                  onChange={() => {}}
                  checked={sort}
                />
                <div
                  className="wrapper"
                  onClick={() => {
                    setSort(!sort);
                  }}
                >
                  <div className="knob">
                    <p>{sort ? "⇣" : "⇡"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p>Prix entre : </p>
              <PriceRange setFetchRangeValues={setFetchRangeValues} />
            </div>
            {/* <span className="priceRange">Prix entre : </span> */}
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

        <button
          onClick={() => {
            navigate("/publish");
          }}
        >
          Vends tes articles
        </button>
      </div>
    </header>
  );
};

export default Header;
