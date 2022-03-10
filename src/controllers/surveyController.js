
export const surveyList = (req,res) => {
    const surveys = [1,2,3,4,5];
    return res.render("home",{pageTitle:"Home",surveys});
}
export const surveySelected = (req,res) =>{
    console.log(req.params);
    return res.send("Selected Survey");
};
export const surveyCheck = (req,res)=>{
    res.render("check",{pageTitle:"check"});
};
export const surveyResult = (req,res)=>{
    res.render("result",{pageTitle:"result"});
};
export const surveySearch = (req,res) =>res.send("Search Survey");