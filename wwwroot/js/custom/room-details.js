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

// });
 $(document).ready(function () {
    $('#header').load('/shared/header.html');
    $('#footer').load('/shared/footer.html');

    if ($.fn.datepicker) {
        $('#room-date-in').datepicker({
            dateFormat: 'yy/mm/dd',
            minDate: 0,
            onClose: function (selectedDate) {
                $('#room-date-out').datepicker('option', 'minDate', selectedDate);
            }
        });

        $('#room-date-out').datepicker({
            dateFormat: 'yy/mm/dd',
            minDate: 1,
        });
    } else {
        console.error('jQuery UI Datepicker is not loaded!');
    }

    var urlParams = new URLSearchParams(window.location.search);
    var roomTypeId = urlParams.get('roomTypeId');

    if (roomTypeId) {
        $.ajax({
            url: 'https://guestapi.roomability.io/RoomType/Detail?roomTypeId=' + roomTypeId,
            method: 'GET',
            headers: {
                'X-API-Key': 'WEB_ZtxI7rfuxyz0xaSQmJi73R123wCMEcjNQmzTrma1b2c3'
            },
            success: function (response) {
                console.log("API Response:", response);

                if (response && response.type) {
                    var room = response.type;
                    $('#room_image-1').attr('src', room.image1
                    )
                    $('#room_image-2').attr('src', room.image2
                    )
                    $('#room_image-3').attr('src', room.image3
                    )
                    $('#room_image-4').attr('src', room.image4
                    )
                    $('#room_image-5').attr('src', room.image4
                    )
                    $('#room_details_title').text(room.roomType);
                    $('#room_details__title').text(room.roomType);
                    $('#room_details_rate').text(formatCurrency(room.currencySymbol, room.rate));
                    $('#room_details_summary').text(room.detail || 'No description available.');
                    $('#size').text('');
                    $('#capacity').text('');
                    $('#bed').text('');
                    $('#service').text('');
                    $('#rating-1').html(setRating(room.rateId));

                    var imagesContainer = $('#room-images');
                    var imageCount = 0;

                    // Iterate over image fields (image1, image2, etc.)
                    for (var i = 1; i <= 8; i++) {
                        var imageUrl = room['image' + i];
                        if (imageUrl && imageUrl !== 'https://api.reservations.ng/images/hotels/room-placeholder.png') {
                            imageCount++;
                            var imageElement = `
                                <div class="room-image">
                                    <img src="${imageUrl}" alt="Room Image ${i}" class="thumbnail" />
                                </div>
                            `;
                            imagesContainer.append(imageElement);
                        }
                    }

                    // If no valid images, show a default image instead of a placeholder
                    if (imageCount > 0) {
                        console.log('Images loaded:', room);
                        $('#main-image').attr('src', room.image1 || 'default_image.jpg');
                    } else {
                        console.log('No valid images found, using default image.');
                        $('#main-image').attr('src', 'default_image.jpg');
                    }
                } else {
                    console.log("Error: Room details not found.");
                    $('#room-details').html('<p>Room details not found.</p>');
                }
            },
            error: function (xhr, status, error) {
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

      $(document).on('click', '#booking-link', function (e) {
        e.preventDefault(); 
        var roomTypeId = getUrlParameter('roomTypeId');
        
        
        var checkInDate = $('#room-date-in').val() || new Date().toISOString().split('T')[0]; // Current date as default
        var checkOutDate = $('#room-date-out').val() || new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]; // Next day as default
        var adults = $('#adults').val() || 1; // Default adult count = 1
        var children = $('#children').val() || 0; // Default children count = 0
    
        // Construct the booking URL with query parameters
        var bookingUrl = '/view/bookings.html?roomTypeId=' + roomTypeId + 
                         '&checkInDate=' + checkInDate + 
                         '&checkOutDate=' + checkOutDate + 
                         '&adults=' + adults + 
                         '&children=' + children;
    
        // Redirect to the booking page
        window.location.href = bookingUrl;
    });


    // Handle thumbnail click
    $(document).on('click', '.thumbnail', function () {
        const newSrc = $(this).attr('src');
        $('#main-image').attr('src', newSrc);
        $('.thumbnail').removeClass('active');
        $(this).addClass('active');
    });

    // Carousel image navigation
    let currentIndex = 0;
    const thumbnails = $('.thumbnail');
    const totalImages = thumbnails.length;

    function updateCarousel(index) {
        const nextSrc = thumbnails[index].src;
        $('#main-image').attr('src', nextSrc);
        thumbnails.removeClass('active');
        $(thumbnails[index]).addClass('active');
    }

    $('#prevBtn').click(function () {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel(currentIndex);
    });

    $('#nextBtn').click(function () {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel(currentIndex);
    });

    // Initialize the first image
    if (totalImages > 0) {
        updateCarousel(currentIndex);
    }
});
