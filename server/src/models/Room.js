// server/models/Room.js
const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    participants: [
      {
        socketId: { type: String },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt automatically
  }
)

module.exports = mongoose.model('Room', roomSchema)
