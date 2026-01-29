exports.isAdmin = (req, res, next) => {
  if (req.headers["x-user-role"] !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

exports.isUser = (req, res, next) => {
  if (req.headers["x-user-role"] !== "user") {
    return res.status(403).json({ message: "User access only" });
  }
  next();
};
