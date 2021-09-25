import connectDB from '../../middleware/mongodb';

import Project from '../../models/Project';

const addCategory = async ({ newName, userId, projectId }) => {

    const project = await Project.findOne({ _id: projectId });
    if (!project || project.user !== userId) return false;

    if (project.categories.includes(newName.toLowerCase())) return false;

    project.categories = [...project.categories, newName.toLowerCase()];

    await project.save();

    return project;
};

export default connectDB(addCategory);