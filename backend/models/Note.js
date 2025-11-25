const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    preview: { type: String },
    tag: { type: String, default: 'Uncategorized' },
    folder: { type: String },
    isFavorite: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    date: { type: String, default: () => new Date().toLocaleDateString() }, // Simple date string for now
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);
