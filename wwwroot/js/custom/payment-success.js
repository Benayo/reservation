$(document).ready(function() {
  $("#header").load('/shared/header.html');
  $("#footer").load('/shared/footer.html');
  $.getJSON('/appsettings.json', function(data) {

    const hotel = data.contactInfo.hotel;
    $('#hotel-name').text(hotel)
  })

  function getQueryParams() {
      var params = {};
      window.location.search.substr(1).split("&").forEach(function(item) {
          var [key, value] = item.split("=");
          params[key] = decodeURIComponent(value);
      });
      return params;
  }
  var params = getQueryParams();

  if (!params.bookingRef) {
      window.location.href = '/bookings.html';  
      return;
  }

  if(!params.transactionRef){
    $('#transaction').hide();
  }

  $('#guest-success-name').text(params.guestName || "Guest information not available.");
  $('#arrival-time').text(params.arrivalTime || "N/A");
  $('#duration').text(params.duration || "N/A");
  $('#num-night').text(params.numOfNights || "N/A");
  $('#check-in-date').text(params.checkInDate || "N/A");
  $('#check-out-date').text(params.checkOutDate || "N/A");
  $('#room-type').text(params.roomType || "Not Available");
  $('#num-rooms').text(params.roomCount || "Not Available");
  $('#total-amount').text(params.totalAmount ? new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(params.totalAmount) : "0.00");
  $('#booking-reference').text(params.bookingRef || "Booking reference not available.");
  $('#transaction-ref').text(params.transactionRef || "Booking reference not available.");
  if (params.errorCode || params.bookingRef) {
      history.pushState(null, null, location.href);

      window.onpopstate = function() {
          window.location.href = '/view/bookings.html'; 
      };
  }
});
