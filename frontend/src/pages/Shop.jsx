import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:5002/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => {});
    fetch("http://localhost:5002/api/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {});
  }, []);

  const filtered = products
    .filter((p) => (category === "all" ? true : p.category === category))
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container shop-page">
      <h1 className="page-title">Shop</h1>
      <div className="shop-filters">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            const params = {};
            if (e.target.value) params.search = e.target.value;
            const cat = searchParams.get("category");
            if (cat) params.category = cat;
            setSearchParams(params);
          }}
        />
        <select value={category} onChange={(e) => setSearchParams(e.target.value === "all" ? {} : { category: e.target.value })}>
          <option value="all">All ({products.length})</option>
          {categories.map((c) => (
            <option key={c.name} value={c.name}>{c.name} ({c.count})</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">Products Unavailable</div>
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <div className="product-card" key={product._id}>
              <img src={product.image} alt={product.title} />
              <div className="product-body">
                <h3>{product.title}</h3>
                <p className="product-price">₹{product.price}</p>
                {product.tags && (
                  <div className="product-tags">
                    {product.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                )}
                <button className="btn-primary add-cart-btn" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
