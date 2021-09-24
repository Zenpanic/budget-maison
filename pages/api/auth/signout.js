import connectDB from '../../../middleware/mongodb';
import User from '../../../models/User';
import verifyToken from '../../../utilsApi/authentication/verifyToken';

const handler = async (req, res) => {
    if (req.method === 'GET') {
        if (!req.headers.authorization) return res.json({ message: 'error' });
        const token = verifyToken(req.headers.authorization, 'accessToken');
        if (!token.id) return res.json({ message: 'error' });

        const user = await User.findOne({ _id: token.id });

        user.refreshTokens = [];

        await user.save();

        return res.json({ message: 'ok' });
    };
};

export default connectDB(handler);