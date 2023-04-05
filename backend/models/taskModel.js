const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    Title: {
      type: String,
      required: [true, "Please add task title"],
    },
    Description: {
      type: String,
      required: [true, "Please add Description"],
    },

    assignedto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
