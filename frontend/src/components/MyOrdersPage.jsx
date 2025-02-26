import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          throw new Error("User not found in localStorage");
        }
        
        const userId = JSON.parse(storedUser).id;
        const response = await axios.get(`http://localhost:3000/attendee/${userId}`);
        
        if (response.data && Array.isArray(response.data.data)) {
          setOrders(response.data.data);
          
        } else {
          throw new Error("Invalid API response format");
        }

      } catch (err) {
        
        setError("No events present. Book Now!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }
 
  return (
    <div className="m-20 flex flex-col items-center p-6 max-w-6xl mx-auto bg-[#D9EAFD]">
      <h2 className="text-3xl font-semibold text-center mb-8">My Orders</h2>

      <div className="space-y-6 w-full">
        {orders.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>No events are present yet. Book an event to get started!</p>
            <a
              href="/events" // Change this to the actual route where users can book events
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
            >
              Browse Events
            </a>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.bookingRef}
              className="flex border border-gray-300 p-4 rounded-lg shadow-lg items-center space-x-6 hover:scale-105 transform transition-all duration-300 ease-in-out bg-white"
            >
              <img
                src={order.event_image}
                alt={order.event_name}
                className="w-24 h-24 object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{order.event_name}</h3>
                <p className="text-gray-500">Location: {order.location}</p>
                <p className="text-gray-500">Genre: {order.genre_name}</p>
                <p className="text-gray-600">Ticket Type: {order.ticket_type}</p>
                <p className="text-gray-500">Price: ${order.ticket_price}</p>
              </div>
              <div>
                <button className="relative border border-white rounded-[2%] p-2 text-white bg-black overflow-hidden transition-colors duration-300 ease-in-out 
                  before:absolute before:inset-0 before:right-0 before:bg-white before:w-0 before:transition-all before:duration-300 before:ease-in-out hover:before:w-full hover:text-black 
                  before:z-0 z-10 hover:cursor-pointer hover:shadow-lg"  onClick={() => navigate("/feedback")}>
                  <span className="relative z-10 transition-colors duration-0 ease-in-out text-center">
                    Give Feedback
                  </span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
