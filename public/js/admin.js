$(function() {
    //赋值
    // var $input = $("input.form-control");
    // if ($input.length) {
    //     $input.each(function(index, el) {
    //         var str = $(this).val();
    //         if (str === "undefined") {
    //             $(this).val("");
    //         }
    //     });
    // }

    //按钮点击
    $(".del").on('click', function(event) {
        event.preventDefault();
        var id = $(this).data('rm-id'),
            url = $(this).attr("href"),
            $this = $(this);
        $.ajax({
                url: url,
                type: 'POST',
                data: {
                    _id: id
                },
            })
            .done(function(res) {
                if (res.status === "ok") {
                    $this.parent("td").parent("tr").remove();
                }
            })
    });
})
