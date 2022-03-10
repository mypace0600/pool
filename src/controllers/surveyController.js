const fakeUser = {
    username:"nuci",
    loggedIn:true,
};

export const surveyList = (req,res) => 
    res.render("home",{pageTitle:"Home" , fakeUser});
    
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