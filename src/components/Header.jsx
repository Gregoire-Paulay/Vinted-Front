import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = (props) => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Logo Vinted" />
        </Link>

        <input type="text" placeholder="Rechercher des articles" />
        <div className="connect">
          <button>S'inscrire</button>
          <button>Se connecter</button>
        </div>
        <button>Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
