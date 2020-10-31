const express = require("express");
const router = new express.Router();
const Admin = require("../models/Admin");
const auth = require("../middleware/Authentication");

// admin login path
router.get("/admin/login", async (req, res) => {
  try {
    const admin = await Admin.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await admin.generateAuthToken();
    res.status(200).send({ admin, token });
  } catch (e) {
    res.status(404).send();
  }
});

// admin logout path
router.post("/admin/logout", auth, async (req, res) => {
  try {
    req.admin.tokens = req.admin.tokens.filter((token) => {
      token != req.token;
    });
    await req.admin.save();
    res.send(req.admin);
  } catch (e) {
    res.status(500).send();
  }
});

// admin signup path
router.post("/admin/signup", async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();

    const token = await admin.generateAuthToken();
    res.status(201).send({ admin, token });
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

//delete admin
router.delete("/admin", auth, async (req, res) => {
  try {
    await req.admin.remove();
    res.send(req.admin);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
