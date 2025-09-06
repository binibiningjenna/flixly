import { useEffect } from "react";
import { createSession } from "./services/tmdb";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MoviesList from "./pages/MoviesList";
import MovieDetails from "./pages/MovieDetails";
import TvList from "./pages/TvList";
import TvDetails from "./pages/TvDetails";
import SeasonDetails from "./pages/SeasonDetails";

export default function App() {
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("request_token");

    if (token) {
      const fetchSession = async () => {
        const data = await createSession(token);

        if (data && data.session_id) {
          localStorage.setItem("tmdb_session_id", data.session_id);
          window.location.href = "/";
        }
      };

      fetchSession();
    }
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MoviesList />} />
          <Route path="/tv" element={<TvList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tv/:id" element={<TvDetails />} />
          <Route path="/tv/:id/season/:season_number" element={<SeasonDetails />} />
        </Routes>
      </Router>
    </>
  );
}
