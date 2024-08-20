import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import songRouter from "./src/routes/songRoute.js";
import albumRouter from "./src/routes/albumRoute.js";

import authrouter from "./src/routes/Auth.js";



const app=express();
const port=process.env.PORT || 4000;


connectDB();
connectCloudinary();

//middleware
app.use(express.json());

app.use(
    cors({
      origin: process.env.CLIENT_URL, // Only allow requests from this origin
      credentials: true, // Allow credentials to be included in requests
    })
  );

//initializing routes

app.use("/api/auth",authrouter)
app.use("/api/song", songRouter)
app.use("/api/album", albumRouter)

app.get('/', (req, res) => res.send("API Working"));

app.listen(port,()=>console.log(`server started on ${port}`));

