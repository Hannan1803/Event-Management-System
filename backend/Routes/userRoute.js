import express from "express";
import { fetchUsers, fetchUserById, registerUser , loginUser} from "../Controllers/userController.js";
import { authenticateToken } from "../Middleware/auth.js";

const router = express.Router();

// Routes
router.get("/", fetchUsers);           // GET all users
router.get("/:id", authenticateToken ,fetchUserById);     // GET user by ID
router.post("/register", registerUser); // POST new user
router.post("/login", loginUser)

export default router;
