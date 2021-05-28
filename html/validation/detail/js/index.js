'use strict';
$(function () {
    var $cont = $('.m-container');
    var $slider = $('.slider');
    var animSpd = 1000; //速度
    var curSlide = 1;     //初始
    var animation = false;   //滚动标志
    var numOfCities = 7;   //页面个数

    //标记防止连续滚动
    function flag() {
        animation = false;
    }

    //滚动分页
    function pagination(direction) {
        animation = true;
        $slider.addClass('animation');

        //整体向左移动100%
        $slider.css({
            'transform': 'translate3d(-' + (curSlide - direction) * 100 + '%, 0, 0)'
        });

        //局部向右边移动50%
        $slider.find('.slide__darkbg').css({
            'transform': 'translate3d(' + (curSlide - direction) * 50 + '%, 0, 0)'
        });

        //在items中查找所有有动画属性的DOM
        var $animates = $("body").find(".animated");
        $animates.each(function (index, value) {
            var $this = $(this);
            var animationStyle = $this.data("class");    //动画CSS
            var animationDelay = $this.data("delay");  //动画延迟时间
            $this.addClass(animationStyle).css({
                "-moz-animation-delay": animationDelay,
                "-webkit-animation-delay": animationDelay,
                "animation-delay": animationDelay
            });
        });
    }

    //mousewheel - IE和chrome ，  DOMMouseScroll - firefox
    $(document).on('mousewheel DOMMouseScroll', function (e) {
        if (animation) return;
        //鼠标滚动属性
        var delta = e.originalEvent.wheelDelta;

        //delta > 0 向上滚/向右滚
        if (delta > 0 || e.originalEvent.detail < 0) {
            if (curSlide <= 1) return;
            pagination(2);
            //因为滚动一次会连续触发，所有当鼠标滚动一次之后，就将animation=true组织动画
            setTimeout(flag, animSpd);

            //设置页码
            var num = curSlide--;
            $(".page").html((num - 1) + "/" + numOfCities);

            //设置所有页面隐藏
            var $sliders = $slider.find(".slide");
            $sliders.each(function (i) {
                $($sliders[i]).fadeOut();
            })
            //设置滚动目标页面显示
            $($sliders[num - 2]).fadeIn();

        }

        //delta < 0 向下滚/向右滚
        if (delta < 0 || e.originalEvent.detail > 0) {
            if (curSlide >= numOfCities) return;
            pagination(0);
            setTimeout(flag, animSpd);
            var num = curSlide++;
            $(".page").html((num + 1) + "/" + numOfCities);

            var $sliders = $slider.find(".slide");
            $sliders.each(function (i) {
                $($sliders[i]).fadeOut();
            })
            $($sliders[num]).fadeIn();
        }
    });
});