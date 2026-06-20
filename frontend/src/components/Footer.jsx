import { Link } from "react-router-dom";
import { Facebook, Instagram, Pinterest, Twitter } from "./Icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <h4>CUSTOMER SERVICE</h4>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/sell">Sell With Us</Link></li>
            <li><Link to="/shipping">Shipping</Link></li>
          </ul>
        </div>
        <div className="footer-col footer-links-center">
          <h4>LINKS</h4>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/sell">Sell With Us</Link></li>
            <li><Link to="/shipping">Shipping</Link></li>
          </ul>
        </div>
        <div className="footer-col newsletter">
          <h4>NEWSLETTER</h4>
          <p>Sign Up for Our Newsletter</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Please Enter Your Email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CCC Merchandise</p>
        <div className="social-icons">
          <a href="#" aria-label="Facebook"><Facebook /></a>
          <a href="#" aria-label="Instagram"><Instagram /></a>
          <a href="#" aria-label="Pinterest"><Pinterest /></a>
          <a href="#" aria-label="Twitter"><Twitter /></a>
        </div>
      </div>
    </footer>
  );
}
