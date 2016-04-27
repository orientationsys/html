jQuery(document).ready(function($) {
    var flag = "left";
    var oldImgs = $(".gallery_thumbnails a").clone(true);

    var index = 1;
    var len = $(".gallery_thumbnails a").length;
    var img = $(".gallery_thumbnails  .imgslide");
    // var imgWrap = $(".gallery_thumbnails .imgslide");
    var w = img.find('a').outerWidth(true);
    var marginTop = 0;

    function change(flag){
        
    }

    $(".gallery_container .next").click(function() {
        index += 1;
        if (index == len) {
            index = 0;
        }
        img.animate({
            'margin-top': -w
        }, 100, 'linear', function() {
            img.find('a').eq(0).appendTo(img);
            img.css({
                'margin-top': marginTop
            });
        });
        flag = "left";
        var clickFlag = "nextClick";
        showPics(index, clickFlag);
        // $(".gallery_thumbnails a").eq(2).addClass('current').siblings().removeClass("current");
    });
    $(".gallery_container .prev").click(function() {
        prev();
        // index -= 1;
        // if (index == -1) {
        //     index = len - 1;
        // }
        // img.find('a:last').prependTo(img);
        // img.css({
        //     'margin-top': -w
        // });
        // img.animate({
        //     'margin-top': 0
        // });
        // flag = "right";
        // var clickFlag = "prevClick";
        // showPics(index, clickFlag);

        // $(".gallery_thumbnails a").eq(1).addClass('current').siblings().removeClass("current");
    });
    function prev(){
        index -= 1;
        if (index == -1) {
            index = len - 1;
        }
        img.find('a:last').prependTo(img);
        img.css({
            'margin-top': -w
        });
        img.animate({
            'margin-top': 0
        });
        flag = "right";
        var clickFlag = "prevClick";
        showPics(index, clickFlag);

    }
    $('.gallery_thumbnails a').click(function(e) {
        e.preventDefault();
        var index = $('.gallery_thumbnails a').index(this);
        var clickFlag = "imgClick";
        showPics(index, clickFlag);
    });
    $('.gallery_preview a').click(function(e) {
        e.preventDefault();
    });

    // showPics
    function showPics(index, clickFlag) {
        if (clickFlag == "imgClick") {
            var currentSmallImg = $(".gallery_thumbnails").find("a").eq(index);
        } else {
            var currentSmallImg = oldImgs.eq(index);
        }

        var path = currentSmallImg.attr("href");
        var title = currentSmallImg.attr("title");
        var dec = currentSmallImg.attr("dec");
        var photo_preview = path;
        var link =currentSmallImg.attr("link");
        $(".gallery_preview a").attr("href", path);
        $(".gallery_preview a img").attr("src", path);
        $(".gallery_preview a").attr("data-lightbox", "example 1");
        $(".gallery_preview a").attr("data-title", title);
        $(".slideImg .text .more").attr("href", link);
        // for(var i= 0 ;i <$(".gallery_thumbnails  .a").length;i++){
        //     if(currentSmallImg.attr("href") ==$(".gallery_thumbnails  .a").eq(i).attr("href") ){
        //     $(".gallery_thumbnails  .a").eq(i).addClass('current').siblings().removeClass("current");
        // }
        // }
        // $(".gallery_thumbnails  a").eq(1).addClass('current').siblings().removeClass("current");
        currentSmallImg.eq(index).addClass('current').siblings().removeClass("current");


        $(".gallery_intro").find("h5").text(title);
        $(".gallery_intro").find("p").text(dec);
        if (index > 2) {
            $(".gallery_thumbnails  .imgslide").css({
                'margin-top': "-95px"
            });
        }
    }

    // var currentNext = $(".gallery_thumbnails a.current").next();
    //  var currentPrev = $(".gallery_thumbnails a.current").prev();
    //  currentPrev.click(function(e) {
    //     e.preventDefault();
    //      var index = $('.gallery_thumbnails a').index(this);
    //     var clickFlag = "imgClick";
    //     showPics(index, clickFlag);
    //     prev();
    //  });

    showPics(index);
});
