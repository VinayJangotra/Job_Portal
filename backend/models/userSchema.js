import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "can't be blank"] },
  email: {
    type: String, unique: true, required: true, lowercase: true, validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error({ error: 'Invalid Email address' });
      }
    },
  },
  phone: { type: Number, required: [true, "can't be blank"]},
  password: { type: String, required:[true,"can't be blank"], minLength: 6, select: false},
  role:{
    type: String,
    enum: ['Job Seeker', 'Employer'],
    required: true,
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
}); 
//HAshing before saving the password
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});
// Comparing password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
// Generating token for authentication
userSchema.methods.geJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY,{
    expiresIn: process.env.JWT_EXPIRE,
  });
};
export const User = mongoose.model('User', userSchema);