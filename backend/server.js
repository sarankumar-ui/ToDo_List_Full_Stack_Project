const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();


const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;




// CORS
const allowedOrigins = [
  "https://statuesque-dolphin-260563.netlify.app",
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);


//Mongoodb connected
mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'TuteDudePro_1'
})
.then(() => {
    console.log('mongoDB connected')
}).catch((error) => {
    console.log('mongoDB not connected')
});


///user Router
const userRoute = require('./routes/userRoute')
app.use("/api/users", userRoute);


//Task Router
const taskRoute = require('./routes/taskRoute')
app.use("/api/task", taskRoute);


app.get ("/", (req, res)=> {
    res.send("Backend connected successfully");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});