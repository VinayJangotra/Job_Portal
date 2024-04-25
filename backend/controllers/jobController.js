import {catchAsyncError} from "../middlewares/catchAsyncError.js"
import {ErrorHandler} from "../middlewares/error.js"
import { Job } from "../models/jobSchema.js";

// Get all the jobs => /api/v1/jobs
export const getAllJobs = catchAsyncError(async (req, res, next) => {
    const jobs = await Job.find();
    res.status(200).json({
        success: true,
        jobs
    })
})
export const postjobs = catchAsyncError(async(req,res,next)=>{
    const {role}=req.user;
    if(role==="Job Seeker"){
        return next(new ErrorHandler("Only employer can post job",403))
    }
    const {title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo}=req.body;
    
    // Validate input fields for job posting 
    if(!title || !description  ||   !category || !country || !city || !location){
        return next(new ErrorHandler('please provide all the details',400))
    }
        if((!salaryFrom || !salaryTo) && !fixedSalary){
            return next(new ErrorHandler('please provide the fixed salary or ranged salary',400))
        }
    if(salaryFrom && salaryTo && fixedSalary){
        return next(new ErrorHandler('please provide only one type of salary',400))
    }
    const postedBy=req.user._id;
    console.log(postedBy);
    const job = await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy
    })
    res.status(200).json({
        success: true,
        job
    });
});
// Get all the jobs of the employer
export const getmyJobs = catchAsyncError(async(req,res,next)=>{
    const {role}=req.user;
    if(role==="Job Seeker"){
        return next(new ErrorHandler("Only employer can see their jobs",403))
    }
    const myJobs= await Job.find({postedBy:req.user._id});
    res.status(200).json({
        success: true,
        myJobs
    });
});

//  update the job
export const updateJob = catchAsyncError(async(req,res,next)=>{
    let job = await Job.findById(req.params.id);
    if(!job){
        return next(new ErrorHandler('Job not found',404));
    }
    if(job.postedBy.toString()!==req.user._id.toString()){
        return next(new ErrorHandler('You are not authorized to update this job',403));
    }
    job = await Job.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success: true,
        job,
        message: 'Job updated successfully'
    });
});
// delete the job
export const deleteJob = catchAsyncError(async(req,res,next)=>{
    const {role}=req.user; 
    if(role==="Job Seeker"){
        return next(new ErrorHandler("Only employer can delete job",403))
    }
    let job = await Job.findById(req.params.id);
    if(!job){
        return next(new ErrorHandler('Job not found',404));
    }
    if(job.postedBy.toString()!==req.user._id.toString()){
        return next(new ErrorHandler('You are not authorized to delete this job',403));
    }
    await job.deleteOne();
    res.status(200).json({
        success: true,
        message: 'Job deleted successfully'
    });
});