import pool from "../config/db.js";

export const getEvents = async (req,res) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM event_details"
      );
      return rows;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to fetch events");
    }
  };
  

// Get all events by organizer ID
export const getEventsById = async (id) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM event_details WHERE organizer_id = $1",
      [id] 
    );
    return rows;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch events");
  }
};

// Delete event by ID
export const removeEventById = async (id) => {
    try {
      const result = await pool.query(
        "DELETE FROM event_details WHERE event_id = $1 RETURNING *",
        [id]
      );
      return result.rowCount > 0;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to delete event");
    }
  };



  export const addReview = async (req, res) => {
    const { id } = req.params; // Event ID from the URL parameter
    const { event_id, user_Id, comment, rating} = req.body;
 
    console.log("Incoming review:", req.body);
 
    try {
      // Modify the query to insert the review based on the event_id from req.params (id)
      const result = await pool.query(
        "INSERT INTO review_details (event_id, user_Id, comment, rating) VALUES ($1, $2, $3, $4) RETURNING *",
        [Number(event_id), user_Id, comment, rating] // Insert the review for the specific event_id (using `id` from req.params)
      );
 
      res.json(result.rows[0]);  // Send the new review as a response
    } catch (error) {
      console.error("Error adding review:", error);
      res.status(500).json({ message: "Error adding review" });
    }
};
 
 
  

  export const fetchReviewsByEventId = async (req, res) => {
    const { id } = req.params;  // Event ID from the URL
 
    try {
      const result = await pool.query(
        "SELECT * FROM review_details WHERE event_id = $1",
        [id]
      );
      res.json(result.rows);  // Send the reviews as a response
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Error fetching reviews" });
    }
  };
  