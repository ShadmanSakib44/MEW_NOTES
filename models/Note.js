const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true,
    },
    email_: {
        type: String,
        required: false,
    },
    done: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String, // Path or URL to the uploaded image
        required: false, // Make it optional as not every note may have an image
    },
    audioPath: {
        type: String, // Path or URL to the uploaded audio file
        required: false, // Make it optional as not every note may have an audio file
    }
});

module.exports = mongoose.model("Note", NoteSchema);
