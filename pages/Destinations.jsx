import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { destinations, packages } from '../data/data';
import './Destinations.css';

const Destinations = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [selected, setSelected] = useState(params.get('place') || null);

  const filteredPkgs = selected
    ? packages.filter(p => p.destination === selected)
    : [];

  const renderStars = (r) => '★'.repeat(Math.floor(r)) + '☆'.repeat(5 - Math.floor(r));

  return (
    <div className="destinations-page">

      {/* HERO */}
      <div className="dest-hero">
        <div className="container">
          <h1>🗺️ Explore Destinations</h1>
          <p>Choose your dream destination and find the perfect tour package</p>
        </div>
      </div>

      {/* DESTINATIONS GRID */}
      <section className="container">
        <h2 className="section-title" style={{ marginTop: '50px' }}>Popular Destinations</h2>
        <p className="section-subtitle">Click on a destination to see available packages</p>

        <div className="dest-grid">
          {destinations.map(dest => (
            <div
              key={dest.id}
              className={`dest-card-full ${selected === dest.name ? 'active' : ''}`}
              onClick={() => setSelected(selected === dest.name ? null : dest.name)}
            >
              <div className="dest-img-wrap">
                <img src={dest.image} alt={dest.name} />
                <div className="dest-overlay-full">
                  <h3>{dest.name}</h3>
                  <p>{dest.packages} Packages</p>
                  <span className="explore-btn">
                    {selected === dest.name ? '✓ Selected' : 'Explore →'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FILTERED PACKAGES */}
      {selected && (
        <section className="container filtered-section">
          <h2 className="section-title">
            📦 Packages in {selected}
            <span className="count-badge">{filteredPkgs.length} tours</span>
          </h2>

          {filteredPkgs.length === 0 ? (
            <div className="no-pkg">
              <p>😕 No packages available for {selected} right now.</p>
              <Link to="/packages" className="btn-primary">Browse All Packages</Link>
            </div>
          ) : (
            <div className="pkg-grid-dest">
              {filteredPkgs.map(pkg => (
                <div className="pkg-card-dest" key={pkg.id}>
                  <div className="pkg-img-dest">
                    <img src={pkg.image} alt={pkg.title} />
                    <span className="badge">{pkg.badge}</span>
                    <span className="duration-tag">⏱ {pkg.duration}</span>
                  </div>
                  <div className="pkg-body-dest">
                    <span className="type-tag">{pkg.type}</span>
                    <h3>{pkg.title}</h3>
                    <p>{pkg.description}</p>
                    <div className="card-inclusions">
                      {pkg.inclusions.map((inc, i) => (
                        <span key={i} className="inclusion">✓ {inc}</span>
                      ))}
                    </div>
                    <div className="pkg-footer-dest">
                      <div className="price">
                        <span className="from">From</span>
                        <strong>${pkg.price}</strong>
                        <span className="per">/ person</span>
                      </div>
                      <div>
                        <div className="stars">{renderStars(pkg.rating)}</div>
                        <span className="review-count">({pkg.reviews} reviews)</span>
                      </div>
                    </div>
                    <Link to={`/packages/${pkg.id}`} className="btn-primary"
                      style={{ display: 'block', textAlign: 'center', marginTop: '15px' }}>
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* WHY TRAVEL WITH US */}
      <section className="why-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Why Travel With Us?</h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>We make every journey unforgettable</p>
          <div className="why-grid">
            {[
              { icon: '🏆', title: 'Award Winning', desc: 'Recognized as top travel agency 5 years in a row' },
              { icon: '💰', title: 'Best Price Guarantee', desc: 'We match any lower price you find online' },
              { icon: '🛡️', title: 'Safe & Secure', desc: 'Your safety is our top priority on every tour' },
              { icon: '📞', title: '24/7 Support', desc: 'Round the clock assistance wherever you are' },
            ].map((item, i) => (
              <div className="why-card" key={i}>
                <div className="why-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
