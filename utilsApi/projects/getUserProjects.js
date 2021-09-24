import connectDB from '../../middleware/mongodb';

import User from '../../models/User';
import Project from '../../models/Project';

const getUserProjects = async ({ userId }) => {

    const user = await User.findOne({ _id: userId });
    if (!user?.projects) return [];

    const projectList = await Project.find({ user: user._id });

    if (!projectList?.length) return [];

    return projectList;
};

export default connectDB(getUserProjects);