import connectDB from '../../middleware/mongodb';

import User from '../../models/User';

const createUser = async ({
    username,
    email,
    password,
}) => {

    console.log(username, email, password)

    if (!username || !password || !email) return ({ message: 'missing_fields' });

    const clone = await User.findOne({ $or: [{ email: email }, { username: username }] });
    if (clone) {
        return 'clone';
    };

    const user = new User();

    user.username = username;
    user.email = email;
    user.password = password;

    await user.save();

    return { id: user._id, username: user.username };
};

export default connectDB(createUser);