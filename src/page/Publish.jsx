import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Publish = ({ token }) => {
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

  const navigate = useNavigate();

  // state contenant l'url fourni par cloudinary
  // const [cloudinaryPicture, setCloudinaryPicture] = useState("");

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
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // setCloudinaryPicture(response.data.product_image.secure_url);
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChange = (event, set) => {
    set(event.target.value);
  };

  return token ? (
    <section className="publish-page">
      <div className="container">
        <form className="publish" onSubmit={handleSubmit}>
          <h2>Vends ton article</h2>
          <div>
            <div className="picture">
              <label htmlFor="filePick">Choisissez une image</label>
              <input
                style={{ display: "none" }}
                id="filePick"
                type="file"
                onChange={(event) => {
                  // console.log(event);
                  setPicture(event.target.files[0]);
                }}
              />
              {picture && (
                <img src={URL.createObjectURL(picture)} alt={title} />
              )}
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="title">Titre</label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="ex: Pyjama enfant"
                value={title}
                onChange={(event) => {
                  handleChange(event, setTitle);
                }}
              />
            </div>
            <div className="offer-description">
              <label htmlFor="description">Décris ton article</label>
              <textarea
                id="description"
                type="text"
                name="description"
                cols="64"
                rows="10"
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
              <label htmlFor="brand">Marque</label>
              <input
                id="brand"
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
              <label htmlFor="size">Taille</label>
              <input
                id="size"
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
              <label htmlFor="color">Couleur</label>
              <input
                id="color"
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
              <label htmlFor="consition">Etat</label>
              <input
                id="condition"
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
              <label htmlFor="city">Lieu</label>
              <input
                id="city"
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
              <label htmlFor="price">Prix</label>
              <input
                id="price"
                type="number"
                name="price"
                placeholder="0,00 €"
                value={price}
                onChange={(event) => {
                  handleChange(event, setPrice);
                }}
              />
            </div>
            <div className="exchange">
              <input type="checkbox" />
              <span>Je suis intéressé par les échanges</span>
            </div>
          </div>

          <div>
            <button type="submit">Ajouter</button>
          </div>
        </form>
        {/* {cloudinaryPicture && <img src={cloudinaryPicture} alt="" />} */}
      </div>
    </section>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
