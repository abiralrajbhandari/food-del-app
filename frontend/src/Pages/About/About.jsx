import React, { useEffect } from "react";
import "./About.css";

const About = () => {
  // Scroll to the top when this component is rendered
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div  className="about">
      <div className="about-banner">
        <h1>Welcome to RoadHouse</h1>
        <p>Delivering Happiness, One Meal at a Time</p>
      </div>

      <div className="about-content">
        <section className="about-story">
          <h2>Our Story</h2>
          <p>
            Established in 2003, RoadHouse began with a simple mission: to
            bring delicious, high-quality meals to your doorstep. What started
            as a small family venture has now grown into a trusted name in food
            delivery, serving countless happy customers across the city.
          </p>
        </section>

        <section className="about-mission">
          <h2>Our Mission</h2>
          <p>
            At RoadHouse, we believe in making every meal a memorable
            experience. From sourcing fresh ingredients to ensuring timely
            delivery, we strive for excellence in every step of the process.
          </p>
        </section>

        <section className="about-values">
          <h2>Our Core Values</h2>
          <ul>
            <li>Freshness: Only the best ingredients for our dishes.</li>
            <li>Customer First: Your satisfaction is our priority.</li>
            <li>Innovation: Constantly improving our recipes and services.</li>
            <li>Community: Supporting local farmers and businesses.</li>
          </ul>
        </section>

        <section className="about-vision">
          <h2>Our Vision</h2>
          <p>
            To become the leading name in food delivery, known for our
            exceptional taste, outstanding service, and unwavering commitment
            to quality.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
