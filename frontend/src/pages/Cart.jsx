import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQty, totalItems, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container page cart-page empty">
        <h1 className="page-title">Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/shop" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container page cart-page">
      <h1 className="page-title">Your Cart ({totalItems})</h1>
      <div className="cart-list">
        {cart.map((item) => (
          <div className="cart-item" key={item._id}>
            <img src={item.image} alt={item.title} />
            <div className="cart-item-info">
              <h3>{item.title}</h3>
              <p className="product-price">₹{item.price}</p>
            </div>
            <div className="cart-qty">
              <button onClick={() => updateQty(item._id, item.qty - 1)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
            </div>
            <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
        <button className="btn-primary checkout-btn">Checkout</button>
      </div>
    </div>
  );
}
