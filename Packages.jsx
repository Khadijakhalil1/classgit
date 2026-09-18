import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { packages } from '../data/data';
import './Packages.css';

const Packages = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [filters, setFilters] = useState({
    destination: 'all',
    type: 'all',
    budget: 'all',
    duration: 'all',
    search: params.get('search') || '',
    sort: 'rating'
  });

  const [filtered, setFiltered] = useState(packages);

  useEffect(() => {
    let result = [...packages];

    if (filters.search)
      result = result.filter(p =>
        p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.destination.toLowerCase().includes(filters.search.toLowerCase())
      );

    if (filters.destination !== 'all')
      result = result.filter(p => p.destination === filters.destination);

    if (filters.type !== 'all')
      result = result.filter(p => p.type === filters.type);

    if (filters.budget !== 'all') {
      const [min, max] = filters.budget.split('-').map(Number);
      result = result.filter(p => max ? p.price >= min && p.price <= max : p.price >= min);
    }

    if (filters.duration !== 'all') {
      const days = parseInt(filters.duration);
      result = result.filter(p => parseInt(p.duration) <= days);
    }

    if (filters.sort === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (filters.sort === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (filters.sort === 'rating') result.sort((a, b) => b.rating - a.rating);

    setFiltered(result);
  }, [filters]);

  const handleFilter = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

  const renderStars = (rating) => '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));

  return (
    <div className="packages-page">
      <div className="packages-hero">
        <div className="container">
          <h1>Explore Tour Packages</h1>
          <p>Find your perfect adventure from {packages.length}+ curated tours</p>
        </div>
      </div>

      <div className="container packages-layout">

        {/* ===== FILTERS SIDEBAR ===== */}
        <aside className="filters-sidebar">
          <h3>🔍 Filter Tours</h3>

          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search destinations..."
              value={filters.search}
              onChange={e => handleFilter('search', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Destination</label>
            <select onChange={e => handleFilter('destination', e.target.value)} value={filters.destination}>
              <option value="all">All Destinations</option>
              <option value="Maldives">Maldives</option>
              <option value="Europe">Europe</option>
              <option value="Asia">Asia</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Tour Type</label>
            <select onChange={e => handleFilter('type', e.target.value)} value={filters.type}>
              <option value="all">All Types</option>
              <option value="beach">🏖 Beach</option>
              <option value="adventure">🏔 Adventure</option>
              <option value="cultural">🏛 Cultural</option>
              <option value="family">👨‍👩‍👧 Family</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Budget (USD)</label>
            <select onChange={e => handleFilter('budget', e.target.value)} value={filters.budget}>
              <option value="all">Any Budget</option>
              <option value="0-1000">Under $1,000</option>
              <option value="1000-2000">$1,000 - $2,000</option>
              <option value="2000-3000">$2,000 - $3,000</option>
              <option value="3000">$3,000+</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select onChange={e => handleFilter('sort', e.target.value)} value={filters.sort}>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <button className="btn-primary" style={{width:'100%'}}
            onClick={() => setFilters({ destination:'all', type:'all', budget:'all', duration:'all', search:'', sort:'rating' })}>
            Reset Filters
          </button>
        </aside>

        {/* ===== PACKAGES GRID ===== */}
        <main className="packages-main">
          <div className="results-header">
            <p><strong>{filtered.length}</strong> tours found</p>
          </div>

          {filtered.length === 0 ? (
            <div className="no-results">
              <h3>😕 No packages found</h3>
              <p>Try adjusting your filters</p>
            </div>
          ) : (
            <div className="packages-grid-full">
              {filtered.map(pkg => (
                <div className="package-card-h" key={pkg.id}>
                  <div className="card-img-h">
                    <img src={pkg.image} alt={pkg.title} />
                    <span className="badge">{pkg.badge}</span>
                  </div>
                  <div className="card-body-h">
                    <div className="card-meta">
                      <span className="destination">📍 {pkg.destination}</span>
                      <span className="type-tag">{pkg.type}</span>
                    </div>
                    <h3>{pkg.title}</h3>
                    <p>{pkg.description}</p>
                    <div className="card-inclusions">
                      {pkg.inclusions.map((inc, i) => (
                        <span key={i} className="inclusion">✓ {inc}</span>
                      ))}
                    </div>
                    <div className="card-footer-h">
                      <div className="price">
                        <span className="from">From</span>
                        <strong>${pkg.price}</strong>
                        <span className="per">/ person</span>
                      </div>
                      <div className="rating-row">
                        <span className="stars">{renderStars(pkg.rating)}</span>
                        <span className="review-count">({pkg.reviews} reviews)</span>
                      </div>
                      <div className="duration-info">⏱ {pkg.duration}</div>
                      <Link to={`/packages/${pkg.id}`} className="btn-primary">View Details →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Packages;
