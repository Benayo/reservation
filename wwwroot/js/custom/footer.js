$(document).ready(function () {
  $.getJSON("/appsettings.json", function (data) {
    const socialLinks = data.socialLinks;
    console.log(socialLinks); // Debugging: Check if the links are loaded correctly

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

    // Correctly format phone and email links
    $('#phone-link').attr('href', 'tel:' + contactDetails.phone);
    $('#email-link').attr('href', 'mailto:' + contactDetails.email);
  }).fail(function () {
    console.error("Failed to load settings.json");
  });
});
