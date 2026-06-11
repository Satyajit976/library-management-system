import jwt from 'jsonwebtoken';

const adminAuthMiddleware= async(req,res,next)=>{
    try {
        const authHeader= req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({message:'No token is provided!!!!!'});
        }

        const token=authHeader.split(' ')[1];
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.adminId=decode.adminId;
        next();

    } catch (error) {
        return res.status(401).json({message:'Invalid Admin token!!!!!'});
    }
}

export default adminAuthMiddleware;