const express= require("express");
const app = express();
const users = require("./routes/user.js");
const posts=  require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path= require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionOption= {  //In any request(such as post,get,put...) session_id will be save within the browser in the form of cookie
    secret:"mysupersecretstring ",
     resave:false,
     saveUninitialized:true,
    };
    
app.use(session(sessionOption));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

app.get("/register",(req,res)=>{
    let {name = "apnaSystem"}=req.query;
    req.session.name = name;
    if(name === "apnaSystem"){
        req.flash("error","user not registered");
    }
    else{
        req.flash("success","user registered successful!");  //here flash is created within the request
    }
   res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.render("page.ejs", {name: req.session.name});
});


// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count=1;
//     }

//     res.send(`you sent a request ${req.session.count} times`);
// });

// app.get("/test",(req,res)=>{
//     res.send("test successful!");
// });

//const cookieParser = require("cookie-parser");

// app.use(cookieParser("code"));  //"code" is secret code for signed

// app.get("/getsignedcookies",(req,res)=>{
//     res.cookie("name","apna",{signed:true});
//     res.send("This is signed cookies");
// });

// app.get("/verify",(req,res)=>{    //here verify isuse to check the temperating within the cookie
//     //console.log(req.cookies); //It is use to print the unsined cookie
//     console.log(req.signedCookies);  //It is use to print the signed cookies
//     res.send("verifed");
// });

// app.get("/getcookies",(req,res)=>{
//  res.cookie("greet","hello");
//  res.send("sent you some cookies");
// }); 

// app.get("/greet",(req,res)=>{
//     let {name="Supriya"}= req.cookies;
//     res.send(`Hi,${name}`);
// });

// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("Hi,I am root!");
// });

 app.use("/users",users);
 app.use("/posts",posts);

app.listen(3000,()=>{
    console.log("server is listening to 3000");
});