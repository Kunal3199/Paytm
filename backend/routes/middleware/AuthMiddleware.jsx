const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config.jsx");

const Auth = (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  //   console.log(token);
  //   if (!token) {
  //     return res.status(411).json({ error: "Invalid Token" });
  //   }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);

    if (decoded.userID) {
      req.userID = decoded.userID;
      next();
    } else {
      return res.status(403).json({ error: "Invalid Token" });
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: "Invalid Token" });
  }
};

module.exports = { Auth };
