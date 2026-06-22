import jwt from "jsonwebtoken"; //import jwt for verifying token
//protect middleware to verify token and protect routes
export const protect = async (req, res, next) => {
  try {
    //read token from header
    const authHeader = req.headers.authorization;

    //check if token is present and starts with Bearer
    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    //extract token from header
    const token = authHeader.split(" ")[1];
    //verify token using jwt.verify and secret key
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    //attach user info to request object for use in controllers
    req.user = {
      id: decoded.id,
    };

    next();
  } catch (error) {
    //invalid token error response
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};