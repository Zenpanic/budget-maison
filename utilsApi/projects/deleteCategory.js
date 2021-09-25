import connectDB from '../../middleware/mongodb';

import Project from '../../models/Project';

const deleteCategory = async ({ category, projectId, userId }) => {

    if (!category || !projectId || !userId) return false;

    const project = await Project.findOne({ _id: projectId });

    if (!project || project.user !== userId) return false;

    const index = project.categories.findIndex(item => {
        return item === category;
    });

    if (!typeof index === Number) return false;

    project.categories.splice(index, 1);

    const newElements = project.elements.filter(element => {
        return element.category !== category;
    });

    project.elements = [...newElements];

    await project.save();

    return project;
};

export default connectDB(deleteCategory);