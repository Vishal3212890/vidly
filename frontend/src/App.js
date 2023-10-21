import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movie from "./components/movie";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import "react-toastify/dist/ReactToastify.css";
import auth from "./services/authService";

class App extends React.Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <Router>
        <ToastContainer />
        <NavBar user={user} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/movies" />} />
            <Route path="/movies" element={<Movie user={user} />} />
            <Route
              path="/movies/:id"
              element={user ? <MovieForm /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
