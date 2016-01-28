/** GENERIC SLIDER
 * @return the init function to start the module.
 */
prodi.ui.videoSlider = (function () {
    
    var slider = {
        length : $('.video__slider__item').length,
        pos: 1,
        navNext: '<a class="video__slider__next-button slider__button" href="#" data-direction="next">next</a>',
        navPrev: '<a class="video__slider__prev-button slider__button" href="#" data-direction="prev">prev</a>'
    }

    function pauseVideo(pos){
        $('.video__slider__item:nth-child('+ pos +') iframe')[0].contentWindow.postMessage('{'+'"event":"command",'+'"func":"stopVideo"'+',"args":""}','*');
    }

    function getVideos(){
        // LOAD JSON CONTENT
        json = $.getJSON('data/video-list.json', function(data){
            slider.videos = data;
            for(var i = 0, max = data.length; i < max; i += 1){
                $('.video__slider__list').append('<li class="video__slider__item"><iframe src="https://www.youtube.com/embed/'+ data[i].videoID +'?enablejsapi=1" frameborder="0" allowfullscreen"></iframe></li>');
            }
        }).done(function(data) {
            // slider local variables
            showThemAll();
            
        }).fail(function() {
            console.log( 'json data error' );
        });
    }

    function showThemAll(){
        slider.length = $('.video__slider__item').length;

        if(slider.length > 1){
            $('.video__slider').append(slider.navPrev).append(slider.navNext);
            sliderButtons();
            getDots();
        }

        setSize();
    }

    function resize(){
        slider.length = $('.video__slider__item').length;
        setSize();

        $('.video__slider__list').animate({
            left: -(getSize() * (slider.pos - 1)),
        }, 0);
    }

    // get slider horizontal size
    function getSize(){
        return $('.video__slider').width();
    }

    // set slider list & items size
    function setSize() {
        $('.video__slider').css({
            'height': (getSize() * 0.58) - 10
        });

        $('.video__slider__list').css({
            'width': getSize() * slider.length,
            'background' : 'black'
        });

        $('.video__slider__item').css({
            'width': getSize()
        });
    }

    function getDots(){
        var dotsList = '<ul class="dots-list"></ul>';

        $('.video__slider').append(dotsList);
        
        for(var i=0, max = slider.length; i < max; i += 1){
            $('.dots-list').append('<li class="dots-item" data-pos="' + (i) + '"></li>');
        }

        dotNav();
    }

    function dotNav(){
        $('.dots-item').on('click', function(){
            $('.dots-item').removeClass('active');
            $(this).addClass('active');
            getDotPos($(this).data('pos'));
        });

        $('.dots-item:first-child').addClass('active');
    }


    // activates buttons
    function sliderButtons(){
        $('.slider__button').on('click', function(e){
            e.preventDefault();

            if ($(this).data('direction') === 'next'){
                getNext();
            }

            if ($(this).data('direction') === 'prev'){
                getPrev();
            }
        });

        swipeEvents();
    }


    function swipeEvents(){
        $('.video__slider').on('swipeleft', function(){
            getNext();
        });

        $('.video__slider').on('swiperight', function(){
            getPrev();
        });
    }


    // get next slide
    function getDotPos(pos){
        pauseVideo(slider.pos);
        slider.pos = pos + 1;

        $('.video__slider__list').animate({
            left: -(getSize() * pos),
        }, 500);
    }


    // get next slide
    function getNext(){
        if(slider.pos < slider.length){
            pauseVideo(slider.pos);
            slider.pos += 1;
            $('.video__slider__list').animate({
                left: '-=' + getSize(),
            }, 500);
            $('.dots-item.active').removeClass('active').next().addClass('active');
        }
    }


    // get previous slide
    function getPrev(){
        if(slider.pos > 1){
            pauseVideo(slider.pos);
            slider.pos -= 1;
            $('.video__slider__list').animate({
                left: '+=' + getSize(),
            }, 500);
            $('.dots-item.active').removeClass('active').prev().addClass('active');
        }
    }


    // init slider functions
    function init() {
        console.log('SLIDER IS ON!');
        // get the videos from the json filie
        //getVideos();
        showThemAll();

        // on resize will update size of the elements and position of the items
        $(window).resize(function() {
            console.log('resize');
            resize();
        });
    }

    return {
        init: init
    };

})();
