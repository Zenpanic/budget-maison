import connectDB from '../../middleware/mongodb';

import Project from '../../models/Project';

const deleteElement = async (element) => {

    if (!element) return false;

    const project = await Project.findOne({ _id: element.projectId });
    if (!project) return false;

    const elementIndex = project.elements.findIndex(item => {
        return item.id === element.id;
    });

    if (!typeof elementIndex === Number) return false;

    project.elements.splice(elementIndex, 1);

    await project.save();

    return project;
};

export default connectDB(deleteElement);