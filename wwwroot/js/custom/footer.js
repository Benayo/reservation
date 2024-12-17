$(document).ready(function () {
  $.getJSON("/appsettings.json", function (data) {
    const socialLinks = data.socialLinks;

    
    const currentYear = new Date().getFullYear();
    $("#current-year").text(currentYear);

    // Set social media links
    $("#facebook-link").attr("href", socialLinks.facebook);
    $("#twitter-link").attr("href", socialLinks.twitter);
    $("#instagram-link").attr("href", socialLinks.instagram);

    // Set contact info
    const contactDetails = data.contactInfo;

    
    $("#address").text(contactDetails.address);
    $("#state").text(contactDetails.state);
    $("#country").text(contactDetails.country);
    $('#phone').text(contactDetails.phone);
    $('#email').text(contactDetails.email);

    const textInfo=data.homeContent

    $('#slogan-text').text(textInfo.slogan);
    $('#phone-link').attr('href', 'tel:' + contactDetails.phone);
    $('#email-link').attr('href', 'mailto:' + contactDetails.email);
  }).fail(function () {
    console.error("Failed to load settings.json");
  });
});
