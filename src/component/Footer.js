import React from 'react';
import './Footer.css';


const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-3">
      <div className="container">
        {/* Row with three columns */}
        <div className="row text-start text-md-left align-items-start">

          {/* About Us */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">About Us</h5>
            <p className="mb-2">
              Footwear Store offers stylish, comfortable, and affordable footwear for everyone.
              We prioritize quality and customer satisfaction.
            </p>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Contact</h5>
            <p className="mb-1"><strong>Email:</strong> support@footwearstore.com</p>
            <p className="mb-0"><strong>Phone:</strong> +91 9698488888</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li><a href="/privacy" className="text-white text-decoration-none">Privacy Policy</a></li>
              <li><a href="/terms" className="text-white text-decoration-none">Terms & Conditions</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact Us</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom line */}
        <hr className="border-secondary my-3" />

        <div className="text-center">
          <p className="mb-0">&copy; 2025 Footwear Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
