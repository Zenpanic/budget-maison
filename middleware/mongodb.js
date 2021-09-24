import mongoose from 'mongoose';

const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(process.env.DATABASE_URI, err => {
        if (err) throw err;
        console.log('connected to MongoDB');
    });
    return handler(req, res);
};

export default connectDB;