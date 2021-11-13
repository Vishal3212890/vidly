import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <h1>Movie Form {id}</h1>
      <button onClick={() => handleSave(navigate)} className="btn btn-primary">
        Save
      </button>
    </div>
  );
};

const handleSave = (navigate) => {
  navigate("/movies");
};

export default MovieForm;
