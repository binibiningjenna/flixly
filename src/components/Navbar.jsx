import { useEffect, useState } from "react";
// import { getLoginUrl, getRequestToken } from "../services/tmdb";
import "../styles/App.css";
// import Button from "./Button";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/?search=${encodeURIComponent(search)}`);
  };

  // const handleLogin = async () => {
  //   const data = await getRequestToken();

  //   if (data.request_token) {
  //     const loginUrl = await getLoginUrl(data.request_token);
  //     window.location.href = loginUrl;
  //   }
  // };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled", "text-dark");
      } else {
        navbar.classList.remove("navbar-scrolled", "text-dark");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Movies", path: "/movies" },
    { label: "TV Shows", path: "/tv" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent fixed-top pt-4">
      <div className="container-fluid">
        <div id="leftNav" className="flex-grow-1">
          <ul className="navbar-nav flex-row justify-content-center justify-content-lg-start mx-auto mx-lg-0 gap-3">
            {navItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <NavLink to={item.path} className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="d-flex justify-content-center justify-content-lg-end flex-grow-1">
          <form className="d-flex" role="search" onSubmit={handleSubmit} style={{ maxWidth: "400px", width: "100%" }}>
            <div className="input-group w-100">
              <input className="form-control" type="search" placeholder="Search movies or tv..." value={search} aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
              <button className="btn btn-primary" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}
