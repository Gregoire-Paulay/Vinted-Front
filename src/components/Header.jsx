import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = ({ token, handleToken }) => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Logo Vinted" />
        </Link>

        <div className="search">
          <span>
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input type="text" placeholder="Rechercher des articles" />
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
