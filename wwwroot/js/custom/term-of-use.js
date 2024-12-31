let apiKey = '';
let baseUrl = '';
$(document).ready(function() {

  $.getJSON('/appsettings.json', function(data) {

    apiKey = data.api.apiKey;
    baseUrl = data.api.baseUrl;
    loadTermOfUse()
});



  function loadTermOfUse(){  $.ajax({
        url: `${baseUrl}/Term/Detail`,
        method: 'GET',
        headers: {
         
        },
        success: function(response) {
            console.log(response.detail)
            $('#terms-text').html(response.detail);
        },
        error: function() {
          $('#terms-text').html('<h5>Failed to load terms of use. Please try again later.</h5>');
        }
      });
    }
})