$(document).ready(function(){
    $('#header').load('/shared/header.html')
    $('#footer').load('/shared/footer.html')

    $('#date-in').datepicker({
        dateFormat: 'dd/mm/yy',
        minDate: 0,
        onClose: function(selectedDate) {
            $('#date-out').datepicker('option', 'minDate', selectedDate);
        }
    });

    $('#date-out').datepicker({
        dateFormat: 'dd/mm/yy',
        minDate: 1,
    });
    

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

            
            $('#rating-1').html(setRating(2.8));

           


            var urlParams = new URLSearchParams(window.location.search);
            var roomType = urlParams.get('room');

            

            // Define room data
    var roomData = {
        classic_bed_room: {
            title: "Classic Bed Room",
            price: "₦1,500,000",
            description: "This is a classic bed room with all modern amenities.",
            size: "20 ft",
            capacity: "2 Persons",
            bed: "King Bed",
            services: "Wifi, Television, Bathroom",
            image: "/wwwroot/images/rooms/classic_bed_room.jpg",
            sideImages: ["/wwwroot/images/rooms/classic_bed_room_side1.jpg", "/wwwroot/images/rooms/classic_bed_room_side2.jpg"]
        },
        premium_bed_room: {
            title: "Premium Room",
            price: "₦170,000",
            description: "Luxurious room with premium facilities and a beautiful view.",
            size: "25 ft",
            capacity: "3 Persons",
            bed: "Queen Bed",
            services: "Wifi, Television, Air Conditioning",
            image: "/wwwroot/images/rooms/premium_room.jpg",
            sideImages: ["/wwwroot/images/rooms/premium_room_side1.jpg", "/wwwroot/images/rooms/premium_room_side2.jpg"]
        },
        family_bed_room: {
            title: "Family Room",
            price: "₦190,000",
            description: "A spacious room ideal for families with kids.",
            size: "35 ft",
            capacity: "5 Persons",
            bed: "King and Single Beds",
            services: "Wifi, Television, Refrigerator, Bathroom",
            image: "/wwwroot/images/rooms/family_room.jpg",
            sideImages: ["/wwwroot/images/rooms/family_room_side1.jpg", "/wwwroot/images/rooms/family_room_side2.jpg"]
        },

    };
    console.log(roomType);
  
    if (roomData[roomType]) {
        var room = roomData[roomType];


        $('#room_title').text(room.title);
        $('#title').text(room.title);
        $('#price').text(room.price);

       
        $('#booking-link').attr('href', '/view/bookings.html?room=' + roomType + '&price=' + encodeURIComponent(room.price) + '&title=' + encodeURIComponent(room.title));
    } else {
        // If room type doesn't exist in roomData, show a default message or redirect
        $('#room-title').text("Room not found");
        $('#room-description').text("Sorry, this room is unavailable.");
    }




    // let currentIndex = 0;
    //   const images = document.querySelectorAll(".carousel-images img");
    //   const totalImages = images.length;

    
    //   function nextImage() {
    //       currentIndex = (currentIndex + 1) % totalImages;
    //       updateCarousel();
    //   }

    
    //   function prevImage() {
    //       currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    //       updateCarousel();
    //   }

     
    //   function updateCarousel() {
    //       const carousel = document.querySelector(".carousel-images");
    //       carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    //   }

     
    //   setInterval(nextImage, 5000);

      
    //   document.getElementById("nextBtn").addEventListener("click", nextImage);
    //   document.getElementById("prevBtn").addEventListener("click", prevImage);


    document.querySelectorAll('.thumbnail').forEach((thumbnail) => {
        thumbnail.addEventListener('click', (e) => {
            const mainImage = document.getElementById('main-image');
            const newSrc = e.target.src;
            mainImage.src = newSrc;
            document.querySelectorAll('.thumbnail').forEach((img) => img.classList.remove('active'));
            e.target.classList.add('active');
  
  
            
        });
    });
  
    let currentIndex = 0;
    const thumbnails = document.querySelectorAll('.thumbnail');
    const totalImages = thumbnails.length;
  
    function updateCarousel(index) {
        const nextSrc = thumbnails[index].src;
        document.getElementById('main-image').src = nextSrc;
        document.querySelectorAll('.thumbnail').forEach((img) => img.classList.remove('active'));
        thumbnails[index].classList.add('active');
    }
  
    document.getElementById('prevBtn').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel(currentIndex);
    });
  
    document.getElementById('nextBtn').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel(currentIndex);
    });
})