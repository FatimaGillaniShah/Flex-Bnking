import React from 'react';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Flex Bank. All rights reserved.</p>
        <nav className="footer-nav">
          <a href="/" className="footer-link">Home</a>
          <a href="/aboutUs" className="footer-link">About Us</a>
          <a href="/login" className="footer-link">Login</a>
          <a href="/signup" className="footer-link">Register</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
