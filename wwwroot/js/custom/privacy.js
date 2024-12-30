let key = '';
$(document).ready(function() {

  $.getJSON('/appsettings.json', function(data) {
   key = data.api.key
});



    $.ajax({
        url: 'https://guestapi.roomability.io/Privacy/Detail',
        method: 'GET',
        headers: {
          'X-API-Key': key
        },
        success: function(response) {
            console.log(response.detail)
            $('#privacy-text').html(response.detail);
        },
        error: function() {
          $('#privacy-text').html('<h5>Failed to load privacy policy. Please try again later.</h5>');
        }
      });
     

})