import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {

  const token = req.cookies.token;

  //checking whether the user trying to login have token or not:-
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;//assiging id to frontend and calling next function.
    next();
  } 
  
  catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
