const router = require('express').Router();
const Conversation = require('../models/Conversation');

//Create Conversastion
router.post('/', async (req, res) => {
    const conversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    });
    try {
        const savedConversation = await conversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get User's All Conversations
router.get('/:id', async (req, res) => { 
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.id]}
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get User's Particular Conversation
router.get('/:userId/:friendId', async (req, res) => { 
    try {
        const conversation = await Conversation.find({
            members: { $all: [req.params.userId, req.params.friendId]}
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update conversation date
router.put('/updateConversation/:id', async (req, res) => {
    try {
        const conversation = await Conversation.findByIdAndUpdate(req.params.id, {updatedAt: Date.now()});
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;