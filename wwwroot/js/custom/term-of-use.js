let key = '';
$(document).ready(function() {

  $.getJSON('/appsettings.json', function(data) {
    
    key = data.api.key
});



    $.ajax({
        url: 'https://guestapi.roomability.io/Term/Detail',
        method: 'GET',
        headers: {
          'X-API-Key': key
        },
        success: function(response) {
            console.log(response.detail)
            $('#terms-text').html(response.detail);
        },
        error: function() {
          $('#terms-text').html('<h5>Failed to load terms of use. Please try again later.</h5>');
        }
      });
     

})