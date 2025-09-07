import { useParams } from "react-router-dom";
import { fetchMovieById, fetchSimilarMovie } from "../services/tmdb";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { formatRunTime } from "../utils/formatRunTime";
import Section from "../components/Section";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovie] = useState([]);

  useEffect(() => {
    async function loadMovie() {
      const data = await fetchMovieById(id);
      setMovie(data);
    }
    loadMovie();
  }, [id]);

  useEffect(() => {
    async function loadMovieSimilar() {
      const data = await fetchSimilarMovie(id);
      setSimilarMovie(data);
    }
    loadMovieSimilar();
  }, [id]);

  if (!movie) {
    return <div></div>; 
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }, [id]);
  });

  const genreNames = movie.genres?.map((g) => g.name.toUpperCase()).join(" | ");

  return (
    <>
      <Hero
        image={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : "/no-image.jpg"}
        title={movie.title}
        genre={genreNames}
        description={movie.overview}
        duration={formatRunTime(movie.runtime)}
        rating={movie.vote_average?.toFixed(1)}
        id={movie.id}
        mediaType="movie"
      />
      {similarMovies.length > 0 && (
        <div className="container my-5">
          <div className="row">
            <div className="col my-4">
              <Section title="You may also like" items={similarMovies.slice(0, 10)} mediaType="movie" layout="scroll" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
