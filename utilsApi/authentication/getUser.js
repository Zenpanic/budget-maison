import connectDB from '../../middleware/mongodb';

import User from '../../models/User';

const getUser = async ({ username, password }) => {

    if (!username || !password) return;

    const user = await User.findOne({ username: username });
    if (!user) return;

    const success = password === user.password;

    if (!success) return;

    return ({ username: user.username, id: user._id, role: user.role });
};

export default connectDB(getUser);