import React from 'react';

const BasePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/home_page.jpg)' }}>
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6 md:px-12">
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold leading-tight tracking-wide md:text-6xl">Create Unforgettable Events with <span className='text-blue-800'>JEvents</span></h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">Whether it's a corporate gathering or a wedding, we specialize in creating memorable experiences. Let us bring your vision to life.</p>
            {/* <button className="px-8 py-4 bg-black text-white text-lg font-semibold rounded-lg transform transition-all duration-300 hover:bg-blue-700 hover:scale-105">
              Get Started
            </button> */}
            <button 
                className="px-8 py-4 bg-white text-black text-lg font-semibold rounded-lg transform transition-all duration-300 hover:bg-blue-700 hover:scale-105"
                onClick={() => alert('Please Login / Sign Up')} // Trigger alert when clicked
                >
                Get Started
            </button>
          </div>
        </div>
      </section>

      

     
    </div>
  );
};

export default BasePage;
