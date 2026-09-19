import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { packages } from '../data/data';
import './PackageDetail.css';

const itineraries = {
  1: [
    { day: 1, title: "Arrival & Welcome", desc: "Airport pickup, check-in to overwater bungalow, welcome dinner on the beach." },
    { day: 2, title: "Snorkeling Adventure", desc: "Morning snorkeling at coral reef, afternoon dolphin watching cruise." },
    { day: 3, title: "Island Hopping", desc: "Visit 3 local islands, explore local culture and fresh seafood lunch." },
    { day: 4, title: "Water Sports Day", desc: "Jet skiing, paddleboarding, and parasailing activities." },
    { day: 5, title: "Relaxation Day", desc: "Spa treatment, sunset cruise, and romantic beach dinner." },
    { day: 6, title: "Underwater Restaurant", desc: "Breakfast underwater, visit marine biology center." },
    { day: 7, title: "Departure", desc: "Checkout, souvenir shopping, airport transfer." },
  ],
  2: [
    { day: 1, title: "Arrival in Zurich", desc: "Land in Zurich, city tour, check-in to mountain lodge." },
    { day: 2, title: "Jungfraujoch Visit", desc: "Top of Europe experience, ice palace and snow activities." },
    { day: 3, title: "Interlaken Adventures", desc: "Paragliding, bungee jumping, and lake cruise." },
    { day: 4, title: "Lucerne Day Trip", desc: "Chapel Bridge, Lion Monument, and lake ferry." },
    { day: 5, title: "Zermatt & Matterhorn", desc: "Train to Zermatt, Matterhorn views, fondue dinner." },
    { day: 6, title: "Skiing Day", desc: "Full day on the slopes with ski instructor." },
    { day: 7, title: "Geneva City", desc: "Jet d'Eau fountain, watchmaking museum." },
    { day: 8, title: "Shopping & Culture", desc: "Swiss chocolate factory tour, souvenir shopping." },
    { day: 9, title: "Scenic Train", desc: "Famous Glacier Express, farewell dinner." },
    { day: 10, title: "Departure", desc: "Airport transfer, fly home." },
  ],
};

const reviews = [
  { id: 1, name: "Sarah M.", rating: 5, date: "Jan 2026", comment: "Absolutely magical! Every detail was perfect. Will definitely book again." },
  { id: 2, name: "Ahmed K.", rating: 4, date: "Feb 2026", comment: "Great experience overall. The guides were knowledgeable and friendly." },
  { id: 3, name: "Priya S.", rating: 5, date: "Mar 2026", comment: "Best vacation of my life! The accommodations exceeded expectations." },
];

const PackageDetail = () => {
  const { id } = useParams();
  const pkg = packages.find(p => p.id === parseInt(id));
  const [activeTab, setActiveTab] = useState('itinerary');
  const [selectedMonth, setSelectedMonth] = useState(8);
  const [selectedDay, setSelectedDay] = useState(null);
  const [mainImg, setMainImg] = useState(0);

  if (!pkg) return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h2>Package not found</h2>
      <Link to="/packages" className="btn-primary">← Back to Packages</Link>
    </div>
  );

  const images = [
    pkg.image,
    `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600`,
    `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600`,
    `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600`,
  ];

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const unavailableDays = [3, 7, 14, 21, 25];
  const daysInMonth = new Date(2026, selectedMonth, 0).getDate();

  const renderStars = (r) => '★'.repeat(r) + '☆'.repeat(5 - r);

  const itinerary = itineraries[pkg.id] || itineraries[1];

  return (
    <div className="detail-page">

      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <div className="container">
          <Link to="/">Home</Link> / <Link to="/packages">Packages</Link> / <span>{pkg.title}</span>
        </div>
      </div>

      <div className="container detail-layout">

        {/* LEFT COLUMN */}
        <div className="detail-left">

          {/* IMAGE GALLERY */}
          <div className="gallery">
            <div className="gallery-main">
              <img src={images[mainImg]} alt={pkg.title} />
              <span className="badge">{pkg.badge}</span>
            </div>
            <div className="gallery-thumbs">
              {images.map((img, i) => (
                <img key={i} src={img} alt="" className={mainImg === i ? 'active' : ''} onClick={() => setMainImg(i)} />
              ))}
            </div>
          </div>

          {/* TABS */}
          <div className="tabs">
            {['itinerary', 'inclusions', 'reviews'].map(tab => (
              <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                {tab === 'itinerary' ? '🗓 Itinerary' : tab === 'inclusions' ? '✅ Inclusions' : '⭐ Reviews'}
              </button>
            ))}
          </div>

          {/* ITINERARY */}
          {activeTab === 'itinerary' && (
            <div className="itinerary">
              {itinerary.map(item => (
                <div className="itinerary-item" key={item.day}>
                  <div className="day-badge">Day {item.day}</div>
                  <div className="day-content">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* INCLUSIONS */}
          {activeTab === 'inclusions' && (
            <div className="inclusions-tab">
              <div className="inc-col">
                <h4>✅ What's Included</h4>
                {pkg.inclusions.map((inc, i) => <p key={i}>✓ {inc}</p>)}
                <p>✓ 24/7 Customer Support</p>
                <p>✓ Travel Insurance</p>
                <p>✓ Airport Transfers</p>
              </div>
              <div className="inc-col">
                <h4>❌ What's Not Included</h4>
                <p>✗ Personal expenses</p>
                <p>✗ Optional activities</p>
                <p>✗ Tips & gratuities</p>
                <p>✗ Visa fees</p>
              </div>
            </div>
          )}

          {/* REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="reviews-tab">
              <div className="avg-rating">
                <span className="big-rating">{pkg.rating}</span>
                <div>
                  <div className="stars-big">{renderStars(Math.floor(pkg.rating))}</div>
                  <p>{pkg.reviews} reviews</p>
                </div>
              </div>
              {reviews.map(r => (
                <div className="review-card" key={r.id}>
                  <div className="r-header">
                    <div className="r-avatar">{r.name[0]}</div>
                    <div>
                      <strong>{r.name}</strong>
                      <p>{r.date}</p>
                    </div>
                    <span className="r-stars">{renderStars(r.rating)}</span>
                  </div>
                  <p>{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN — BOOKING CARD */}
        <div className="detail-right">
          <div className="booking-card">
            <div className="price-section">
              <span className="from-text">From</span>
              <h2>${pkg.price}<span>/person</span></h2>
              <div className="stars-row">{renderStars(Math.floor(pkg.rating))} <span>({pkg.reviews})</span></div>
            </div>

            <div className="pkg-info">
              <div className="info-item"><span>📍</span><strong>{pkg.destination}</strong></div>
              <div className="info-item"><span>⏱</span><strong>{pkg.duration}</strong></div>
              <div className="info-item"><span>🎯</span><strong style={{textTransform:'capitalize'}}>{pkg.type}</strong></div>
            </div>

            {/* AVAILABILITY CALENDAR */}
            <div className="calendar-section">
              <h4>📅 Availability Calendar</h4>
              <div className="month-selector">
                {months.map((m, i) => (
                  <button key={i} className={selectedMonth === i + 1 ? 'active' : ''} onClick={() => setSelectedMonth(i + 1)}>
                    {m}
                  </button>
                ))}
              </div>
              <div className="calendar-grid">
                {['S','M','T','W','T','F','S'].map((d, i) => (
                  <div key={i} className="cal-header">{d}</div>
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
                  <div
                    key={day}
                    className={`cal-day ${unavailableDays.includes(day) ? 'unavailable' : 'available'} ${selectedDay === day ? 'selected' : ''}`}
                    onClick={() => !unavailableDays.includes(day) && setSelectedDay(day)}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="cal-legend">
                <span className="dot green" /> Available
                <span className="dot red" /> Unavailable
              </div>
              {selectedDay && (
                <p className="selected-date">
                  ✅ Selected: {months[selectedMonth - 1]} {selectedDay}, 2026
                </p>
              )}
            </div>

            <Link to="/booking" className="btn-primary" style={{ display: 'block', textAlign: 'center', fontSize: '1.1rem', padding: '15px' }}>
              🚀 Book Now
            </Link>
            <p className="no-charge">No credit card required to enquire</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
