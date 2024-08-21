import express from "express";
const authrouter = express.Router()

// Import the required controllers and middleware functions
import { signup,login } from "../controllers/Auth.js";

import auth from "../middlewares/Auth.js";



// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
authrouter.post("/login",auth, login)

// Route for user signup
authrouter.post("/signup",auth, signup)



export default  authrouter;