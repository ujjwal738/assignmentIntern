import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-column">
            <h4>Company Name</h4>
            <p>In this section</p>
          </div>
          <div className="footer-column">
            <h4>Services</h4>
            <a href="/">About</a>
            <a href="/">Return Policy</a>
            <a href="/">Customer Service</a>
          </div>
          <div className="footer-column">
            <h4>Useful Links</h4>
            <a href="/">Sitemap</a>
            <a href="/">Shipping Rates</a>
            <a href="/">Affiliate Program</a>
          </div>
          <div className="footer-column">
            <h4>Address</h4>
            <p>1st Row</p>
            <p>2nd Row</p>
            <p>Pincode</p>
            <p>India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
