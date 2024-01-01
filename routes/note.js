const express = require('express');
const multer = require('multer');
const path = require('path');
const Note_model = require('../models/Note');
const router = express.Router();

// Set up storage for multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (file.fieldname === 'image') {
            cb(null, 'imageUpload/'); // Store images in imageUpload directory
        } else if (file.fieldname === 'audio') {
            cb(null, 'audioUpload/'); // Store audio files in audioUpload directory
        }
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Route to add a new note
router.post('/add/note', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), (req, res) => {
    const { note } = req.body;
    const email_ = req.user.email;
    const imagePath = req.files['image'] ? req.files['image'][0].path : null;
    const audioPath = req.files['audio'] ? req.files['audio'][0].path : null;
    const newNote = new Note_model({ note, email_, done: "0", imagePath, audioPath });

    if (note === "") {
        res.redirect('/');
    } else {
        newNote.save()
            .then(() => {
                console.log("Note added");
                res.redirect('/');
            })
            .catch(err => console.log(err));
    }
});

// Route to delete a note
router.get("/delete/note/:_id", (req, res) => {
    const { _id } = req.params;
    Note_model.deleteOne({ _id })
        .then(() => {
            console.log("Note deleted");
            res.json({ success: true, message: "Note deleted" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
});

// Route to update a note as done
router.get("/update/Note/:_id", (req, res) => {
    const { _id } = req.params;
    Note_model.updateOne({ _id }, { done: "1" })
        .then(() => {
            console.log("Note updated");
            res.json({ message: "Note updated" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
});

// Route to edit a note
router.post('/edit/note/:_id', (req, res) => {
    const { _id } = req.params;
    const { note } = req.body; 

    Note_model.findByIdAndUpdate(_id, { note }, { new: true })
        .then(updatedNote => {
            console.log('Note updated:', updatedNote);
            res.json({ message: "Note updated", updatedNote });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
});

module.exports = router;
