import { useParams } from "react-router-dom";
import { fetchTvSeason } from "../services/tmdb";
import { useEffect, useState } from "react";
import { formatRunTime } from "../utils/formatRunTime";

export default function SeasonDetails() {
  const { id, season_number } = useParams();
  const [tvSeason, setTvSeason] = useState(null);

  useEffect(() => {
    async function loadTvDSeason() {
      const data = await fetchTvSeason(id, season_number);
      setTvSeason(data);
    }
    loadTvDSeason();
  }, [id]);

  if (!tvSeason) {
    return <div></div>;
  }

  return (
    <div>
      {/* Seasons and Episodes Info */}
      <div className="container my-5">
        <div className="row">
          <div className="col my-4">
            <div className="mt-5">
              <div className="d-flex justify-content-between">
                <div className="subheading d-flex align-items-center ps-3">{tvSeason.name}</div>
              </div>
              <hr className="my-1" />
              {tvSeason.episodes?.map((episode) => (
                <div key={episode.id} className="card my-5 bg-dark text-light shadow-sm rounded-4">
                  <div className="row g-3 align-items-center">
                    <div className="row g-3 align-items-center my-3">
                      <div className="col-12 col-md-4 text-center">
                        <img
                          src={episode.still_path ? `https://image.tmdb.org/t/p/w300${episode.still_path}` : "/no-image.jpg"}
                          className="img-fluid rounded-3 my-4"
                          alt={episode.name}
                          style={{ maxWidth: "300px" }}
                        />
                      </div>
                      <div className="col-12 col-md-8">
                        <div className="card-body">
                          <h5 className="card-title fw-bold text-white">{episode.name}</h5>
                          <p className="card-text text-light">{episode.overview}</p>
                          <p className="card-text mb-1">
                            <small className="text-secondary">{episode.air_date}</small>
                          </p>
                          <p className="card-text mb-1">
                            <small className="text-secondary">Runtime: {formatRunTime(episode.runtime)}</small>
                          </p>
                          <p className="card-text">
                            <small>
                              <i className="bi bi-star-fill" style={{ color: "white" }}></i> {episode.vote_average ? episode.vote_average.toFixed(1) : "N/A"}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
