import express from "express";
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
router.get("/attendees", fetchAllAttendees);

// ✅ Delete an Attendee
router.delete("/:attendee_id", removeAttendee);

//Fetch events by userId
router.get("/:user_id", fetchEventsByUserId);

export default router;


// // routes/attendeeRoutes.js
// import express from "express";
// import { fetchEventsByAttendee } from "../Controllers/attendeeController.js";

// const router = express.Router();

// // Route: GET events by attendee_id
// router.get("/:attendee_id", fetchEventsByAttendee);

// export default router;
