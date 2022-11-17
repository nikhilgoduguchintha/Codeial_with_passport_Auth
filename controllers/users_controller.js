module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

module.exports.signin = function(req,res){
    res.render('user_sign_in',{
        title: 'Sign In'
    })
}

module.exports.signup = function(req,res){
    res.render('user_sign_up',{
        title: 'Sign Up'
    })
}
