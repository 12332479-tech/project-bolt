const express = require('express');
const router = express.Router();
const db = require('../models');
const Message = db.Message;

// POST /api/messages
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }

    const newMessage = await Message.create({
      name,
      email,
      phone,
      message
    });

    res.status(201).json({
      message: 'Message sent successfully',
      data: newMessage
    });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ message: 'Server error while sending message' });
  }
});

// GET /api/messages (Optional: for admin dashboard)
router.get('/', async (req, res) => {
  try {
    const messages = await Message.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error while fetching messages' });
  }
});

module.exports = router;
