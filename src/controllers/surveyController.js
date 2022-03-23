import Survey from "../models/Survey"; 
import Result from "../models/Results";
import res from "express/lib/response";



export const home = async (req,res) => {
    const surveys = await Survey.find({}).sort({rating:"desc"});
    return res.render("home",{pageTitle:"Home",surveys});
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Survey" });
};

export const postUpload = async (req, res) => {
    const { title, description, questions } = req.body;
    try{
        await Survey.create({
            title,
            description,
            questions:questions.split(",").map((word) => `${word}`),
        });
        return res.redirect("/");
    } catch(error){
        console.log(errorMessage);
        return res.status(400).render("upload", {
            pageTitle: "Upload Survey",
            errorMessage: error._message,
        });
    }
};

export const getResultUpload = (req,res) =>{
    return res.render("result",{pageTitle:"Upload Result"});
};

export const postResultUpload = async (req,res)=>{
    const {title,descriptions} = req.body;
    try{
        await Result.create({
            title,
            descriptions,
        });
        return res.redirect("/");
    } catch(error){
        console.log(errorMessage);
        return res.status(400).render("result", {
            pageTitle: "Upload Result",
            errorMessage: error._message,
        });
    }
};

export const getSurveyCheck = async (req,res)=>{
    const {id} = req.params;
    const survey = await Survey.findById(id);
    if(!survey){
        return res.status(404).render("404",{pageTitle:"Nothing found"});
    }
    const surveyQ = survey.questions;
    const surveyQobj = {...surveyQ};
    return res.render("check",{pageTitle:survey.title,survey,surveyQobj});
};

let resultNum;
export const postSurveyCheck = (req,res) =>{
    const result = Object.values(req.body);
    let totalSum=0;
    for(let i=0;i<result.length;i++){
        totalSum+=Number(result[i]);
    }
    resultNum=totalSum;
    console.log(resultNum);
    return res.render("result-page");
};

export const surveyResult = async (req,res)=>{
    const {id} = req.params;
    console.log(id);
    const survey = await Survey.findById(id);
    const surveyQ = survey.questions;
    let cnt = surveyQ.length;
    res.render("result",{pageTitle:"result",resultNum,cnt});
};

export const getDelete = async (req,res)=>{
    const {id} = req.params;
    await Survey.findByIdAndDelete(id);
    return res.redirect("/");
};
export const search = async (req,res) =>{
    const {keyword} = req.query;
    let surveys = [];
    if(keyword){
        surveys = await Survey.find({
            title:{$regex: new RegExp(keyword, "i")},
        });
    } 
    console.log(surveys);
    return res.render("search",{pageTitle:"Search",surveys});
};