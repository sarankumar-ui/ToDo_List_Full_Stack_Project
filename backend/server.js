// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors')

// dotenv.config();


// const app = express();

// const port = process.env.PORT || 4000;




// // CORS
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://statuesque-dolphin-260563.netlify.app",
//       "https://6a99461a5b624f08d42182f7--statuesque-dolphin-260563.netlify.app",
//     ],
//     credentials: true,
//   })
// );


// app.use(express.json());

// //Mongoodb connected
// mongoose.connect(process.env.MONGODB_URI, {
//   dbName: "TuteDudePro_1",
// })
// .then(() => {
//   console.log("MongoDB connected");
 
// })
// .catch((error) => {
//   console.error("MongoDB connection failed:", error);
// });



// ///user Router
// const userRoute = require('./routes/userRoute')
// app.use("/api/users", userRoute);


// //Task Router
// const taskRoute = require('./routes/taskRoute')
// app.use("/api/task", taskRoute);


// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


// app.get ("/", (req, res)=> {
//     res.send("Backend connected successfully");
// });




const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// CORS configuration - added your exact Netlify domain
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://statuesque-dolphin-260563.netlify.app",
      "https://6a99461a5b624f08d42182f7--statuesque-dolphin-260563.netlify.app",
      "https://ephemeral-chimera-0fbe42.netlify.app" // Your live Netlify app
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes
const userRoute = require('./routes/userRoute');
app.use("/api/users", userRoute);

const taskRoute = require('./routes/taskRoute');
app.use("/api/task", taskRoute);

app.get("/", (req, res) => {
  res.send("Backend connected successfully");
});

// Connect to MongoDB FIRST, then start the express server
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "TuteDudePro_1",
  })
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });