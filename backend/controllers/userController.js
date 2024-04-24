import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { errorMiddleware, ErrorHandler } from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";
export const register = catchAsyncError(async (req, res, next) => {
console.log(req.body);
  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !phone || !password || !role) {
    return next(new errorMiddleware("All fields are required", 400));
  }

  //checking if the user is already registered or not
  let user = await User.findOne({ email });
  if (user) return next(new errorMiddleware("User already exists", 400));

  //create and save a new user to database
  user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  });
  // Send token
    sendToken(user, 200, res, "User registered successfully");
});
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password,role } = req.body;

  //check if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  //finding user in database
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  //check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  if(user.role!==role){
    return next(new ErrorHandler("Invalid Role", 401));
  }

  // Send token
  sendToken(user, 200, res, "User logged in successfully");
});
// Logout 
export const logout = catchAsyncError(async (req,res,next)=>{
    res
    .status(201)
    .cookie("token","",{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    .json({
        success:true,
        message:"Logged out"
    });
})