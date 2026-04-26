


import express from "express"
import { verifyToken } from "../../middleware/verifyToken.js"
import { addNote, deleteNote, getAllNote, updateNote } from "./note.controller.js"
// import { verifyOTP } from "../../auth/verifyOTP.js"


export const noteRouter = express.Router()

noteRouter.use(verifyToken)
noteRouter.get("/",getAllNote)
noteRouter.post("/",addNote)
noteRouter.put("/:id",updateNote)
noteRouter.delete("/:id",deleteNote)
