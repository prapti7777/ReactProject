import React from 'react';

const Contact = () => {
  return (
    <section className="min-h-screen bg-white text-gray-800 px-6 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-green-600">Contact Us</h1>
        <p className="text-lg mb-10 text-gray-600">
          We'd love to hear from you. Reach out to us through the details below.
        </p>

        <div className="text-left space-y-6">
          <div>
            <h2 className="text-xl font-semibold">📧 Email</h2>
            <p className="text-gray-700">info@recipenest.com</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">📞 Phone</h2>
            <p className="text-gray-700">+1 (555) 123‑4567</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">🏢 Address</h2>
            <p className="text-gray-700">
              RecipeNest HQ, 123 Culinary Street,<br />
              Flavor Town, NY 10001, USA
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">🕒 Working Hours</h2>
            <p className="text-gray-700">Monday – Friday: 9:00 AM – 6:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
