$(document).ready(function() {
    
    $('#date-in').datepicker({
      dateFormat: 'dd/mm/yy', 
      minDate: 0, 
      onClose: function(selectedDate) {
       
        $('#date-out').datepicker('option', 'minDate', selectedDate);
      }
    });
    
    $('#date-out').datepicker({
      dateFormat: 'dd/mm/yy', 
      minDate: 1, 
    });
  });