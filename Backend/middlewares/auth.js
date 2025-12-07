let jwt = require("jsonwebtoken");
let user = require("../models/User");
exports.verifyToken = async (req, res, next) => {
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ msg: "No Token provided" });
    const token = authHeader.split(" ")[1];

  try {
    let payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Inavalid Token" });
  }
};

exports.requireRole = (roles = []) => {
  if (typeof roles == "string") roles = [roles];
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ msg: "Not Autenticated" });
    if (!roles.includes(req.user.role))
      return res.status(403).json({ msg: "Forbidden" });
    next();
  };
};
