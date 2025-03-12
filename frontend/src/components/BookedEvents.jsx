// src/components/BookedEvents.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BookedEvents = () => {
  const [events, setEvents] = useState([]);
  const attendee_id = localStorage.getItem("attendee_id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookedEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/attendees/booked/${attendee_id}` ,{
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        );
        setEvents(response.data.data);
      } catch (error) {
        console.error("Error fetching booked events:", error);
      }
    };

    fetchBookedEvents();
  }, [attendee_id]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">🎟️ My Booked Events</h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No booked events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.event_id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={event.event_image}
                alt={event.event_name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{event.event_name}</h2>
                <p className="text-gray-600">{event.genre_name}</p>
                <p className="text-sm mt-2">{event.description}</p>
                <p className="text-sm mt-2 text-gray-500">
                  📍 {event.location} | 📅 {new Date(event.date).toDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedEvents;
