import { useParams } from "react-router-dom";
import { fetchTvById } from "../services/tmdb";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";

export default function TvDetails() {
  const { id } = useParams();
  const [tv, setTv] = useState(null);

  useEffect(() => {
    async function loadTvDetails() {
      const data = await fetchTvById(id);
      setTv(data);
    }
    loadTvDetails();
  }, [id]);

  if (!tv) {
    return <div></div>;
  }

  const genreNames = tv.genres?.map((g) => g.name.toUpperCase()).join(" | ");

  return (
    <div>
      {/* Hero Section */}
      <Hero image={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`} title={tv.name} genre={genreNames} description={tv.overview} rating={tv.vote_average?.toFixed(1)} id={tv.id} mediaType="tv" />

      {/* Seasons and Episodes Info */}
      <div className="container my-5">
        <div className="row">
          <div className="col my-4">
            <div className="mt-5">
              <div className="d-flex justify-content-between">
                <div className="subheading d-flex align-items-center ps-3">Seasons</div>
              </div>
              <hr className="my-1" />
              {tv.seasons?.map((season) => (
                <Link to={`/tv/${tv.id}/season/${season.season_number}`} key={season.id} className="text-decoration-none">
                  <div className="card my-5 bg-dark text-light shadow-sm rounded-4">
                    <div className="row g-3 align-items-center">
                      <div className="row g-3 align-items-center my-3">
                        <div className="col-12 col-md-2 text-center">
                          <img
                            src={season.poster_path ? `https://image.tmdb.org/t/p/w300${season.poster_path}` : "https://via.placeholder.com/300x450?text=No+Image"}
                            className="img-fluid rounded-3 my-3"
                            alt={season.name}
                            style={{ maxWidth: "150px" }}
                          />
                        </div>
                        <div className="col-12 col-md-10">
                          <div className="card-body">
                            <h5 className="card-title fw-bold text-white">{season.name}</h5>
                            <p className="card-text text-light">{season.overview}</p>
                            <p className="card-text mb-1">
                              <small className="text-secondary">{season.air_date}</small>
                            </p>
                            <p className="card-text mb-1">
                              <small className="text-secondary">Episodes: {season.episode_count}</small>
                            </p>
                            <p className="card-text">
                              <small>
                                <i className="bi bi-star-fill" style={{ color: "white" }}></i> {season.vote_average ? season.vote_average.toFixed(1) : "N/A"}
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
