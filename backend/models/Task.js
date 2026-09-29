const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["Pending", "Active", "Completed", "Doing", "Onhold"],
            required: true,
        },
        priority: {
            type: String,
            required: true,
            enum: ["Low", "Medium", "High", "Urgent"],
        },
    },

    {
        timestamps: true,
    }
)

const Task = mongoose.model ("Task", taskSchema);

module.exports = Task;