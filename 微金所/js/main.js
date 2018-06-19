

$(function () {
    var resize = function () {
        var screenWidth = $(window).width();
        var imgItem = $("#main-ad  .carousel-inner > .item");
        var flag = screenWidth < 768;
        imgItem.each(function (i,ele) {
            var $ele = $(ele);
            var imgSrc = flag ? $ele.data("xs-img") : $ele.data("lg-img");
            $ele.css("backgroundImage","url('"+imgSrc+"')");

            if (flag) {
                $ele.html("<img src="+imgSrc+" alt=''/>");
            } else {
                $ele.empty();
            }
        })
        $('[data-toggle="tooltip"]').tooltip();

        var ulWrap_width = 30;
        var $ul_wrap = $("#products .nav-tabs > li");
        $ul_wrap.each(function (i,ele) {
            var width = ele.clientWidth;
            ulWrap_width += width;

        })
        if (ulWrap_width > $(window).width()) {
            $("#products .nav-tabs").css("width",ulWrap_width).parent().css("overflow-x","scroll")
        }
        else{
            $("#products .nav-tabs").css("width","100%").parent().css("overflow-x","hidden")
        }

    }
    $(window).on("resize",resize).trigger('resize');



    /*新闻标题点击切换*/
    var news_title = $("#news .news-title");
    var a_icon = $("#news .nav > li > a");
    a_icon.on('click',function () {
        news_title.html($(this).data('title'));
    })


    /*轮播图焦点触碰*/
    var starX , endX;
    var offset = 50;
    $("#main-ad .carousel").on('touchstart',function (e) {
        starX = e.originalEvent.touches[0].clientX;
    })
    $("#main-ad .carousel").on('touchmove',function (e) {
        endX = e.originalEvent.touches[0].clientX;
        e.preventDefault();
    })
    $("#main-ad .carousel").on('touchend',function (e) {
        var targetX = Math.abs(starX - endX);
        if (targetX > offset) {
            starX > endX ? $(this).carousel('next') :  $(this).carousel('prev');
        }
    })
});

