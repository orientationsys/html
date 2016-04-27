jQuery(document).ready(function($) {
    var $panels = $('.gallery_thumbnails .imgslide a');
    var $parent = $('.gallery_thumbnails .imgslide'); //或许当前li的最近一级的父元素
    var $length = $panels.length; //获取指定length值
    var $first = $panels.eq(0).clone().addClass("panel cloned"); //获取第一个元素并复制
    var $last = $panels.eq($length - 1).clone().addClass("cloned"); //获取最后一个元素并复制
    $parent.append($first); //将a序列中的第一个添加到ul元素中的最后一个  
    $parent.prepend($last); //将a序列中的最后一个添加到ul元素中的第一个
    var totalPanels = $(".gallery_thumbnails .imgslide").children().size(); //所有子元素的数字，滚动元素的个数 
    var $panels = $('.gallery_thumbnails .imgslide a'); //此处作用是将复制进来补白的元素重新赋值
    var $container = $('.gallery_thumbnails .imgslide');
    // $panels.css({
    //     'float': 'left',
    //     'position': 'relative'
    // });
    $(".gallery_thumbnails").data("currentlyMoving", false); //是否正在运动中

    // var curPanel = 1;
    var movingDistance = 86; //每次移动的距离
    var smallSize = 70;
    var midSize = 115;

    $container.css('height', (($panels[0].offsetWidth + 20) * $panels.length) + 50).css('margin-top', '0'); //计算容器的总的宽度 PS：25为margin值 
    var scroll = $('.gallery_thumbnails').css('overflow', 'hidden');

    function returnToNormal(element) { //li元素返回到正常状态
        // element.removeClass('current');
        element.animate({
            width: smallSize,
            height: smallSize
        }).find("img").animate({
            width: smallSize,
            height: smallSize
        });
    };

    function growBigger(element) { //当前元素之间变大
        // element.addClass("current").siblings().removeClass("current");
        element.addClass("current").animate({
                width: midSize,
                height: midSize
            }).siblings().removeClass("current")
            .end().find("img").animate({
                width: midSize,
                height: midSize
            })
        var path = element.attr("href");
        var title = element.attr("title");
        var dec = element.attr("dec");
        var link = element.attr("link");
        $(".gallery_preview a").attr("href", path);
        $(".gallery_preview a img").attr("src", path);
        $(".gallery_preview a").attr("data-lightbox", "example 1");
        $(".gallery_preview a").attr("data-title", title);
        $(".slideImg .text .more").attr("href", link);
        $(".gallery_intro").find("h5").text(title);
        $(".gallery_intro").find("p").text(dec);
    }

    //direction true = bottom, false = top
    function change(direction) {
        //if not at the first or last panel
        if (direction && !(curPanel < totalPanels - 2)) {
            $(".gallery_container .next").addClass('disabled')
            return false;
        }
        if (!direction && (curPanel <= 1)) {
            $(".gallery_container .prev").addClass('disabled')
            return false;
        }
         $(".gallery_container .next").removeClass('disabled');
         $(".gallery_container .prev").removeClass('disabled');
         
        //if not currently moving
        if (($(".gallery_thumbnails").data("currentlyMoving") == false)) {
            $(".gallery_thumbnails").data("currentlyMoving", true);
            var next = direction ? curPanel + 1 : curPanel - 1;
            var topValue = $(".gallery_thumbnails .imgslide").css("margin-top");
            var movement = direction ? parseFloat(topValue, 10) - movingDistance : parseFloat(topValue, 10) + movingDistance;
            $(".gallery_thumbnails .imgslide").stop().animate({
                "margin-top": movement
            }, function() {
                $(".gallery_thumbnails").data("currentlyMoving", false);
            });
            returnToNormal($(".gallery_thumbnails a").eq(curPanel));
            growBigger($(".gallery_thumbnails a").eq(next));
            curPanel = next;
            //remove all previous bound functions
            $(".gallery_thumbnails a").eq(curPanel + 1).unbind();
            //go forward
            $(".gallery_thumbnails a").eq(curPanel + 1).click(function(e) {
                e.preventDefault();
                change(true);
            });
            //remove all previous bound functions    
            $(".gallery_thumbnails a").eq(curPanel - 1).unbind();
            //go back
            $(".gallery_thumbnails a").eq(curPanel - 1).click(function(e) {
                e.preventDefault();
                change(false);
            });
            //remove all previous bound functions
            $(".gallery_thumbnails a").eq(curPanel).unbind();

            $(".gallery_thumbnails a.current").click(function(e) {
                e.preventDefault();
            });
        }
    }

    // Set up "Current" panel and next and prev 设置当前元素和上下
    growBigger($(".gallery_thumbnails a").eq(1));
    var curPanel = 1;
    $(".gallery_thumbnails a").eq(curPanel + 1).click(function(e) {
        e.preventDefault();
        change(true);
        return false;
    });
    $(".gallery_thumbnails a").eq(curPanel - 1).click(function(e) {
        e.preventDefault();
        change(false);
        return false;
    });
    //when the prev/next arrows are clicked
    $(".gallery_container .next").click(function() {
        change(true);
    });
    $(".gallery_container .prev").click(function() {
        change(false);
    });
});
