$(document).ready(function () {
    $("#header").load("/shared/header.html");
    $("#footer").load("/shared/footer.html")

jQuery(document).ready(function ($) {

  $.getJSON("/appsettings.json", function (data) {

    const recaptchaSiteKey = data.appSettings.recaptchaSiteKey;

    $('#recaptcha-container').attr('data-sitekey', recaptchaSiteKey)
  })
 


})

 
      $.getJSON("/appsettings.json", function (data) {


        const latitude = data.contactContent.mapSettings.latitude;
      const longitude = data.contactContent.mapSettings.longitude;
      const mapTitle = data.contactContent.mapSettings.title;
      const apiKey = data.contactContent.mapSettings.apiKey;
      

      initializeMap(latitude, longitude, mapTitle, apiKey);


        
        const visibilitySettings = data.contactContent.visibility
   
        if (!visibilitySettings.map) {
          $("#map").hide();
        };

        if (!visibilitySettings.captcha) {
          $("#recaptcha-container").hide();
        };

        const contactDetails = data.contactInfo;
        
    $('#hotel-name').text(data.contactInfo.hotel);
        $("#contact-address").text(contactDetails.address);
        $("#contact-state").text(contactDetails.state);
        $("#contact-country").text(contactDetails.country);
        $("#phone-number").text(contactDetails.phone);
        $("#email-address").text(contactDetails.email);
        $("#operating-time").text(contactDetails.operatingTime);
  
        $("#phone-number-link").attr("href", "tel:" + contactDetails.phone);
        $("#email-address-link").attr("href", "mailto:" + contactDetails.email);

      }).fail(function () {
        console.error("Failed to load settings.json");
      });
  


   

  function initializeMap(latitude, longitude, mapTitle, apiKey) {
    const position = { lat: latitude, lng: longitude };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);

    window.initMap = async function () {
      const { Map } = await google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

      const map = new Map(document.getElementById("map"), {
        zoom: 15,
        center: position,
        mapId: "DEMO_MAP_ID",
        zoomControl: true,
        cameraControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true,
      });

      new AdvancedMarkerElement({
        map: map,
        position: position,
        title: mapTitle,
      });
    };
  }





      $(function () {
        $("#contact-form").validate({
          rules: {
            name: {
              required: true,
              minlength: 2,
            },
            subject: {
              required: true,
              minlength: 4,
            },
            number: {
              required: true,
              minlength: 5,
            },
            email: {
              required: true,
              email: true,
            },
            message: {
              required: true,
              minlength: 20,
            },
          },
          messages: {
            name: {
              required: "Please fill in your name",
              minlength: "your name must consist of at least 2 characters",
            },
            subject: {
              required: "Please add a subject",
              minlength: "your subject must consist of at least 4 characters",
            },
            number: {
              required: "Please provide a phone number",
              minlength: "your Number must consist of at least 5 characters",
            },
            email: {
              required: "Your email address is missing",
            },
            message: {
              required:
                "um...yea, you have to write something to send this form.",
              minlength: "thats all? really?",
            },
          },
          submitHandler: function (form) {
            $(form).ajaxSubmit({
              type: "POST",
              data: $(form).serialize(),
              url: "contact_process.php",
              success: function () {
                $("#contactForm :input").attr("disabled", "disabled");
                $("#contactForm").fadeTo("slow", 1, function () {
                  $(this).find(":input").attr("disabled", "disabled");
                  $(this).find("label").css("cursor", "default");
                  $("#success").fadeIn();
                  $(".modal").modal("hide");
                  $("#success").modal("show");
                });
              },
              error: function () {
                $("#contactForm").fadeTo("slow", 1, function () {
                  $("#error").fadeIn();
                  $(".modal").modal("hide");
                  $("#error").modal("show");
                });
              },
            });
          },
        });
      });


      

      
  });
  