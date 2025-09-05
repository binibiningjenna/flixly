import Card from "../components/Card";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { fetchAllMovies, fetchMovieGenre } from "../services/tmdb";

export default function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadGenre() {
      const data = await fetchMovieGenre();
      setGenre(data);
      if (data.length > 0) {
        setSelectedGenre(data[0].id);
      }
    }
    loadGenre();
  }, []);

  useEffect(() => {
    if (!selectedGenre) return;
    async function loadAllMovies() {
      const { results, totalPages } = await fetchAllMovies(page, selectedGenre);
      setMovies(results);
      setTotalPages(totalPages);
    }
    loadAllMovies();
  }, [page, selectedGenre]);

  const getPageNumbers = () => {
    const maxPageToShow = 3;
    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, start + maxPageToShow - 1);

    if (end - start < maxPageToShow - 1) {
      start = Math.max(1, end - maxPageToShow - 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="subheading text-center">Movies</div>

      {/* Genre Buttons */}
      <div className="d-flex justify-content-center gap-2 my-3 flex-wrap">
        {genres.map((g) => (
          <Button
            key={g.id}
            className={selectedGenre === g.id ? 'active' : 'btn-primary'}
            onClick={() => {
              setSelectedGenre(g.id);
              setPage(1);
            }}
          >
            {g.name}
          </Button>
        ))}
      </div>
      <div className="row g-3 g-lg-5 py-5">
        {movies.map((movie) => (
          <div className="col-6 col-sm-4 col-md-2" key={movie.id}>
            <Card title={movie.title} year={movie.release_date?.split("-")[0]} image={movie.poster_path} rating={movie.vote_average.toFixed(1)} link={`/movie/${movie.id}`} />
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <nav aria-label="Page navigation" className="my-5">
        <ul className="pagination justify-content-center">
          {/* Previous Button */}
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage((p) => p - 1)}>
              Previous
            </button>
          </li>

          {/* Page Numbers */}
          {getPageNumbers().map((num) => (
            <li key={num} className={`page-item ${num === page ? "active" : ""}`}>
              <button className="page-link" onClick={() => setPage(num)}>
                {num}
              </button>
            </li>
          ))}

          {/* Next Button */}
          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage((p) => p + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
