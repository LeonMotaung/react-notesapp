const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-app';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Note Model
const Note = require('./models/Note');

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

// GET all notes
app.get('/api/notes', async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new note
app.post('/api/notes', async (req, res) => {
    try {
        const note = new Note(req.body);
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update note
app.put('/api/notes/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(note);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE note
app.delete('/api/notes/:id', async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Note deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Serve Frontend in Production
// The user requested the frontend build to be in /frontend/build
const frontendBuildPath = path.join(__dirname, '../frontend/build');

app.use(express.static(frontendBuildPath));

// Catch-all handler for any request that doesn't match an API route
// Sends back the React index.html
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
