import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./Routes/userRoute.js";
import eventRoutes from "./Routes/eventRoute.js"
import pool from "./config/db.js";
import express from 'express';
import bodyParser from 'body-parser'; 
import { createClient } from '@supabase/supabase-js';
import paymentRoutes from "./Routes/paymentRoutes.js";
import attendeeRoutes from "./Routes/attendeeRoutes.js";
import { authenticateToken } from "./Middleware/auth.js";
dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


app.use(cors({
  origin: "http://localhost:5173",  // Allow requests from your frontend
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

// Verify PostgreSQL connection
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL!"))
  .catch((err) => console.error("❌ Database connection error:", err));

// Routes
app.use("/api/payments" , paymentRoutes);
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/attendee", attendeeRoutes);
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/attendees", attendeeRoutes);
app.get("/api/attendees", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM attendee_details');
    res.status(200).json(result.rows); // Send back the list of attendees
  } catch (error) {
    console.error('Error fetching attendees:', error);
    res.status(500).json({ error: 'Failed to fetch attendees' });
  }
});

app.post('/api/events', authenticateToken , async (req, res) => {
  const eventDetails = req.body;
  const { data, error } = await supabase.from('event_details').insert([eventDetails]);

  if (error) {
      res.status(500).json({ error: error.message });
  } else {
      res.status(200).json({ data });
  }
});

app.get("/api/events", authenticateToken , async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("event_details")
      .select("event_name, genre_name");
 
    if (error) {
      console.error("Database Error:", error);
      return res.status(500).json({ error: error.message });
    }
 
    console.log("Fetched Events:", data); // Log to verify output
 
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update event
app.put('/api/events/update/:eventId',authenticateToken , async (req, res) => {
  const { eventId } = req.params;
  const updatedData = req.body;

  try {
    const { data, error } = await supabase
      .from('event_details')
      .update(updatedData)
      .eq('event_id', eventId);

    if (error) {
      return res.status(500).json({ message: 'Error updating event', error: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});



//Feedback_details
app.post('/api/feedback',authenticateToken , async (req, res) => {
  const { feedback_id, event_id, feedback_text, rating, performance } = req.body;
 
  // Insert into Supabase table 'feedback_details'
  const { data, error } = await supabase.from('feedback_details').insert([
    {
      feedback_id,
      event_id,
      feedback_text,
      rating,
      performance,
      feedback_created_at: new Date().toISOString(), // Store current timestamp
    }
  ]);
 
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json({ message: "Feedback submitted successfully!", data });
  }
});
 
app.get("/attendee/:user_id",authenticateToken , async (req, res) => {
  const { user_id } = req.params; // Extract user_id from the request parameters
 
  try {
    // Query the attendee_details table to find the attendee_id associated with the user_id
    const { data, error } = await supabase
      .from("attendee_details") // Table containing attendee info
      .select("attendee_id") // Only retrieve the attendee_id
      .eq("user_id", user_id) // Filter by user_id
      .single(); // Ensures only one row is returned (since user_id is unique)
 
    if (error) {
      return res.status(400).json({ error: error.message });
    }
 
    if (data) {
      return res.json({ attendee_id: data.attendee_id }); // Send back the attendee_id
    } else {
      return res.status(404).json({ error: "Attendee not found" }); // If no attendee found
    }
  } catch (error) {
    console.error("Error fetching attendee ID:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/", (req, res) => res.send("🚀 API is running"));

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
