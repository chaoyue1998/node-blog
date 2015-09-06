var User = require('../models/user')

//signin
exports.signin = function(req, res) {
    var puser = req.body.user;
    User.findOne({
        name: puser.name
    }, function(err, user) {
        if (err) {
            console.log(err);
        }
        if (!user) {
            return res.redirect("/signup")
        }
        user.comparePassword(puser.password, function(err, isMatch) {
            if (err) {
                console.log(err);
            }
            if (isMatch) {
                req.session.user = user
                return res.redirect("/")
            } else {
                console.log("password is not right");
                return res.redirect("/signin")
            }
        });
    })
}

//logout
exports.logout = function(req, res) {
    delete req.session.user;
    //delete app.locals.user
    res.redirect('/signin')
}

//signup
exports.signup = function(req, res) {
    var _user = req.body.user;
    User.find({
        name: _user.name
    }, function(err, user) {
        if (err) {
            console.log(err);
        }
        if (user.length > 0) {
            console.log("用户名存在");
            return res.redirect("/signin")
        } else {
            var _User = new User(_user)
            _User.save(function(err, user) {
                if (err) {
                    console.log(err);
                }
                req.session.user = user
                res.redirect('/admin/userlist')
            })
        };
    })
}

//showSignup
exports.showSignin = function(req, res) {
    res.render("signin", {
        title: "登录"
    })
}

//showSignup
exports.showSignup = function(req, res) {
    res.render("signup", {
        title: "注册"
    })
}

//middleware for user
exports.signinRequired = function(req, res, next) {
    var user = req.session.user;
    if (!user) {
        return res.redirect("/signin")
    }
    next()
}

//middleware for user
exports.adminRequired = function(req, res, next) {
    var user = req.session.user;
    if (user.role < 10) {
        return res.redirect("/404")
    }
    next()
}
//middleware for user
exports.superAdminRequired = function(req, res, next) {
    var user = req.session.user;
    if (user.role < 50) {
        return res.redirect("/404")
    }
    next()
}

//userlist
exports.list = function(req, res) {
    User.fetch(function(err, users) {
        if (err) {
            console.log(err);
        }
        res.render("userlist", {
            title: "用户列表",
            users: users
        })
    })
}

//user delet
exports.delete = function(req, res) {
    var pid = req.params.id
    if (pid) {
        User.remove({
            _id: pid
        }, function(err, User) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/admin/userlist')
            }
        })
    }
}
