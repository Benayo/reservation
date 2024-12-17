$(document).ready(function () {
  "use strict";

  $("#header").load("/shared/header.html");

  $("#footer").load("/shared/footer.html", function () {
 
   
  });

  $("#availability").load("/shared/check-availability.html");


  




  $.getJSON("/appsettings.json", function (data) {
    const primaryColor = data.appSettings.primaryColor;

   const textInfo = data.homeContent

   const visibilitySettings= data.homeContent.visibility
   if (!visibilitySettings.welcomeSection) {
    $(".welcome").hide();
  }

  if (!visibilitySettings.specialSection) {
    $(".section-padding.bg-porcelain").hide();
  }
  if (!visibilitySettings.videoSection) {
    $(".video-area").hide();
  }
  if (!visibilitySettings.testimonialSection) {
    $(".testi-carousel").hide(); 
  }

   $('#slogan').text(textInfo.slogan)
   $('#banner').text(textInfo.banner)
   $('#banner-title').html(textInfo.welcomeBanner.title)
     $('#banner-text').html(textInfo.welcomeBanner.text)
     $('#banner-button').text(textInfo.welcomeBanner.buttonText);



     $('#facility-title1').text(textInfo.facilities.facility1.title)
     $('#facility-title2').text(textInfo.facilities.facility2.title)
     $('#facility-title3').text(textInfo.facilities.facility3.title)


     $('#facility-text1').text(textInfo.facilities.facility1.text)
     $('#facility-text2').text(textInfo.facilities.facility2.text)
     $('#facility-text3').text(textInfo.facilities.facility3.text)
    

$('#testimonial-text1').html(textInfo.testimonial.testimonial1.text)
$('#testimonial-text2').html(textInfo.testimonial.testimonial2.text)
    $('#testimonial-text3').html(textInfo.testimonial.testimonial3.text)
    $('#testimonial-text4').html(textInfo.testimonial.testimonial4.text)
    $('#testimonial-text5').html(textInfo.testimonial.testimonial5.text)
    $('#testimonial-text6').html(textInfo.testimonial.testimonial6.text)

    $('#testimonial-name1').html(textInfo.testimonial.testimonial1.name)
    $('#testimonial-name2').html(textInfo.testimonial.testimonial2.name)
        $('#testimonial-name3').html(textInfo.testimonial.testimonial3.name)
        $('#testimonial-name4').html(textInfo.testimonial.testimonial4.name)
        $('#testimonial-name5').html(textInfo.testimonial.testimonial5.name)
        $('#testimonial-name6').html(textInfo.testimonial.testimonial6.name)
    

        
    $('#testimonial-designation1').html(textInfo.testimonial.testimonial1.designation)
    $('#testimonial-designation2').html(textInfo.testimonial.testimonial2.designation)
        $('#testimonial-designation3').html(textInfo.testimonial.testimonial3.designation)
        $('#testimonial-designation4').html(textInfo.testimonial.testimonial4.designation)
        $('#testimonial-designation5').html(textInfo.testimonial.testimonial5.designation)
        $('#testimonial-designation6').html(textInfo.testimonial.testimonial6.designation)

    document.documentElement.style.setProperty("--primary-color", primaryColor);
  }).fail(function () {
    console.error("Failed to load appsettings.json");
  });





  //------- video popup -------//
  $(".play-btn").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  //------- Lightbox  js --------//
  $(".img-gal").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  //------- testimonial carousel --------//
  if ($(".owl-carousel").length > 0) {
    $(".testi-carousel").owlCarousel({
      loop: true,
      autoplay: true,
      margin: 30,
      smartSpeed: 600,
      nav: false,
      dots: true,
      responsive: {
        0: {
          items: 1,
        },
        800: {
          items: 2,
        },
        1000: {
          items: 3,
        },
      },
    });
  }

  //------- initialize menu --------//
  $(".nav-menu").superfish({
    animation: {
      opacity: "show",
    },
    speed: 400,
  });

  //* Navbar Fixed
  var window_width = $(window).width(),
    window_height = window.innerHeight,
    header_height = $(".default-header").height(),
    header_height_static = $(".site-header.static").outerHeight(),
    fitscreen = window_height - header_height;

  $(".fullscreen").css("height", window_height);
  $(".fitscreen").css("height", fitscreen);
  var nav_offset_top = $("header").height() + 50;
  function navbarFixed() {
    if ($(".header_area").length) {
      $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= nav_offset_top) {
          $(".header_area").addClass("navbar_fixed");
        } else {
          $(".header_area").removeClass("navbar_fixed");
        }
      });
    }
  }
  navbarFixed();

  //------- mobile navigation --------//
  if ($("#nav-menu-container").length) {
    var $mobile_nav = $("#nav-menu-container").clone().prop({
      id: "mobile-nav",
    });
    $mobile_nav.find("> ul").attr({
      class: "",
      id: "",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" id="mobile-nav-toggle"><i class="lnr lnr-menu"></i></button>'
    );
    $("body").append('<div id="mobile-body-overly"></div>');
    $("#mobile-nav")
      .find(".menu-has-children")
      .prepend('<i class="lnr lnr-chevron-down"></i>');

    $(document).on("click", ".menu-has-children i", function (e) {
      $(this).next().toggleClass("menu-item-active");
      $(this).nextAll("ul").eq(0).slideToggle();
      $(this).toggleClass("lnr-chevron-up lnr-chevron-down");
    });

    $(document).on("click", "#mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $("#mobile-nav-toggle i").toggleClass("lnr-cross lnr-menu");
      $("#mobile-body-overly").toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("lnr-cross lnr-menu");
          $("#mobile-body-overly").fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  //------- Active Nice Select --------//
  $("select").niceSelect();

  //------- mailchimp --------//
  function mailChimp() {
    $("#mc_embed_signup").find("form").ajaxChimp();
  }
  mailChimp();
  function mailChimp2() {
    $("#mc_embed_signup2").find("form").ajaxChimp();
  }
  mailChimp2();
});
