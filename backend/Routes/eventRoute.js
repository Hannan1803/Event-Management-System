import express from "express";
import { fetchAllEvents,fetchEvents, deleteEvent, updateEvent, fetchEventById } from "../Controllers/eventController.js";
import { addReview, fetchReviewsByEventId } from "../Models/eventModel.js";
import { authenticateToken } from "../Middleware/auth.js";

const router = express.Router();

// ✅ Route now includes ":id" to capture organizer_id dynamically
router.get("/", authenticateToken ,fetchAllEvents);
router.get("/:id", authenticateToken ,fetchEvents);
router.delete("/delete/:id", authenticateToken ,deleteEvent);
router.put('/update/:eventId',authenticateToken , updateEvent);
router.get("/event_details/:id",authenticateToken ,fetchEventById)
 
// Fetch reviews for a specific event
router.get("/event_details/:id/reviews", authenticateToken ,fetchReviewsByEventId);
 
// Add a review for an event
router.post("/event_details/:id/reviews", authenticateToken ,addReview);
export default router;
