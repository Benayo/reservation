
$(document).ready(function() {
 
  if ($.fn.datepicker) {

    $('#date-in').datepicker({
      dateFormat: 'yy/mm/dd',  
      minDate: 0,              
      onClose: function(selectedDate) {
       
        $('#date-out').datepicker('option', 'minDate', selectedDate);
      }
    });

 
    $('#date-out').datepicker({
      dateFormat: 'yy/mm/dd',  
      minDate: 1,             
    });
  } else {
    console.error('jQuery UI Datepicker is not loaded!');
  }

  
  $('#check-availability-form').submit(function(event) {
    event.preventDefault();  
    
    var checkInDate = $('#date-in').val();  
    var checkOutDate = $('#date-out').val();
    var adults = $('#num-adults').val();
    var children = $('#num-children').val();
    
   
    
    var queryParams = 'checkInDate=' + encodeURIComponent(checkInDate) +
                      '&checkOutDate=' + encodeURIComponent(checkOutDate) +
                      '&adults=' + encodeURIComponent(adults) +
                      '&children=' + encodeURIComponent(children);
    
                      
    window.location.href = '/view/bookings.html?' + queryParams;
  });
});
