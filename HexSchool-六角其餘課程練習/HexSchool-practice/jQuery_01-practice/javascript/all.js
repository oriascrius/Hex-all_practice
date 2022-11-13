$(document).ready(function () {

    // 導航 a 連結 點擊
    $('.nav-list a').click(function (event) {
        // 阻止默認動作
        event.preventDefault();

        // 點擊時 跑出選單
        $(this).parent().find('ul').slideToggle();

        // 點擊時 其他收起
        $(this).parent().siblings().find('ul').slideUp();


    });


    // lightbox 燈箱效果
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true
    });


    // Swiper - 輪播
    var mySwiper = new Swiper('.swiper', {
        direction: 'horizontal', // 垂直切換選項
        loop: true, // 循環模式選擇
        loopedSlides: 3, // 無限循環
        speed: 2000, // 翻頁速度

        // 分頁器
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // 自動撥放
        autoplay: {
            delay: 2000, //停留幾秒後下一頁
            disableOnInteraction: true // 滑鼠點擊之後仍自動播放
        },

        // 前進後退按紐
        // navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev',
        // },

        // 滾動條
        // scrollbar: {
        //     el: '.swiper-scrollbar',
        // },
    });


    // 到 1000 位置才出現 top 按鈕
    function showBtnCondition() {
        if ($(this).scrollTop() > 1000) {
            $(".top-btn").fadeIn();
        } else {
            $(".top-btn").fadeOut();
        }
    }
    $(window).scroll(showBtnCondition);



    // 回到 top 按鈕
    $(".top-btn").click(function (event) {
        event.preventDefault();
        $("html,body").animate(
            {
                scrollTop: 0
            },
            700
        );
    });



});