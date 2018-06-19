$(function () {
    var ble = true;
    /*显示时每个导航元素的延迟进入时间  ms*/
    var menuenter = ["100","150","200","250","300","350"];
    /*消失时每个导航元素的延迟退出时间  ms*/
    var menuleave = ["10","20","30","40","50","60"];
    var $menu_btn = $(".menu-btn");
    var $menu_mask = $(".menu-mask");
    var $lis = $(".menu-list li");

    /*给菜单按钮绑定点击事件*/
    $menu_btn.on("click",function () {
        if (ble == true) {
            move(menuenter,ble);
        }
        else{
            move(menuleave,ble);
        }
    })
    /*点击菜单执行的函数*/
    function move(data,flag) {
        if (flag) {
            $menu_mask.animate({left:"0"},500);
            for (var i = 0; i < data.length; i++) {
                $lis.eq(i).delay(data[i]).animate({"margin-Left":"0"},"slow")
            }
            ble = false;
        }
        else {
            $menu_mask.delay(100).animate({left:"-100%"},500);
            for (var i = 0; i < data.length; i++) {
                $lis.eq(i).delay(data[i]).animate({"margin-Left":"-155%"},100)
            }
            ble = true;
        }
    }
    
})