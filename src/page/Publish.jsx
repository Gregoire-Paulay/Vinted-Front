import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Publish = () => {
  // State pour gérer mes différents inputs
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");

  // state contenant l'url fourni par cloudinary
  const [cloudinaryPicture, setCloudinaryPicture] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // création nouvelle instance du constructeur FormData
      const formData = new FormData();
      // Ajout des paires clef/valeur à mon formData
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCloudinaryPicture(response.data.product_image.secure_url);
      //   console.log(response.data);
      //   console.log(response.data.product_image.secure_url);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChange = (event, set) => {
    set(event.target.value);
  };

  return (
    <div>
      <form className="publish" onSubmit={handleSubmit}>
        <h2>Vends ton article</h2>
        <div>
          <input
            type="file"
            onChange={(event) => {
              // console.log(event);
              setPicture(event.target.files[0]);
            }}
          />
        </div>

        <div>
          <div>
            <p>Titre</p>
            <input
              type="text"
              name="title"
              placeholder="ex: Pyjama enfant"
              value={title}
              onChange={(event) => {
                handleChange(event, setTitle);
              }}
            />
          </div>
          <div>
            <p>Décris ton article</p>
            <input
              type="text"
              name="description"
              placeholder="ex: Jamais porté, taille grand"
              value={description}
              onChange={(event) => {
                handleChange(event, setDescription);
              }}
            />
          </div>
        </div>

        <div>
          <div>
            <p>Marque</p>
            <input
              type="text"
              name="brand"
              placeholder="ex: Levis"
              value={brand}
              onChange={(event) => {
                handleChange(event, setBrand);
              }}
            />
          </div>
          <div>
            <p>Taille</p>
            <input
              type="text"
              name="size"
              placeholder="ex: 38"
              value={size}
              onChange={(event) => {
                handleChange(event, setSize);
              }}
            />
          </div>
          <div>
            <p>Couleur</p>
            <input
              type="text"
              name="color"
              placeholder="ex: Taupe"
              value={color}
              onChange={(event) => {
                handleChange(event, setColor);
              }}
            />
          </div>
          <div>
            <p>Etat</p>
            <input
              type="text"
              name="condition"
              placeholder="ex: Neuf avec étiquette"
              value={condition}
              onChange={(event) => {
                handleChange(event, setCondition);
              }}
            />
          </div>
          <div>
            <p>Lieu</p>
            <input
              type="text"
              name="city"
              placeholder="ex: Saint-Remy-en-Bouzemont-Saint-Genest-et-Isson"
              value={city}
              onChange={(event) => {
                handleChange(event, setCity);
              }}
            />
          </div>
        </div>

        <div>
          <div>
            <p>Prix</p>
            <input
              type="text"
              name="price"
              placeholder="0,00 €"
              value={price}
              onChange={(event) => {
                handleChange(event, setPrice);
              }}
            />
          </div>

          <input type="checkbox" />
        </div>

        <button type="submit">Ajouter</button>
      </form>
      {cloudinaryPicture && <img src={cloudinaryPicture} alt="" />}
    </div>
  );
};

export default Publish;
