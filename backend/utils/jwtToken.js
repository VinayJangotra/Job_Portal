export const sendToken =(user,statusCode,res,message)=>{
    const token=user.geJWTToken();
    const options={
        expires:(Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
        httpOnly:true
    }
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        user,
        token,
        message
    });
};