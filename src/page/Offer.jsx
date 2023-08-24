import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Offer = () => {
  // je récupère mon params id de ma barre de recherche
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <h1>Mon offre</h1>
      <p>{id}</p>
    </div>
  );
};

export default Offer;
