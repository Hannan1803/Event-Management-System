import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#D9EAFD] text-black py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          
          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-black">JMAN GROUPS, Tidel Park</p>
            <p className="text-black">Phone: +123 456 7890</p>
            <p className="text-black">Email: jman@eventpro.com</p>
          </div>

          {/* Navigation Links */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="/events" className="hover:text-blue-400 transition-colors">Events</a></li>
              <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
              <li><a href="/faq" className="hover:text-blue-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-end space-x-6">
              <a href="#" target="_blank" className="text-black hover:text-blue-400 transition-colors">
            
              </a>
              <a href="#" target="_blank" className="text-black hover:text-pink-400 transition-colors">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="#" target="_blank" className="text-black hover:text-blue-400 transition-colors">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a href="#" target="_blank" className="text-black hover:text-blue-400 transition-colors">
                <i className="fab fa-linkedin-in text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-black">
          <p>&copy; {new Date().getFullYear()} EventPro. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
