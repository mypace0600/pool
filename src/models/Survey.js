import mongoose from "mongoose";

const surveySchema = new mongoose.Schema({
    title:{type:String, required:true, maxLength: 80, trim: true},
    description:{type:String, required:true, minLength: 20, trim: true},
    createdAt:{type:Date, required:true, default:Date.now},
    questions:[{type:String, trim: true}],
    meta:{
        people:{ type: Number, default: 0, required: true },
    }
});

const Survey = mongoose.model("Survey",surveySchema);
export default Survey;