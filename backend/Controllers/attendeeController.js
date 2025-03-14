// controllers/attendeeController.js
import { saveAttendeeDetails,
    getAllAttendees,
    deleteAttendee, } from "../Models/attendeeDetail.js";
import { getEventsByUserId } from "../Models/attendeeModel.js";

// Controller: Fetch events by user_id
export const fetchEventsByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Fetch events for the given attendee_id
    const events = await getEventsByUserId(user_id);

    if (!events.length) {
      return res.status(404).json({ message: "No events found for this attendee." });
    }

    res.status(200).json({ data: events });
  } catch (error) {
    console.error("Error fetching booked events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const fetchAllAttendees = async (req, res) => {
    try {
      const attendees = await getAllAttendees();
  
      if (!attendees.length) {
        return res.status(404).json({ message: "No attendees found" });
      }
  
      return res.status(200).json(attendees);
    } catch (error) {
      console.error("Error fetching all attendees:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  export const registerAttendees = async (req, res) => {
    try {
      const { user_id, event_id, ticketDetails , ticket_type , ticket_price } = req.body;
      console.log("Ticket Details Received:", user_id , event_id , ticketDetails);
      
      // ✅ Validate input
      if (!user_id || !event_id || !Array.isArray(ticketDetails) || ticketDetails.length === 0) {
        return res.status(400).json({ error: "Invalid input data" });
      }
  
      // console.log("Ticket Details Received:", ticketDetails);
  
      const savedAttendees = [];
  
      // ✅ Save each attendee in DB
      for (const ticket of ticketDetails) {
        console.log("Ticket Details dsfsadf:", ticket);
        
        const attendee = await saveAttendeeDetails(user_id, event_id, ticket , ticket_type , ticket_price);
        savedAttendees.push(attendee);
      }
  
      return res.status(201).json({ message: "Attendees stored successfully", attendees: savedAttendees });
    } catch (error) {
      console.error("Error registering attendees:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  export const removeAttendee = async (req, res) => {
    try {
      const { attendee_id } = req.params;
      const success = await deleteAttendee(attendee_id);
  
      if (!success) {
        return res.status(404).json({ message: "Attendee not found" });
      }
  
      return res.status(200).json({ message: "Attendee deleted successfully" });
    } catch (error) {
      console.error("Error deleting attendee:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
