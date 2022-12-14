const User = require("../models/user");

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(arr,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user,
        });

    });
    
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
            return res.redirect('back');
        })
    }else{
        return res.status(401).send('Unauthorized');
    }
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
    req.logout(function(err){
        if(err){ return console.log("error in logout")}
        // res.clearCookie('Codeial');
        res.clearCookie('codeial')
        return res.redirect('/');
    });
    
}