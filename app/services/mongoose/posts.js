import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    by:{
        type: {},
        required: true
    },
    likedBy: {
        type:  [],
        default:[]
    },
    desc: String,
    photo: String,
    comments :{
        type:  [],
        default:[]
    },
    createdAt: {
        type: String,
        default: new Date 
    }
});

const postModel = mongoose.model('Post', postSchema);

export default postModel;