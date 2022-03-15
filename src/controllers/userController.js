import User from "../models/User"
import bcrypt from "bcrypt";

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
export const logout = (req,res) =>res.send("log out");
export const profile = (req,res) =>res.send("my profile");
export const myresults = (req,res)=>res.send("My Results");