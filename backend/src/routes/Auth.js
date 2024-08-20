import express from "express";
const authrouter = express.Router()

// Import the required controllers and middleware functions
import { signup,login } from "../controllers/Auth.js";



// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
authrouter.post("/login", login)

// Route for user signup
authrouter.post("/signup", signup)



export default  authrouter;