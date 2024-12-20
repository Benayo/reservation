$(document).ready(function(){
    $("#header").load('/shared/header.html')
    $("#footer").load('/shared/footer.html')
    $('#reservation').load('/shared/reservation-summary.html')



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
        $('#preview-guest-title').text(bookingData.guestTitle);
        $('#preview-guest-first-name').text(bookingData.guestFirstName
        );
        $('#preview-guest-last-name').text(bookingData.guestLastName
        );
        $('#guest-preview-gender').text(bookingData.guestGender);
        $('#guest-preview-date-of-birth').text(bookingData.guestDateOfBirth);
        $('#guest-preview-occupation').text(bookingData.guestOccupation)

        $('#guest-preview-arrival-time').text(bookingData.guestArrivalTime); 
        $('#guest-preview-purpose').text(bookingData.guestPurpose); 
        $('#guest-preview-phone').text(bookingData.guestPhone);
        $('#guest-preview-email').text(bookingData.email);
        $('#guest-preview-additional-info').text(bookingData.  guestAdditionalRequirements)
        $('#guest-preview-address1').text(bookingData.guestAddressLine1)
        $('#guest-preview-address2').text(bookingData.guestAddressLine2);
        $('#guest-preview-state').text(bookingData.guestStateName
        );
        $('#guest-preview-country').text(bookingData.guestCountryName
        );

      
         
   
      } else {
        console.log('No booking data found in sessionStorage.');
      }
})