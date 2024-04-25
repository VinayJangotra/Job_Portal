// import { catchAsyncError } from "./catchAsyncError";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "./error.js";
import { User } from "../models/userSchema.js";

// Check if user is authenticated or not
export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  next();
}; 