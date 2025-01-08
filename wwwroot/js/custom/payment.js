let apiKey = '';
let baseUrl = '';
$(document).ready(function () {
    $("#header").load("/shared/header.html");
    $("#footer").load("/shared/footer.html");
    $("#reservation").load("/shared/reservation-summary.html");
  
    $.getJSON('/appsettings.json', function(data) {  
      $('#hotel-name').text(data.contactInfo.hotel);
  });
  
  
    let inactivityTimer;

    const sessionTimeoutDuration = 5 * 60 * 1000; 

    const clearSession = function() {
        sessionStorage.clear();
       
        window.location.href = '/view/bookings.html';
    };

    const resetInactivityTimer = function() {
        clearTimeout(inactivityTimer);
        sessionStorage.setItem('sessionStartTime', Date.now());
        inactivityTimer = setTimeout(clearSession, sessionTimeoutDuration);
    };

    const sessionStartTime = sessionStorage.getItem('sessionStartTime');
    if (sessionStartTime) {
        const elapsedTime = Date.now() - sessionStartTime;
        if (elapsedTime >= sessionTimeoutDuration) {
            clearSession();
            return;
        }
    } else {
        sessionStorage.setItem('sessionStartTime', Date.now());
    }

    $(document).on('mousemove keydown click scroll touchstart', function() {
        resetInactivityTimer();
    });

    resetInactivityTimer();

    if (!sessionStorage.getItem('bookingData')) {
        window.location.href = '/view/bookings.html';
        return;
    }




    $.getJSON('/appsettings.json', function(data) {

      apiKey = data.api.apiKey;
      baseUrl = data.api.baseUrl;
  });



   
    
    function loadPayment(){
      var paymentMethod = $("#payment-method").val();

      
      if (paymentMethod === "1") {
        var bookingData = JSON.parse(sessionStorage.getItem("bookingData"));
 
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
            guestName:
              bookingData.guestTitle +
              " " +
              bookingData.guestFirstName +
              " " +
              bookingData.guestLastName,
              duration:
              formatDate(bookingData.requestData.checkInDate) + " " +
              " To " + " " + 
            formatDate(bookingData.requestData.checkOutDate) + " " + `(${numberOfNights} Night(s))`,
            checkInDate: formatDate(bookingData.requestData.checkInDate),
            checkOutDate: formatDate(bookingData.requestData.checkOutDate),
            numberOfNights: numberOfNights,
            roomType: roomType,
            roomCount: roomCount,
            totalAmount: totalRate,
            guestArrivalTime: bookingData.guestArrivalTime,
          };


    sessionStorage.setItem("guestData", JSON.stringify(guestData));



  
          $.ajax({
            url: `${baseUrl}/Reservation/Add`,
            method: "POST",
            contentType: "application/json",
            headers: {
              'X-API-KEY': apiKey
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
                stateId: parseInt(bookingData.guestState),
              },
              reservations: [
                {
                  roomTypeId: bookingData.selectedRoom.roomTypeId,
                  checkInDate: formatDate(bookingData.requestData.checkInDate),
                  checkOutDate: formatDate(bookingData.requestData.checkOutDate),
                  adultNo: bookingData.requestData.adultNo,
                  childNo: bookingData.requestData.childNo,
                  arrivalTime: bookingData.guestArrivalTime,
                  purpose: bookingData.guestPurpose ,
                  rate: roomRate,
                  additionalReq: "",
                  quantity: bookingData.roomCount || 1,
                },
              ],
              payment: {
                payTypeId: paymentMethod,
                payMethodId: paymentMethod,
                amount: totalRate,
              },
            }),
            success: function (response) {
              
  
              if (response.errorCode === 0 && response.bookingRef) {
               
                sessionStorage.setItem("bookingRef", response.bookingRef);
          window.location.href = "/view/payment-success.html";
          sessionStorage.removeItem("bookingData");
              } else {
               
                $("#error").html("Reservation failed: " + response.errorMessage);
              }
            },
            error: function (xhr, status, error) {
              console.error(
                "Error occurred while making the reservation:",
                error
              );
              $("#error").html("An error occurred. Please try again.");
           
            },
          });
        }
      } else if (paymentMethod === "2") {

        var bookingData = JSON.parse(sessionStorage.getItem("bookingData"));

        
        var checkInDate = new Date(bookingData.requestData.checkInDate);
        var checkOutDate = new Date(bookingData.requestData.checkOutDate);
        var timeDifference = checkOutDate - checkInDate;


        var numberOfNights = timeDifference / (1000 * 3600 * 24);


        const roomRate = bookingData.selectedRoom.rate * bookingData.roomCount;
        
        var totalRate = numberOfNights * roomRate;
  

        var roomType = bookingData.selectedRoom.roomType;
        var roomCount = bookingData.roomCount;



        var guestData = {
            guestName:
              bookingData.guestTitle +
              " " +
              bookingData.guestFirstName +
              " " +
              bookingData.guestLastName,

              duration:
              formatDate(bookingData.requestData.checkInDate) + " " +
              " To " + " " + 
            formatDate(bookingData.requestData.checkOutDate) + " " + `(${numberOfNights} Night(s))`,
            numberOfNights:  numberOfNights,
            roomType: bookingData.selectedRoom.roomType,
            roomCount: bookingData.roomCount,
            totalAmount: totalRate,
            guestArrivalTime: bookingData.guestArrivalTime,
          };

          sessionStorage.setItem("guestData", JSON.stringify(guestData));


       var emailValue = bookingData.guestEmail
        const paystack = new PaystackPop();
  
        paystack.newTransaction({
          key: "pk_test_b9e18b08d141d401203932a46a31140465cdccf2",
          email: emailValue,
          amount: totalRate * 100,
          currency: "NGN", 
          reference: "" + Math.floor(Math.random() * 1000000000 + 1),
          onSuccess: (transaction) => {


$.ajax({
  url: `${baseUrl}/Reservation/Add`,
  method: "POST",
  contentType: "application/json",
  headers: {
    'X-API-KEY': apiKey
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
      stateId: parseInt(bookingData.guestState),
    },
    reservations: [
      {
        roomTypeId: bookingData.selectedRoom.roomTypeId,
        checkInDate: formatDate(bookingData.requestData.checkInDate),
        checkOutDate: formatDate(bookingData.requestData.checkOutDate),
        adultNo: bookingData.requestData.adultNo,
        childNo: bookingData.requestData.childNo,
        arrivalTime: bookingData.guestArrivalTime,
        purpose: bookingData.guestPurpose ,
        rate: roomRate,
        additionalReq: "",
        quantity: bookingData.roomCount || 1,
      },
    ],
    payment: {
      payTypeId: paymentMethod,
      payMethodId: paymentMethod,
      amount: totalRate,
    },
  }),
  success: function (response) {


    if (response.errorCode === 0 && response.bookingRef) {
     
      sessionStorage.setItem("bookingRef", response.bookingRef);
      sessionStorage.setItem("transactionRef", transaction.reference);

          window.location.href = "/view/payment-success.html";
          sessionStorage.removeItem("bookingData");
    } else {

      $("#error").html("Reservation failed: " + response.errorMessage);
    }
  },
  error: function (xhr, status, error) {
    console.error(
      "Error occurred while making the reservation:",
      error
    );
  
    $("#error").html("An error occurred. Please try again.");
  },
});


          },
          onLoad: (response) => {

            console.log("onLoad: ", response);

            
         sessionStorage.removeItem("bookingData");
          },
          onCancel: () => {
            toastr.error("Transaction was cancelled");
          },
          onError: (error) => {

            $("#error").html("Error: ", error.message);
           
          },
        });
      }
    }
  
    $(document).on("submit", "#guest-payment", function (e) {
      e.preventDefault();
  
 
loadPayment()
    });
  
    if (!sessionStorage.getItem("bookingData")) {
      var checkInDate = new Date().toISOString().split("T")[0];
      var checkOutDate = new Date();
      checkOutDate.setDate(checkOutDate.getDate() + 1);
      checkOutDate = checkOutDate.toISOString().split("T")[0];
  
      var adults = 1;
      var children = 0;
  
      $("#checkInDate").text(checkInDate);
      $("#checkOutDate").text(checkOutDate);
      $("#adults").text(adults);
      $("#children").text(children);
  
      var queryParams =
        "checkInDate=" +
        encodeURIComponent(checkInDate) +
        "&checkOutDate=" +
        encodeURIComponent(checkOutDate) +
        "&adults=" +
        encodeURIComponent(adults) +
        "&children=" +
        encodeURIComponent(children);
  
      window.location.href = "bookings.html?" + queryParams;
    }
  
    function formatDate(date) {
      var d = new Date(date);
      var year = d.getFullYear();
      var month = ("0" + (d.getMonth() + 1)).slice(-2);
      var day = ("0" + d.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }
  });
  