// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { UserCircle, ChevronLeft, ChevronRight } from "lucide-react";
// import axios from "axios";
 
// const EventDetails = () => {
//   const uId = localStorage.getItem("user");
//   const { id } = useParams(); // Get the event ID from the URL
//   const navigate = useNavigate();
//   const [event, setEvent] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState("");
//   const [rating, setRating] = useState(0); // Rating state
//   const [attendeeId, setAttendeeId] = useState(null); // State to store attendee_id
//   const reviewsContainerRef = useRef(null); // Reference to the reviews container
//   const [showChevron, setShowChevron] = useState(false); // State to control Chevron visibility
 
//   useEffect(() => {
//     const fetchEventDetails = async () => {
//       try {
//         // Fetch event details from backend
//         const eventResponse = await axios.get(`http://localhost:3000/events/event_details/${id}`);
//         if (eventResponse.data) {
//           setEvent(eventResponse.data);
//         }
 
//         // Fetch reviews from backend
//         const reviewsResponse = await axios.get(`http://localhost:3000/events/event_details/${id}/reviews`);
//         if (reviewsResponse.data) {
//           setReviews(reviewsResponse.data);
//         }
//       } catch (err) {
//         console.error("Error fetching event details:", err);
//       }
//     };
 
//     fetchEventDetails();
//   }, [id]);
 
//   // This effect checks if the reviews container is overflowing and sets showChevron accordingly
//   useEffect(() => {
//     if (reviewsContainerRef.current) {
//       const isOverflowing = reviewsContainerRef.current.scrollWidth > reviewsContainerRef.current.clientWidth;
//       setShowChevron(isOverflowing);
//     }
//   }, [reviews]);
 
//   const handleReviewSubmit = async () => {
//     if (newReview.trim() !== "" && JSON.parse(uId).id) {
//       try {
//         const response = await axios.post(`http://localhost:3000/events/event_details/${id}/reviews`, {
//           event_id: id,
         
//           attendee_id: JSON.parse(uId).id,
//           comment: newReview,
//           rating: rating
//         });
 
//         if (response.data) {
//           setReviews([...reviews, response.data]);
//           setNewReview(""); // Clear the input field
//           setRating(0); // Reset the rating
//         }
//       } catch (err) {
//         console.error("Error adding review:", err);
//       }
//     } else {
//       console.error("No attendee ID or review text");
//     }
//   };
 
//   const scrollReviews = (direction) => {
//     const reviewsContainer = reviewsContainerRef.current;
//     const scrollAmount = 300;
//     if (reviewsContainer) {
//       reviewsContainer.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };
 
//   const handleBookNowClick = () => {
//     navigate("/ticket-booking", { state: { event } });
//   };
 
//   if (!event) {
//     return <div className="text-center text-xl font-semibold mt-10">Loading event details...</div>;
//   }
 
//   return (
//     <div className="max-w-4xl mx-auto my-10 p-6 bg-[#D9EAFD] shadow-lg rounded-xl">
//       <img src={event.event_image} alt={event.event_name} className="w-full h-64 object-cover rounded-md mb-6" />
//       <h1 className="text-3xl font-semibold mb-4">{event.event_name}</h1>
 
//       <div className="flex justify-between items-center mb-4 mt-6">
//         <div className="w-3/4 mr-10">
//           <p className="text-gray-700">{event.description}</p>
//         </div>
//         <div className="w-1/4 pl-4">
//           <button
//             onClick={handleBookNowClick}
//             className="ml-4 px-6 py-2 bg-black text-white rounded-md hover:bg-white hover:text-black border border-black transition-all"
//           >
//             Book Now
//           </button>
//         </div>
//       </div>
 
//       <p className="text-gray-600 mb-2"><strong>Location:</strong> {event.location}</p>
//       <p className="text-gray-600 mb-2"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
 
//       <h2 className="mt-25 text-2xl font-semibold mb-4">Reviews</h2>
 
//       <div className="relative">
//         {showChevron && (
//           <button onClick={() => scrollReviews("left")}>
//             <ChevronLeft className="text-gray-600" />
//           </button>
//         )}
 
//         <div
//           ref={reviewsContainerRef}
//           id="reviews-container"
//           className="flex space-x-4 overflow-x-hidden p-4"
//         >
//           {reviews.map((review) => (
//             <div key={review.review_id} className="min-w-[250px] max-w-[300px] p-4 border rounded-md bg-gray-50 shadow-md flex-shrink-0">
//               {/* <p className="font-semibold truncate">{review.name}</p> */}
//               <p className="text-gray-700 break-words">{review.comment}</p>
//               <p className="text-gray-600">Rating: {review.rating}</p>
//             </div>
//           ))}
//         </div>
 
//         {showChevron && (
//           <button onClick={() => scrollReviews("right")}>
//             <ChevronRight className="text-gray-600" />
//           </button>
//         )}
//       </div>
 
//       <div className="flex justify-between items-center mt-6">
//         <textarea
//           value={newReview}
//           onChange={(e) => setNewReview(e.target.value)}
//           placeholder="Write a review..."
//           className="w-full max-w-lg border-b border-gray-600 outline-none p-2 bg-transparent"
//         />
       
//         <div className="flex items-center">
//           <input
//             type="number"
//             value={rating}
//             onChange={(e) => setRating(e.target.value)}
//             min="1"
//             max="5"
//             className="w-16 mr-4 border-b border-gray-600 p-2"
//             placeholder="Rating"
//           />
//           <button
//             onClick={handleReviewSubmit}
//             className="px-6 py-2 bg-black text-white rounded-md hover:bg-white hover:text-black border border-black transition-all"
//           >
//             Add Review
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default EventDetails;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserCircle, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

const EventDetails = () => {
  const uId = localStorage.getItem("user");
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const reviewsContainerRef = useRef(null);
  const [showChevron, setShowChevron] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventResponse = await axios.get(
          `http://localhost:3000/events/event_details/${id}` , {
            headers:{
              "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        if (eventResponse.data) {
          setEvent(eventResponse.data);
        }

        const reviewsResponse = await axios.get(
          `http://localhost:3000/events/event_details/${id}/reviews` ,{
            headers:{
              "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        if (reviewsResponse.data) {
          setReviews(reviewsResponse.data);
        }
      } catch (err) {
        console.error("Error fetching event details:", err);
      }
    };

    fetchEventDetails();
  }, [id]);

  useEffect(() => {
    if (reviewsContainerRef.current) {
      const isOverflowing =
        reviewsContainerRef.current.scrollWidth >
        reviewsContainerRef.current.clientWidth;
      setShowChevron(isOverflowing);
    }
  }, [reviews]);

  const handleReviewSubmit = async () => {
    if (newReview.trim() !== "" && JSON.parse(uId).id) {
      try {
        const response = await axios.post(
          `http://localhost:3000/events/event_details/${id}/reviews`,
          {
            event_id: id,
            user_id: JSON.parse(uId).id,
            comment: newReview,
            rating: rating,
          },
          {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );

        if (response.data) {
          setReviews([...reviews, response.data]);
          setNewReview("");
          setRating(0);
        }
      } catch (err) {
        console.error("Error adding review:", err);
      }
    } else {
      console.error("No attendee ID or review text");
    }
  };

  const scrollReviews = (direction) => {
    const reviewsContainer = reviewsContainerRef.current;
    const scrollAmount = 300;
    if (reviewsContainer) {
      reviewsContainer.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleBookNowClick = () => {
    navigate("/ticket-booking", { state: { event } });
  };

  if (!event) {
    return (
      <div className="text-center text-xl font-semibold mt-10">
        Loading event details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-[#D9EAFD] shadow-lg rounded-xl">
      <img
        src={event.event_image}
        alt={event.event_name}
        className="w-full h-64 object-cover rounded-md mb-6"
      />
      <h1 className="text-3xl font-semibold mb-4">{event.event_name}</h1>

      <div className="flex justify-between items-center mb-4 mt-6">
        <div className="w-3/4 mr-10">
          <p className="text-gray-700">{event.description}</p>
        </div>
        <div className="w-1/4 pl-4">
          <button
            onClick={handleBookNowClick}
            className="ml-4 px-6 py-2 bg-black text-white rounded-md hover:bg-white hover:text-black border border-black transition-all"
          >
            Book Now
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-2">
        <strong>Location:</strong> {event.location}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
      </p>

      <h2 className="mt-6 text-2xl font-semibold mb-4">Reviews</h2>

      <div className="relative">
        {showChevron && (
          <button onClick={() => scrollReviews("left")}>
            <ChevronLeft className="text-gray-600 absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md" />
          </button>
        )}

        <div
          ref={reviewsContainerRef}
          id="reviews-container"
          className="flex space-x-4 overflow-x-hidden p-4"
        >
          {reviews.map((review) => (
            <div
              key={review.review_id}
              className="min-w-[250px] max-w-[300px] p-4 border rounded-md bg-gray-50 shadow-md flex-shrink-0 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
            >
              <p className="text-gray-700 break-words">{review.comment}</p>
              <p className="text-gray-600">Rating: {review.rating}</p>
            </div>
          ))}
        </div>

        {showChevron && (
          <button onClick={() => scrollReviews("right")}>
            <ChevronRight className="text-gray-600 absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md" />
          </button>
        )}
      </div>

      <h2 className="mt-8 text-lg font-semibold">Add a Review</h2>

      <div className="mt-4 flex space-x-4 items-start">
        <UserCircle className="w-10 h-10 text-gray-600" />
        <div className="flex flex-col w-full">
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write a review..."
            className="w-full border-b border-black-300 bg-white outline-none p-2 bg-transparent"
          />

          <div className="flex items-center mt-2 space-x-2">
            <h1>Enter rating</h1>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              className="w-16 border-b border-black-900 bg-white p-2 outline-none bg-transparent text-center"
              placeholder="Rating"
            />
            <button
              onClick={handleReviewSubmit}
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-white hover:text-black border border-black transition-all"
            >
              Add Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;