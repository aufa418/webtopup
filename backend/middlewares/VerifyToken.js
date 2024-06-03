const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']; // variable ini berisi token yang seharusnya diterima dengan http request
    const token = authHeader && authHeader.split(' ')[1]; // variable ini merupakan kondisi, dimana jika auth header memiliki data. maka variable ini akan berisi
    if (!token) return res.sendStatus(401);

    const AccessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    jwt.verify(token, AccessTokenSecret, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.email = decoded.email;
        req.password = decoded.password;
        next();
    });
}

module.exports = { verifyToken };
