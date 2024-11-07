const mongoose = require("mongoose")

const entrySchema = new mongoose.Schema(
  {
    mood: { type: String, required: true },
    note: { type: String },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Entry", entrySchema)
