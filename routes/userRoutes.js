const express = require("express");
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");

const router = express.Router();

/*========================================================== */

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

// app.use("/api/v1/tours", router);

/*========================================================== */
module.exports = router;
