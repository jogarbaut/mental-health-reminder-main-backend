const Entry = require('../models/EntryModel')

// Create a new entry
module.exports.createEntry = async (req, res) => {
  const {
    mood,
    note
  } = req.body

  try {
    const entry = await Entry.create({
      mood,
      note
    })
    res.status(200).json(entry)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
} 

// Get all entries
module.exports.getAllEntries = async (req, res) => {
  const entries = await Entry.find().sort({ createdAt: -1 })
  res.status(200).json(entries)
}

// Get single entry
module.exports.getEntry = async (req, res) => {
  const entry = await Entry.findById(req.params.id)
  if (!entry) {
    return res.status(400).json({error: 'Entry does not exist'})
  }
  res.status(200).json(entry)
}

module.exports.updateEntry = async (req, res) => {
  try {
    const { mood, note } = req.body
    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
      { mood, note },
      { new: true }
    )
    if (!updatedEntry) return res.status(404).json({ error: 'Entry not found'})
      res.json(updatedEntry)
  } catch (error) {
    res.status(500).json({ error: 'Error updating entry'})
  }
}

// Delete an entry
module.exports.deleteEntry = async (req, res) => {
  const entry = await Entry.findOneAndDelete({ _id: req.params.id})
  if (!entry) {
    return res.status(400).json({error: 'Entry does not exist'})
  }
  res.status(200).json(entry)
}