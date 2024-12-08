
$(document).ready(function () {
    var currentPath = window.location.pathname;


    $('.menu_nav .nav-item a').each(function () {
        var linkPath = $(this).attr('href');

       
        if (currentPath.includes(linkPath)) {
          
            $('.menu_nav .nav-item').removeClass('active');

       
            $(this).parent().addClass('active');
        }
    });
});
