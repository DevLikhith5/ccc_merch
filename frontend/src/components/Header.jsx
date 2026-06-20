import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag, ChevronDown } from "./Icons";
import { useCart } from "../hooks/useCart";
import { getMe } from "../services/api";

const brands = ["Under Construction"];

export default function Header({ onMenuOpen }) {
  const navigate = useNavigate();
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const { totalItems } = useCart();

  function fetchUser() {
    const token = localStorage.getItem("token");
    if (token) {
      getMe(token)
        .then((data) => setUser(data))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }

  useEffect(() => {
    fetchUser();
    window.addEventListener("auth-change", fetchUser);
    return () => window.removeEventListener("auth-change", fetchUser);
  }, []);

  function handleSearch() {
    if (search.trim()) {
      navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
    } else {
      navigate("/shop");
    }
  }

  return (
    <header className="main-header">
      <div className="container header-inner">
        <div className="header-left">
          <button className="icon-btn menu-btn" onClick={onMenuOpen} aria-label="Open menu">
            <Menu />
          </button>
          <Link to="/" className="logo">
            CCC Merchandise
          </Link>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search Products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="search-btn" aria-label="Search" onClick={handleSearch}>
            <Search />
          </button>
        </div>

        <nav className="header-nav">
          <div className="dropdown">
            <button className="nav-link" onClick={() => setBrandsOpen(!brandsOpen)}>
              Brands <ChevronDown />
            </button>
            {brandsOpen && (
              <ul className="dropdown-menu">
                {brands.map((b) => (
                  <li key={b}>
                    <span className="dropdown-disabled">{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link to="/shop" className="nav-link">
            Shop
          </Link>

          <div className="dropdown">
            <button className="nav-link" onClick={() => setWelcomeOpen(!welcomeOpen)}>
              {user ? `Hi, ${user.name}` : "Welcome!"} <ChevronDown />
            </button>
            {welcomeOpen && (
              <ul className="dropdown-menu">
                {user ? (
                  <li>
                    <button
                      className="dropdown-link logout-btn"
                      onClick={() => {
                        localStorage.removeItem("token");
                        setUser(null);
                        setWelcomeOpen(false);
                        navigate("/");
                      }}
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link to="/login" onClick={() => setWelcomeOpen(false)}>
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/signup" onClick={() => setWelcomeOpen(false)}>
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>

          <Link to="/cart" className="icon-btn cart-btn" aria-label="Cart">
            <ShoppingBag />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}
