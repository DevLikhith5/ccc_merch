import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "./Icons";

export default function Sidebar({ isOpen, onClose }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5002/api/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {});
  }, []);

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "open" : ""}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
          <X />
        </button>
        <h3 className="sidebar-title">SHOP BY CATEGORY</h3>
        <ul className="sidebar-list">
          {categories.map((cat) => (
            <li key={cat.name}>
              <Link to={`/shop?category=${cat.name}`} onClick={onClose}>
                {cat.name} <span className="cat-count">({cat.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
