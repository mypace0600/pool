import Survey from "../models/Survey"; 

let resultNum;

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

export const getSurveyCheck = async (req,res)=>{
    const {id} = req.params;
    const survey = await Survey.findById(id);
    if(!survey){
        return res.status(404).render("404",{pageTitle:"Nothing found"});
    }
    const surveyQ = survey.questions;
    console.log(surveyQ);
    const surveyQobj = {...surveyQ};
    console.log(surveyQobj);
    return res.render("check",{pageTitle:survey.title,survey,surveyQobj});
};
export const postSurveyCheck = (req,res) =>{
    const {id} = req.params;
    console.log(id);
    const result = Object.values(req.body);
   
    let totalSum=0;
    for(let i=0;i<result.length;i++){
        totalSum+=Number(result[i]);
    }
    resultNum=totalSum;
    console.log(resultNum);
    return res.redirect("result");
};

export const surveyResult = (req,res)=>{
    res.render("result",{pageTitle:"result",resultNum});
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