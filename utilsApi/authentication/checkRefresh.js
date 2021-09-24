import connectDB from '../../middleware/mongodb';
import User from '../../models/User';

const checkRefresh = async ({ token, userId }) => {

    if (!token || !userId) return false;
    const user = await User.findOne({ id: userId });
    if (!user) return false;
    if (!user.refreshTokens.includes(token)) return false;
    return true;
};

export default connectDB(checkRefresh);