import React from "react";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

function About() {
  return (
    <>
      <Header />

      <div className="about-page">
        <h1>About Us</h1>
        <p className="page-subtitle">
          Learn more about MiniStore and what drives us
        </p>

        <section>
          <h2>Our Story</h2>
          <p>
            MiniStore started with a simple idea: make quality
            products accessible to everyone. What began as a
            small online shop has grown into a trusted
            destination for shoppers who value great products
            at fair prices.
          </p>
        </section>

        <section>
          <h2>Our Mission</h2>
          <p>
            We provide quality products at affordable prices,
            delivering a smooth shopping experience from browse
            to checkout.
          </p>
        </section>

        <section>
          <h2>Our Vision</h2>
          <p>
            To become the most customer-friendly online store,
            where everyone can shop smart and shop better.
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default About;
