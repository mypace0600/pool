import User from "../models/User"
import bcrypt from "bcrypt";
import fetch from "node-fetch";

export const getJoin = (req,res)=>{
    res.render("join",{pageTitle:"Join"});
};
export const postJoin = async (req,res)=>{
    const { name, username, email, password, password2} = req.body;
    if(password !==password2){
        return res.status(400).render("join",{
            pageTitle:"Join",
            errorMessage:"password confirmation doesn't match"
        }); 
    }
    const exists = await User.exists({$or:[{username},{email}]});
    if(exists){
        return res.status(400).render("join",{
            pageTitle:"Join",
            errorMessage:"This username or email is already taken"
        });
    }
    try{
        await User.create({
            name,
            username,
            email,
            password,
        });
        return res.redirect("/login");
    } catch(error){
        return res.status(400).render("join",{
            pageTitle:"Join",
            errorMessage:error._message,
        });
    }
};
export const getLogin = (req,res) =>{
    res.render("login",{pageTitle:"Login"});
};
export const postLogin = async (req,res) =>{
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).render("login",{pageTitle:"Login",errorMessage:"account doesn't exists"});
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", {
          pageTitle:"Login",
          errorMessage: "Wrong password",
        });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};

export const startKakaoLogin = (req,res)=>{
    const baseUrl = "https://kauth.kakao.com/oauth/authorize";
    const config = {
        client_id: process.env.KAKAOREST_API_KEY,
        redirect_uri:process.env.KAKAOREDIRECT_URI,
        response_type: "code",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    console.log(finalUrl);
    return res.redirect(finalUrl);
};

export const finishKakaoLogin = async (req,res)=>{
    const baseUrl = "https://kauth.kakao.com/oauth/token";
    const config = {
        client_id:process.env.KAKAOREST_API_KEY,
        grant_type:"authorization_code",
        redirect_uri:process.env.KAKAOREDIRECT_URI,
        code:req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const kakaoTokenRequest = await (
        await fetch(finalUrl, {
            method: "POST",
            headers: {
                "Content-type": "application/json", // 이 부분을 명시하지않으면 text로 응답을 받게됨
            },
        })
    ).json();
    if("access_token" in kakaoTokenRequest) {
        const {access_token} = kakaoTokenRequest;
        const userRequest = await (
            await fetch("https://kapi.kakao.com/v2/user/me", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-type": "application/json",
                },
            })
        ).json();
        console.log(userRequest);
        const email = userRequest.kakao_account.email;
        if(!email){
            return res.redirect("/login");
        }
        const existingUser = await User.findOne({email});
        console.log(existingUser);
        if(existingUser){
            req.session.loggedIn= true;
            req.session.user = existingUser;
            return res.redirect("/");
        } else {
            try{
                const user = await User.create({
                    email:userRequest.kakao_account.email,
                    username:userRequest.kakao_account.profile.nickname,
                    password:"",
                    socialOnly: true,
                    name:userRequest.kakao_account.profile.nickname,
                    avatarUrl:userRequest.kakao_account.profile.thumbnail_image_url
                });
                console.log(user);
                req.session.loggedIn = true;
                req.session.user = user;
                return res.redirect("/");
            } catch(e){
                console.log(e);
                return res.status(400).redirect("/login");
            }
        }
    } else {
        return res.redirect("/login");
    }
};

export const getEdit = (req,res) =>{
    return res.render("edit-profile",{pageTitle:"Edit Profile",user:req.session.user});
};

export const postEdit = async (req,res)=>{
    console.log(req.session);
    const {
        session: {
        user: { _id},
        },
        body: { name, email, username},
    } = req;
    try{
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
            name,
            email,
            username,
            },
            { new: true }
        );
        req.session.user = updatedUser;
        return res.redirect("/user/edit");
    } catch(error){
        console.log(error);
        return res.status(400).redirect("/user/edit");
    }
};

export const myresults = (req,res)=>res.send("My Results");