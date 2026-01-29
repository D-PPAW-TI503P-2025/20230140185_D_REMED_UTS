exports.isAdmin = (req, res, next) => {
  if (req.headers["x-user-role"] !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

exports.isUser = (req, res, next) => {
  const role = req.headers["x-user-role"];
  if (role !== "user" && role !== "admin") {
    return res.status(403).json({ message: "Access restricted to User or Admin" });
  }
  next();
};
