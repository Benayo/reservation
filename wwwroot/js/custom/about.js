$(document).ready(function () {
  $("#header").load("/shared/header.html");

  $("#footer").load("/shared/footer.html");



  $.getJSON("/appsettings.json",function (data){


    const visibilitySettings= data.aboutContent.visibility

  
    if (!visibilitySettings.specialSection) {
      $(".section-padding.bg-porcelain").hide();
    }
    if (!visibilitySettings.videoSection) {
      $(".video-area").hide();
    }
    if (!visibilitySettings.testimonialSection) {
      $(".testi-carousel").hide(); 
    }
  })
});
