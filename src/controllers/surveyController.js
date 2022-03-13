
let surveys = [
    {
        title:"knowledge workers",
        img: "#",
        rating: 4.5,
        people: 999,
        shared: 800,
        id:1,
        questions:{
            q1:"나는 목표를 정할 때 주로 조직과 상사의 지시를 따르기보다 스스로 결정한다.",
            q2:"나는 전문성을 갖기 위해 다양한 방면을 알아가기보다 한 분야에 몰두한다.",
            q3:"나의 직무 목표는 전문화이기보다 경영에 있다.",
            q4:"나는 공헌을 세울 기회에 초점을 맞추기보다 경험을 따른다.",
            q5:"나는 무엇인가를 할 때 목표와 자율성을 갖기보다 할당량과 메뉴얼을 따른다."
        }
    },
    {
        title:"feedback",
        img: "#",
        rating: 4,
        people: 870,
        shared: 700,
        id:2,
        questions:{
            q1:"are you happy now?",
            q2:"are you hungry?",
            q3:"are you okay?"
        }
    },
];


let resultNum;
export const surveyList = (req,res) => {
    return res.render("home",{pageTitle:"Home",surveys});
}

export const getSurveyCheck = (req,res)=>{
    const {id} = req.params;
    const survey=surveys[id-1];
    const surveyQ = survey.questions;
    return res.render("check",{pageTitle:`${survey.title}`,survey,surveyQ});
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