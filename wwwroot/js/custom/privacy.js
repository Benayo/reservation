let key = '';
$(document).ready(function() {

  $.getJSON('/appsettings.json', function(data) {

    apiKey = data.api.apiKey;
    baseUrl = data.api.baseUrl;

    loadPrivacyPolicy()
  
    
    $('#hotel-name').text(data.contactInfo.hotel);
});

function loadPrivacyPolicy(){
$.ajax({
        url: `${baseUrl}/Privacy/Detail`,
        method: 'GET',
        headers: {
          'X-API-KEY': apiKey
        },
        success: function(response) {
            console.log(response.detail)
            $('#privacy-text').html(response.detail);
        },
        error: function() {
          $('#privacy-text').html('<h5>Failed to load privacy policy. Please try again later.</h5>');
        }
      });
     
}
})