import { useState, useEffect } from "react";
import axios from "axios";
import hero from "../assets/hero.jpeg";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers/"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement ... </span>
  ) : (
    <main>
      <section className="hero">
        <img src={hero} alt="bandeau vinted" />
        <div>
          <h1>Prêts à faire du tri dans vos placards?</h1>
          <button>Commencer à vendre</button>
        </div>
      </section>
      <section className="container">
        <div className="allOffer">
          {data.offers.map((offer) => {
            return (
              <div key={offer._id} onClick={() => {}}>
                <p>{offer.owner.account.username}</p>
                {/* {offer.owner.account.avatar.secure_url ? (
                <img
                  src={offer.owner.account.avatar.secure_url}
                  alt="Avatar user"
                />
              ) : (
                ""
              )} */}

                <img src={offer.product_image.secure_url} alt="Image Offre" />
                <p>{offer.product_price} €</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Home;
