// Required modules and services are imported
const express = require("express");
const UserServiceClient = require("../../services/UserServiceClient");

// Express router is instantiated
const router = express.Router();

// Route to render all items in the catalog
router.post("/login", async (req, res) => {
  try {
    const result = await UserServiceClient.authenticate(
      req.body.email,
      req.body.password
    );

    if (result) {
      req.session.token = result;
      req.session.messages.push({
        type: "success",
        text: "You have been logged in!"
      });
    }
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    req.session.messages.push({
      type: "danger",
      text: "Invalid email address or password!"
    });
    return res.redirect("/");
  }
});

router.get("/logout", (req, res) => {
  req.session.userId = null;
  req.session.messages.push({
    type: "success",
    text: "You have been logged out!"
  });
  return res.redirect("/");
});

// Export the router
module.exports = router;
