
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;



app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());


const userRoute = require('./routes/userRoute');
app.use("/api/users", userRoute);

const taskRoute = require('./routes/taskRoute');
app.use("/api/task", taskRoute);

app.get("/", (req, res) => {
  res.send("Backend connected successfully");
});


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