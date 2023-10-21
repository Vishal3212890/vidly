import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import { saveMovie, getMovie, updateMovie } from "../services/movieService";

const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Movie Form</h1>
      <FormMovie navigate={navigate} movieId={id} />
    </div>
  );
};

class FormMovie extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string().allow(""),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate"),
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    this.setState({ genres });

    const { movieId } = this.props;
    if (movieId === "new") return;

    const { navigate } = this.props;

    try {
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        navigate("/not-found");
    }
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("title", "Title")}
        {this.renderSelect("genreId", "Genre", this.state.genres)}
        {this.renderInput("numberInStock", "Number in Stock")}
        {this.renderInput("dailyRentalRate", "Daily Rental Rate")}
        {this.renderButton("Save")}
      </form>
    );
  }

  doSubmit = async () => {
    const movie = this.state.data;
    const { _id: id } = movie;
    if (id) {
      await updateMovie(id, movie);
    } else {
      await saveMovie(movie);
    }

    const { navigate } = this.props;
    navigate("/movies");
  };
}

export default MovieForm;
