const router = require("express").Router();
const loginController = require("../../controllers/loginController");

// Matches with "/api/login"
router.route("/signup")
  .post(loginController.create);

  router.route("/authenticate")
  .post(loginController.authenticate);

  router.route("/")
  .post(loginController.login);

module.exports = router;
