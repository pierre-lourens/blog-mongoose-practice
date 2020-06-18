// setup
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const request = require("request");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// connect to the correct mongoose database
mongoose.connect("mongodb://localhost/blog-practice");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const commentSchema = new mongoose.Schema({
  text: String,
  username: String,
});

const postSchema = new mongoose.Schema({
  text: String,
  username: String,
  comments: [commentSchema],
});

const PostModel = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);

app.listen(3001, () => {
  console.log("server up and running on port 3001");
});

// begin creating data to save to database

// create the post
const aPost = new PostModel({ username: "Pierre", text: "Hi!" });

// add a comment to the post
aPost.comments.push({ username: "Bob", text: "Great Post!" });

// save the post with the comment already pushed
aPost.save((err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
