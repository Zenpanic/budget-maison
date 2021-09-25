import connectDB from '../../middleware/mongodb';

import Project from '../../models/Project';

const addElement = async ({ element, userId }) => {

    const project = await Project.findOne({ _id: element.projectId });
    if (!project || project.user !== userId) return false;

    project.elements = [...project.elements, element];

    await project.save();

    return project;
};

export default connectDB(addElement);