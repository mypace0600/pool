import User from "../models/User"

export const getJoin = (req,res)=>{
    res.render("join",{pageTitle:"Join"});
};
export const postJoin = async (req,res)=>{
    const { name, username, email, password} = req.body;
    await User.create({
        name,
        username,
        email,
        password,
    });
    return res.redirect("/login");
};
export const login = (req,res) =>res.send("log in page");
export const logout = (req,res) =>res.send("log out");
export const profile = (req,res) =>res.send("my profile");
export const myresults = (req,res)=>res.send("My Results");