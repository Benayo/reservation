$(document).ready(function () {
  $.getJSON("/appsettings.json", function (data) {
    const socialLinks = data.socialLinks;

    
    const currentYear = new Date().getFullYear();
    $("#current-year").text(currentYear);
   
    $("#facebook_footer-link").attr("href", socialLinks.facebook);
    $("#twitter_footer-link").attr("href", socialLinks.twitter);
    $("#instagram_footer-link").attr("href", socialLinks.instagram);

    const contactDetails = data.contactInfo;

    
    $("#address").text(contactDetails.address);
    $("#state").text(contactDetails.state);
    $("#country").text(contactDetails.country);
    $('#phone_footer').html(contactDetails.phone);
    $('#email_footer').text(contactDetails.email);
    $('#footerLogoPath').attr('src', data.appSettings.whiteLogoPath )

    const textInfo=data.homeContent

    $('#slogan-text').text(textInfo.slogan);
    $('#phone_footer-link').attr('href', 'tel:' + contactDetails.phone);
    $('#email_footer-link').attr('href', 'mailto:' + contactDetails.email);
  }).fail(function () {
    console.error("Failed to load settings.json");
  });
});
