import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"   //To Create Image Storage System

const foodRouter = express.Router(); //Using this router we can create GET/POST Methods

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) =>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

// Middleware upload has been created by using it we can store images in upload folder
const upload = multer({storage: storage})


// Methods
foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood);




export default foodRouter;