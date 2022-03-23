import mongoose from "mongoose";


const resultSchema = new mongoose.Schema({
    title:{type:String, required:true, maxLength: 80, trim: true},
    descriptions:[{ type: String, trim: true }],
    createdAt:{type:Date, required:true, default:Date.now},
})

const Result = mongoose.model("Result",resultSchema);
export default Result;