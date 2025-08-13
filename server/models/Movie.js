const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  year: { type: Number, required: true },
  image: { type: String }, // URL to poster image
  video: { type: String }, // URL to video file
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Movie', MovieSchema);
