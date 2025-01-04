let apiKey = '';
let baseUrl = '';
$(document).ready(function() {
  $('#header').load('/shared/header.html');
  $('#footer').load('/shared/footer.html');
  $('#availability').load('/shared/check-availability.html');


  $.getJSON('/appsettings.json', function(data) {
    $('#adult-age').text(data.appSettings.adults);
    $('#children-age').text(data.appSettings.children);
    $('#hotel-name').text(data.contactInfo.hotel);

    apiKey = data.api.apiKey;
    baseUrl = data.api.baseUrl;
  

    loadRoomTypes()

});

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
  };


function loadRoomTypes() {
  


  
  const roomsContainer = $('#room-container');

  // Show skeleton loaders
  for (let i = 0; i < 4; i++) {
    roomsContainer.append(`
      <div class="col-md-6 col-xl-6 mb-5">
        <div class="card card-explore">
          <div class="card-explore__img skeleton-box skeleton-img"></div>
          <div class="card-body">
            <div class="skeleton-box skeleton-price"></div>
            <div class="skeleton-box skeleton-title"></div>
            <div class="skeleton-box skeleton-summary"></div>
            <div class="skeleton-box skeleton-link"></div>
          </div>
        </div>
      </div>
    `);
  }


 $.ajax({

      url: `${baseUrl}/RoomType/DetailList?facilityTypeId=1`,
      method: 'GET',
      headers: {
        'X-API-KEY': apiKey
      },
      success: function(response) {
          if (response && response.types) {
              const roomsContainer = $('#room-container');

              
          roomsContainer.empty(); 


              $.each(response.types, function(index, room) {

                 
     
                let roomDetails = room.summary || 'Room summary not available';
                let truncatedDetails = roomDetails.split(' ').slice(0, 12).join(' ');
    
                
             
          
                let detailsHtml = `
                  <span>${truncatedDetails}...</span> 
                  <a href="/view/room-details.html?roomTypeId=${room.roomTypeId}" id="room-type-button">Read More</a>
                `;
    
                if (room.summary === "") {
                  detailsHtml = ''; 
                }
                
                  const roomElement = `
                      <div class="col-md-6 col-xl-6 mb-5">
                          <div class="card card-explore">
                              <div class="card-explore__img">
                                  <img class="card-img" src="${room.image1}" alt="${room.roomType}" loading="lazy"/>
                              </div>
                              <div class="card-body">
                                  <h3 class="card-explore__price">${formatCurrency(room.currencySymbol, room.rate)}<sub>/ Night</sub></h3>
                                  <h4 class="card-explore__title">
                                    <a href="/view/room-details.html?roomTypeId=${room.roomTypeId}">${room.roomType}</a>
                                  </h4>
                                 <div class="card-explore__summary">${detailsHtml}</div>
                                    <a class="card-explore__link" id="rooms-book-now" href="#" data-roomTypeId=${room.roomTypeId}>Book Now <i class="ti-arrow-right"></i></a>
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
};

  function formatCurrency(currencySymbol, rate) {
      return currencySymbol + ' ' + rate.toLocaleString();
  }


  $(document).on('click', '#rooms-book-now', function(event) {

        
    event.preventDefault();

    var roomTypeId = $(this).data('roomtypeid');


    var defaultValues = getDefaultValues();
    var checkInDate = defaultValues.checkInDate.toISOString().split('T')[0];
    var checkOutDate = defaultValues.checkOutDate.toISOString().split('T')[0];
    var adults = defaultValues.adults;
    var children = defaultValues.children;



  var queryParams = 'checkInDate=' + encodeURIComponent(checkInDate) +
                  '&checkOutDate=' + encodeURIComponent(checkOutDate) +
                  '&adults=' + encodeURIComponent(adults) +
                  '&children=' + encodeURIComponent(children)  +
                  '&roomTypeId=' + encodeURIComponent(roomTypeId);


                  console.log(queryParams);
window.location.href = '/view/bookings.html?' + queryParams;

})
});


