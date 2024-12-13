$(document).ready(function () {
  var currentPath = window.location.pathname;

  $(".menu_nav .nav-item a").each(function () {
    var linkPath = $(this).attr("href");

    if (currentPath.includes(linkPath)) {
      $(".menu_nav .nav-item").removeClass("active");

      $(this).parent().addClass("active");
    }
  });

  $.getJSON('/appsettings.json', function(data){
const email = data.contactInfo.email
const phone = data.contactInfo.phone


$("#phone").text(phone)
$("#phone-link").attr('href',`tel:${phone}` )

$('#email').text(email)
$('#email-link').attr('href',`tel:${email}`)

  }).fail(function () {
    console.error("Failed to load settings.json");
  });




  $.getJSON('/appsettings.json', function(data){
    const facebook = data.socialLinks.facebook
    const twitter = data.socialLinks.twitter
    const instagram = data.socialLinks.instagram

    $('#facebook-link').attr('href', `${facebook}`)
    $('#twitter-link').attr('href',`${twitter}`)
    $('instagram-link').attr('href',`${instagram}`)
  }).fail(function(){
    console.error("Failed to load settings.json");
  })
});
