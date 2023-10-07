const Status = require('../models/Status');
const router = require('express').Router();

//Create Status (Will Be Deleted Automatically)
router.post('/', async (req, res) => {
    const status = new Status(req.body);
    try {
        const savedStatus = await status.save();
        res.status(200).json(savedStatus);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get All Status
router.get('/', async (req, res) => {
    try {
        const stories = await Status.find();
        res.status(200).json(stories);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get User's Status
router.get('/:id', async (req, res) => {
    try {
        const story = await Status.findOne({userId: req.params.id});
        res.status(200).json(story);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete User's Status
router.delete('/:id', async (req, res) => {
    try {
        const { id } = await Status.findOne({ userId: req.params.id });
        if (id)    await Status.findByIdAndDelete(id);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;