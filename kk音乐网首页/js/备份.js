/*tab栏*/
$(function () {
    var Tab = function(){
        this.$floor_tab_btn = $(".floor-tab-btn li");
    }
    Tab.prototype = {
        init:function(){
            this.tab();
        },
        tab:function () {
            this.$floor_tab_btn.on("mouseenter",function () {
                var i = $(this).index();
                $(this).addClass("current").siblings().removeClass("current");
                $(this).parents(".floor").find(".floor-tab-box .tab-box").eq(i).css("display","block").siblings().css("display","none");
            })
        },
        constructor:Plugin
    }
    var tab = new Tab();
    tab.init();
})

/*左侧固定*/
$(function () {
    /*左侧楼层定位*/
     var $target = ["1790","2460","2880","3490","3900","4400","4900","5500","6000","6690"];
     var $fixed_left = $("#fixed-left");
     var $lis = $("#fixed-left li");

     $(window).scroll(function () {
         var target = $(document).scrollTop();
         console.log(target);
         if (target > 1300){
             $fixed_left.show();
         }
         if (target < 1300 || target > 6690) {
             $fixed_left.hide();
         }
         for (var i = 0; i < $target.length; i++) {
             if (target < $target[i]){
                 setCur(i);
                 break;
                 /*continue继续执行*/
             }
         }
     })
     var setCur = function (index) {
         $lis.eq(index).addClass("floor-active").siblings("li").removeClass("floor-active");
     }

    /*左侧固定栏Hover*/
    $lis.hover(function () {
        $(this).toggleClass("floor-active");
    });
})
$(function () {
    /*var $main = $("#main");
    var $lisitem = $("#main .slider-ctrl-items");
    var $ctrl_dot = $("#main .slider-ctrl-dot");
    var $ctrl_dot_i = $("#main .slider-ctrl-dot i");
    var $lisbg = $("#main .slider-ctrl-items > .bg");
    var $ctrl_list_a = $("#main .slider-ctrl-list  .list-content");
    var $ctrl_list_i = $("#main .slider-ctrl-list .list-content i");

    var $next_btn = $("#main .slider-next-btn");
    var $prev_btn = $("#main .slider-prev-btn");
    /!*图片*!/
    var $slider_pic = $("#main .slider-pic li");

    var num = 0;

    var timer = null;
    var $pic_length = $slider_pic.length;
    var arr=['#7701A1','#99CCE1','#9D5CFE','#FFFFFF','#EBEFFB','#6539E6','#FDAB01','#DD073B','#478FFE','#CE46CE','#5E21BD','#EB1587','#1A192B','#FF0E3E','#FFB500','#F5091D','#478FFE']

    function move(){
        num ++;
        num > $pic_length - 1 ? num = 0 : num;

        $slider_pic.css("display","none");
        $slider_pic.eq(num).css("display","block")

        /!*给小按钮添加样式，变成黄色*!/
        $ctrl_dot_i.removeClass("cur-yellow");
        $ctrl_dot_i.eq(num).addClass("cur-yellow");

        /!*给li的span背景添加选中样式*!/
        $lisbg.removeClass("cur");
        $ctrl_dot_i.eq(num).parents("li").children(".bg").addClass("cur")

        /!*显示dot*!/
        $ctrl_dot.removeClass("cur");
        $ctrl_dot_i.eq(num).parent().addClass("cur");

        /!*背景色改变*!/
        $main.css("backgroundColor",arr[num]);

    }
    timer = setInterval(move,3000);



    /!*下一页点击*!/
    $next_btn.on("click",function () {
        clearInterval(timer);
        num ++;
        num > $pic_length - 1 ? num = 0 : num;
        $slider_pic.css("display","none");
        $slider_pic.eq(num).css("display","block");

        /!*给小按钮添加样式，变成黄色*!/
        $ctrl_dot_i.removeClass("cur-yellow");
        $ctrl_dot_i.eq(num).addClass("cur-yellow");

        /!*给li的span背景添加选中样式*!/
        $lisbg.removeClass("cur");
        $ctrl_dot_i.eq(num).parents("li").children(".bg").addClass("cur")

        /!*显示dot*!/
        $ctrl_dot.removeClass("cur");
        $ctrl_dot_i.eq(num).parent().addClass("cur");

        /!*背景色改变*!/
        $main.css("backgroundColor",arr[num]);

    })

    /!*上一页点击*!/
    $prev_btn.on("click",function () {
        clearInterval(timer);
        num --;
        num < 0 ? num = $pic_length - 1 : num;
        $slider_pic.css("display","none");
        $slider_pic.eq(num).css("display","block");
        /!*给小按钮添加样式，变成黄色*!/
        $ctrl_dot_i.removeClass("cur-yellow");
        $ctrl_dot_i.eq(num).addClass("cur-yellow");

        /!*给li的span背景添加选中样式*!/
        $lisbg.removeClass("cur");
        $ctrl_dot_i.eq(num).parents("li").children(".bg").addClass("cur")

        /!*显示dot*!/
        $ctrl_dot.removeClass("cur");
        $ctrl_dot_i.eq(num).parent().addClass("cur")

        /!*背景色改变*!/
        $main.css("backgroundColor",arr[num]);

    })

    $lisitem.on("mouseenter",function () {
        clearInterval(timer);
        $lisitem.removeClass("mouse-hover");
        $lisbg.removeClass("cur");
        $ctrl_dot.removeClass("cur")

        $(this).addClass("mouse-hover");
        /!*小黄块*!/
        $(this).find(".list-content i").first().addClass("cur-yellow");
        /!*更换图片*!/
        num = $(this).data("num");
        console.log(num)
        $slider_pic.css("display","none");
        $slider_pic.eq(num).css("display","block");

        /!*背景色改变*!/
        $main.css("backgroundColor",arr[num]);
    })
    $lisitem.on("mouseleave",function () {
        timer = setInterval(move, 2000)
        /!*隐藏ctrl-list*!/
        $(this).removeClass("mouse-hover");
        /!*$(this).find(".list-content i").last().removeClass("cur-yellow")*!/

        $ctrl_dot_i.removeClass("cur-yellow")
        /!*重置每个ctrl-list下的每个i的样式*!/
        $ctrl_list_i.removeClass("cur-yellow")
        /!*li的背景变化*!/
        $(this).children(".bg").addClass("cur")
        /!*显示dot*!/
        $(this).children(".slider-ctrl-dot").addClass("cur");

        /!*给每个li的slider-ctrl-dot 下的第一个i添加样式*!/
       /!*$(this).find(".slider-ctrl-dot i").first().addClass("cur-yellow")*!/
        $ctrl_dot_i.eq(num).addClass("cur-yellow")

    })


    $ctrl_list_a.on("mouseenter",function () {
        num = $ctrl_list_a.index(this)

        $(this).siblings(".list-content").children("i").removeClass("cur-yellow");
        $(this).children("i").addClass("cur-yellow");

        $slider_pic.css("display","none")
        $slider_pic.eq(num).css("display","block");
        /!*背景色改变*!/
        $main.css("backgroundColor",arr[num]);

    })
    $ctrl_list_a.on("mouseleave",function () {
        $ctrl_dot_i.removeClass("cur-yellow");
        $ctrl_dot_i.eq(num).addClass("cur-yellow");
    })


    $slider_pic.on("mouseenter",function () {
        clearInterval(timer);
    })
    $slider_pic.on("mouseleave",function () {
        timer = setInterval(move, 2000)
    })*/
})