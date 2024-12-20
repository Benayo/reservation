$(document).ready(function() {  
  function setRating(rating) {
    let fullStars = Math.floor(rating);
    let halfStar = (rating % 1) >= 0.5 ? 1 : 0;
    let emptyStars = 5 - fullStars - halfStar;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fas fa-star full"></i>';
    }

    if (halfStar) {
      stars += '<i class="fas fa-star-half-alt half"></i>';
    }

    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="far fa-star empty"></i>';
    }

    return stars;
  }

  function formatDate(dateStr) {
    var dateParts = dateStr.split('/');
    var day = dateParts[0];
    var month = dateParts[1] - 1; 
    var year = '20' + dateParts[2]; 

    var dateObj = new Date(year, month, day);
    var formattedDate = dateObj.toISOString().split('T')[0]; 
    return formattedDate;
  }

  var urlParams = new URLSearchParams(window.location.search);
  var checkInDate = urlParams.get('checkInDate');
  var checkOutDate = urlParams.get('checkOutDate');
  var adults = urlParams.get('adults');
  var children = urlParams.get('children');

  var formattedCheckInDate = formatDate(checkInDate);
  var formattedCheckOutDate = formatDate(checkOutDate);

  $('#checkInDate').text(checkInDate);
  $('#checkOutDate').text(checkOutDate);
  $('#adults').text(adults);
  $('#children').text(children);

  var requestData = {
    checkInDate: formattedCheckInDate,
    checkOutDate: formattedCheckOutDate,
    adultNo: adults,
    childNo: children,
    facilityTypeId: 1  
  };
console.log(requestData);

  sessionStorage.setItem('requestData', JSON.stringify(requestData));

  var availabilityData = sessionStorage.getItem('availabilityData');

  if (availabilityData) {
    availabilityData = JSON.parse(availabilityData);
    displayRooms(availabilityData);
  } else {
    $.ajax({
      url: 'https://guestapi.roomability.io/Reservation/Availability',
      method: 'POST',
      contentType: 'application/json',
      headers: {
        'X-API-KEY': 'WEB_ZtxI7rfuxyz0xaSQmJi73R123wCMEcjNQmzTrma1b2c3'
      },
      data: JSON.stringify(requestData),
      success: function(response) {
      
        sessionStorage.setItem('availabilityData', JSON.stringify(response));
        displayRooms(response);
      },
      error: function(xhr, status, error) {
        console.error('API Request Error:', error);
        showError('Error fetching availability. Please try again later.');
      }
      
    });
  }


  function showError(message) {
    var errorHtml = `
      <div class="details-container error-container">
      <h2>404</h2>
        <p>${message}</p>
     
      </div>
    `;
    $('#error').html(errorHtml);
  }
  
  function displayRooms(response) {
    const rooms = response.types;
    if (rooms && rooms.length > 0) {
      rooms.forEach(function(room) {
        const roomContainer = `
          <div class="details-container">
            <div class="image-container">
              <div class="main-images">
                <img src="${room.image1}" alt="Room Image" id="main-image" />
                <div class="carousel-buttons">
                  <button class="carousel-button prev" id="prevBtn">&#10094;</button>
                  <button class="carousel-button next" id="nextBtn">&#10095;</button>
                </div>
              </div>
              <div class="side-images">
                ${getRoomImages(room)}
              </div>
            </div>

            <div class="details">
              <div class="room-title">
              <a id="room-type-button" href="javascript:void(0);" data-room='${JSON.stringify(room)}'><h4>${room.roomType}</h4></a>  
                <span>${room.available} Rooms Available</span>
              </div>
              <div class="detail-explore__price">
                <h3>₦ ${room.rate}<sub>/ Night</sub></h3>
                <div id="rating" class="star-rating">${setRating(room.rateId)}</div>
              </div>
              <div class="room-accommodates">
                <div class="info">Room Accommodates</div>
                <div class="room__info__container">
                  <div class="room__info">
                    <span>Adults:</span>
                    <div class="detail">
                      <i class="fa fa-user"></i> 
                      <span>${room.adult}</span>
                    </div>
                  </div>
                  <div class="room__info">
                    <span>Children:</span>
                    <div class="detail">
                      <i class="fa fa-child"></i>
                      <span>${room.children}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div id="summary-container" class="room__more__details">
                <div>Room Details</div>
                <span id="summary">${room.detail || 'No details available'}</span> 
                <a href="/view/room-details.html?roomId=${room.roomTypeId}">Read More</a>
              </div>

              <div class="room__number__container">
                <div class="room__number">Number of Rooms</div>
                <select class="nice-select">
                ${generateRoomOptions(room.available)}
                </select>
                <a id="continue-button" href="javascript:void(0);" class="button button-bookings" data-room='${JSON.stringify(room)}'>Continue</a>
              </div>
            </div>
          </div>
        `;
        $('#room-template').append(roomContainer);
      });

      initCarousel();
    } else {
      $('#room-template').append('<h3 class="no-room">No rooms available.</h3>');
    }
  }

  function getRoomImages(room) {
    let imagesHtml = '';
    for (let i = 1; i <= 8; i++) {
      if (room[`image${i}`] && room[`image${i}`] !== "") {
        imagesHtml += `<img src="${room[`image${i}`]}" alt="Room Image ${i}" class="thumbnail" data-image="${room[`image${i}`]}">`;
      }
    }
    return imagesHtml;
  }

  function generateRoomOptions(availableRooms) {
    let optionsHtml = '';
    for (let i = 1; i <= availableRooms; i++) {
      optionsHtml += `<option value="${i}">${i}</option>`;
    }
    return optionsHtml;
  }


  
  $(document).on('click', '#continue-button', function() {
    var roomData = $(this).data('room');  
    var selectedRoomCount = $(this).closest('.room__number__container').find('select').val(); 

    var requestData = JSON.parse(sessionStorage.getItem('requestData'));


    var bookingData = {
      requestData: requestData,
      selectedRoom: roomData,
      roomCount: selectedRoomCount
    };

    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));

    
    window.location.href = 'check-guest.html';
  });


    
  $(document).on('click', '#room-type-button', function() {
    var roomData = $(this).data('room');  

  sessionStorage.setItem('roomDetailsData', JSON.stringify(roomData));

    
    window.location.href = 'room-details.html';
  });


  function initCarousel() {
    $('.carousel-button').on('click', function() {
      let $mainImage = $('#main-image');
      let images = $('.side-images img');
      let currentIndex = images.index($('.side-images img.selected'));

      if ($(this).hasClass('next')) {
        currentIndex = (currentIndex + 1) % images.length;
      } else if ($(this).hasClass('prev')) {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
      }

      let nextImageSrc = $(images[currentIndex]).attr('src');
      $mainImage.attr('src', nextImageSrc);

      images.removeClass('selected');
      $(images[currentIndex]).addClass('selected');
    });

    $('.side-images img').on('click', function() {
      let imageSrc = $(this).attr('src');
      $('#main-image').attr('src', imageSrc);

      $('.side-images img').removeClass('selected');
      $(this).addClass('selected');
    });

    $('.side-images img').first().addClass('selected');
  }
});
