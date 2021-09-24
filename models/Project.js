const mongoose = require('mongoose');

const project = new mongoose.Schema({

    user: {
        type: String,
        default: '',
        required: true
    },
    categories: [String],
    elements: [Object],
    price: {
        type: Number,
        default: 0,
        required: true
    },
    name: {
        type: String,
        default: ''
    }
});

mongoose.models = {};

const Project = mongoose.model('Project', project);

export default Project;