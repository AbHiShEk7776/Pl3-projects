const express = require('express');
const router = express.Router();
const { addContact, getContacts, updateContact, deleteContact } = require('../controllers/contactController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, addContact);
router.get('/', auth, getContacts);
router.put('/:id', auth, updateContact);
router.delete('/:id', auth, deleteContact);

module.exports = router;
