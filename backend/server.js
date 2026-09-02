const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();


const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;

// app.use(cors({
// //   origin: "http://localhost:5173",
//     origin: "https://6a981a8b85d6f4559dbbbb0c--statuesque-dolphin-260563.netlify.app",
// //   credentials: true,
// }));


// CORS
const allowedOrigins = [
  "https://statuesque-dolphin-260563.netlify.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin
      // (Postman, server-to-server, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
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