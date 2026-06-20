import { Truck, CreditCard, Phone } from "./Icons";

export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="container top-bar-inner">
        <div className="top-bar-item">
          <Truck size={16} />
          <span>Free Shipping</span>
        </div>
        <div className="top-bar-item">
          <CreditCard size={16} />
          <span>Payment Methods</span>
        </div>
        <div className="top-bar-item">
          <Phone size={16} />
          <span>Call us 951-999-9999</span>
        </div>
      </div>
    </div>
  );
}
