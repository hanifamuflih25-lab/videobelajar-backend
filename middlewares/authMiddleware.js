import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // AMBIL HEADER
    const authHeader = req.headers.authorization;

    // CEK ADA TOKEN ATAU TIDAK
    if (!authHeader) {
      return res.status(401).json({
        message: "Access denied. No token provided",
      });
    }

    // FORMAT: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    // VERIFY TOKEN
    jwt.verify(token, process.env.JWT_SECRET);

    // LANJUT KE ENDPOINT
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Authentication failed",
    });
  }
};