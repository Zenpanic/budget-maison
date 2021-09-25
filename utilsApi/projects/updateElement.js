import connectDB from '../../middleware/mongodb';

import Project from '../../models/Project';

const updateElement = async ({ element, userId }) => {

    if (!element) return false;

    const project = await Project.findOne({ _id: element.projectId });
    if (!project || project.user !== userId) return false;

    const elementIndex = project.elements.findIndex(item => {
        return item.id === element.id;
    });

    if (!typeof elementIndex === Number) return false;

    project.elements[elementIndex] = { ...element };

    await project.save();

    return project;
};

export default connectDB(updateElement);