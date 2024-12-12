$(document).ready(function(){
    $('#header').load('/shared/header.html')
    $('#footer').load('/shared/footer.html')


    let currentIndex = 0;
      const images = document.querySelectorAll(".carousel-images img");
      const totalImages = images.length;

      // Function to move to the next image
      function nextImage() {
          currentIndex = (currentIndex + 1) % totalImages;
          updateCarousel();
      }

      // Function to move to the previous image
      function prevImage() {
          currentIndex = (currentIndex - 1 + totalImages) % totalImages;
          updateCarousel();
      }

      // Function to update the carousel view
      function updateCarousel() {
          const carousel = document.querySelector(".carousel-images");
          carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      }

      // Set up automatic carousel flip (every 5 seconds)
      setInterval(nextImage, 5000);

      // Attach event listeners to buttons
      document.getElementById("nextBtn").addEventListener("click", nextImage);
      document.getElementById("prevBtn").addEventListener("click", prevImage);
})