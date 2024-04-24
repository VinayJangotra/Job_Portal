import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRouter.js";
import jobRouter from "./routes/jobRouter.js";
import { dbConnection } from './database/dbConnection.js';
import { errorMiddleware } from './middlewares/error.js';
// Configuring the environment variables
const app = express();
dotenv.config({ path: "./config/config.env" });
// add the methods that we want to allow cross-origin access to our API from other origins
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true,
}));
app.use(cookieParser()); // parse cookies
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true})); // for parsing application/x-www-form-urlencoded
app.use(fileUpload({
   useTempFiles:true,
   tempFileDir:'/tmp/', 
}));
// Mounting the routers
app.use("/api/v1/user", userRouter);
app.use('/api/v1/application', applicationRouter);
app.use('/api/v2/job', jobRouter);

// Database connection
dbConnection();
// Error handling middleware
app.use(errorMiddleware);
export default app;