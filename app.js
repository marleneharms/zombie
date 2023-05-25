const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json({ extended: true }));
dotenv.config();

const baseURL = "/api/v1/zombie";

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to MongoDB"));

app.use(function (req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;
        next();
    }catch(err){
        req.user = undefined;
        next();
    }
    } else {
    req.user = undefined;
    next();
    }
});

// Routes
app.use(`${baseURL}/post`, require("./routes/post.route"));
app.use(`${baseURL}/auth`, require("./routes/user.route"));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
