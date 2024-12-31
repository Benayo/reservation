$(document).ready(function () {
  $("#header").load("/shared/header.html");

  $("#footer").load("/shared/footer.html");



  $.getJSON("/appsettings.json",function (data){

    $('#hotel-name').text(data.contactInfo.hotel);

    const visibilitySettings= data.aboutContent.visibility

  
    if (!visibilitySettings.facilitySection) {
      $(".section-padding.bg-porcelain").hide();
    }
    if (!visibilitySettings.videoSection) {
      $(".video-area").hide();
    }
    if (!visibilitySettings.testimonialSection) {
      $(".testi-carousel").hide(); 
    }
})




jQuery(document).ready(function ($) {

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



});
