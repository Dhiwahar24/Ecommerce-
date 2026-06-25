import React from "react";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

function Contact() {
  return (
    <>
      <Header />

      <div className="contact-page">
        <h1>Contact Us</h1>
        <p className="page-subtitle">
          We'd love to hear from you
        </p>

        <input
          placeholder="Name"
        />

        <input
          placeholder="Email"
        />

        <textarea
          placeholder="Message"
        />

        <button>
          Send
        </button>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
