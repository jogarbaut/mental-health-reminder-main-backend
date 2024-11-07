const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const entryRoutes = require('./routes/EntryRoutes')

const dotenv = require('dotenv')
dotenv.config()

// Express app
const app = express()
app.use(cors());
app.use(express.json())

mongoose.connect(process.env.MONGODB_CONNECT_STRING, {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.use(entryRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
