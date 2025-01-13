
$(document).ready(function () {
  
  let apiKey = '';
let baseUrl = '';


  $("#header").load("/shared/header.html");

  $("#footer").load("/shared/footer.html");

  $("#availability").load("/shared/check-availability.html");

  $('html, body').animate({ scrollTop: 0 }, 'fast');




    // For select fields
    $('#dropdown').on('change focus', function() {
      if ($(this).val() !== "") {
        $(this).next('label').css({
          top: '-10px',
          fontSize: '12px',
          color: '#3f51b5'
        });
      } else {
        $(this).next('label').css({
          top: '10px',
          fontSize: '16px',
          color: '#999'
        });
      }
    });

  



  
  $.getJSON("/appsettings.json", function (data) {
    
    apiKey = data.api.apiKey;
    baseUrl = data.api.baseUrl;

  const primaryColor = data.appSettings.primaryColor;
  const primaryTextColor = data.appSettings.primaryTextColor;
  const primaryColorOpacity = data.appSettings.primaryColorOpacity; 
  
  const footerColor = data.appSettings.footerColor;
  const footerCopyrightColor = data.appSettings.footerCopyrightColor;

 const contentInfo = data.homeContent
 const mainFontFamily = data.appSettings.mainFontFamily;
 const bodyFontFamily = data.appSettings.bodyFontFamily;

 



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


  $('#hotel-name').text(data.contactInfo.hotel)
   $('#slogan').text(contentInfo.slogan)
   $('#banner').text(contentInfo.banner)


   $('#welcome-image-1').attr('src', contentInfo.welcomeBanner.image1)
   $('#welcome-image-2').attr('src', contentInfo.welcomeBanner.image2)
   $('#welcome-image-3').attr('src', contentInfo.welcomeBanner.image3)
   $('#welcome-title').html(contentInfo.welcomeBanner.title)
  $('#welcome-description').html(contentInfo.welcomeBanner.description)
  $('#welcome-button').text(contentInfo.welcomeBanner.buttonText);



  $("#play-home-video").attr('href', contentInfo.videoSection.videoPath)
  $("#video-title").text(contentInfo.videoSection.title)
  $("#video-description").text(contentInfo.videoSection.description)




  document.documentElement.style.setProperty("--main-font-family", mainFontFamily);

  document.documentElement.style.setProperty("--body-font-family", bodyFontFamily);


  document.documentElement.style.setProperty("--primary-color", primaryColor);

  document.documentElement.style.setProperty('--primary-color-opacity', primaryColorOpacity);

  document.documentElement.style.setProperty("--primary-text-color", primaryTextColor);

  document.documentElement.style.setProperty("--footer-color", footerColor);

  document.documentElement.style.setProperty("--footer-copyright-color", footerCopyrightColor);
  }).fail(function () {
    console.error("Failed to load appsettings.json");
  });






  
  
  function getDefaultValues() {
    var currentDate = new Date();
    var nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);

    var adults = 1;
    var children = 1;

    return {
      checkInDate: currentDate,
      checkOutDate: nextDay,
      adults: adults,
      children: children
    };
  }
  
  let roomTypeId = '';

  $(document).on('click', '#book-now',function(event) {
    event.preventDefault();

    var defaultValues = getDefaultValues();

    
    var checkInDate = defaultValues.checkInDate.toISOString().split('T')[0];
    var checkOutDate = defaultValues.checkOutDate.toISOString().split('T')[0];
    var adults = defaultValues.adults;
    var children = defaultValues.children;

    var queryParams = 'checkInDate=' + encodeURIComponent(checkInDate) +
                      '&checkOutDate=' + encodeURIComponent(checkOutDate) +
                      '&adults=' + encodeURIComponent(adults) +
                      '&children=' + encodeURIComponent(children);

    window.location.href = 'bookings.html?' + queryParams;
  });
  

  jQuery(document).ready(function ($) {





    function renderFacilitySection(facilitySectionData) {
      const facilityImage = $('#facility-image');
      facilityImage.attr('src', facilitySectionData.image);
  
      const facilitiesList = $('#facilitiesList');
      const facilityItems = facilitySectionData.facilities.map(facility => {
        return `
          <div class="">
          <div class="card card-special">
          <div>
           <span class="card-special__icon"><i class="${facility.iconClass}"></i></span> 
          <div class="media-body ">
            <h4 id="special__title" class="card-special__title">${facility.title}</h4>
             </div>
  
             <div class="card-body">
            <p>${facility.text}</p>
           </div>
            </div>
            </div>
          </div>
        `;
      }).join('');
  
      facilitiesList.html(facilityItems);
  
      
      if ($(".owl-carousel").length > 0) {
        facilitiesList.owlCarousel("destroy"); 
        facilitiesList.owlCarousel({
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
            700: {
              items: 2,
            },
            1000: {
              items: 3,
            },
          },
        })
    }
  }
    



    const roomsContainer = $("#rooms-container");

  // Show skeleton loaders
  for (let i = 0; i < 4; i++) {
    roomsContainer.append(`
      <div class="testi-carousel__item-room skeleton">
        <div class="card card-explore">
          <div class="card-explore__img skeleton-box skeleton-img"></div>
          <div class="card-body">
            <div class="skeleton-box skeleton-price"></div>
            <div class="skeleton-box skeleton-title"></div>
            <div class="skeleton-box skeleton-summary"></div>
            <div class="skeleton-box skeleton-link"></div>
          </div>
        </div>
      </div>
    `);
  }
  if ($(".owl-carousel").length > 0) {
    roomsContainer.owlCarousel("destroy"); 
    roomsContainer.owlCarousel({
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
        700: {
          items: 1,
        },
        1000: {
          items: 2,
        },
      }
      })
    }

    $.getJSON("/appsettings.json", function (data) {

      apiKey = data.api.apiKey;
      baseUrl = data.api.baseUrl;

      const contentInfo = data.homeContent
      renderFacilitySection(contentInfo.facilitySection);

    $.ajax({
      url: `${baseUrl}/RoomType/DetailList?facilityTypeId=1`,
      method: "GET",
      headers: {
        'X-API-KEY': apiKey
      },
      success: function (response) {
        
        if (response && response.types) {
          const roomsContainer = $("#rooms-container");

          
          roomsContainer.empty(); 
         

          $.each(response.types, function (index, room) {

           

            let roomDetails = room.summary || 'Room summary not available';
            let truncatedDetails = roomDetails.split(' ').slice(0, 12).join(' ');

            
         
      
            let detailsHtml = `
              <span>${truncatedDetails}...</span> 
              <a href="/view/room-details.html?roomTypeId=${room.roomTypeId}" id="room-type-button">Read More</a>
            `;

            if (room.summary === "") {
              detailsHtml = ''; 
            }
            


            const roomElement = `

         
            <div class="testi-carousel__item-room">
              <div class="card card-explore">
                <div class="card-explore__img">
                  <img class="card-img" src="${
                    room.image1 || "default_image.jpg"
                  }" alt="${room.roomType}" loading="lazy" />
                </div>
                <div class="card-body">
                  <h3 class="card-explore__price">${formatCurrency(
                    room.currencySymbol,
                    room.rate
                  )}<sub>/ Night</sub></h3>
                  <h4 class="card-explore__title">
                    <a href="/view/room-details.html?roomTypeId=${
                      room.roomTypeId
                    }">${room.roomType}</a>
                  </h4>
                  <div class="card-explore__summary">${detailsHtml}</div>
                  <a class="card-explore__link" id="book-now" href="#" data-roomTypeId=${room.roomTypeId}>Book Now <i class="ti-arrow-right"></i></a>
                </div>
              </div>
            </div>
          `;

            $("#rooms-container").append(roomElement);
          });

          if ($(".owl-carousel").length > 0) {
            roomsContainer.owlCarousel("destroy"); 
            roomsContainer.owlCarousel({
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
                700: {
                  items: 1,
                },
                1000: {
                  items: 2,
                },
              },
            });
          }
        } else {
          $("#rooms-container").html(`<div class="error-container">
            <h4>No room types available.</h4>
            </div>`);
        }
      },
      error: function () {
        $("#rooms-container").html(`<div class="error-container"><h4>Error fetching room types.</h4></div>`);
      },
    });





    
  });
  
    
    $(document).on('click', '#book-now', function(event) {

        
          event.preventDefault();

          var roomTypeId = $(this).data('roomtypeid');


          var defaultValues = getDefaultValues();
          var checkInDate = defaultValues.checkInDate.toISOString().split('T')[0];
          var checkOutDate = defaultValues.checkOutDate.toISOString().split('T')[0];
          var adults = defaultValues.adults;
          var children = defaultValues.children;
  

  
        var queryParams = 'checkInDate=' + encodeURIComponent(checkInDate) +
                        '&checkOutDate=' + encodeURIComponent(checkOutDate) +
                        '&adults=' + encodeURIComponent(adults) +
                        '&children=' + encodeURIComponent(children)  +
                        '&roomTypeId=' + encodeURIComponent(roomTypeId);
  
      window.location.href = '/view/bookings.html?' + queryParams;
  
      })





    $.getJSON("/appsettings.json", function (data) {
    
       const contentInfo = data.homeContent
   
    const testimonialSection = contentInfo.testimonialSection;

    
     const testimonialContainer = $("#testimonial-container")

        $.each(testimonialSection, function(index, testimonial) {
          const carouselItem = `
            <div class="testi-carousel__item">
              <div class="media">
                <div class="testi-carousel__img">
                  <img src="${testimonial.image}" alt="${testimonial.name}" />
                </div>
                <div class="media-body">
                  <p>${testimonial.description}</p>
                  <div class="testi-carousel__intro">
                    <h3>${testimonial.name}</h3>
                    <p>${testimonial.designation}</p>
                  </div>
                </div>
              </div>
            </div>
          `;
          
          $('#testimonial-container').append(carouselItem);
        });
      
        if ($(".owl-carousel").length > 0) {

          testimonialContainer.owlCarousel("destroy");

          testimonialContainer.owlCarousel({
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

      })
  });
  
  function formatCurrency(currencySymbol, rate) {
    return currencySymbol + ' ' + rate.toLocaleString(); 
  }
  

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
  // $(".nav-menu").superfish({
  //   animation: {
  //     opacity: "show",
  //   },
  //   speed: 400,
  // });

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


