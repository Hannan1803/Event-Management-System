import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function authenticateToken(req , res , next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log("CALLED INSIDE AUTHETNICATETOKEN FUNCTION");
    if(token == null) return res.sendStatus(401)
    jwt.verify(token , process.env.JWT_SECRET , (err , user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


export function generateAccessToken(user){
    return jwt.sign(user, process.env.JWT_SECRET , {expiresIn
    : '15m'})
}
