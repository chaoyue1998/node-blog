$(function() {
    //按钮点击
    $("a.media-left").on('click', function() {
        var cid = $(this).data('cid');
        var tid = $(this).data('tid');
        $("#commentId").val(cid);
         $("#commentTo").val(tid);
        $("#toName").text("回复" + $(this).parent().find("h4.media-heading .c_name").first().text());
    });
})
