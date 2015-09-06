var s = '11111111101001001001001001';
function getCount(str, subkey){
    var pos = str.lastIndexOf(subkey);
    var key = str.substring(pos);
    var reg = new RegExp('(('+key+')+)$');
    reg.test(str);
    console.log(RegExp.$1.length/key.length+subkey.length/key.length);
}
for(var i=s.length-1;i>=s.length/2;i--){
    var subkey = s.substring(i);
    getCount(s, subkey);
    getCount(s.substring(0, i), subkey);
    console.log('-------------')
}




var Comment = require('../models/comment')

//comment save
exports.save = function(req, res) {
    var _comment = req.body.comment
    var user = req.session.user
    _comment.from = user._id
    var postId = _comment.post
    if (_comment.cid) {
        Comment.findById(_comment.cid, function(err, comment) {
            if (err) {
                console.log(err);
            }
            var reply = {
                from: user._id,
                to: _comment.tid,
                content: _comment.content
            }
            comment.reply.push(reply)
            comment.save(function(err, comment) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/posts/' + postId)
            })
        })
    } else {
        var _Comment = new Comment(_comment)
        _Comment.save(function(err, comment) {
            if (err) {
                console.log(err);
            }
            res.redirect('/posts/' + postId)
        })
    }
}
