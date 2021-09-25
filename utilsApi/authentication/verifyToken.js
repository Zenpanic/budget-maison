const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const verifyToken = (authorization, type) => {

    let token;
    let decoded;

    if (type === 'accessToken') {
        const headerArray = authorization.split(' ');
        token = headerArray[1];
        decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

    };
    if (type === 'refreshToken') {
        token = authorization;
        decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
    };

    return decoded;
};

export default verifyToken;