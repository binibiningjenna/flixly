import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MoviesList from "./pages/MoviesList";
import MovieDetails from "./pages/MovieDetails";
import TvList from "./pages/TvList";
import TvDetails from "./pages/TvDetails";
import SeasonDetails from "./pages/SeasonDetails";
import ScrollToTopButton from "./components/ScrollToTopButton";

export default function App() {
  return (
    <>
      <Router basename="/flixly">
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
      <ScrollToTopButton />
    </>
  );
}
