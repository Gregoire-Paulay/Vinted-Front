import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // je récupère mon params id de ma barre de recherche qui me servira pour faire ma requête
  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        const foundOffer = response.data;
        setData(foundOffer);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Chargement en cours</p>
  ) : (
    <section className="offer">
      <div className="container">
        <img src={data.product_image.secure_url} alt={data.product_name} />

        <div className="details">
          <div>
            <h3>{data.product_price} €</h3>
            {data.product_details.map((detail, index) => {
              // console.log(detail);
              const keys = Object.keys(detail);
              const key = keys[0];

              return (
                <div key={index}>
                  {key} : {detail[key]}
                </div>
              );
            })}
          </div>

          <div>
            <h4>{data.product_name}</h4>
            <p>{data.product_description}</p>
            <div>
              {data.owner.account.avatar && (
                <img src={data.owner.account.avatar.secure_url} alt="" />
              )}

              <span>{data.owner.account.username}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
