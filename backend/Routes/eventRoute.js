import express from "express";
import { fetchAllEvents,fetchEvents, deleteEvent, updateEvent, fetchEventById } from "../Controllers/eventController.js";
import { addReview, fetchReviewsByEventId } from "../Models/eventModel.js";

const router = express.Router();

// ✅ Route now includes ":id" to capture organizer_id dynamically
router.get("/", fetchAllEvents);
router.get("/:id", fetchEvents);
router.delete("/delete/:id", deleteEvent);
router.put('/update/:eventId', updateEvent);
router.get("/event_details/:id",fetchEventById)
 
// Fetch reviews for a specific event
router.get("/event_details/:id/reviews", fetchReviewsByEventId);
 
// Add a review for an event
router.post("/event_details/:id/reviews", addReview);
export default router;
