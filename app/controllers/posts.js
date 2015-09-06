var _ = require("underscore")
var Posts = require('../models/posts')
var Comment = require('../models/comment')
var Category = require('../models/category')
    // var fs = require('fs-extra')

//详情
exports.detail = function(req, res) {
    var id = req.params.id
    Posts.findById(id, function(err, posts) {
        if (err) {
            console.log(err);
        }
        Comment.find({
            post: id
        }).populate("from", "name").populate("reply.from reply.to", "name").exec(function(err, comments) {
            if (posts) {
                Category.find({}, function(err, categories, next) {
                    if (err) {
                        return next(err);
                    }
                    res.render("detail", {
                        title: "blog " + posts.title,
                        posts: posts,
                        categories: categories,
                        comments: comments,
                    })
                })
            } else {
                return res.redirect("/404")
            }
        })
    })
}

//admin update show
exports.update = function(req, res) {
    var pid = req.params.id
    if (pid) {
        Posts.findById(pid, function(err, posts) {
            if (err) {
                console.log(err);
            }
            Category.fetch(function(err, categories) {
                if (err) {
                    console.log(err);
                }
                res.render('admin', {
                    title: "后台更新页",
                    categories: categories,
                    posts: posts
                })
            })
        })
    }
}

//admin new post 
exports.save = function(req, res) {
    if (_.isEmpty(req.body)) {
        res.send("表单不能为空")
        return;
    }
    var postsObj = req.body.posts,
        categoryParams = postsObj.category,
        categoryName = postsObj.categoryName;
    if (!_.isEmpty(req.files)) {
        postsObj.poster = "/" + req.files.postimg["path"]
    }
    if (typeof categoryParams === "string") {
        categoryParams = [categoryParams]
    } else if (typeof categoryParams === "undefined") {
        categoryParams = []
    }
    postsObj.category = categoryParams;
    //新建分类
    if (categoryName) {
        var _category = new Category({
            name: categoryName,
        })
        _category.save(function(err, category) {
            if (err) {
                console.log(err);
            }
            postsObj.category.push(category._id)
        })
    }

    if (postsObj._id) {
        //旧文章
        Posts.findById(postsObj._id, function(err, post) {
            if (err) {
                console.log(err);
            }
            //删除本章所在所有分类
            post.category.remove()
            _posts = _.extend(post, postsObj)
            _posts.save(function(err, posts) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/posts/' + posts._id)
            })
        })
    } else {
        //新文章
        var _post = new Posts(postsObj)
        _post.save(function(err, posts) {
            if (err) {
                console.log(err);
            }
            res.redirect('/posts/' + posts._id)
        })
    }
}

//list
exports.list = function(req, res) {
    Posts.find({})
        .populate('category', 'name')
        .exec(function(err, posts) {
            if (err) {
                console.log(err)
            }

            res.render('list', {
                title: "列表页",
                posts: posts
            })
        })
}
exports.delete = function(req, res) {
    var id = req.body._id
    if (id) {
        Posts.remove({
            _id: id
        }, function(err, posts) {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    status: "ok"
                })
            }
        })
    }
}

//admin
exports.new = function(req, res) {
    Category.fetch(function(err, categories) {
        if (err) {
            console.log(err);
        }
        res.render("admin", {
            title: "后台",
            categories: categories,
            posts: {}
        })
    })
}
