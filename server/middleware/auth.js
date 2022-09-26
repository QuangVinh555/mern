const jwt = require('jsonwebtoken');
   

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    // Authorization khi gui len duoi dang client se co dang 1 string gom: Beaer [Token]
    // de lay token ra thi bo khoang trang va lay ra item thu 2
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        return res.status(401).json({ status: false, message: 'Access token not found' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ status: false, message: 'Invalid Token'});
    }
}
module.exports = verifyToken;