import "../styles/App.css";
import Button from "../components/Button.jsx";
import { useTrailer } from "../hooks/useTrailer.js";

export default function Hero({ image, title, genre, duration, description, rating, id, mediaType }) {
  const { trailerKey, showModal, setShowModal, loadTrailer } = useTrailer();

  return (
    <>
      <div className="container-fluid p-0 position-relative">
        <img src={image} alt="Cover" className="w-100 vh-100 object-fit-cover" />

        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "linear-gradient(to bottom, #10101000 5%, #101010 100%)" }}></div>

        <div className="position-absolute top-50 start-0 translate-middle-y text-white px-5 col-12 col-md-6">
          <span className="mb-2">
            <i className="bi bi-star-fill" style={{ color: "white" }}></i> {rating}
          </span>
          <h1 className="heading fw-bold">{title}</h1>
          <p className="mb-2">
            <span className="me-3">{genre}</span>
            <span>{duration}</span>
          </p>
          <p className="d-lg-block d-none">{description}</p>
          <div className="mt-3">
            <Button className="btn-primary me-2" onClick={() => loadTrailer(id, mediaType)}>
              ▶ Watch Trailer
            </Button>
          </div>
        </div>
      </div>

      {showModal && trailerKey && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content bg-black">
              <div className="modal-header border-0">
                <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-0">
                <div className="ratio ratio-16x9">
                  <iframe src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`} title="Trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
