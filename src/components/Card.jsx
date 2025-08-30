import "../styles/App.css";

export default function Card({ title, year, image, link, rating }) {
    const IMG_BASE = "https://image.tmdb.org/t/p/w500"; 

  return (
    <>
      <a href={link} target="_blank" className="text-decoration-none text-dark">
        <div className="card h-100 border-0 shadow-sm hover-card" style={{ maxWidth: "180px", fontSize: "0.85rem", cursor: "pointer" }}>
          <img src={`${IMG_BASE}${image}`} className="card-img-top p-1 rounded-3" alt="Movie Cover" style={{ height: "220px", objectFit: "cover" }} />
          <div className="card-body p-2">
            <h6 className="card-title mb-1" style={{ fontSize: "0.85rem" }}>
              {title}
            </h6>
            <div className="d-flex justify-content-between text-muted" style={{ fontSize: "0.8rem" }}>
              <span>{year || "-"}</span>
              <span>
                <i className="bi bi-star-fill" style={{ color: "black" }}></i> {rating ?? "-"}
              </span>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
