var num = 0;
$(function () {

    /*调用轮播图插件（jquery对象原型中的）方法*/
    $("#newSong").slider();


    /*精彩推荐 旋转木马*/
    /*先获取元素*/
    var $carousel_item = $("#recommend .item");
    var $carousel_prev = $("#recommend .slider-prev");
    var $carousel_next = $("#recommend .slider-next");
    var $carousel_btn = $("#recommend .slider-control").find("span");
    var $carousel_btn_len = $carousel_btn.length;
    var carouselArr = ['item-pic1', 'item-pic2', 'item-pic3', 'item-pic4', 'item-pic5', 'item-pic6'];
    /*节流*/
    var b_stop = true;
    /*作为中间媒介，同步按钮和对应的图片*/
    var iNum = 0;

    /*下一张点击*/
    $carousel_next.on("click",function () {
        if (b_stop){
            b_stop = false;
            nextImg();
        }
        /*不满足直接返回*/
        return false;
    })
    /*上一张点击*/
    $carousel_prev.on("click",function () {
        if (b_stop){
            b_stop = false;
            prevImg();
        }
        return false;

    })
    /*点击下方条形按钮切换*/
    $carousel_btn.on("click",function () {
        var cur_index = $(this).index();
        if (iNum == cur_index) {
            return;
        }else if (iNum < cur_index ) {
            if (b_stop){
                b_stop = false;
                prevImg();
            }
        }
        else {
            if (b_stop){
                b_stop = false;
                nextImg();
            }
        }
        /*把我们点击的按钮索引号赋值更新到iNum  */
        iNum = cur_index;
        /*重新设置我们点击的按钮样式*/
        setBtn(iNum);
    })
    /*点击图片切换*/
    $(document).on("click","#recommend .item-pic2",function () {
        if (b_stop){
            b_stop = false;

            prevImg();
        }
        return false;
    })
    $(document).on("click","#recommend .item-pic4",function () {
        if (b_stop){
            b_stop = false;

            nextImg();
        }
        /*不满足直接返回 不执行此次事件，阻止默认行为*/
        return false;
    })

    /*上一张切换*/
    function prevImg() {
        carouselArr.push(carouselArr.shift());
        $carousel_item.each(function (i, ele) {
            $(ele).addClass(carouselArr[i]).siblings().removeClass(carouselArr[i]);
        })

        setTimeout(function () {
            b_stop = true;
        },300)

        /*每次点击上一张 就自减 1
        * 对应下方的条形按钮*/
        iNum --;
        iNum < 0 ? iNum = $carousel_btn_len - 1  : iNum;
        /*设置对应按钮的样式*/
        setBtn(iNum);
    }
    /*下一张切换*/
    function nextImg() {
        carouselArr.unshift(carouselArr.pop());
        $carousel_item.each(function (i, ele) {
            $(ele).addClass(carouselArr[i]).siblings().removeClass(carouselArr[i]);
        })
        /*节流操作*/
        setTimeout(function () {
            b_stop = true;
        },300)

        /*每次点击下一张 就自加 1
        * 对应下方的条形按钮*/
        iNum ++;
        iNum > $carousel_btn_len - 1 ? iNum = 0 : iNum;
        // 设置对应按钮的样式
        setBtn(iNum);
    }

    /*设置条形按钮样式*/
    function setBtn(index){
        $carousel_btn.eq(index).addClass("control-cur").siblings().removeClass("control-cur");
    }


});
/*轮播图*/
(function ($,window,document) {
    var Plugin = function (id) {

        /*先获取元素*/
        this.$id = id;
        this.$slider_wrap = this.$id.find(".slider-wrap");
        this.$slider_control = this.$id.find(".slider-control").find("span");
        this.$slider_next = this.$id.find(".slider-next");
        this.$slider_prev = this.$id.find(".slider-prev");

        /*节流*/
        this.b_stop = true;
        /*设置轮播图每页要滑动的长度*/
        this.target = 1200;
    }

    Plugin.prototype = {
        /*初始化*/
        init:function () {
            var that = this;
            /*点击左右按钮*/
            this.$slider_next.on("click",function () {
                if (that.b_stop) {
                    that.b_stop = false;
                    that.nextClick();
                }
                return false;

            })
            this.$slider_prev.on("click",function () {
                if (that.b_stop) {
                    that.b_stop = false;
                    that.prevClick();
                }
                return false;
            })

            /*下方条形按钮点击*/
            this.$slider_control.on("click",function () {
                var cur_index = $(this).index();
                that.setDot(cur_index);

                that.$slider_wrap.animate({left:-cur_index*that.target+"px"},300,function () {
                    that.b_stop = true;
                });
                /*最后更新num的值*/
                num = cur_index;
            })
        },
        /*下一页点击封装*/
        nextClick:function () {
            var that = this;
            num ++;
            num > this.$slider_control.length - 1 ? num = 0 : num;
            this.setDot(num);
            this.$slider_wrap.animate({left:-num*that.target+"px"},300,function () {
                that.b_stop = true;
            });
        },
        /*上一页点击封装*/
        prevClick:function () {
            var that = this;
            num --;
            num < 0 ? num = this.$slider_control.length - 1 : num;
            this.setDot(num);
            this.$slider_wrap.animate({left:-num*that.target+"px"},300,function () {
                that.b_stop = true;
            });
        },

        /*设置按钮选中样式*/
        setDot:function (index) {
            this.$slider_control.eq(index).addClass("control-cur").siblings().removeClass("control-cur");
        },

        constructor:Plugin,
    }

    /*给jquery原型对象添加一个方法*/
    $.prototype.slider = function () {
        var plugin = new Plugin(this);
        console.log(plugin.constructor);
        return plugin.init();
    }


})(jQuery,window,document);





