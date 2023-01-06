const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/user.route.js");
const reviewRoute = require("./routes/review.route.js");

mongoose.set("strictQuery", false);
const app = express();
mongoose.connect("mongodb://127.0.0.1/foodify");
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database Connected..."));

app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/review", reviewRoute);


app.listen(5000, () => console.log("Server up and running..."));
