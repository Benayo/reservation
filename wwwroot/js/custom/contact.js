$(document).ready(function () {
    $("#header").load("/shared/header.html");
    $("#footer").load("/shared/footer.html")
      
      $.getJSON("/appsettings.json", function (data) {
        const contactDetails = data.contactInfo;
   
        
        
    $('#hotel-name').text(data.contactInfo.hotel);
        $("#address").text(contactDetails.address);
        $("#state").text(contactDetails.state);
        $("#country").text(contactDetails.country);
        $("#phone-number").text(contactDetails.phone);
        $("#email-address").text(contactDetails.email);
        $("#operating-time").text(contactDetails.operatingTime);
  
        $("#phone-number-link").attr("href", "tel:" + contactDetails.phone);
        $("#email-address-link").attr("href", "mailto:" + contactDetails.email);
      }).fail(function () {
        console.error("Failed to load settings.json");
      });
  
      // validate contactForm form
      $(function () {
        $("#contactForm").validate({
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
              required: "come on, you have a name, don't you?",
              minlength: "your name must consist of at least 2 characters",
            },
            subject: {
              required: "come on, you have a subject, don't you?",
              minlength: "your subject must consist of at least 4 characters",
            },
            number: {
              required: "come on, you have a number, don't you?",
              minlength: "your Number must consist of at least 5 characters",
            },
            email: {
              required: "no email, no message",
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
  