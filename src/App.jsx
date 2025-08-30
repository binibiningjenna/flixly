import { useEffect } from "react";
import { createSession} from "./services/tmdb";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

export default function App() {
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("request_token");

    if (token) {
      const fetchSession = async () => {
        const data = await createSession(token);

        if (data && data.session_id) {
          localStorage.setItem("tmdb_session_id", data.session_id);
          window.location.href = "/";
        }
      };

      fetchSession();
    }
  }, []);

  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}
