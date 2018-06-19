$(function () {

    var target = 1200;
    /*节流*/
    var a_stop = true;
    var slider_wrap = $("#newSong .slider-wrap");
    var slider_control= $("#newSong .slider-control").find("span");
    var slider_next = $("#newSong .slider-next");
    var slider_prev = $("#newSong .slider-prev");

    /*新歌首发左右按钮操作*/
    slider_next.on("click",function () {
        if (a_stop) {
            a_stop = false;
            nextClick();
        }
        return false;

    })
    slider_prev.on("click",function () {
        if (a_stop) {
            a_stop = false;
            prevClick();
        }
        return false;
    })

    /*下一页点击*/
    function nextClick(){
        num ++;
        num > slider_control.length - 1 ? num = 0 : num;
        setDot(num);
        slider_wrap.animate({left:-num*target+"px"},300,function () {
            a_stop = true;
        });
    }
    /*上一页点击*/
    function prevClick(){
        num --;
        num < 0 ? num = slider_control.length - 1 : num;
        setDot(num);
        slider_wrap.animate({left:-num*target+"px"},300,function () {
            a_stop = true;
        });
    }
    function setDot(index){
        slider_control.eq(index).addClass("control-cur").siblings().removeClass("control-cur");
    }

    /*下方条形按钮*/
    slider_control.on("click",function () {
        var curindex = $(this).index();
        setDot(curindex);

        slider_wrap.animate({left:-curindex*target+"px"},300,function () {
            a_stop = true;
        });
        /*最后更新num的值*/
        num = curindex;
    })
})