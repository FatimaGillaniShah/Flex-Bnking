import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Cards";
import BankingSolutions from "./BankingSolution";

const Home = () => {
  const navigate = useNavigate();

  const handleOpenAccountClick = () => {
    navigate('/login'); // Redirect to the login page
  };

  // Memoizing the promo text content since it doesn't change
  const promoContent = useMemo(() => (
    <div className="promo-content">
      <div className="promo-image">
        <img src="/banking.png" alt="Main Image" loading="lazy" />
      </div>
      <div className="promo-text">
        <h2>Enjoy an impressive 3.35% p.a^ interest on all your business accounts!</h2>
        <ul>
          <li>Watch your savings grow with 3.35% p.a^ interest, even while you sleep.</li>
          <li>Earn interest on your entire balance across up to 10 fully-functional business accounts*—ideal for implementing the Profit First strategy.</li>
          <li>No monthly fees, no minimum deposits, and no restrictive terms.</li>
        </ul>
        <button className="open-account" onClick={handleOpenAccountClick}>Open Your Account</button>
        <div className="reviews">
          <span>⭐ ⭐ ⭐ ⭐ ⭐</span> <span>4.9 average Google Reviews</span>
        </div>
      </div>
    </div>
  ), []); // Empty dependency array ensures it only computes once

  return (
    <div className="container">
      <div className="main">
        {promoContent}
      </div>

      <Card />

      <div className="business-promo">
        <div className="promo-text">
          <h2>Empowering Your Financial Future</h2>
          <br />
          <p>
            We believe in the potential of small businesses.
            Our bank is committed to providing tailored solutions that support your growth every step of the way.
            At our bank, we understand the unique challenges of running a business. 
            That's why we offer customized banking services designed to meet your specific needs.
            We offer more than just financial services; we offer a partnership. Our banking solutions 
            are designed to help you succeed and achieve your business goals.
          </p>
        </div>
        <div className="promo-image">
          <img src="/front.jpg" alt="Business Promo Image" loading="lazy" />
        </div>
      </div>

      <BankingSolutions />
    </div>
  );
};

export default Home;
