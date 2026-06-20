import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "./Icons";

const slides = [
  {
    id: 1,
    label: "SPECIAL OFFER",
    title: "50% OFF",
    subtitle: "ONLY TODAY",
    bg: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
  },
  {
    id: 2,
    label: "MEGA SALE",
    title: "BUY 1 GET 1",
    subtitle: "LIMITED TIME",
    bg: "linear-gradient(135deg, #8e44ad 0%, #6c3483 100%)",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="side-banners">
          <div className="side-banner banner-shop">
            <span className="banner-tag">NEW ARRIVALS</span>
            <h3>Shop Now</h3>
          </div>
          <div className="side-banner banner-sale">
            <span className="banner-tag">SUPER SALE!</span>
            <h3>Big Discounts</h3>
          </div>
        </div>

        <div className="hero-carousel" style={{ background: slides[current].bg }}>
          <button className="carousel-arrow left" onClick={prev} aria-label="Previous slide">
            <ArrowLeft />
          </button>
          <div className="carousel-content">
            <p className="carousel-label">{slides[current].label}</p>
            <h2 className="carousel-title">{slides[current].title}</h2>
            <p className="carousel-subtitle">{slides[current].subtitle}</p>
          </div>
          <button className="carousel-arrow right" onClick={next} aria-label="Next slide">
            <ArrowRight />
          </button>
          <div className="carousel-dots">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={idx === current ? "active" : ""}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="side-banners right">
          <div className="side-banner banner-shop">
            <span className="banner-tag">NEW ARRIVALS</span>
            <h3>Shop Now</h3>
          </div>
          <div className="side-banner banner-mega">
            <span className="banner-tag">MEGA SALE!</span>
            <h3>Save More</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
