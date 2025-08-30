import "../styles/App.css";

export default function Button({ children, className, onClick }) {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
