const User = require("../models/user");

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('user_sign_in',{
        title: 'Sign In'
    })
}

module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('user_sign_up',{
        title: 'Sign Up'
    })
}


// get the signup data
module.exports.create = function(req,res){
    // the below code is manual authentication
    if(req.body.password!= req.body.confirm_password){
        return res.redirect('back')
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('error in finding user in sining up');return}

        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('error is creating user while signing up'); return}
                return res.redirect('/users/sign-in')
            })
        }else{
            return res.redirect('back');
        }
    })
}

module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(){
        
    });
    return res.redirect('/');
}