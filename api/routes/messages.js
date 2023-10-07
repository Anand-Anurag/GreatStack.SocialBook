const router = require('express').Router();
const Message = require('../models/Message');

//Create a Message
router.post('/', async (req, res) => {
    const { conversationId, senderId, text } = req.body;
    const message = new Message({ conversationId, senderId, text });
    try {
        const savedMessage = await message.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get all Messages
router.get('/:conversationId', async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;