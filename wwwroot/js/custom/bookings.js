$(document).ready(function() {


  $.getJSON('/appsettings.json', function(data) {
   
    $('#hotel-name').text(data.contactInfo.hotel);
    
});

  function setRating(rating) {
    
    rating = Math.min(Math.max(rating, 1), 5);
    
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

  var urlParams = new URLSearchParams(window.location.search);



  function getUrlParameter(name, defaultValue) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name) || defaultValue;
  }

  var checkInDate = getUrlParameter('checkInDate', new Date().toISOString().split('T')[0]);
  var checkOutDate = getUrlParameter('checkOutDate', new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]);
  var adults = getUrlParameter('adults', 1);
  var children = getUrlParameter('children', 0); 
  var roomTypeId = getUrlParameter('roomTypeId'); 

  var currentUrl = window.location.href;
  var newUrl = new URL(currentUrl);

  if (!newUrl.searchParams.has('checkInDate')) {
    newUrl.searchParams.append('checkInDate', checkInDate);
  }
  if (!newUrl.searchParams.has('checkOutDate')) {
    newUrl.searchParams.append('checkOutDate', checkOutDate);
  }
  if (!newUrl.searchParams.has('adults')) {
    newUrl.searchParams.append('adults', adults);
  }
  if (!newUrl.searchParams.has('children')) {
    newUrl.searchParams.append('children', children);
  }

  if (newUrl.toString() !== currentUrl) {
    window.location.href = newUrl.toString();
    return;  


  }


  var checkInDate = urlParams.get('checkInDate')  || new Date().toISOString().split('T')[0];
  var checkOutDate = urlParams.get('checkOutDate') || new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
  var adults = urlParams.get('adults') || 1;
  var children = urlParams.get('children') || 0;

  if (!checkInDate) {
    checkInDate = new Date().toISOString().split('T')[0];
  }
  
  if (!checkOutDate) {
    var nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    checkOutDate = nextDay.toISOString().split('T')[0];
  }
  if (!adults) {
    adults = 1;
  }
  if (!children) {
    children = 0;
  }

  $('#checkInDate').text(checkInDate);
  $('#checkOutDate').text(checkOutDate);
  $('#num-adults').text(adults);
  $('#num-children').text(children);

  $('#children').val(children); 

  var checkInDateFormatted = new Date(checkInDate).toISOString().split('T')[0];
  var checkOutDateFormatted = new Date(checkOutDate).toISOString().split('T')[0];

  var requestData = {
    checkInDate: checkInDateFormatted,
    checkOutDate: checkOutDateFormatted,
    adultNo: adults,
    childNo: children,
    facilityTypeId: 1
  };

  sessionStorage.setItem('requestData', JSON.stringify(requestData));

  $.getJSON('/appsettings.json', function(data) {
 
    $('#loading-spinner').show();
    
  var apiKey = data.api.apiKey;  
  var  baseUrl = data.api.baseUrl;

  
  $.ajax({
    url: `${baseUrl}/Reservation/Availability`,
    method: 'POST',
    contentType: 'application/json',
    headers: {
      'X-API-KEY': apiKey
    },
    data: JSON.stringify(requestData),
    success: function(response) {

      $('#loading-spinner').hide();
      $('#error').hide()
      toastr.success(response.errorMessage)
      sessionStorage.setItem('availabilityData', JSON.stringify(response));
      displayRooms(response);  
    },
    error: function(xhr, status, error) {
      
      $('#loading-spinner').hide();
    

      console.error('API Request Error:', error);
      
      $('#error').append('<h4 class="no-room">Error fetching availability. Please try again later.</h4>')
      toastr.error("Error fetching availability. Please try again later.")
    }
  });
});







  function displayRooms(response) {
    const rooms = response.types;
    if (rooms && rooms.length > 0) {
      rooms.forEach(function(room) {


        if (roomTypeId && room.roomTypeId !== parseInt(roomTypeId)) {
          return;
        }
  
        let roomDetails = room.summary || 'Room summary not available';
        let truncatedDetails = roomDetails.split(' ').slice(0, 25).join(' ');
  
        let detailsHtml = `
          <span id="summary">${truncatedDetails}...</span>  
          <a href="/view/room-details.html?roomTypeId=${room.roomTypeId}" id="room-type-button">Read More</a>
        `;
  
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
              <div class="room-error"></div>
              <div class="room-title">
                <a id="room-type-button" href="/view/room-details.html?roomTypeId=${room.roomTypeId}">
                  <h4>${room.roomType}</h4>
                </a>
                <span>${room.available} Rooms Available</span>
              </div>
              <div class="detail-explore__price">
                <h3>${formatCurrency(room.currencySymbol, room.rate)}<sub>/ Night</sub></h3>
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
                <div>Summary</div>
               ${detailsHtml}   
              </div>
  
              <div class="room__number__container">
                <div class="room__number">Number of Rooms</div>
                <select class="form-control">
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

  function formatCurrency(currencySymbol, rate) {
    return currencySymbol + ' ' + rate.toLocaleString();
}

  function generateRoomOptions(availableRooms) {
    let optionsHtml = '';
    for (let i = 1; i <= availableRooms; i++) {
      optionsHtml += `<option value="${i}">${i}</option>`;
    }
    return optionsHtml;
  }
  
  function getRoomImages(room) {
    let imagesHtml = '';
    let images = [];
    for (let i = 1; i <= 8; i++) {
      if (room[`image${i}`] && room[`image${i}`] !== "") {
        images.push(room[`image${i}`]);
      }
    }
  
    
    let displayImages = images.slice(0, 4);
  
    
    displayImages.forEach(image => {
      imagesHtml += `<img src="${image}" alt="Room Image" class="thumbnail" data-image="${image}">`;
    });
  
    return imagesHtml;
  }
  
  function initCarousel() {
    
    $('.details-container').each(function () {
      const $container = $(this);
  
      $container.find('.side-images img').on('click', function () {
        let imageSrc = $(this).attr('src');
        $container.find('#main-image').attr('src', imageSrc);
  
        $container.find('.side-images img').removeClass('selected');
        $(this).addClass('selected');
      });
  
      
      $container.find('.carousel-button').on('click', function () {
        let $mainImage = $container.find('#main-image');
        let images = $container.find('.side-images img');
        let currentIndex = images.index($container.find('.side-images img.selected'));
  
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
  
      
      $container.find('.side-images img').first().addClass('selected');
    });
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

    var errorContainer = $(this).closest('.details').find('.room-error');

    errorContainer.html('');

    if (!checkInDate || !checkOutDate) {
      errorContainer.html('<p style="color: red;">Please select both check-in and check-out dates.</p>');
      return;  
    }

    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    window.location.href = 'check-guest.html';
  });
  
});
