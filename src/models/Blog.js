const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    snippet: {
      type: String,
      required: false,
      default: "N/A",
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: "N/A",
    },
    comments: [
      {
        comment: {
          type: String,
          required: false,
        },
      },
    ],
    author: {
      type: String,
      default: "Burhanuddin Merchant",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
