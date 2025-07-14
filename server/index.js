require('dotenv').config(); 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const passport = require('passport');
const helmet = require('helmet');
require('./passportConfig');  
const bodyParser = require('body-parser'); 
const authRoutes = require("./routes/authRoutes");
const User = require("./model/User");
const Transaction = require('./model/Transaction');
const app = express();
const { v4: uuidv4 } = require('uuid');


app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "img-src": ["'self'", "data:"],    //optimized Security Enhancements:
      "script-src": ["'self'"],
    },
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true,
  noSniff: true,
  frameguard: { action: 'deny' },
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to the database");
  } catch (err) {
    console.error("Failed to connect to the DB", err);
  }
};

connectDB();

// Auth routes
app.use("/api/auth", authRoutes);


const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); 
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); 
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }); // limit file size for optimization
 

app.post('/addaccount', upload.single('file'), async (req, res) => {
  try {
    const { username, email, amount } = req.body;
    const file = req.file ? req.file.filename : null;

    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

   
    const account_number = uuidv4();

    
    const newAccount = new User({
      username,
      email,
      amount,
      account_number, 
      file 
    });

    await newAccount.save(); 

    res.status(201).json({ message: 'Account created successfully', user: newAccount });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Error creating account', error });
  }
});


app.use('/uploads', express.static(uploadsDir));


app.get("/accounts", async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post("/transaction", async (req, res) => {
  const { From, To, Amount } = req.body;

  try {
  
    const newSender = await User.findOneAndUpdate(
      { account_number: From },
      { $inc: { amount: -Amount } }
    );

    const newReceiver = await User.findOneAndUpdate(
      { account_number: To },
      { $inc: { amount: Amount } }
    );

   
    const transaction = await Transaction.create({
      from: From,
      to: To,
      amount: Amount
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error in transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
