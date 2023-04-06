const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");

// Database connection
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// routes
app.use("/users", require("./routes/userRoutes"));
app.use("/task", require("./routes/taskRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
