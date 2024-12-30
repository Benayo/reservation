// $(document).ready(function(){
//     $('#header').load('/shared/header.html')
//     $('#footer').load('/shared/footer.html')
//     if ($.fn.datepicker) {
      
//         $('#room-date-in').datepicker({
//           dateFormat: 'yy/mm/dd',   
//           minDate: 0,              
//           onClose: function(selectedDate) {
         
//             $('#date-out').datepicker('option', 'minDate', selectedDate);
//           }
//         });
    
   
//         $('#room-date-out').datepicker({
//           dateFormat: 'yy/mm/dd',  
//           minDate: 1,              
//         });
//       } else {
//         console.error('jQuery UI Datepicker is not loaded!');
//       }
    
    
  
//   $('#room-availability').submit(function(event) {
//     event.preventDefault();  
    
//     var checkInDate = $('#room-date-in').val();
//     var checkOutDate = $('#room-date-out').val();
//     var adults = $('#room-guest-adult').val();
//     var children = $('#room-guest-children').val();


//     console.log(checkInDate, checkOutDate, adults, children)
    
//     var queryParams = 'checkInDate=' + encodeURIComponent(checkInDate) +
//                       '&checkOutDate=' + encodeURIComponent(checkOutDate) +
//                       '&adults=' + encodeURIComponent(adults) +
//                       '&children=' + encodeURIComponent(children);
    
                      
//     window.location.href = '/view/bookings.html?' + queryParams;
//   });
    

//   var urlParams = new URLSearchParams(window.location.search);
//   var roomTypeId = urlParams.get('roomTypeId');



//   if (roomTypeId) {
   
//     $.ajax({
//         url: 'https://guestapi.roomability.io/RoomType/Detail?roomTypeId=' + roomTypeId, 
//         method: 'GET',
//         headers: {
//             'X-API-Key': 'WEB_ZtxI7rfuxyz0xaSQmJi73R123wCMEcjNQmzTrma1b2c3'
//         },
//         success: function(response) {
//             console.log("API Response:", response);  
            
//             if (response && response.type) {
//                 var room = response.type;
                
                
//                 $('#room_details_title').text(room.roomType);
//                 $('#room_details__title').text(room.roomType);
//                 $('#room_details_rate').text(formatCurrency(room.currencySymbol, room.rate));
//                 $('#room_details_summary').text(room.detail || 'No description available.');
//                 $('#rating-1').html(setRating(room.rateId));
    
                
//                 var imagesContainer = $('#room-images');
//                 var imageCount = 0;
                
//                 for (var i = 1; i <= 8; i++) {
//                     var imageUrl = room['image' + i];
//                     if (imageUrl) {
//                         imageCount++;
//                         var imageElement = `
//                             <div class="room-image">
//                                 <img src="${imageUrl}" alt="Room Image ${i}" class="thumbnail" />
//                             </div>
//                         `;
//                         imagesContainer.append(imageElement);
//                     }
//                 }
    
//                 if (imageCount > 0) {
//                     $('#main-image').attr('src', room.image1 || 'default_image.jpg');
//                 } else {
//                     $('#main-image').attr('src', 'default_image.jpg');
//                 }
//             } else {
//                 console.log("Error: Room details not found.");
//                 $('#room-details').html('<p>Room details not found.</p>');
//             }
//         },
//         error: function(xhr, status, error) {
//             console.error("API Error:", error); 
//             console.error("Response Text:", xhr.responseText); 
//             $('#room-details').html('<p>Error fetching room details.</p>');
//         }
//     });
    
// } else {
//     $('#room-details').html('<p>No room selected.</p>');
// }



//    function setRating(rating) {
//                 let fullStars = Math.floor(rating);
//                 let halfStar = (rating % 1) >= 0.5 ? 1 : 0;
//                 let emptyStars = 5 - fullStars - halfStar;
//                 let stars = '';

               
//                 for (let i = 0; i < fullStars; i++) {
//                     stars += '<i class="fas fa-star full"></i>';
//                 }

//                 if (halfStar) {
//                     stars += '<i class="fas fa-star-half-alt half"></i>';
//                 }

         
//                 for (let i = 0; i < emptyStars; i++) {
//                     stars += '<i class="far fa-star empty"></i>';
//                 }

//                 return stars;
//             }

           

//             var bookingData = JSON.parse(sessionStorage.getItem('roomDetailsData'));



//   function formatCurrency(currencySymbol, rate) {
//     return currencySymbol + ' ' + rate.toLocaleString(); 
//   }
//             var urlParams = new URLSearchParams(window.location.search);
//             var roomType = urlParams.get('room');

            


//     document.querySelectorAll('.thumbnail').forEach((thumbnail) => {
//         thumbnail.addEventListener('click', (e) => {
//             const mainImage = document.getElementById('main-image');
//             const newSrc = e.target.src;
//             mainImage.src = newSrc;
//             document.querySelectorAll('.thumbnail').forEach((img) => img.classList.remove('active'));
//             e.target.classList.add('active');
  
  
            
//         });
//     });
  
//     let currentIndex = 0;
//     const thumbnails = document.querySelectorAll('.thumbnail');
//     const totalImages = thumbnails.length;
  
//     function updateCarousel(index) {
//         const nextSrc = thumbnails[index].src;
//         document.getElementById('main-image').src = nextSrc;
//         document.querySelectorAll('.thumbnail').forEach((img) => img.classList.remove('active'));
//         thumbnails[index].classList.add('active');
//     }
  
//     document.getElementById('prevBtn').addEventListener('click', () => {
//         currentIndex = (currentIndex - 1 + totalImages) % totalImages;
//         updateCarousel(currentIndex);
//     });
  
//     document.getElementById('nextBtn').addEventListener('click', () => {
//         currentIndex = (currentIndex + 1) % totalImages;
//         updateCarousel(currentIndex);
//     });
// })


// $(document).ready(function () {
//     $('#header').load('/shared/header.html');
//     $('#footer').load('/shared/footer.html');

    
//     if ($.fn.datepicker) {
//         $('#room-date-in').datepicker({
//             dateFormat: 'yy/mm/dd',
//             minDate: 0,
//             onClose: function (selectedDate) {
//                 $('#room-date-out').datepicker('option', 'minDate', selectedDate);
//             }
//         });

//         $('#room-date-out').datepicker({
//             dateFormat: 'yy/mm/dd',
//             minDate: 1,
//         });
//     } else {
//         console.error('jQuery UI Datepicker is not loaded!');
//     }
    
//     $('#room-availability').submit(function (event) {
//         event.preventDefault();

//         var checkInDate = $('#room-date-in').val();
//         var checkOutDate = $('#room-date-out').val();
//         var adults = $('#room-guest-adult').val();
//         var children = $('#room-guest-children').val();

//         console.log(checkInDate, checkOutDate, adults, children);

//         var queryParams = 'checkInDate=' + encodeURIComponent(checkInDate) +
//             '&checkOutDate=' + encodeURIComponent(checkOutDate) +
//             '&adults=' + encodeURIComponent(adults) +
//             '&children=' + encodeURIComponent(children);

//         window.location.href = '/view/bookings.html?' + queryParams;
//     });

    
//     var urlParams = new URLSearchParams(window.location.search);
//     var roomTypeId = urlParams.get('roomTypeId');

//     if (roomTypeId) {
//         $.ajax({
//             url: 'https://guestapi.roomability.io/RoomType/Detail?roomTypeId=' + roomTypeId,
//             method: 'GET',
//             headers: {
//                 'X-API-Key': 'WEB_ZtxI7rfuxyz0xaSQmJi73R123wCMEcjNQmzTrma1b2c3'
//             },
//             success: function (response) {
//                 console.log("API Response:", response);

//                 if (response && response.type) {
//                     var room = response.type;
//                     $('#room_details_title').text(room.roomType);
//                     $('#room_details__title').text(room.roomType);
//                     $('#room_details_rate').text(formatCurrency(room.currencySymbol, room.rate));
//                     $('#room_details_summary').text(room.detail || 'No description available.');
//                     $('#size').text('');
//                     $('#capacity').text('');
//                     $('#bed').text('');
//                     $('#service').text('');
//                     $('#rating-1').html(setRating(room.rateId));

                    
//                     var imagesContainer = $('#room-images');
//                     var imageCount = 0;

//                     for (var i = 1; i <= 8; i++) {
//                         var imageUrl = room['image' + i];
//                         if (imageUrl) {
//                             imageCount++;
//                             var imageElement = `
//                                 <div class="room-image">
//                                     <img src="${imageUrl}" alt="Room Image ${i}" class="thumbnail" />
//                                 </div>
//                             `;
//                             imagesContainer.append(imageElement);
//                         }
//                     }

                    
//                     if (imageCount > 0) {
//                         $('#main-image').attr('src', room.image1 || 'default_image.jpg');
//                     } else {
//                         $('#main-image').attr('src', 'default_image.jpg');
//                     }
//                 } else {
//                     console.log("Error: Room details not found.");
//                     $('#room-details').html('<p>Room details not found.</p>');
//                 }
//             },
//             error: function (xhr, status, error) {
//                 console.error("API Error:", error);
//                 console.error("Response Text:", xhr.responseText);
//                 $('#room-details').html('<p>Error fetching room details.</p>');
//             }
//         });

//     } else {
//         $('#room-details').html('<p>No room selected.</p>');
//     }

    
//     function formatCurrency(currencySymbol, rate) {
//         return currencySymbol + ' ' + rate.toLocaleString();
//     }

//     function setRating(rating) {
//                 let fullStars = Math.floor(rating);
//                 let halfStar = (rating % 1) >= 0.5 ? 1 : 0;
//                 let emptyStars = 5 - fullStars - halfStar;
//                 let stars = '';

               
//                 for (let i = 0; i < fullStars; i++) {
//                     stars += '<i class="fas fa-star full"></i>';
//                 }

//                 if (halfStar) {
//                     stars += '<i class="fas fa-star-half-alt half"></i>';
//                 }

         
//                 for (let i = 0; i < emptyStars; i++) {
//                     stars += '<i class="far fa-star empty"></i>';
//                 }

//                 return stars;
//             }

           

    
//     $(document).on('click', '.thumbnail', function () {
//         const newSrc = $(this).attr('src');
//         $('#main-image').attr('src', newSrc);
//         $('.thumbnail').removeClass('active');
//         $(this).addClass('active');
//     });

//     // Handle carousel functionality
//     let currentIndex = 0;
//     const thumbnails = document.querySelectorAll('.thumbnail');
//     const totalImages = thumbnails.length;

//     function updateCarousel(index) {
//         const nextSrc = thumbnails[index].src;
//         document.getElementById('main-image').src = nextSrc;
//         document.querySelectorAll('.thumbnail').forEach((img) => img.classList.remove('active'));
//         thumbnails[index].classList.add('active');
//     }

//     document.getElementById('prevBtn').addEventListener('click', () => {
//         currentIndex = (currentIndex - 1 + totalImages) % totalImages;
//         updateCarousel(currentIndex);
//     });

//     document.getElementById('nextBtn').addEventListener('click', () => {
//         currentIndex = (currentIndex + 1) % totalImages;
//         updateCarousel(currentIndex);
//     });

// // });
//  $(document).ready(function () {
//     $('#header').load('/shared/header.html');
//     $('#footer').load('/shared/footer.html');

//     if (typeof $.fn.datepicker === 'undefined') {
   
//         $.getScript("https://code.jquery.com/ui/1.12.1/jquery-ui.min.js")
//           .done(function() {
//             initializeDatepickers();  
//           })
//           .fail(function() {
//             console.error("Failed to load Datepicker script.");
//           });
//       } else {
      
//         initializeDatepickers();
//       }

//       function initializeDatepickers() {
//         if ($.fn.datepicker) {
//             $('#room-date-in').datepicker({
//                 dateFormat: 'yy/mm/dd',
//                 minDate: 0,
//                 onClose: function (selectedDate) {
//                     $('#room-date-out').datepicker('option', 'minDate', selectedDate);
//                 }
//             });
    
//             $('#room-date-out').datepicker({
//                 dateFormat: 'yy/mm/dd',
//                 minDate: 1,
//             });
//         } else {
//             console.error('jQuery UI Datepicker is not loaded!');
//         }


//       }



//     var urlParams = new URLSearchParams(window.location.search);
//     var roomTypeId = urlParams.get('roomTypeId');

//     if (roomTypeId) {
//         $.ajax({
//             url: 'https://guestapi.roomability.io/RoomType/Detail?roomTypeId=' + roomTypeId,
//             method: 'GET',
//             headers: {
//                 'X-API-Key': 'WEB_ZtxI7rfuxyz0xaSQmJi73R123wCMEcjNQmzTrma1b2c3'
//             },
//             success: function (response) {
//                 console.log("API Response:", response);

//                 if (response && response.type) {
//                     var room = response.type;
//                     $('#room_image-1').attr('src', room.image1
//                     )
//                     $('#room_image-2').attr('src', room.image2
//                     )
//                     $('#room_image-3').attr('src', room.image3
//                     )
//                     $('#room_image-4').attr('src', room.image4
//                     )
//                     $('#room_image-5').attr('src', room.image4
//                     )
//                     $('#room_details_title').text(room.roomType);
//                     $('#room_details__title').text(room.roomType);
//                     $('#room_details_rate').text(formatCurrency(room.currencySymbol, room.rate));
//                     $('#room_details_summary').text(room.detail || 'No description available.');
//                     $('#size').text('');
//                     $('#capacity').text('');
//                     $('#bed').text('');
//                     $('#service').text('');
//                     $('#rating-1').html(setRating(room.rateId));

//                     var imagesContainer = $('#room-images');
//                     var imageCount = 0;

//                     for (var i = 1; i <= 8; i++) {
//                         var imageUrl = room['image' + i];
//                         if (imageUrl && imageUrl !== 'https://api.reservations.ng/images/hotels/room-placeholder.png') {
//                             imageCount++;
//                             var imageElement = `
//                                 <div class="room-image">
//                                     <img src="${imageUrl}" alt="Room Image ${i}" class="thumbnail" />
//                                 </div>
//                             `;
//                             imagesContainer.append(imageElement);
//                         }
//                     }
//                     if (imageCount > 0) {
//                         console.log('Images loaded:', room);
//                         $('#main-image').attr('src', room.image1 || 'default_image.jpg');
//                     } else {
//                         console.log('No valid images found, using default image.');
//                         $('#main-image').attr('src', 'default_image.jpg');
//                     }
//                 } else {
//                     console.log("Error: Room details not found.");
//                     $('#room-details').html('<p>Room details not found.</p>');
//                 }
//             },
//             error: function (xhr, status, error) {
//                 console.error("API Error:", error);
//                 console.error("Response Text:", xhr.responseText);
//                 $('#room-details').html('<p>Error fetching room details.</p>');
//             }
//         });
//     } else {
//         $('#room-details').html('<p>No room selected.</p>');
//     }

//     function formatCurrency(currencySymbol, rate) {
//         return currencySymbol + ' ' + rate.toLocaleString();
//     }

//     function setRating(rating) {
    
//         rating = Math.min(Math.max(rating, 1), 5);
        
//         let fullStars = Math.floor(rating);
//         let halfStar = (rating % 1) >= 0.5 ? 1 : 0;
//         let emptyStars = 5 - fullStars - halfStar;
//         let stars = '';
    
        
//         for (let i = 0; i < fullStars; i++) {
//           stars += '<i class="fas fa-star full"></i>';
//         }
        
//         if (halfStar) {
//           stars += '<i class="fas fa-star-half-alt half"></i>';
//         }
    
        
//         for (let i = 0; i < emptyStars; i++) {
//           stars += '<i class="far fa-star empty"></i>';
//         }
    
//         return stars;
//       }

//       $(document).on('click', '#booking-link', function (e) {
//         e.preventDefault(); 
//         var roomTypeId = getUrlParameter('roomTypeId');
        
        
//         var checkInDate = $('#room-date-in').val() || new Date().toISOString().split('T')[0]; 
//         var checkOutDate = $('#room-date-out').val() || new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]; // Next day as default
//         var adults = $('#adults').val() || 1; 
//         var children = $('#children').val() || 0; 
//         var bookingUrl = '/view/bookings.html?roomTypeId=' + roomTypeId + 
//                          '&checkInDate=' + checkInDate + 
//                          '&checkOutDate=' + checkOutDate + 
//                          '&adults=' + adults + 
//                          '&children=' + children;
    
//         window.location.href = bookingUrl;
//     });


//     $(document).on('click', '.thumbnail', function () {
//         const newSrc = $(this).attr('src');
//         $('#main-image').attr('src', newSrc);
//         $('.thumbnail').removeClass('active');
//         $(this).addClass('active');
//     });

//     let currentIndex = 0;
//     const thumbnails = $('.thumbnail');
//     const totalImages = thumbnails.length;

//     function updateCarousel(index) {
//         const nextSrc = thumbnails[index].src;
//         $('#main-image').attr('src', nextSrc);
//         thumbnails.removeClass('active');
//         $(thumbnails[index]).addClass('active');
//     }

//     $('#prevBtn').click(function () {
//         currentIndex = (currentIndex - 1 + totalImages) % totalImages;
//         updateCarousel(currentIndex);
//     });

//     $('#nextBtn').click(function () {
//         currentIndex = (currentIndex + 1) % totalImages;
//         updateCarousel(currentIndex);
//     });

//     if (totalImages > 0) {
//         updateCarousel(currentIndex);
//     }
// });

let key = '';
$(document).ready(function () {
  $('#header').load('/shared/header.html');
  $('#footer').load('/shared/footer.html');

  $.getJSON('/appsettings.json', function(data) {
      $('#adult-age').text(data.appSettings.adults);
      $('#children-age').text(data.appSettings.children);
      key = data.api.key;
  });

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
        $('#room-date-in').datepicker({
          dateFormat: 'yy/mm/dd',
          changeMonth: true,
          changeYear: true,
          minDate: 0,
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

  var urlParams = new URLSearchParams(window.location.search);
  var roomTypeId = urlParams.get('roomTypeId');

  if (roomTypeId) {
      $.ajax({
          url: 'https://guestapi.roomability.io/RoomType/Detail?roomTypeId=' + roomTypeId, 
          method: 'GET',
          headers: {
              'X-API-Key': key
          },
          success: function(response) {
              console.log("API Response:", response);  
              
              if (response && response.type) {
                  var room = response.type;
                  
                  $('#room_details_title').text(room.roomType);
                  $('#room_details__title').text(room.roomType);
                  $('#room_details_rate').text(formatCurrency(room.currencySymbol, room.rate));
                  $('#room_details_summary').text(room.detail || 'No description available.');
                  $('#rating-1').html(setRating(room.rateId));

                  var imagesContainer = $('#room-images');
                  var imageCount = 0;

                  
                  for (var i = 1; i <= 8; i++) {
                      var imageUrl = room['image' + i];
                      if (imageUrl) {
                          imageCount++;
                          var imageElement = `<img src="${imageUrl}" alt="Room Image ${i}" class="thumbnail" />`;
                          imagesContainer.append(imageElement);
                      }
                  }

                  if (imageCount > 0) {
                      $('#main-image').attr('src', room.image1 || 'default_image.jpg');
                  } else {
                      $('#main-image').attr('src', 'default_image.jpg');
                  }

                  if (imageCount > 4) {
                      $('.thumbnail:gt(3)').hide();
                  }
              } else {
                  console.log("Error: Room details not found.");
                  $('#room-details').html('<p>Room details not found.</p>');
              }
          },
          error: function(xhr, status, error) {
              console.error("API Error:", error); 
              console.error("Response Text:", xhr.responseText); 
              $('#room-details').html('<p>Error fetching room details.</p>');
          }
      });
  } else {
      $('#room-details').html('<p>No room selected.</p>');
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

  function validateField(selector, errorSelector, errorMessage) {
      if ($(selector).val() === "") {
        $(errorSelector).text(errorMessage).show();
        return false;
      } else {
        $(errorSelector).text('').hide();
        return true;
      }
  }

  $('#room-availability').submit(function(event) {
      event.preventDefault();

      var checkInDate = $('#room-date-in').val();
      var checkOutDate = $('#room-date-out').val();
      var adults = $('#room-guest-adult').val();
      var children = $('#room-guest-children').val();

      if (!validateField('#room-date-in', '#check-in-error', '*Check-in is required.')) return;
      if (!validateField('#room-date-out', '#check-out-error', '*Check-out is required.')) return;
      if (!validateField('#room-guest-adult', '#adults-error', '*Number of adults is required')) return;
      if (!validateField('#room-guest-children', '#children-error', '*Number of children is required')) return;

      if (new Date(checkInDate) >= new Date(checkOutDate)) {
          $('#check-out-error').text('*Check-out must be after check-in.').show();
          return;
      } else {
          $('#check-out-error').hide();
      }

      var queryParams = 'checkInDate=' + encodeURIComponent(checkInDate) +
                      '&checkOutDate=' + encodeURIComponent(checkOutDate) +
                      '&adults=' + encodeURIComponent(adults) +
                      '&children=' + encodeURIComponent(children)  +
                      '&roomTypeId=' + encodeURIComponent(roomTypeId);

      window.location.href = '/view/bookings.html?' + queryParams;
  });

  
  $(document).on('click', '.thumbnail', function () {
      const newSrc = $(this).attr('src');
      $('#main-image').attr('src', newSrc); 
      $('.thumbnail').removeClass('active');
      $(this).addClass('active'); 
  });
  let currentIndex = 0;
  const thumbnails = $('.thumbnail');
  const totalImages = thumbnails.length;
  
  function updateCarousel(index) {
    if (totalImages > 0) {
        const nextSrc = $(thumbnails[index]).attr('src');
        $('#main-image').attr('src', nextSrc); 
        thumbnails.removeClass('active');
        $(thumbnails[index]).addClass('active');
    }
}


$('#prevBtn').click(function () {
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;  
  updateCarousel(currentIndex);
});

$('#nextBtn').click(function () {
  currentIndex = (currentIndex + 1) % totalImages;  
  updateCarousel(currentIndex);
});


  if (totalImages > 0) {
      updateCarousel(currentIndex);
  }




  // Pre-fill fields based on URL parameters
  $(document).ready(function () {
      var urlParams = new URLSearchParams(window.location.search);
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
  });
});
