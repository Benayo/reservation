$(document).ready(function(){

$('#header').load('/shared/header.html')
$('#footer').load('/shared/footer.html')
$('#reservation').load('/shared/reservation-summary.html')





$(document).on('click','#check-guest-button',function(e){
  e.preventDefault();
  

  var emailValue = $('#check_guest_email').val();
 
  var bookingData = JSON.parse(sessionStorage.getItem('bookingData'));

  if (bookingData) {
  
    bookingData.email = emailValue;

 
    console.log('Updated Booking Data:', bookingData);

   
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));

    
    window.location.href = 'guest-form.html';  
  } else {
    console.log('No booking data found in sessionStorage.');
  }

})


// var bookingData = JSON.parse(sessionStorage.getItem('bookingData'));
// if (bookingData) {
//   console.log(bookingData)
//   var requestData = bookingData.requestData;
//   var selectedRoom = bookingData.selectedRoom;
//   var roomCount = bookingData.roomCount;

 
//   console.log(requestData);
//   console.log(selectedRoom);
//   console.log(roomCount);




//   $('#room-type').text(selectedRoom.roomType);
//   $('#room-rate').text('₦ ' + selectedRoom.rate + ' / Night');
//   $('#room-count').text(roomCount + ' rooms');
//   $('#check-in-date').text(requestData.checkInDate);
//   $('#check-out-date').text(requestData.checkOutDate);
//   $('#room-count').text(roomCount + ' Room(s)')
//   $('#adults').text(requestData.adultNo);
//   $('#children').text(requestData.childNo);

   
//    var checkInDate = new Date(requestData.checkInDate);
//    var checkOutDate = new Date(requestData.checkOutDate);
//    var timeDifference = checkOutDate - checkInDate;
   
 
//    var numberOfNights = timeDifference / (1000 * 3600 * 24);
   

//    $('#night-count').text(numberOfNights + '    Night(s)');
// } else {
//   console.log('No booking data found in sessionStorage.');
// }
})