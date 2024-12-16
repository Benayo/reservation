$(document).ready(function() {
  // Initialize datepicker for check-in date
  $('#date-in').datepicker({
      dateFormat: 'dd/mm/yy',  // Set format
      minDate: 0,  // Disable past dates
      onClose: function(selectedDate) {
          // Set the minimum date for check-out based on the selected check-in date
          $('#date-out').datepicker('option', 'minDate', selectedDate);
      }
  });

  // Initialize datepicker for check-out date
  $('#date-out').datepicker({
      dateFormat: 'dd/mm/yy',  // Set format
      minDate: 1,  // Disable today as check-out date
  });
});
