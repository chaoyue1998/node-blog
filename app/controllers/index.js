var _ = require("lodash")
var Posts = require('../models/posts')
var Category = require('../models/category')

//Index
exports.Index = function(req, res) {
    var queryParams = req.query,
        page = parseInt(queryParams.p) || 1,
        count = 2,
        index = (page - 1) * count,
        queryArr = [],
        queryStr = "";
    for (var i in queryParams) {
        if (i !== "p") {
            queryArr.push(i + "=" + queryParams[i])
        }
    }
    if (queryArr.length > 0) {
        for (var i = 0; i < queryArr.length; i++) {
            if (i === 0) {
                queryStr += "?" + queryArr[i]
            } else {
                queryStr += "&" + queryArr[i]
            }
        }
        queryStr += "&"
    } else {
        queryStr += "?"
    }

    Posts.find({})
        .sort("info.updateAt")
        .exec(function(err, posts, next) {
            if (err) {
                return next(err);
            }
            var result = posts.slice(index, index + count)
            Category.find({}, function(err, categories, next) {
                if (err) {
                    return next(err);
                }
                var totalPage = Math.ceil(posts.length / count)
                if (totalPage >= page) {
                    res.render("index", {
                        title: "首页",
                        posts: result,
                        categories: categories,
                        currentPage: page,
                        queryStr: queryStr,
                        totalPage: totalPage
                    })
                } else {
                    return res.redirect("/404")
                }

            });
        })
}

//Search
exports.Search = function(req, res) {
    var queryParams = req.query,
        page = parseInt(queryParams.p) || 1,
        count = 2,
        index = (page - 1) * count,
        queryArr = [],
        queryStr = "";
    for (var i in queryParams) {
        if (i !== "p") {
            queryArr.push(i + "=" + queryParams[i])
        }
    }
    if (queryArr.length > 0) {
        for (var i = 0; i < queryArr.length; i++) {
            if (i === 0) {
                queryStr += "?" + queryArr[i]
            } else {
                queryStr += "&" + queryArr[i]
            }
        }
        queryStr += "&"
    } else {
        queryStr += "?"
    }

    var queryObj = {},
        catId = req.query.cat,
        wd = req.query.wd;
    if (catId) {
        queryObj = {
            category: catId
        }
    } else if (wd) {
        queryObj = {
            "title": new RegExp(wd)
        }
    }
    Posts.find(queryObj)
        .sort("info.updateAt")
        .exec(function(err, posts, next) {
            if (err) {
                return next(err);
            }
            var result = posts.slice(index, index + count)
            Category.find({}, function(err, categories, next) {
                if (err) {
                    return next(err);
                }
                var totalPage = Math.ceil(posts.length / count)
                if (totalPage >= page) {
                    res.render("index", {
                        title: "首页",
                        posts: result,
                        categories: categories,
                        currentPage: page,
                        queryStr: queryStr,
                        totalPage: totalPage
                    })
                } else {
                    return res.redirect("/404")
                }
            });
        })
}
