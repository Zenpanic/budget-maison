import connectDB from '../../middleware/mongodb';

import Project from '../../models/Project';

const renameCategory = async ({ newName, oldName, projectId, userId }) => {

    if (!newName || !oldName || !projectId || !userId) return false;

    const project = await Project.findOne({ _id: projectId });

    if (!project || project.user !== userId || project.categories.includes(newName.toLowerCase())) return false;

    const index = project.categories.findIndex(category => {
        return category === oldName;
    });

    if (!typeof index === Number) return false;

    project.categories[index] = newName.toLowerCase();

    const newElements = project.elements.map(element => {
        if (element.category === oldName) {
            element.category = newName.toLowerCase();
        };
        return element;
    });

    project.elements = [...newElements];

    await project.save();

    return project;
};

export default connectDB(renameCategory);