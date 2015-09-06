var Index = require('../app/controllers/index')
var Users = require('../app/controllers/users')
var Posts = require('../app/controllers/posts')
var Comment = require('../app/controllers/comment')
var Category = require('../app/controllers/category')

module.exports = function(app) {
    //pre
    app.use(function(req, res, next) {
        // console.log(req.session.user);
        var _user = req.session.user;
        app.locals.user = _user
        return next()
    })

    //Index
    app.get("/", Index.Index)

    app.get("/s", Index.Search)

    //Users
    app.post("/user/signin", Users.signin)
    app.get("/user/logout", Users.logout)
    app.post("/user/signup", Users.signup)
    app.get("/signup", Users.showSignup)
    app.get("/signin", Users.showSignin)
    app.get("/admin/userlist/", Users.signinRequired, Users.adminRequired, Users.superAdminRequired, Users.list)
    app.get("/admin/userdelete/:id", Users.signinRequired, Users.adminRequired, Users.superAdminRequired, Users.delete)

    //Posts
    app.get("/posts/:id", Posts.detail)
    app.get('/admin/posts/update/:id', Users.signinRequired, Users.adminRequired, Posts.update)
    app.post("/admin/posts/save", Users.signinRequired, Users.adminRequired, Posts.save)
    app.get("/admin/posts/list/", Users.signinRequired, Users.adminRequired, Posts.list)
    app.post("/admin/posts/delete", Users.signinRequired, Users.adminRequired, Posts.delete)
    app.get("/admin/posts", Users.signinRequired, Users.adminRequired, Posts.new)

    //comment
    app.post("/user/comment", Users.signinRequired, Comment.save)

    //category
    app.get("/admin/category", Users.signinRequired, Users.adminRequired, Category.new)
    app.post("/admin/category/save", Users.signinRequired, Users.adminRequired, Category.save)
    app.get('/admin/category/update/:id', Users.signinRequired, Users.adminRequired, Category.update)
    app.get("/admin/category/list/", Users.signinRequired, Users.adminRequired, Category.list)
    app.post("/admin/category/delete", Users.signinRequired, Users.adminRequired, Category.delete)

    //404
    app.get("/404", function(req, res) {
        res.render("404", {
            title: "404",
        })
    })
}
