const REST_API_KEY="4115ab95c06716915154b9192248054b";
const REDIRECT_URI="http://localhost:7000/oauth/callback/kakao";
export const oauthKakao = (req,res)=>{
    const KakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    return res.render("login",{pageTitle:"Login",KakaoUrl});
}