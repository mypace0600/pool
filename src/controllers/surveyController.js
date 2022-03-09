export const surveyList = (req,res) => res.render("home");
export const surveySelected = (req,res) =>{
    console.log(req.params);
    return res.send("Selected Survey");
};
export const surveyCheck = (req,res)=>{
    console.log(req.params);
    return res.send("Survey Check page");
};
export const surveyResult = (req,res)=>{
    console.log(req.params);
    return res.send("Survey Result page");
};
export const surveySearch = (req,res) =>res.send("Search Survey");