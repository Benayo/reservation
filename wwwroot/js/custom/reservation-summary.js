$(document).ready(function() {
  
  var bookingData = JSON.parse(sessionStorage.getItem('bookingData'));
  
  if (bookingData && bookingData.requestData) {
    console.log("Booking Data:", bookingData);
    
    var requestData = bookingData.requestData;
    var selectedRoom = bookingData.selectedRoom;
    var roomCount = bookingData.roomCount;

    $('#room-type').text(selectedRoom.roomType);
    $('#room-count').text(roomCount + ' rooms');
    $('#check-in-date').text(requestData.checkInDate);
    $('#check-out-date').text(requestData.checkOutDate);
    $('#adults').text(requestData.adultNo);
    $('#children').text(requestData.childNo);
    
    var checkInDate = new Date(requestData.checkInDate);
    var checkOutDate = new Date(requestData.checkOutDate);
    var timeDifference = checkOutDate - checkInDate;
    var numberOfNights = timeDifference / (1000 * 3600 * 24);

    
    const roomRate = selectedRoom.rate * roomCount;
    var totalRate = numberOfNights * roomRate;
    
    var formattedTotalRate = totalRate.toLocaleString();
    
    // Use only the currency symbol once before the rate
    $('#night-count').text(numberOfNights + ' Night(s)');
    $('#currency-symbol').text(selectedRoom.currencySymbol);
    $('#room-rate').text(selectedRoom.currencySymbol + ' ' + formattedTotalRate);
  } else {
    console.log('No valid booking data found in sessionStorage.');
  }

  function getDefaultValues() {
    var currentDate = new Date();
    var nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);

    var adults = 1;
    var children = 1;

    return {
      checkInDate: currentDate,
      checkOutDate: nextDay,
      adults: adults,
      children: children
    };
  }


  $(document).on('click', '#change-date', function(event) {
    event.preventDefault();

    var defaultValues = getDefaultValues();
    
    var checkInDate = defaultValues.checkInDate.toISOString().split('T')[0];
    var checkOutDate = defaultValues.checkOutDate.toISOString().split('T')[0];
    var adults = defaultValues.adults;
    var children = defaultValues.children;

    var queryParams = 'checkInDate=' + encodeURIComponent(checkInDate) +
                      '&checkOutDate=' + encodeURIComponent(checkOutDate) +
                      '&adults=' + encodeURIComponent(adults) +
                      '&children=' + encodeURIComponent(children);
    
    window.location.href = 'bookings.html?' + queryParams;
  });

  $(document).on('click', '#change-rooms', function(event) {
    event.preventDefault();

    var defaultValues = getDefaultValues();

    var checkInDate = bookingData.requestData.checkInDate || defaultValues.checkInDate.toISOString().split('T')[0];
    var checkOutDate = bookingData.requestData.checkOutDate || defaultValues.checkOutDate.toISOString().split('T')[0];
    var adults = bookingData.requestData.adultNo || defaultValues.adults;
    var children = bookingData.requestData.childNo || defaultValues.children;

    var queryParams = 'checkInDate=' + encodeURIComponent(checkInDate) +
                      '&checkOutDate=' + encodeURIComponent(checkOutDate) +
                      '&adults=' + encodeURIComponent(adults) +
                      '&children=' + encodeURIComponent(children);
    
    window.location.href = '/view/bookings.html?' + queryParams;
  });
});
