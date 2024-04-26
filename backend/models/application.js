 import mongoose from 'mongoose';
 import validator from 'validator';

 const applicationSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        minLength: [5, 'Name must be at least 5 characters long'],
        maxLength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    coverLetter: {
        type: String,
        required: [true, 'Cover letter is required'],
        minLength: [20, 'Cover letter must be at least 20 characters long'],
        maxLength: [1000, 'Cover letter cannot exceed 1000 characters']
    },
    phone: {
        type: Number,
        required: [true, 'Phone number is required'],
        minLength: [10, 'Phone number must be at least 10 characters long'],
        maxLength: [15, 'Phone number cannot exceed 15 characters']
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        minLength: [10, 'Address must be at least 10 characters long'],
        maxLength: [100, 'Address cannot exceed 100 characters']
    },
    resume: {
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        },
    },
    applicantID:{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role:{
            type:String,
            enum:["Job Seeker"],
            required: true
        }  
        },
    employerID:{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            //  required: true
        },
        role:{
            type:String,
            enum:["Employer"],
            required: true
        }    
    },
});
export const Application = mongoose.model('Application', applicationSchema);   

     