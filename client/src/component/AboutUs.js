import React, { useMemo } from 'react';

const AboutUs = () => {
  // Memoize the about us content
  const aboutUsContent = useMemo(() => (
    <div className="about-us-content">
      <div className="about-us-section">
        <img src="/vision.jpg" alt="Our Vision" className="about-us-image" loading="lazy" />
        <div className="about-us-text">
          <h2>Our Vision</h2>
          <p>
            We aim to revolutionize the banking industry by providing secure, efficient, and innovative financial
            solutions. Our vision is to empower businesses and individuals to achieve their financial goals with ease
            and confidence.
          </p>
        </div>
      </div>

      <div className="about-us-section">
        <div className="about-us-text">
          <h2>Our Mission</h2>
          <p>
            Our mission is to offer a seamless banking experience by integrating cutting-edge technology with
            exceptional customer service. We strive to create a platform that is not only user-friendly but also
            ensures the highest level of security for our clients.
          </p>
        </div>
        <img src="/mission.jpg" alt="Our Mission" className="about-us-image" loading="lazy" />
      </div>

      <div className="about-us-section">
        <img src="/values.jpg" alt="Our Values" className="about-us-image" loading="lazy" />
        <div className="about-us-text">
          <h2>Our Values</h2>
          <p>
            Integrity, innovation, and inclusivity are at the core of everything we do. We are committed to building
            trust with our clients by being transparent and reliable. Our focus on continuous improvement ensures that
            we are always at the forefront of the banking industry.
          </p>
        </div>
      </div>
    </div>
  ), []); // Empty dependency array means this will only run once

  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>About Us</h1>
        <p>Your Trusted Partner in Financial Success</p>
      </div>

      {aboutUsContent}

    </div>
  );
};

export default AboutUs;
