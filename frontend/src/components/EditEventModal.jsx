


import React, { useState } from "react";
import axios from "axios";

const EditEventModal = ({ event, onClose, onSave }) => {
    const [eventDetails, setEventDetails] = useState({ ...event });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/events/update/${eventDetails.event_id}`, eventDetails ,{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            onSave(eventDetails);
            onClose();
        } catch (error) {
            setError(error.response ? error.response.data : error.message);
            console.error("Error updating event:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-50">
            {/* Modal Wrapper - Avoid covering Navbar */}
            <div className="relative bg-[#D9EAFD] p-8 rounded-2xl shadow-2xl w-full max-w-lg border-2">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-gray-700 hover:text-red-600"
                    onClick={onClose}
                >
                    ✖
                </button>

                {/* Header */}
                <div className="bg-black text-white text-center py-3 rounded-t-xl">
                    <h2 className="text-2xl font-semibold">Edit Event</h2>
                </div>

                {error && <p className="text-red-500 text-center my-3">{error}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-black font-medium mb-1">Event Name</label>
                        <input
                            type="text"
                            name="event_name"
                            value={eventDetails.event_name}
                            onChange={handleChange}
                            className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-black font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={eventDetails.description}
                            onChange={handleChange}
                            className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-black font-medium mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={eventDetails.location}
                            onChange={handleChange}
                            className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-black font-medium mb-1">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={eventDetails.date}
                            onChange={handleChange}
                            className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-black font-medium mb-1">Genre</label>
                        <input
                            type="text"
                            name="genre_name"
                            value={eventDetails.genre_name}
                            onChange={handleChange}
                            className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 text-white bg-gray-500 rounded-lg transition-all duration-300 hover:bg-gray-700 shadow-md"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="relative px-6 py-2 text-white bg-black rounded-lg overflow-hidden transition-all duration-300
                            before:absolute before:inset-0 before:right-0 before:bg-white before:w-0 before:transition-all before:duration-300 before:ease-in-out
                            hover:before:w-full hover:text-black before:z-0 z-10 hover:cursor-pointer hover:shadow-lg"
                        >
                            <span className="relative z-10">Save</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEventModal;