$(document).ready(function() {
    // Load header, footer, and reservation content
    $("#header").load('/shared/header.html');
    $("#footer").load('/shared/footer.html');
    $("#reservation").load('/shared/reservation-summary.html');

    if (!sessionStorage.getItem('sessionStartTime')) {
        sessionStorage.setItem('sessionStartTime', Date.now()); 
    }
  
    
    const sessionTimeoutDuration = 60 * 60 * 1000; 
    
  
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
  

    



    $(document).on('submit', '#guest-payment', function(e) {

   e.preventDefault();  



   var bookingData = JSON.parse(sessionStorage.getItem('bookingData'));

   if (bookingData) {
       var checkInDate = new Date(bookingData.requestData.checkInDate);
       var checkOutDate = new Date(bookingData.requestData.checkOutDate);
       var timeDifference = checkOutDate - checkInDate;
       var numberOfNights = timeDifference / (1000 * 3600 * 24);
       const roomRate = bookingData.selectedRoom.rate * bookingData.roomCount;
       var totalRate = numberOfNights * roomRate;

       var roomType = bookingData.selectedRoom.roomType;
       var roomCount = bookingData.roomCount;

       var guestData = {
           guestName: bookingData.guestTitle + " " + bookingData.guestFirstName + " " + bookingData.guestLastName,
           checkInDate: formatDate(bookingData.requestData.checkInDate),
           checkOutDate: formatDate(bookingData.requestData.checkOutDate),
           roomType: roomType,
           roomCount: roomCount,
           totalAmount: totalRate,
           guestArrivalTime: bookingData.guestArrivalTime,
       };

       
       $.ajax({
           url: 'https://guestapi.roomability.io/Reservation/Add',
           method: 'POST',
           contentType: 'application/json',
           headers: {
               'X-API-KEY': 'WEB_ZtxI7rfuxyz0xaSQmJi73R123wCMEcjNQmzTrma1b2c3'
           },
           data: JSON.stringify({
               guest: {
                   title: bookingData.guestTitle,
                   firstName: bookingData.guestFirstName,
                   lastName: bookingData.guestLastName,
                   phone: bookingData.guestPhone,
                   email: bookingData.guestEmail,
                   sex: bookingData.guestGender,
                   occupation: bookingData.guestOccupation,
                   countryId: parseInt(bookingData.guestCountryId),
                   address1: bookingData.guestAddressLine1,
                   address2: bookingData.guestAddressLine2 || "",
                   city: bookingData.guestCity,
                   stateId: parseInt(bookingData.guestState)
               },
               reservations: [{
                   roomTypeId: bookingData.selectedRoom.roomTypeId,
                   checkInDate: formatDate(bookingData.requestData.checkInDate),
                   checkOutDate: formatDate(bookingData.requestData.checkOutDate),
                   adultNo: bookingData.requestData.adultNo,
                   childNo: bookingData.requestData.childNo,
                   arrivalTime: bookingData.guestArrivalTime || "",  
                   purpose: bookingData.guestPurpose || "",  
                   rate: roomRate || 0,
                   additionalReq: "",
                   quantity: bookingData.roomCount || 1
               }],
               payment: {
                   payTypeId: 1,
                   payMethodId: 1,
                   amount: totalRate
               }
           }),
           success: function(response) {
               console.log('Reservation successful', response);

            
               if (response.errorCode === 0 && response.bookingRef) {
                
                  
                   var queryParams = 'bookingRef=' + encodeURIComponent(response.bookingRef) +
                                     '&errorCode=' + encodeURIComponent(response.errorCode) +
                                     '&guestName=' + encodeURIComponent(guestData.guestName) +
                                     '&checkInDate=' + encodeURIComponent(guestData.checkInDate) +
                                     '&checkOutDate=' + encodeURIComponent(guestData.checkOutDate) +
                                     '&roomType=' + encodeURIComponent(guestData.roomType) +
                                     '&roomCount=' + encodeURIComponent(guestData.roomCount) +
                                     '&totalAmount=' + encodeURIComponent(guestData.totalAmount) +
                                     '&arrivalTime=' + encodeURIComponent(guestData.guestArrivalTime);


                   window.location.href = '/view/payment-success.html?' + queryParams;

                   sessionStorage.removeItem('bookingData');

               } else {
                   $('#error').html('Reservation failed: ' + response.errorMessage);
               }
           },
           error: function(xhr, status, error) {
               console.error('Error occurred while making the reservation:', error);
               $('#error').html('An error occurred. Please try again.');
           }
       });
   }


     })
        

    
    if (!sessionStorage.getItem('bookingData')) {
       
        var checkInDate = new Date().toISOString().split('T')[0]; 
        var checkOutDate = new Date();
        checkOutDate.setDate(checkOutDate.getDate() + 1); 
        checkOutDate = checkOutDate.toISOString().split('T')[0];

        var adults = 1;
        var children = 0;

        $('#checkInDate').text(checkInDate);
        $('#checkOutDate').text(checkOutDate);
        $('#adults').text(adults);
        $('#children').text(children);

        var queryParams = 'checkInDate=' + encodeURIComponent(checkInDate) +
                          '&checkOutDate=' + encodeURIComponent(checkOutDate) +
                          '&adults=' + encodeURIComponent(adults) +
                          '&children=' + encodeURIComponent(children);

                          
        window.location.href = 'bookings.html?' + queryParams;
    }

    function formatDate(date) {
        var d = new Date(date);
        var year = d.getFullYear();
        var month = ('0' + (d.getMonth() + 1)).slice(-2);  
        var day = ('0' + d.getDate()).slice(-2);  
        return `${year}-${month}-${day}`;  
    }
});
