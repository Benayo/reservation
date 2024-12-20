// $(document).ready(function(){
//     $("#header").load('/shared/header.html')
//     $("#footer").load('/shared/footer.html')
//     $('#reservation').load('/shared/reservation-summary.html')


//     $(document).ready(function() {
       
//         $("#payment-button").click(function() {
          
      
         
//           var bookingData = JSON.parse(sessionStorage.getItem('bookingData'));
      
//           if (bookingData) {
           
//             var requestData = {
//               guest: {
//                 title: bookingData.guestTitle,
//                 firstName: bookingData.guestFirstName,
//                 lastName: bookingData.guestLastName,
//                 phone: bookingData.guestPhone,
//                 email: bookingData.guestEmail,
//                 sex: bookingData.guestGender,
//                 occupation: bookingData.guestOccupation,
//                 countryId: parseInt(bookingData.guestCountryId), 
//                 address1: bookingData.guestAddressLine1,
//                 address2: bookingData.guestAddressLine2 || "",  
//                 city: bookingData.guestCity || "Lagos",  
//                 stateId: parseInt(bookingData.guestState) 
//               },
//               reservations: [{
//                 roomTypeId: bookingData.selectedRoom.roomTypeId,
//                 checkInDate: bookingData.requestData.checkInDate,
//                 checkOutDate: bookingData.requestData.checkOutDate,
//                 adultNo: bookingData.requestData.adultNo,
//                 childNo: bookingData.requestData.childNo,
//                 arrivalTime: bookingData.guestArrivalTime,
//                 purpose: bookingData.guestPurpose,
//                 rate: bookingData.selectedRoom.roomRate || 0,
//                 additionalReq: "",  
//                 quantity: bookingData.roomCount || 1 
//               }],
//               payment: {
//                 payTypeId: 1, 
//                 payMethodId: 1, 
//                 amount: bookingData.selectedRoom.rate
//               }
//             };
      
//             console.log("Formatted Request Data:", requestData);
//       sessionStorage().setItem("guestData",  JSON.stringify(requestData));
           
      
//             $.ajax({
//               url: 'https://guestapi.roomability.io/Reservation/Add',
//               method: 'POST',
//               contentType: 'application/json',
//               headers: {
//                    'X-API-KEY': 'WEB_ZtxI7rfuxyz0xaSQmJi73R123wCMEcjNQmzTrma1b2c3'
//               },
//               data: JSON.stringify(requestData),
//               success: function(response) {
//                 console.log('Reservation successful', response);
                
//                 // window.location.href = '/view/payment-success.html';
//               },
//               error: function(error) {
//                 console.error('Error occurred while making the reservation:', error);
//                 alert('An error occurred. Please try again.');
//               }
//             });
//           } else {
//             console.log('No booking data found in sessionStorage.');
//           }
//         });
//       });
      
// })


// $(document).ready(function() {
    
//     $("#header").load('/shared/header.html');
//     $("#footer").load('/shared/footer.html');
//     $('#reservation').load('/shared/reservation-summary.html');

//     $("#payment-button").click(function() {

//         var bookingData = JSON.parse(sessionStorage.getItem('bookingData'));

//         if (bookingData) {
           
//             var requestData = {
//                 guest: {
//                     title: bookingData.guestTitle,
//                     firstName: bookingData.guestFirstName,
//                     lastName: bookingData.guestLastName,
//                     phone: bookingData.guestPhone,
//                     email: bookingData.guestEmail,
//                     sex: bookingData.guestGender,
//                     occupation: bookingData.guestOccupation,
//                     countryId: parseInt(bookingData.guestCountryId), 
//                     address1: bookingData.guestAddressLine1,
//                     address2: bookingData.guestAddressLine2 || "",  
//                     city: bookingData.guestCity || "Lagos",  
//                     stateId: parseInt(bookingData.guestState) 
//                 },
//                 reservations: [{
//                     roomTypeId: bookingData.selectedRoom.roomTypeId,
//                     checkInDate: bookingData.requestData.checkInDate,
//                     checkOutDate: bookingData.requestData.checkOutDate,
//                     adultNo: bookingData.requestData.adultNo,
//                     childNo: bookingData.requestData.childNo,
//                     arrivalTime: bookingData.guestArrivalTime,
//                     purpose: bookingData.guestPurpose,
//                     rate: bookingData.selectedRoom.roomRate || 0,
//                     additionalReq: "",  
//                     quantity: bookingData.roomCount || 1 
//                 }],
//                 payment: {
//                     payTypeId: 1, 
//                     payMethodId: 1, 
//                     amount: bookingData.selectedRoom.rate
//                 }
//             };

//             console.log("Formatted Request Data:", requestData);

          
//             sessionStorage.setItem("guestData", JSON.stringify(requestData));

        

//             $.ajax({
//                 url: 'https://guestapi.roomability.io/Reservation/Add',
//                 method: 'POST',
//                 contentType: 'application/json',
//                 headers: {
//                     'X-API-KEY': 'WEB_ZtxI7rfuxyz0xaSQmJi73R123wCMEcjNQmzTrma1b2c3'
//                 },
//                 data: JSON.stringify(requestData),
//                 success: function(response) {
//                     console.log('Reservation successful', response);

//                     window.location.href('/view/payment-success.html')
//                 },
//                 error: function(error) {
//                     console.error('Error occurred while making the reservation:', error);
//                     alert('An error occurred. Please try again.');
//                 }
//             });
//         } else {
//             console.log('No booking data found in sessionStorage.');
//         }
//     });
// });

$(document).ready(function() {
    // Load header, footer, and reservation content
    $("#header").load('/shared/header.html');
    $("#footer").load('/shared/footer.html');
    $('#reservation').load('/shared/reservation-summary.html');
      
    $(document).on('submit', '#guest-payment', function(e) { // Listen to form submission
        e.preventDefault();  // Prevent default form submission
        
        console.log('Payment button clicked!');
        
        var bookingData = JSON.parse(sessionStorage.getItem('bookingData'));

        if (bookingData) {
            var requestData = {
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
                    city: bookingData.guestCity || "Lagos",
                    stateId: parseInt(bookingData.guestState)
                },
                reservations: [{
                    roomTypeId: bookingData.selectedRoom.roomTypeId,
                    checkInDate: bookingData.requestData.checkInDate,
                    checkOutDate: bookingData.requestData.checkOutDate,
                    adultNo: bookingData.requestData.adultNo,
                    childNo: bookingData.requestData.childNo,
                    arrivalTime: bookingData.guestArrivalTime,
                    purpose: bookingData.guestPurpose,
                    rate: bookingData.selectedRoom.roomRate || 0,
                    additionalReq: "",
                    quantity: bookingData.roomCount || 1
                }],
                payment: {
                    payTypeId: 1,
                    payMethodId: 1,
                    amount: bookingData.selectedRoom.rate
                }
            };

            console.log("Formatted Request Data:", requestData);

            sessionStorage.setItem("guestData", JSON.stringify(requestData));

            $.ajax({
                url: 'https://guestapi.roomability.io/Reservation/Add',
                method: 'POST',
                contentType: 'application/json',
                headers: {
                    'x-api-key': 'WEB_ZtxI7rfuxyz0xaSQmJi73R123wCMEcjNQmzTrma1b2c3'
                },
                data: JSON.stringify(requestData),
                success: function(response) {
                    console.log('Reservation successful', response);
                    window.location.href = '/view/payment-success.html'; 
                },
                error: function(xhr, status, error) {
                    console.error('Error occurred while making the reservation:', error);
                    console.log('Status:', status);
                    console.log('Response:', xhr.responseText);
                    alert('An error occurred. Please try again.');
                }
            });
        } else {
            console.log('No booking data found in sessionStorage.');
            alert('No booking data available.');
        }
    });
});
