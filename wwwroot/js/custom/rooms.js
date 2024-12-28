$(document).ready(function() {
  $('#header').load('/shared/header.html');
  $('#footer').load('/shared/footer.html');
  $('#availability').load('/shared/check-availability.html');

  $.ajax({
      url: 'https://guestapi.roomability.io/RoomType/DetailList?facilityTypeId=1',
      method: 'GET',
      headers: {
          'X-API-Key': 'WEB_ZtxI7rfuxyz0xaSQmJi73R123wCMEcjNQmzTrma1b2c3'
      },
      success: function(response) {
          if (response && response.types) {
              const roomsContainer = $('#room-container');

              $.each(response.types, function(index, room) {
                  const roomElement = `
                      <div class="col-md-6 col-xl-4 mb-5">
                          <div class="card card-explore">
                              <div class="card-explore__img">
                                  <img class="card-img" src="${room.image1 || 'default_image.jpg'}" alt="${room.roomType}" />
                              </div>
                              <div class="card-body">
                                  <h3 class="card-explore__price">${formatCurrency(room.currencySymbol, room.rate)}<sub>/ Night</sub></h3>
                                  <h4 class="card-explore__title">
                                    <a href="/view/room-details.html?roomTypeId=${
                      room.roomTypeId
                    }">${room.roomType}</a>
                                  </h4>
                                  <p>${room.summary}</p>
                                  <a class="card-explore__link" href="#">Book Now <i class="ti-arrow-right"></i></a>
                              </div>
                          </div>
                      </div>
                  `;
                  roomsContainer.append(roomElement);
              });

              
              $('.room-details-link').click(function(e) {
                  e.preventDefault();
                  
                  const roomData = $(this).data('room');
                  
                  sessionStorage.setItem('roomDetailsData', JSON.stringify(roomData));
                  
                  window.location.href = '/view/room-details.html';
              });
          } else {
              $('#rooms-container').html('<p>No room types available.</p>');
          }
      },
      error: function() {
          $('#rooms-container').html('<p>Error fetching room types.</p>');
      }
  });

  function formatCurrency(currencySymbol, rate) {
      return currencySymbol + ' ' + rate.toLocaleString();
  }
});


