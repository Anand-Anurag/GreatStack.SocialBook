const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const conversationRoutes = require('./routes/conversations');
const messageRoutes = require('./routes/messages');
const statusRoutes = require('./routes/status');
const multer = require('multer');
const path = require('path');

dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL, () => {
    console.log('Connected to MongoDB');
});

app.use('/images', express.static(path.join(__dirname, '/public/images')));
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + String(file.originalname));
    }
});

const upload = multer({ storage });
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json({fileName: req.file.filename});
    } catch (err) {
        console.log(err);
    }
});

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/auth', authRoutes);

app.use('/conversations', conversationRoutes);
app.use('/messages', messageRoutes);
app.use('/status', statusRoutes);

app.listen(8800, () => {
    console.log('Backend server is running!');
});