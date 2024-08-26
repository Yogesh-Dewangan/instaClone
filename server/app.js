const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Post = require("./model/Post");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const path = require("path");
const process = require("process");

const PORT = process.env.PORT || 8000;
const URL = process.env.MONGODB_URL || "mongodb://localhost:27017/instaclone";
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

mongoose.set("strictQuery", false);

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

const app = express();

app.use(fileUpload({ useTempFiles: true }));
app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

// console.log(url);
mongoose
  .connect(URL)
  .then(() => console.log("mongoose is up"))
  .catch((err) => console.log(err));

app.get("/post/view", async (req, res) => {
  const post = await Post.find();

  try {
    res.status(200).json({
      status: "Success",
      data: post,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      error: e,
      message: e.message,
    });
  }
});

app.post("/post/create", async (req, res) => {
  // console.log(req.body.author);
  const file = req.files.PostImage;
  // console.log(file);
  try {
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const post = await Post.create({
          PostImage: result.url,
          author: req.body.author,
          location: req.body.location,
          description: req.body.description,
        });
        res.status(200).json({
          status: "Success",
          post,
        });
      }
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      error: e,
      message: e.message,
    });
  }
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname + "/public")));
}

app.listen(PORT, () => console.log(`Server is up at ${PORT} port`));
