import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
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
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(fileUpload({
   useTempFiles:true,
   tempFileDir:'/tmp/', 
}))
export default app;