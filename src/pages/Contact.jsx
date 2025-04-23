import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-white text-gray-800 px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-grey-700">
          Get in Touch with <span className="text-green-600">RecipeNest</span>
        </h1>
        <p className="text-lg mb-12 text-gray-600">
          Have questions, feedback, or partnership inquiries? We’re always here for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-white shadow-md p-6 rounded-xl border border-green-100">
            <h2 className="text-xl font-semibold text-green-800 flex items-center mb-2">
              <Mail className="w-5 h-5 mr-2 text-green-500" />
              Email
            </h2>
            <p className="text-gray-700">info@recipenest.com</p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-xl border border-green-100">
            <h2 className="text-xl font-semibold text-green-800 flex items-center mb-2">
              <Phone className="w-5 h-5 mr-2 text-green-500" />
              Phone
            </h2>
            <p className="text-gray-700">+977 9867594038</p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-xl border border-green-100">
            <h2 className="text-xl font-semibold text-green-800 flex items-center mb-2">
              <MapPin className="w-5 h-5 mr-2 text-green-500" />
              Address
            </h2>
            <p className="text-gray-700 leading-relaxed">
              RecipeNest HQ<br />
              Basundhara,<br />
              Kathmandu, Nepal
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-xl border border-green-100">
            <h2 className="text-xl font-semibold text-green-800 flex items-center mb-2">
              <Clock className="w-5 h-5 mr-2 text-green-500" />
              Working Hours
            </h2>
            <p className="text-gray-700">Mon – Fri: 9:00 AM – 6:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
