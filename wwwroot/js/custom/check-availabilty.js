// $(document).ready(function() {
  
//   $.getJSON('/appsettings.json', function(data) {
//     $('#adult-age').text(data.appSettings.adults);
//     $('#children-age').text(data.appSettings.children);
//   });


//   if (typeof $.fn.datepicker === 'undefined') {
   
//     $.getScript("https://code.jquery.com/ui/1.12.1/jquery-ui.min.js")
//       .done(function() {
//         initializeDatepickers();  
//       })
//       .fail(function() {
//         console.error("Failed to load Datepicker script.");
//       });
//   } else {
  
//     initializeDatepickers();
//   }




// function initializeDatepickers() {
//     if ($.fn.datepicker) {
    
//       $('#date-in').datepicker({
//         dateFormat: 'yy/mm/dd',
//         changeMonth: true,
//         changeYear: true,
//         minDate: 0,
//         onClose: function(selectedDate) {
//           var checkOutMinDate = $.datepicker.parseDate('yy/mm/dd', selectedDate);
//           checkOutMinDate.setDate(checkOutMinDate.getDate() + 1);
//           $('#date-out').datepicker('option', 'minDate', checkOutMinDate);
        
//           if ($(this).val()) {
//             $('#check-in-error').hide();
//           }
//         }
//       });
  
    
//       $('#date-out').datepicker({
//         dateFormat: 'yy/mm/dd',
//         changeMonth: true,
//         changeYear: true,
//         minDate: 1,
//         onClose: function(selectedDate) {
         
//           if ($(this).val()) {
//             $('#check-out-error').hide();
//           }
//         }
//       });
  
//     } else {
//       console.error('jQuery UI Datepicker is not loaded!');
//     }

// }

 
//   function validateField(selector, errorSelector, errorMessage) {
//     $(selector).blur(function() {
//       if ($(this).val() === "") {
//         $(errorSelector).text(errorMessage).show();
//       }
//     });

//     $(selector).on('input', function() {
//       if ($(this).val() !== "") {
//         $(errorSelector).text('').hide();
//       }
//     });
//   }

//   // Apply validation to the fields
//   validateField('#date-in', '#check-in-error', '*Check-in is required.');
//   validateField('#date-out', '#check-out-error', '*Check-out is required.');
//   validateField('#num-adults', '#adults-error', '*Number of adults is required');
//   validateField('#num-children', '#children-error', '*Number of children is required');

//   // Form submission handling
//   $('#check-availability-form').submit(function(event) {
//     event.preventDefault();

//     var checkInDate = $('#date-in').val();
//     var checkOutDate = $('#date-out').val();
//     var adults = $('#num-adults').val();
//     var children = $('#num-children').val();

//     // Check if all fields are filled
//     if (!checkInDate || !checkOutDate || !adults || !children) {
//       $('#error-message').text('*Please fill out all fields.').show();
//       return;
//     } else {
//       $('#error-message').hide();
//     }

//     // Check if the check-out date is after the check-in date
//     if (new Date(checkInDate) >= new Date(checkOutDate)) {
//       $('#check-out-error').text('*Check-out must be after check-in.').show();
//       return;
//     } else {
//       $('#check-out-error').hide();
//     }

//     // If everything is valid, redirect with the query parameters
//     var queryParams = 'checkInDate=' + encodeURIComponent(checkInDate) +
//                       '&checkOutDate=' + encodeURIComponent(checkOutDate) +
//                       '&adults=' + encodeURIComponent(adults) +
//                       '&children=' + encodeURIComponent(children);

//     window.location.href = '/view/bookings.html?' + queryParams;
//   });

//   // Pre-fill fields based on URL parameters
//   $(document).ready(function () {
//     var urlParams = new URLSearchParams(window.location.search);
//     if (urlParams.has('checkInDate')) {
//       $('#date-in').val(urlParams.get('checkInDate'));
//     }
//     if (urlParams.has('checkOutDate')) {
//       $('#date-out').val(urlParams.get('checkOutDate'));
//     }
//     if (urlParams.has('adults')) {
//       $('#num-adults').val(urlParams.get('adults')).trigger('change');
//     }
//     if (urlParams.has('children')) {
//       $('#num-children').val(urlParams.get('children')).trigger('change');
//     }
//   });
// });



$(document).ready(function() {
  
  $.getJSON('/appsettings.json', function(data) {
    $('#adult-age').text(data.appSettings.adults);
    $('#children-age').text(data.appSettings.children);
  });

  if (typeof $.fn.datepicker === 'undefined') {
    $.getScript("https://code.jquery.com/ui/1.12.1/jquery-ui.min.js")
      .done(function() {
        initializeDatepickers();  
      })
      .fail(function() {
        console.error("Failed to load Datepicker script.");
      });
  } else {
    initializeDatepickers();
  }

  function initializeDatepickers() {
    if ($.fn.datepicker) {
      $('#date-in').datepicker({
        dateFormat: 'yy/mm/dd',
        changeMonth: true,
        changeYear: true,
        minDate: 0,
        onClose: function(selectedDate) {
          var checkOutMinDate = $.datepicker.parseDate('yy/mm/dd', selectedDate);
          checkOutMinDate.setDate(checkOutMinDate.getDate() + 1);
          $('#date-out').datepicker('option', 'minDate', checkOutMinDate);
        
          if ($(this).val()) {
            $('#check-in-error').hide();
          }
        }
      });
    
      $('#date-out').datepicker({
        dateFormat: 'yy/mm/dd',
        changeMonth: true,
        changeYear: true,
        minDate: 1,
        onClose: function(selectedDate) {
          if ($(this).val()) {
            $('#check-out-error').hide();
          }
        }
      });
    } else {
      console.error('jQuery UI Datepicker is not loaded!');
    }
  }

  function validateField(selector, errorSelector, errorMessage) {
    if ($(selector).val() === "") {
      // $(errorSelector).text(errorMessage).show();

    $(errorSelector).text(errorMessage);  
    $(errorSelector).addClass('visible'); 

      return false;
    } else {
      // $(errorSelector).text('').hide();

      $(errorSelector).text('');  
    $(errorSelector).removeClass('visible'); 
      return true;
    }
  }

  $('#check-availability-form').submit(function(event) {
    event.preventDefault();

    var checkInDate = $('#date-in').val();
    var checkOutDate = $('#date-out').val();
    var adults = $('#num-adults').val();
    var children = $('#num-children').val();

    if (!validateField('#date-in', '#check-in-error', '*Check-in is required.')) return;
    if (!validateField('#date-out', '#check-out-error', '*Check-out is required.')) return;
    if (!validateField('#num-adults', '#adults-error', '*Number of adults is required')) return;
    if (!validateField('#num-children', '#children-error', '*Number of children is required')) return;

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      $('#check-out-error').text('*Check-out must be after check-in.').show();
      return;
    } else {
      $('#check-out-error').hide();
    }

    var queryParams = 'checkInDate=' + encodeURIComponent(checkInDate) +
                      '&checkOutDate=' + encodeURIComponent(checkOutDate) +
                      '&adults=' + encodeURIComponent(adults) +
                      '&children=' + encodeURIComponent(children);

    window.location.href = '/view/bookings.html?' + queryParams;
  });

  $(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('checkInDate')) {
      $('#date-in').val(urlParams.get('checkInDate'));
    }
    if (urlParams.has('checkOutDate')) {
      $('#date-out').val(urlParams.get('checkOutDate'));
    }
    if (urlParams.has('adults')) {
      $('#num-adults').val(urlParams.get('adults')).trigger('change');
    }
    if (urlParams.has('children')) {
      $('#num-children').val(urlParams.get('children')).trigger('change');
    }
  });
});

