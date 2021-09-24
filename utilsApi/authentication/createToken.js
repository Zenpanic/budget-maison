import connectDB from '../../middleware/mongodb';
import User from '../../models/User';
const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_LIFESPAN;
const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_LIFESPAN;

const createToken = async ({ username, id, tokenType }) => {

    const user = await User.findOne({ _id: id, username: username });

    if (tokenType === 'access') {
        const token = jwt.sign(
            { username: username, id: id },
            ACCESS_TOKEN_SECRET,
            { expiresIn: `${ACCESS_TOKEN_EXPIRES}m` });
        if (!token) return;
        let tokenExpiry = new Date();
        tokenExpiry.setTime(tokenExpiry.getTime() + (ACCESS_TOKEN_EXPIRES * 60 * 1000));
        return { token: token, tokenExpiry: tokenExpiry };
    };

    if (tokenType === 'refresh') {
        const token = jwt.sign(
            { username: username, id: id },
            REFRESH_TOKEN_SECRET,
            { expiresIn: `${REFRESH_TOKEN_EXPIRES}m` });
        if (!token) return;

        // Add the refresh token to the user
        if (!user) return;
        user.refreshTokens = [...user.refreshTokens, token];
        await user.save();
        return { token: token };
    };

    return;
};

export default connectDB(createToken);