var _ = require("lodash")
var Category = require('../models/category')
var Posts = require('../models/posts')

//admin new category 
exports.save = function(req, res) {
    var id = req.body.category._id
    var categoryObj = req.body.category
    var _category

    if (id !== "") {
        Category.findById(id, function(err, category) {
            if (err) {
                console.log(err);
            }
            _category = _.extend(category, categoryObj)
            _category.save(function(err, category) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/admin/category/list/')
            })
        })
    } else {
        _category = new Category({
            name: categoryObj.name,
            des: categoryObj.des
        })
        _category.save(function(err, category) {
            if (err) {
                console.log(err);
            }
            res.redirect('/admin/category/list/')
        })
    }
}

//admin update
exports.update = function(req, res) {
    var pid = req.params.id
    if (pid) {
        Category.findById(pid, function(err, category) {
            if (err) {
                console.log(err);
            }
            res.render('categoryAdmin', {
                title: "分类后台更新页",
                category: category
            })
        })
    }
}

//list
exports.list = function(req, res) {
    Category.find({})
        .populate({
            path: 'posts',
            select: 'title',
            // options: { limit: 6 }
        })
        .exec(function(err, categories) {
            if (err) {
                console.log(err)
            }

            res.render("categoriesList", {
                title: "分类列表页",
                categories: categories
            })
        })
}

//delete
exports.delete = function(req, res) {
    var id = req.body._id
    if (id) {
        Category.remove({
            _id: id
        }, function(err, category) {
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
    res.render("categoryAdmin", {
        title: "分类添加",
        category: {}
    })
}
