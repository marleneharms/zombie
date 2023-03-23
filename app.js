const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

app.use(cors());
app.use(express.json({ extended: true }));
dotenv.config();

const baseURL = '/api/v1/zombie';

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// Routes
app.use(`${baseURL}/post`, require('./routes/post.route'));
app.use(`${baseURL}/point`, require('./routes/point.route'));


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});