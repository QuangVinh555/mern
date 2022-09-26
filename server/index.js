require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const route = require('./routes');

const app = express();
app.use(express.json())
app.use(cors());

const connectDB = async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/mern-fullstack')
        console.log('Connect successfully!');
    } catch (error) {
        console.log('Connect failure!');
        process.exit(1); // Thoát khỏi kết nối
    }
}

// kết nối db
connectDB();

// mvc (route)
route(app);

const PORT = 5000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));