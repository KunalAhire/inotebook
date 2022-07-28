const express = require('express');
const router = express.Router();
const Note = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');

// ROUTE 1: Get All the Notes using: GET "/api/auth/getnotes". Login required
router.get('/getnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Note.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error')
    }
})

// ROUTE 2: Add a new Note using: POST "/api/auth/addnote". Login required;
router.post('/addnote', fetchuser, [
    body('title', 'title is needed').isLength({ min: 3 }),
    body('description', 'description must be at least 3 character').isLength({ min: 5}),
],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const{title, description, tag} = req.body;
             const notes = new Note({
                title, description, tag, user : req.user.id
             })
             const savednotes = await notes.save();
             res.json(savednotes);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('internal server error')
        }
    }
)
// ROUTE 3: Update Note using: put "/api/notes/updatenote". Login required;
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag} = req.body;
    //create newNote object;
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag};
    
    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send('Not Found')};

    if(note.user.toString() !==req.user.id){
        return res.status(401).send('Not Allowed')
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})
})
// ROUTE 3: Delete Note using: Delete "/api/notes/deletenote". Login required;
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send('Not Found')};

    if(note.user.toString() !==req.user.id){
        return res.status(401).send('Not Allowed')
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({'Successs':'Note has been deleted',note})
})
module.exports = router;