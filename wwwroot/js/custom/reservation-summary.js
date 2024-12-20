$(document).ready(function(){


  

var bookingData = JSON.parse(sessionStorage.getItem('bookingData'));
if (bookingData) {
  console.log(bookingData)
  var requestData = bookingData.requestData;
  var selectedRoom = bookingData.selectedRoom;
  var roomCount = bookingData.roomCount;

  // Use this data to populate the check-guest page
  console.log(requestData);
  console.log(selectedRoom);
  console.log(roomCount);



  // Example of displaying the booking information
  $('#room-type').text(selectedRoom.roomType);
  $('#room-rate').text('₦ ' + selectedRoom.rate);
  $('#room-count').text(roomCount + ' rooms');
  $('#check-in-date').text(requestData.checkInDate);
  $('#check-out-date').text(requestData.checkOutDate);
  $('#room-count').text(roomCount + ' Room(s)')
  $('#adults').text(requestData.adultNo);
  $('#children').text(requestData.childNo);

   
   var checkInDate = new Date(requestData.checkInDate);
   var checkOutDate = new Date(requestData.checkOutDate);
   var timeDifference = checkOutDate - checkInDate;
   
 
   var numberOfNights = timeDifference / (1000 * 3600 * 24);
   
   // Display the number of nights
   $('#night-count').text(numberOfNights + '    Night(s)');
} else {
  console.log('No booking data found in sessionStorage.');
}
})