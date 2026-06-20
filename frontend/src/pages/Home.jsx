import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Welcome to CCC Merchandise</h2>
          <p className="section-subtitle">Browse our latest collections and exclusive deals.</p>
        </div>
      </section>
    </div>
  );
}
