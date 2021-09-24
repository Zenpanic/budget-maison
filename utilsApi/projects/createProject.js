import connectDB from '../../middleware/mongodb';

import User from '../../models/User';
import Project from '../../models/Project';

const defaultCategories = ['sol', 'murs', 'toit', 'électricité', 'plomberie', 'autres'];

const createProject = async ({ userId }) => {

    const user = await User.findOne({ _id: userId });
    if (!user) return {};

    const project = new Project();
    project.user = String(user._id);
    project.categories = [...defaultCategories];
    project.name = `projet${user.projects.length + 1}`

    await project.save();

    user.projects = [...user.projects, String(project._id)];

    await user.save();

    return project;
};

export default connectDB(createProject);