// models/attendeeModel.js
import pool from "../config/db.js";

// Get events booked by an attendee using attendee_id
export const getEventsByUserId = async (user_id) => {
  try {

    const { rows } = await pool.query(`select * from event_details inner join attendee_details on attendee_details.event_id = event_details.event_id where user_id = $1`, [user_id]);
    console.log(user_id);
    return rows; // Return fetched events
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch booked events.");
  }
};
