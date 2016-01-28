/**
 * @return the init function to start the module.
 */
prodi.ui.popups = (function () {
    "use strict";

    var options = {
        speed: 300,                 // modifies the speed of fade in and fade out
        blockScroll: true,          // if true will block the scroll of the page when the popup is showed
        useShader: true,            // if true will show a layer behind the popup but in front of the content of the page
        shaderOp: 0,              // sets the opacity of the shader
        shaderColor: '#000',        // sets the background color of the shared
        body: prodi.ui.constants.PAGE || $('body'),            // selector for the body object
        btnClose: '.popup__close',  // class to be used by the buttons that will close the popups
        btnLink: '.popup__link',    // class to be used by the buttons that will show the popups
        shader: '.popup__shader',   // class to be used by the shader element
        getShader: function(cb){    // function that will process the shader presets and apply them
            if(this.useShader){
                this.body.append('<div class="popup__shader"></div>');
                $(this.shader).css({
                    'background': this.shaderColor,
                    'opacity': this.shaderOp
                });
            }

            // if there is a callback use it
            if(cb){
                cb();
            }
        }
    };
    
    // activates the buttons 
    function bindPopups(){

        // binds all the elements with the popup class in order to be used
        $(options.btnLink).on('click', function(e){
            e.preventDefault();

            var newPop = $(this).attr('href');

            if(options.open){
                if(newPop !== options.popup){
                    hidePopup(getPopup, newPop);
                }
            } else {
                options.popup = newPop;
                getPopup();
            }

        });

        // closes the current popup by clicking the shader
        $(options.shader).on('click', function(){
            hidePopup();
        });

        // closes the current popup by clicking the close button 
        $(options.btnClose).on('click', function(e){
            e.preventDefault();
            hidePopup();
        });

        resize();
    }

    // processes the popup by getting the size and applies the values to make it dinamically 
    function getPopup(newPop){
        options.popup = newPop || options.popup;

        applyMetrics();

        showPopup(newPop);
    }

    function applyMetrics(){
        var width = -($(options.popup).outerWidth() / 2);
        var height = -($(options.popup).outerHeight() / 2);

        $(options.popup).css({
            'margin-top': height,
            'margin-left': width,
        });
    }

    // displays the popup
    function showPopup(newPop){
        options.popup = newPop || options.popup;
        options.open = true;

        if(options.blockScroll){
            options.body.addClass('blockScroll');
        }
        
        if(options.useShader){
            $(options.shader).fadeIn(options.speed);
        }
        
        $(options.popup).fadeIn(options.speed);
    }

    // hides the popup
    function hidePopup(cb, newPop){
        options.open = false;
        options.body.removeClass('blockScroll');

        if(options.useShader){
            $(options.shader).fadeOut(options.speed);
        }

        $(options.popup).fadeOut(options.speed);

        if(cb){
            options.popup = newPop;
            cb();
        }
    }

    function resize(){
        $(window).resize(function(){
            if(options.open){
                applyMetrics();
            }
        });
    }

    function init() {
        console.log('POPUPS ARE ON!');
        options.getShader(bindPopups);
    }

    return {
        init: init
    };

})();
