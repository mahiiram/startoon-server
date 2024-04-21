import mongoose from "mongoose";

export const AdminSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required : true,
        unique: true,
    },
});

const AdminModel = mongoose.model('Admin',AdminSchema);
export default AdminModel;