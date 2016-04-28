jQuery(document).ready(function($) {
    var $panels = $('.galleryThumbnails .imgslide a');
    var $parent = $('.galleryThumbnails .imgslide'); //或许当前li的最近一级的父元素
    var $length = $panels.length; //获取指定length值
    var $first = $panels.eq(0).clone().addClass("panel cloned"); //获取第一个元素并复制
    var $last = $panels.eq($length - 1).clone().addClass("cloned"); //获取最后一个元素并复制
    $parent.append($first); //将a序列中的第一个添加到ul元素中的最后一个  
    $parent.prepend($last); //将a序列中的最后一个添加到ul元素中的第一个
    var totalPanels = $(".galleryThumbnails .imgslide").children().size(); //所有子元素的数字，滚动元素的个数 
    var $panels = $('.galleryThumbnails .imgslide a'); //此处作用是将复制进来补白的元素重新赋值
    var $container = $('.galleryThumbnails .imgslide');
    $(".galleryThumbnails").data("currentlyMoving", false); //是否正在运动中
    var movingDistance = 86; //每次移动的距离
    var smallSize = 70;  //小图大小
    var midSize = 115;  //当前选中图大小

    $container.css('height', (($panels[0].offsetWidth + 20) * $panels.length) + 50).css('margin-top', '0'); //计算容器的总的宽度 PS：25为margin值 
    var scroll = $('.galleryThumbnails').css('overflow', 'hidden');

    function returnToNormal(element) { //li元素返回到正常状态
        element.animate({
            width: smallSize,
            height: smallSize
        }).find("img").animate({
            width: smallSize,
            height: smallSize
        });
    };

    function growBigger(element) { //当前元素之间变大
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
        $(".galleryPreview a").attr("href", path);
        $(".galleryPreview a img").attr("src", path);
        $(".galleryPreview a").attr("data-lightbox", "example 1");
        $(".galleryPreview a").attr("data-title", title);
        $(".slideImg .text .more").attr("href", link);
        $(".galleryIntro").find("h5").text(title);
        $(".galleryIntro").find("p").text(dec);
    }

    //direction true = bottom, false = top
    function change(direction) {
        //if not at the first or last panel
        if (direction && !(curPanel < totalPanels - 2)) {
            $(".galleryContainer .next").addClass('disabled')
            return false;
        }
        if (!direction && (curPanel <= 1)) {
            $(".galleryContainer .prev").addClass('disabled')
            return false;
        }
        $(".galleryContainer .next").removeClass('disabled');
        $(".galleryContainer .prev").removeClass('disabled');

        //if not currently moving
        if (($(".galleryThumbnails").data("currentlyMoving") == false)) {
            $(".galleryThumbnails").data("currentlyMoving", true);
            var next = direction ? curPanel + 1 : curPanel - 1;
            var topValue = $(".galleryThumbnails .imgslide").css("margin-top");
            var movement = direction ? parseFloat(topValue, 10) - movingDistance : parseFloat(topValue, 10) + movingDistance;
            $(".galleryThumbnails .imgslide").stop().animate({
                "margin-top": movement
            }, function() {
                $(".galleryThumbnails").data("currentlyMoving", false);
            });
            returnToNormal($(".galleryThumbnails a").eq(curPanel));
            growBigger($(".galleryThumbnails a").eq(next));
            curPanel = next;
            //remove all previous bound functions
            $(".galleryThumbnails a").eq(curPanel + 1).unbind();
            //go forward
            $(".galleryThumbnails a").eq(curPanel + 1).click(function(e) {
                e.preventDefault();
                change(true);
            });
            //remove all previous bound functions    
            $(".galleryThumbnails a").eq(curPanel - 1).unbind();
            //go back
            $(".galleryThumbnails a").eq(curPanel - 1).click(function(e) {
                e.preventDefault();
                change(false);
            });
            //remove all previous bound functions
            $(".galleryThumbnails a").eq(curPanel).unbind();

            $(".galleryThumbnails a.current").click(function(e) {
                e.preventDefault();
            });
        }
    }

    // Set up "Current" panel and next and prev 设置当前元素和上下
    growBigger($(".galleryThumbnails a").eq(1));
    var curPanel = 1;
    $(".galleryThumbnails a").eq(curPanel + 1).click(function(e) {
        e.preventDefault();
        change(true);
        return false;
    });
    $(".galleryThumbnails a").eq(curPanel - 1).click(function(e) {
        e.preventDefault();
        change(false);
        return false;
    });
    //when the prev/next arrows are clicked
    $(".galleryContainer .next").click(function() {
        change(true);
    });
    $(".galleryContainer .prev").click(function() {
        change(false);
    });
});
