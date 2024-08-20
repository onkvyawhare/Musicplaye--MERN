import { addAlbum, listAlbum, removeAlbum } from "../controllers/albumController.js";
import express from "express";
import upload from "../middlewares/multer.js";

const albumRouter = express.Router();

albumRouter.post('/add', upload.single('image'), addAlbum);
albumRouter.get('/list', listAlbum);
albumRouter.delete('/remove', removeAlbum)


export default albumRouter;