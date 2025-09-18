import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  console.log(decoded);
  if (!decoded) return res.status(401).json({ message: "Token is not valid" });

  req.userId = decoded.id;
  next();
};

export default verifyToken;
