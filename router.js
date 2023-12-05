var express = require("express");
var router = express.Router();

const credential = {
    email:"admin@gmail.com",
    password:"saab123"
}

//login page
router.get('/', (req, res)=>{
    if(req.session.user){
        res.redirect('/home')
    }else{
    res.render('base',{title: "Login System",text2:''});
    }
})

//login user
router.post('/login',(req,res)=>{
    
    if(req.body.email== credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('/home');
       
    }else{
        res.render('base',{title:'',text2: "Invalid user"});
    }
});

const cards=[
    { num:1,
        img:'/assets/caribbean.jpg',
        text:"first movie",
        button:"Lets Watch"
    
    },
    { num:2,
        img:'/assets/magic.jpg',
        text:"second movie",
        button:"Lets Watch"
    
    }
    ]
//route for dashboard
router.get('/home',(req,res)=>{
    if(req.session.user){
        res.render('homepage',{user:req.session.user,cards})
    }else{
        res.redirect("/")
    }
})

//route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send('Error')
        }else{
           res.redirect('/') 
        }
    })
})


module.exports = router;