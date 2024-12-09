$(document).ready(function() {
    // Initialize datepicker for both check-in and check-out fields
    $('#date-in').datepicker({
      dateFormat: 'mm/dd/yy', // Set the date format
      minDate: 0, // Prevent selecting past dates
      onClose: function(selectedDate) {
        // When a date is selected in the check-in field, set minDate for check-out field
        $('#date-out').datepicker('option', 'minDate', selectedDate);
      }
    });
    
    $('#date-out').datepicker({
      dateFormat: 'mm/dd/yy', // Set the date format
      minDate: 1, // Ensure check-out date is always after check-in date
    });
  });