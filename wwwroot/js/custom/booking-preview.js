$(document).ready(function(){
    $("#header").load('/shared/header.html')
    $("#footer").load('/shared/footer.html')
    $('#reservation').load('/shared/reservation-summary.html')


    
    if (!sessionStorage.getItem('bookingData')) {
      window.location.href = '/index.html'; 
      return; 
  }



    if (!sessionStorage.getItem('sessionStartTime')) {
      sessionStorage.setItem('sessionStartTime', Date.now()); 
  }

  
  const sessionTimeoutDuration = 15 * 60 * 1000; 
  

    
  if (!sessionStorage.getItem('bookingData')) {
    window.location.href = '/index.html'; 
    return; 
}



  const checkSessionExpiration = function() {
      const sessionStartTime = sessionStorage.getItem('sessionStartTime');
      if (sessionStartTime) {
          const elapsedTime = Date.now() - sessionStartTime;
          if (elapsedTime >= sessionTimeoutDuration) {
              sessionStorage.clear(); 
              alert('Session has expired. Your data has been cleared.');

              window.location.href = '/view/bookings.html'
          }
      }
  };

  
  checkSessionExpiration();

  
  setInterval(checkSessionExpiration, 60 * 1000); 




    var bookingData = JSON.parse(sessionStorage.getItem('bookingData'));


    if (bookingData) {
      
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
        $('#guest-preview-email').text(bookingData.guestEmail);
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