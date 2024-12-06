const Entry = require("../models/EntryModel")

// Create a new entry
module.exports.createEntry = async (req, res) => {
  const { mood, note } = req.body

  try {
    const entry = await Entry.create({
      mood,
      note,
      userID: req.user.id,
    })
    res.status(200).json(entry)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Get all entries
module.exports.getAllEntries = async (req, res) => {
  try {
    const entries = await Entry.find({ userID: req.user.id }).sort({
      createdAt: -1,
    })
    res.status(200).json(entries)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get single entry
module.exports.getEntry = async (req, res) => {
  try {
    const entry = await Entry.findOne({
      _id: req.params.id,
      userID: req.user.id,
    })
    if (!entry) {
      return res
        .status(404)
        .json({ error: "Entry not found or not accessible" })
    }
    res.status(200).json(entry)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports.updateEntry = async (req, res) => {
  const { mood, note } = req.body

  try {
    const updatedEntry = await Entry.findOneAndUpdate(
      { _id: req.params.id, userID: req.user.id },
      { mood, note },
      { new: true }
    )
    if (!updatedEntry) {
      return res
        .status(404)
        .json({ error: "Entry not found or not accessible" })
    }
    res.status(200).json(updatedEntry)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Delete an entry
module.exports.deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findOneAndDelete({
      _id: req.params.id,
      userID: req.user.id,
    })
    if (!entry) {
      return res
        .status(404)
        .json({ error: "Entry not found or not accessible" })
    }
    res.status(200).json(entry)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
