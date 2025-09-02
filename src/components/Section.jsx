import { useState } from "react";
import Card from "./Card";

export default function Section({ title, items = [], filterOptions = null, defaultVisible = 6 }) {

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-between">
        <div className="subheading d-flex align-items-center ps-3">{title}</div>

        <div className="d-flex align-items-center gap-3">
          {filterOptions && (
            <select className="form-select form-select-sm" style={{ width: "auto" }} value={filterOptions.value} onChange={filterOptions.onChange}>
              {filterOptions.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <hr className="my-1" />

      <div className="row g-3 g-lg-5 py-5 overflow-x-auto flex-nowrap" style={{ flexWrap: "nowrap" }}>
        {items.slice(0, 10).map((item) => (
          <div key={item.id} className="col-6 col-sm-4 col-md-3 col-lg-2" style={{ minWidth: "150px" }}>
            <Card title={item.title || item.name} image={item.poster_path} year={(item.release_date || item.first_air_date || "").split("-")[0]} rating={(item.vote_average ?? 0).toFixed(1)} link={`/movie/${item.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
