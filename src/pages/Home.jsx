import Hero from "../components/Hero";
import { useEffect, useState } from "react";
import Section from "../components/Section";
import {fetchTrending, fetchMovieGenre, fetchMoviesByGenre, fetchTvGenre, fetchTvByGenre } from "../services/tmdb.js";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");
  const [movieGenre, setMovieGenre] = useState([]);
  const [movie, setMovie] = useState([]);
  const [selectedMovieGenre, setSelectedMovieGenre] = useState("");
  const [tvGenre, setTvGenre] = useState([]);
  const [tv, setTv] = useState([]);
  const [selectedTvGenre, setSelectedTvGenre] = useState("");

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

      if(data.length > 0) {
        setSelectedTvGenre(data[0].id);
      }
    }
    loadTvGenre();
  }, [])

  useEffect(() => {
    async function loadTvByGenre() {
      const data = await fetchTvByGenre(selectedTvGenre);
      setTv(data);
    }
    loadTvByGenre();
  }, [selectedTvGenre])

  return (
    <>
      <Hero />
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
              title="TV"
              items={tv.slice(0, 10)}
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
