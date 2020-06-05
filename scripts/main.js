// 
function isOnScreen(elem) {
    // if the element doesn't exist, abort
    if (elem.length == 0) {
        return;
    }
    var $window = jQuery(window)
    var viewport_top = $window.scrollTop()
    var viewport_height = $window.height()
    var viewport_bottom = viewport_top + viewport_height
    var $elem = jQuery(elem)
    var top = $elem.offset().top
    var height = $elem.height()
    var bottom = top + height

    return (top >= viewport_top && top < viewport_bottom) ||
        (bottom > viewport_top && bottom <= viewport_bottom) ||
        (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom)
}
window.addEventListener('scroll', function (e) {
    if (isOnScreen(jQuery('.main-wrapper '))) {
        /* Pass element id/class you want to check */
        $('#main-wrapper').css('opacity', '1')
        console.log('The specified container is in view.');
    } else {
        $('#main-wrapper').css('opacity', '0')
    }
    if (isOnScreen(jQuery('.about-wrapper '))) {
        /* Pass element id/class you want to check */
        $('#main-wrapper').css('opacity', '0')
        $('#about-wrapper').css('opacity', '1')
        console.log('The specified container is in view.');
    } else {
        $('#about-wrapper').css('opacity', '0')
    }
    if (isOnScreen(jQuery('.work-wrapper'))) {
        /* Pass element id/class you want to check */
        $('#main-wrapper').css('opacity', '0')
        $('#about-wrapper').css('opacity', '0')
        $('#work-wrapper').css('opacity', '1')
    } else {
        $('#work-wrapper').css('opacity', '0')
    }
});
paceOptions = {
    ajax: true,
    document: true,
    eventLag: false,
}
Pace.on('done', function () {
    $('.p').delay(500).animate({
        top: '300',
        opacity: '0'
    }, 3000, $.bez([0.19, 1, 0.22, 1]));

    $("#preloader").delay(1500).animate({
        top: '-1100'
    }, 2000, $.bez([0.19, 1, 0.22, 1]))

    TweenMax.from(".line", 2, {
        delay: 1.8,
        y: -10,
        opacity: 0,
        ease: Expo.easeInOut
    })
    // TweenMax.from(".box", 2, {
    //     delay: 2.3,
    //     y: 10,
    //     opacity: 0,
    //     ease: Expo.easeInOut
    // })
    TweenMax.fromTo(".box", 2, {
        height: 0,
        autoAlpha: 0,
        ease: Expo.easeInOut
    }, {
        height: 30,
        autoAlpha: 1,
        delay: 1.9
    });
    TweenMax.from(".h1", 2, {
        delay: 2,
        y: -10,
        opacity: 0,
        ease: Expo.easeInOut
    });

    var cursor = $(".cursor"),
        follower = $(".cursor-follower");

    var posX = 0,
        posY = 0,
        mouseX = 0,
        mouseY = 0;

    TweenMax.to({}, 0.016, {
        repeat: -1,
        onRepeat: function () {
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;

            TweenMax.set(follower, {
                css: {
                    left: posX - 20,
                    top: posY - 20
                }
            });

            TweenMax.set(cursor, {
                css: {
                    left: mouseX,
                    top: mouseY
                }
            });
        }
    });

    $(document).on("mousemove", function (e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
    });

    $(".portfolio-item img").on("mouseenter", function () {
        cursor.addClass("active");
        follower.addClass("active");
    });

    $(".portfolio-item img").on("mouseleave", function () {
        cursor.removeClass("active");
        follower.removeClass("active");
    });

    const canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d')

    canvas.width = canvas.height = 128

    resize();
    window.onresize = resize;

    function resize() {
        canvas.width = window.innerWidth * window.devicePixelRatio
        canvas.height = window.innerHeight * window.devicePixelRatio
        canvas.style.width = window.innerWidth + 'px'
        canvas.style.height = window.innerHeight + 'px'
    }

    function noise(ctx) {

        const w = ctx.canvas.width,
            h = ctx.canvas.height,
            iData = ctx.createImageData(w, h),
            buffer32 = new Uint32Array(iData.data.buffer),
            len = buffer32.length
        let i = 0

        for (; i < len; i++)

            if (Math.random() < 0.5) buffer32[i] = 0xffffffff;

        ctx.putImageData(iData, 0, 0);
    }

    (function loop() {
        noise(ctx);
        requestAnimationFrame(loop);
    })();
})
$(document).ready(function () {
    console.log($(document).height())
    $('.col .line').css('height', $(document).height() + 'px');

    $('.project > h2').on("mouseenter", function () {
        //get the image data
        let img = $(this).attr('data-image')
        // img = window.location.hostname +'/' + img;
        console.log(img)
        console.log('Cogts')
        $('.cursor-follower').css('background', "white")
        $('.cursor-follower').css('height', "350px")
        $('.cursor-follower').css('width', "500px")
        $('.cursor-follower').css('padding', "30px")
        $('.cursor-follower').css('border-radius', "0px")
        $('.cursor-follower').append(`<a href="#"><img src='${img}' style='width:100%; height:auto; ' /></a>`)
        $('.cursor').css('top', `0px !important`)
    });

    $('.project > h2').on("mouseleave", function () {
        $('.cursor-follower').css('background', "rgba(255, 255, 255, 0.1)")
        $('.cursor-follower').css('height', "40px")
        $('.cursor-follower').css('width', "40px")
        $('.cursor-follower').css('padding', "0px")
        $('.cursor-follower').css('border-radius', "100%")
        $('.cursor-follower').empty()
    });
})
$(window).on("scroll", function () {
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
        // when scroll to bottom of the page
        // console.log(scrollHeight)
        $('.col .line').css('height', scrollHeight + 'px');
    }
});