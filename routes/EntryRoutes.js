const express = require('express')
const EntryController = require('../controllers/EntryController')
const { authenticate } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/entry', authenticate, EntryController.createEntry)
router.get('/entry', authenticate, EntryController.getAllEntries)
router.get('/entry/:id', authenticate, EntryController.getEntry)
router.put('/entry/:id', authenticate, EntryController.updateEntry)
router.delete('/entry/:id', authenticate, EntryController.deleteEntry)

module.exports = router