let express = require("express");
let router = express.Router();
let Resource = require("../models/Resource");
let { verifyToken, requireRole } = require("../middlewares/auth");
const { verify } = require("jsonwebtoken");

// Add resource (can be added by any authentiated user)

router.post("/add-resource", verifyToken, async (req, res) => {
  let { title, description } = req.body;
  let resource = await Resource.create({
    title,
    description,
    owner: req.user.id,
  });
  res.status(201).json({ msg: "Resource created", resource });
});

//Get all resources

router.get("/resources", verifyToken, async (req, res) => {
  let resorce = await Resource.find();
  res.status(200).json({ msg: "Resources list: ", resorce });
});
//Update te resource (Admin and moderator can delete the resource)

router.patch(
  "/update-resorce/:id",
  verifyToken,
  requireRole(["admin", "moderator"]),
  async (req, res) => {
    let updated = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ msg: "Resource Updated", updated });
  }
);

// Delete a resource (Admin can only delete the resource)

router.delete(
  "/delete-resource/:id",
  verifyToken,
  requireRole("admin"),
  async (req, res) => {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ msg: "Resource Deleted" });
  }
);

module.exports = router;
