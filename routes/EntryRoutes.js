const express = require('express')
const EntryController = require('../controllers/EntryController')

const router = express.Router()

router.post('/entry', EntryController.createEntry)
router.get('/entry', EntryController.getAllEntries)
router.get('/entry/:id', EntryController.getEntry)
router.put('/entry/:id', EntryController.updateEntry)
router.delete('/entry/:id', EntryController.deleteEntry)

module.exports = router