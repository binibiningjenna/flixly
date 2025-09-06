import Hero from "../components/Hero";
import { useEffect, useState, useRef } from "react";
import Section from "../components/Section";
import { fetchTrending, fetchMovieGenre, fetchMoviesByGenre, fetchTvGenre, fetchTvByGenre, searchMulti } from "../services/tmdb.js";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [searchResults, setSearchResults] = useState([]);
  const searchResultsRef = useRef(null);
  const [trending, setTrending] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");
  const [movieGenre, setMovieGenre] = useState([]);
  const [movie, setMovie] = useState([]);
  const [selectedMovieGenre, setSelectedMovieGenre] = useState("");
  const [tvGenre, setTvGenre] = useState([]);
  const [tv, setTv] = useState([]);
  const [selectedTvGenre, setSelectedTvGenre] = useState("");

  useEffect(() => {
    async function loadSearch() {
      if (searchQuery) {
        const data = await searchMulti(searchQuery);
        setSearchResults(data);

        if (data.length > 0 && searchResultsRef.current) {
          searchResultsRef.current.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        setSearchResults([]);
      }
    }
    loadSearch();
  }, [searchQuery]);

  useEffect(() => {
    let active = true;
    async function loadTrending() {
      const data = await fetchTrending(timeWindow);
      if (active) setTrending(data);
    }
    loadTrending();
    return () => {
      active = false;
    };
  }, [timeWindow]);

  const topTrending = trending[0];
  const genreNames = topTrending?.genre_ids
    .map((id) => movieGenre.find((g) => g.id === id)?.name?.toUpperCase() || tvGenre.find((g) => g.id === id)?.name?.toUpperCase())
    .filter(Boolean)
    .join(" | ");

  useEffect(() => {
    async function loadMovieGenre() {
      const data = await fetchMovieGenre();
      setMovieGenre(data);

      if (data.length > 0) {
        setSelectedMovieGenre(data[0].id);
      }
    }
    loadMovieGenre();
  }, []);

  useEffect(() => {
    async function loadMovie() {
      if (selectedMovieGenre) {
        const data = await fetchMoviesByGenre(selectedMovieGenre);
        setMovie(data);
      }
    }
    loadMovie();
  }, [selectedMovieGenre]);

  useEffect(() => {
    async function loadTvGenre() {
      const data = await fetchTvGenre();
      setTvGenre(data);

      if (data.length > 0) {
        setSelectedTvGenre(data[0].id);
      }
    }
    loadTvGenre();
  }, []);

  useEffect(() => {
    async function loadTvByGenre() {
      const data = await fetchTvByGenre(selectedTvGenre);
      setTv(data);
    }
    loadTvByGenre();
  }, [selectedTvGenre]);

  return (
    <>
      <div>
        {topTrending && (
          <Hero
            image={`https://image.tmdb.org/t/p/original${topTrending.backdrop_path}`}
            title={topTrending.title || topTrending.name}
            genre={genreNames}
            description={topTrending.overview}
            rating={topTrending.vote_average.toFixed(1)}
            id={topTrending.id} 
            mediaType={topTrending.media_type}
          />
        )}
      </div>
      <div className="container my-5" ref={searchResultsRef}>
        {searchResults.length > 0 ? (
          <div className="row">
            <div className="col my-4">
              <Section title={`Search results for "${searchQuery}"`} items={searchResults.slice(0, 10)} layout="scroll" />
            </div>
          </div>
        ) : (
          searchQuery && (
            <p className="text-center mt-5 fs-5">
              No results found for "
              <strong>
                <em>{searchQuery}</em>
              </strong>
              "
            </p>
          )
        )}
      </div>
      <div className="container my-5">
        <div className="row">
          <div className="col my-4">
            <Section
              title="Trending"
              items={trending.slice(0, 10)}
              layout="scroll"
              filterOptions={{
                options: [
                  { label: "Today", value: "day" },
                  { label: "This Week", value: "week" },
                ],
                value: timeWindow,
                onChange: (e) => setTimeWindow(e.target.value),
              }}
            />
          </div>
        </div>
      </div>
      <div className="container my-5">
        <div className="row">
          <div className="col my-4">
            <Section
              title="Movies"
              items={movie.slice(0, 10)}
              mediaType="movie"
              layout="scroll"
              filterOptions={{
                options: movieGenre.map((movie) => ({ label: movie.name, value: movie.id })),
                value: selectedMovieGenre,
                onChange: (e) => setSelectedMovieGenre(Number(e.target.value)),
              }}
            />
          </div>
        </div>
      </div>
      <div className="container my-5">
        <div className="row">
          <div className="col my-4">
            <Section
              title="TV Shows"
              items={tv.slice(0, 10)}
              mediaType="tv"
              layout="scroll"
              filterOptions={{
                options: tvGenre.map((tv) => ({ label: tv.name, value: tv.id })),
                value: selectedTvGenre,
                onChange: (e) => setSelectedTvGenre(Number(e.target.value)),
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
