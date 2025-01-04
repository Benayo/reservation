
let apiKey = '';
let baseUrl = '';
$(document).ready(function () {
 
  $('#header').load('/shared/header.html');
    $('#footer').load('/shared/footer.html');

    
    $.getJSON('/appsettings.json', function (data) {
        $('#adult-age').text(data.appSettings.adults);
        $('#children-age').text(data.appSettings.children);
 
        $('#hotel-name').text(data.contactInfo.hotel);
        
        apiKey = data.api.apiKey;
        baseUrl = data.api.baseUrl;

        loadRoomTypes();
    });

    

    jQuery(document).ready(function ($) {
  if (typeof $.fn.datepicker === 'undefined') {
    $.getScript("https://code.jquery.com/ui/1.12.1/jquery-ui.min.js")
      .done(function() {
        initializeDatepickers();  
      })
      .fail(function() {
        console.error("Failed to load Datepicker script.");
      });
  } else {
    initializeDatepickers();
  }

  function initializeDatepickers() {
    if ($.fn.datepicker) {
      var nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1);

      $('#room-date-in').datepicker({
        dateFormat: 'yy/mm/dd',
        changeMonth: true,
        changeYear: true,
        minDate: nextDay,
        onClose: function(selectedDate) {
          var checkOutMinDate = $.datepicker.parseDate('yy/mm/dd', selectedDate);
          checkOutMinDate.setDate(checkOutMinDate.getDate() + 1);
          $('#room-date-out').datepicker('option', 'minDate', checkOutMinDate);
        
          if ($(this).val()) {
            $('#check-in-error').hide();
          }
        }
      });
    
      $('#room-date-out').datepicker({
        dateFormat: 'yy/mm/dd',
        changeMonth: true,
        changeYear: true,
        minDate: 1,
        onClose: function(selectedDate) {
          if ($(this).val()) {
            $('#check-out-error').hide();
          }
        }
      });
    } else {
      console.error('jQuery UI Datepicker is not loaded!');
    }
  }
});

    function loadRoomTypes() {
  const urlParams = new URLSearchParams(window.location.search);
  const roomTypeId = urlParams.get('roomTypeId');

  if (roomTypeId) {
      $.ajax({
          url: `${baseUrl}/RoomType/Detail?roomTypeId=` + roomTypeId,
          method: 'GET',
          headers: {
            'X-API-KEY': apiKey
          },
          success: function (response) {
              if (response && response.type) {
                  const room = response.type;

                  $('#room_details_title').text(room.roomType);
                  $('#room_details__title').text(room.roomType);
                  $('#room_details_rate').text(formatCurrency(room.currencySymbol, room.rate));
                  $('#room_details_summary').text(room.detail || 'No description available.');
                  $('#rating-1').html(setRating(room.rateId));

                  const imagesContainer = $('#room-images');
                  let imageCount = 0;

                  // Add room images
                  for (let i = 1; i <= 8; i++) {
                      const imageUrl = room['image' + i];
                      if (imageUrl) {
                          imageCount++;
                          const imageElement = `<img src="${imageUrl}" alt="Room Image ${i}" class="thumbnail" />`;
                          imagesContainer.append(imageElement);
                      }
                  }

                  if (imageCount > 0) {
                      $('#main-image').attr('src', room.image1);
                      initializeCarousel();
                  }

                  if (imageCount > 4) {
                      $('.thumbnail:gt(3)').hide();
                  }
              } else {
                  $('#room-details').html('<p>Room details not found.</p>');
              }
          },
          error: function (xhr) {
              console.error("API Error:", xhr.responseText);
              $('#room-details').html('<p>Error fetching room details.</p>');
          }
      });
  } else {
      $('#room-details').html('<p>No room selected.</p>');
  }
}
  function formatCurrency(currencySymbol, rate) {
      return currencySymbol + ' ' + rate.toLocaleString();
  }

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

  // Form validation
  function validateField(selector, errorSelector, errorMessage) {
      if ($(selector).val() === "") {
          $(errorSelector).text(errorMessage).show();
          return false;
      } else {
          $(errorSelector).text('').hide();
          return true;
      }
  }

  $('#room-availability').submit(function (event) {
      event.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      const roomTypeId = urlParams.get('roomTypeId');

      const checkInDate = $('#room-date-in').val();
      const checkOutDate = $('#room-date-out').val();
      const adults = $('#room-guest-adult').val();
      const children = $('#room-guest-children').val();

      if (!validateField('#room-date-in', '#check-in-error', '*Check-in is required.')) return;
      if (!validateField('#room-date-out', '#check-out-error', '*Check-out is required.')) return;
      if (!validateField('#room-guest-adult', '#adults-error', '*Number of adults is required')) return;
      if (!validateField('#room-guest-children', '#children-error', '*Number of children is required')) return;

      if (new Date(checkInDate) >= new Date(checkOutDate)) {
          $('#check-out-error').text('*Check-out must be after check-in.').show();
          return;
      }

      const queryParams = `checkInDate=${encodeURIComponent(checkInDate)}&checkOutDate=${encodeURIComponent(checkOutDate)}&adults=${encodeURIComponent(adults)}&children=${encodeURIComponent(children)}&roomTypeId=${encodeURIComponent(roomTypeId)}`;
      window.location.href = '/view/bookings.html?' + queryParams;
  });

  let currentIndex = 0;
  let thumbnails;
  let totalImages = 0;

  function updateCarousel(index) {
      if (totalImages > 0) {
          const nextSrc = $(thumbnails[index]).attr('src');
          $('#main-image').attr('src', nextSrc);
          thumbnails.removeClass('active');
          $(thumbnails[index]).addClass('active');
      }
  }

  function bindCarouselButtons() {
      $('#prevBtn').off('click').on('click', function () {
          currentIndex = (currentIndex - 1 + totalImages) % totalImages;
          updateCarousel(currentIndex);
      });

      $('#nextBtn').off('click').on('click', function () {
          currentIndex = (currentIndex + 1) % totalImages;
          updateCarousel(currentIndex);
      });
  }

  function initializeCarousel() {
      thumbnails = $('.thumbnail');
      totalImages = thumbnails.length;

      if (totalImages > 0) {
          currentIndex = 0;
          updateCarousel(currentIndex);
      }

      bindCarouselButtons();
  }

  $(document).on('click', '.thumbnail', function () {
      const newSrc = $(this).attr('src');
      $('#main-image').attr('src', newSrc);
      $('.thumbnail').removeClass('active');
      $(this).addClass('active');
  });

  const prefillFields = () => {

    var urlParams = new URLSearchParams(window.location.search)
      if (urlParams.has('checkInDate')) {
          $('#room-date-in').val(urlParams.get('checkInDate'));
      }
      if (urlParams.has('checkOutDate')) {
          $('#room-date-out').val(urlParams.get('checkOutDate'));
      }
      if (urlParams.has('adults')) {
          $('#room-guest-adult').val(urlParams.get('adults')).trigger('change');
      }
      if (urlParams.has('children')) {
          $('#room-guest-children').val(urlParams.get('children')).trigger('change');
      }
  };

  prefillFields();
});
