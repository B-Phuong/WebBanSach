const jwt = require('jsonwebtoken');
const JWT_SECRET = 'aomalazadanobitadamvomomshizuka'
exports.requireSignin = (req, res, next) =>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
    }else{
        return res.status(400).json({message: 'Authorization required'});
    }
    next();
}

exports.userMiddleware =(req, res, next) =>{
    if(req.user.role!=='user'){
        return res.status(400).json({message:'Bạn không có quyền!!'})
    }
    next();
}

exports.adminMiddleware =(req, res, next) =>{
    if(req.user.role!=='admin'){
        return res.status(400).json({message:'Bạn không có quyền!!'})
    }
    next();
}