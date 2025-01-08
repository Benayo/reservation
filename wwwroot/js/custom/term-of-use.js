
$(document).ready(function() {
  let apiKey = '';
let baseUrl = '';


  $.getJSON('/appsettings.json', function(data) {

    
    $('#loading-spinner').show();

    apiKey = data.api.apiKey;
    baseUrl = data.api.baseUrl;
    loadTermsOfUse()
});



function loadTermsOfUse(){
  $.ajax({
      url:   `${baseUrl}/Term/Detail`,
      method: 'GET',
      headers: {
        'X-API-KEY': apiKey
      },
      success: function(response) {

        
    $('#loading-spinner').hide();
        $('#terms-text').html(response.detail);
        
        
      },
      error: function() {
        $('#terms-text').html('<p>Failed to load terms of service. Please try again later</p>');
        console.error("Failed to load terms of use");
        
      }
    });
    }
})