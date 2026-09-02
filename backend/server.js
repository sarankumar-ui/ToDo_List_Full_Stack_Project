const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();


const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;




// CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (
      origin === "https://statuesque-dolphin-260563.netlify.app" ||
      /^https:\/\/[a-z0-9-]+--statuesque-dolphin-260563\.netlify\.app$/.test(origin)
    ) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));


//Mongoodb connected
mongoose.connect(process.env.MONGODB_URI, {
  dbName: "TuteDudePro_1",
})
.then(() => {
  console.log("MongoDB connected");
 
})
.catch((error) => {
  console.error("MongoDB connection failed:", error);
});



///user Router
const userRoute = require('./routes/userRoute')
app.use("/api/users", userRoute);


//Task Router
const taskRoute = require('./routes/taskRoute')
app.use("/api/task", taskRoute);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.get ("/", (req, res)=> {
    res.send("Backend connected successfully");
});

