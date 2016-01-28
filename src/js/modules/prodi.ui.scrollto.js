/**
 * @return the init function to start the module.
 */
prodi.ui.scrollto = (function () {
    "use strict";

    var options = {
        selector: '.scroll__to',
        offset: 0,
        speed: 500,
        page: prodi.ui.constants.PAGE || $('body')
    };


    // scroll to functionality 
    function scrollTo(){
        $(options.selector).on('click', function(e){
            e.preventDefault();

            var string = $(this).attr('href'),
            $section = $(string),
            isLocal = string.indexOf('#') > 0 ? false : true,
            offset = $(this).data('offset') || options.offset,
            speed = $(this).data('speed') || options.speed;
            
            if(isLocal){
                animateTo($section, offset, speed);
            } else {
                var linkto = string.split('#')[0],
                    spot = string.split('#')[1];

                location.href = linkto + '#' + spot + ($(this).data('offset') ? '#' + offset : '');
            }
        });
    }



    function getPath(){
        if(prodi.ui.constants.PAGE_URL.indexOf('#') >= 0){
            var url = prodi.ui.constants.PAGE_URL.split('#');
            
            if(url[1].length){
                animateTo($('#' + url[1]), url[2] || options.offset);
            }
        }
    }



    function animateTo($section, offset, speed){
        options.page.animate({ 
            scrollTop: $section.offset().top - offset
        }, (speed || options.speed));
    }



    function init() {
        console.log('SCROLLTO IS ON!');
        scrollTo();
        getPath();
    }

    return {
        init: init
    };

})();