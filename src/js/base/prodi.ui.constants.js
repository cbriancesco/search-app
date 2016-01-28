var prodi = prodi || {ui:{}};
/**
 * Constants used in all prodi.ui modules.
 * @type {Object}
 */
prodi.ui.constants = {
    TABLET_MAX_SIZE: 1024,
    TABLET_MIN_SIZE: 768,

    MOBILE_MAX_SIZE: 767,

    IS_TABLET: true,

    PAGE_PATH: window.location.pathname,
    PAGE_URL: window.location.href,

    ACTIVE_CLASS: 'active',
    HIDE_CLASS: 'hide',
    LOADER_CLASS: 'loader'
};

// RUNS ALL INIT FUNCTIONS
(function() {
    var keys = Object.keys(prodi.ui);
    for(var i = 1, max = keys.length; i < max; i+=1){
        // if 'autoInit' is declared on false will not load the module
        if(prodi.ui[keys[i]].autoInit || prodi.ui[keys[i]].autoInit === undefined){
            prodi.ui[keys[i]].init();
        }
    }
})();