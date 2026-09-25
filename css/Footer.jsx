import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container footer-grid">
      <div className="footer-brand">
        <h3>🌍 Wanderlust Trails</h3>
        <p>Your trusted partner for extraordinary travel experiences around the globe.</p>
        <div className="social-links">
          <span>📘</span><span>📸</span><span>🐦</span><span>▶️</span>
        </div>
      </div>
      <div className="footer-links">
        <h4>Quick Links</h4>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/packages">Packages</Link></li>
          <li><Link to="/destinations">Destinations</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
      <div className="footer-links">
        <h4>Tour Types</h4>
        <ul>
          <li><Link to="/packages?type=beach">Beach Tours</Link></li>
          <li><Link to="/packages?type=adventure">Adventure</Link></li>
          <li><Link to="/packages?type=cultural">Cultural</Link></li>
          <li><Link to="/packages?type=family">Family Tours</Link></li>
        </ul>
      </div>
      <div className="footer-contact">
        <h4>Contact Us</h4>
        <p>📍 123 Travel Lane, Faisalabad</p>
        <p>📞 +92 300 1234567</p>
        <p>✉️ hello@wanderlusttrails.com</p>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2026 Wanderlust Trails. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
