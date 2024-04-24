// import { catchAsyncError } from "./catchAsyncError";
import jwt from "jsonwebtoken";
import { errorMiddleware } from "./error.js";
import { User } from "../models/userSchema.js";

// Check if user is authenticated or not
export const isAuthenticated = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new errorMiddleware("Login first to access this resource.", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = User.findById(decoded.id);
  next();
};