import express from "express";
import {authenticateToken} from "../Middleware/auth.js";
import {
  registerAttendees,
  fetchAllAttendees,
  removeAttendee,
  fetchEventsByUserId,
} from "../Controllers/attendeeController.js";

const router = express.Router();

// ✅ Register Attendees
router.post("/register", registerAttendees);

// ✅ Get All Attendees (No Event ID Required)
router.get("/attendees",authenticateToken ,fetchAllAttendees);

// ✅ Delete an Attendee
router.delete("/:attendee_id",authenticateToken , removeAttendee);

//Fetch events by userId
router.get("/:user_id",authenticateToken , fetchEventsByUserId);

export default router;


// // routes/attendeeRoutes.js
// import express from "express";
// import { fetchEventsByAttendee } from "../Controllers/attendeeController.js";

// const router = express.Router();

// // Route: GET events by attendee_id
// router.get("/:attendee_id", fetchEventsByAttendee);

// export default router;
