import Hero from "../components/Hero";
import { useEffect, useState } from "react";
import Section from "../components/Section";
import { fetchTrending } from "../services/tmdb.js";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");
  const DEFAULT_VISIBLE = 6;

  useEffect(() => {
    let active = true;
    async function load() {
      const data = await fetchTrending(timeWindow);
      if (active) setTrending(data);
    }
    load();
    return () => {
      active = false;
    };
  }, [timeWindow]);

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
    </>
  );
}
