import Survey from "../models/Survey"; 

let resultNum;

export const home = async (req,res) => {
    const surveys = await Survey.find({});
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
        return res.render("upload", {
            pageTitle: "Upload Survey",
            errorMessage: error._message,
        });
    }
};




export const getSurveyCheck = async (req,res)=>{
    const {id} = req.params;
    const survey = await Survey.findById(id);
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
export const surveySearch = (req,res) =>res.send("Search Survey");