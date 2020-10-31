const express = require("express");

const app = new express();

const port = process.env.PORT;
const cors = require("cors");
app.use(cors);
app.use(express.json());
const Admin = require("./routers/Admin");
const Blog = require("./routers/Blog");
app.use(Admin);
app.use(Blog);
app.listen(port, () => {
  console.log("Server Up on Port ", port);
});
