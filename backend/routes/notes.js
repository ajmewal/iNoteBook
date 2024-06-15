const express = require("express")
const router = express.Router()
const Notes = require('../models/Notes')
const fetchuser = require("../middleware/fetchuser")
const { body, validationResult } = require('express-validator');
const mongoose = require("mongoose")



// Route 1 Fetch all users : Loggedin required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })

    return res.json(notes)

})

//Route 2 
router.post("/", [body('title', "Enter a valid Title").isLength({ min: 3 }), body('description', "Enter a valid email").isLength({ min: 1 })], fetchuser, async (req, res) => {

    try {


        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        // const userObject = req.user.id
        req.body.user = req.user.id
        const notes = Notes(req.body)
        const saveNote = await notes.save()
        return res.json(saveNote)
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).send("some Error Occured")
    }

})

//Route 3 Update Notes
router.put("/updatenote/:id", fetchuser, async (req, res) => {

    try {

        const { title, description, tag } = req.body
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        let note = await Notes.findById(req.params.id)
        if (!note) {
            // return res.status(404).json({ err: "Not Found" })
            return res.status(401).send({ error: "Access Denied" })
        }

        if (note.user == req.user.id) {
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            return res.json(note)
        }
        else {
            return res.status(401).send({ error: "Access Denied" })
        }
    } catch (error) {
        return res.status(401).send({ error: "Access Denied" })
    }

})

router.delete("/deletenotes/:id", fetchuser, async (req, res) => {

    try {
        let note = await Notes.findById(req.params.id)
        if (!note) {
            // return res.status(404).json({ err: "Not Found" })
            return res.status(401).send({ error: "Access Denied" })
        }

        if (note.user == req.user.id) {
            note = await Notes.findByIdAndDelete(req.params.id)
            return res.json({'Success':"Note Success fully deletes",note})
        }
        else {
            return res.status(401).send({ error: "Access Denied" })
        }
    } catch (error) {
        
    }

})

module.exports = router