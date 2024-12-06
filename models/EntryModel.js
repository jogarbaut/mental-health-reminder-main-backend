const mongoose = require("mongoose")

const entrySchema = new mongoose.Schema(
  {
    mood: { type: String, required: true },
    note: { type: String },
    userID: { type: String, required: true }, // Links the entry to a specific user
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Entry", entrySchema)
