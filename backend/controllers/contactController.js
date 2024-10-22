const Contact = require('../models/contact');

// Get all contacts for a user
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({ where: { UserId: req.user.id } });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Add a new contact
exports.addContact = async (req, res) => {
  const { name, phone, email, address } = req.body;

  try {
    const newContact = await Contact.create({
      name,
      phone,
      email,
      address,
      UserId: req.user.id
    });
    res.json(newContact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a contact
exports.updateContact = async (req, res) => {
  const { name, phone, email, address } = req.body;

  try {
    const contact = await Contact.findOne({
      where: { id: req.params.id, UserId: req.user.id }
    });

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    contact.name = name || contact.name;
    contact.phone = phone || contact.phone;
    contact.email = email || contact.email;
    contact.address = address || contact.address;

    await contact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({
      where: { id: req.params.id, UserId: req.user.id }
    });

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    await contact.destroy();
    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
