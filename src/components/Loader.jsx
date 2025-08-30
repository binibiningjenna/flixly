import { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";

export default function Loader() {
  const [loaderColor, setLoaderColor] = useState("");

  useEffect(() => {
    const color = getComputedStyle(document.documentElement).getPropertyValue("--lightColor").trim();
    setLoaderColor(color || "#ffffff");
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50" style={{ pointerEvents: "auto" }}>
      <RingLoader size={40} color={loaderColor} />
    </div>
  );
}
