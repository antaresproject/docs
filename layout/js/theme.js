$(function() {

	(function menu() {
        jQuery('#main-menu').superfish({
            speed: 'fast',
            delay: 1000,
            popUpSelector: '.ddown'
        });
    }())   

    function openMenu() {
        $('body').addClass('offcanvas-open');
        $('.ardocs-menu--offcanvas').animateCss('slideInRight');
    }

    function closeMenu() {
        $('body').removeClass('offcanvas-open');
        $('.ardocs-menu--offcanvas').animateCss('slideOutRight');
    }

    $('.toggle__menu').on('click', function() {
        openMenu();
    });

    $('.offcanvas-close').on('click', function() {
        closeMenu();
    });

    var topMenu = $('.ardocs-top nav .ardocs-main-menu');
    var tocMenu = $('.ardocs-menu.table-of-contents > ul');

    enquire.register("screen and (max-width:1024px)", {

        //mobile
        match: function() {      
   
            topMenu.prependTo('.ardocs-menu--offcanvas nav');
            tocMenu.appendTo('.ardocs-menu--offcanvas nav');

            $('.ardocs-menu--offcanvas .dropdown').on('click', function() {
                $(this).toggleClass('dropdown--open');
            });

        },

        //tablet & desktop
        unmatch: function() {

            $('body').removeClass('offcanvas-open');
            $('.ardocs-menu--offcanvas').remove('.ardocs-menu__title');
            $('.ardocs-menu--offcanvas .ardocs-main-menu').appendTo('.ardocs-menu.table-of-contents');

            $('body').unbind();

        },

    });

    var search__input__val = $('#mkdocs-search-query'),
    search__input__container = $('.search-container'),
    form = $('.input-grp form'),
    clear = $('body').find('.clear');   

    search__input__val.on('keyup', function () {      
        if ( search__input__val.val() != '' ) {
            search__input__container.addClass('is--open');
            form.addClass('is--active');
        } else {
            search__input__container.removeClass('is--open');
            form.removeClass('is--active');
        } 
    });
  

    clear.on('click', function(e){
        e.preventDefault();
        search__input__val.val('');
        search__input__container.removeClass('is--open');
        form.removeClass('is--active');
    });     

    $(document).keyup(function(e) {
        if (e.keyCode == 27) { 
            search__input__val.val('');
            search__input__container.removeClass('is--open');
            form.removeClass('is--active');
        }
    }); 

    $(window).keydown(function(e){
        if(e.keyCode == 13) {
            e.preventDefault();
            return false;
        }
    });


    var select__version = $('.version-list'),
    select__version__container = $('.version-container');

    select__version.on('click', function(){
        $(this).toggleClass('is--open');
    });


});