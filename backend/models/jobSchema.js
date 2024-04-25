import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title:{
      type: String, 
      required: [true, 'Please enter job title'],
      minLength: [5, 'Title must be at least 5 characters long'],
      maxLength: [100, 'Title cannot exceed 100 characters']
    },
    description:{
      type: String,
      required: [true, 'Please enter job description'],
      minLength: [10, 'Description must be at least 10 characters long'],
      maxLength: [1000, 'Description cannot exceed 1000 characters']
    },
    category:{
        type:String,
        required: [true, 'Please select a category']
    },
    country:{
        type:String,
        required: [true, 'Please select a country']
    },
    city:{
        type:String,
        required: [true, 'City is required']
    },
    location:{
        type:String,
        required: [true, 'Location is required'],
        minLength: [5, 'Location must be at least 50 characters long'],
    },
    fixedSalary:{
        type: Number,
        minLength: [4, 'Salary must be at least 4 characters long'],
        maxLength: [10, 'Salary cannot exceed 10 characters'],
    },
    salaryFrom:{
        type: Number,
        minLength: [4, 'Salary must be at least 4 characters long'],
        maxLength: [10, 'Salary cannot exceed 10 characters'],
    },
    salaryTo:{
        type:Number,
        minLength: [4, 'Salary must be at least 4 characters long'],
        maxLength: [10, 'Salary cannot exceed 10 characters'],
    },
    expired:{
        type: Boolean,
        default: false
    },
    jobPostedOn:{
        type: Date,
        default: Date.now
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
})
export const Job = mongoose.model('Job', jobSchema);