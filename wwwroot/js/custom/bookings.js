$(document).ready(function () {
    $("#header").load("/shared/header.html");
  
    $("#footer").load("/shared/footer.html");

  // Handle thumbnail clicks to update the main image
  document.querySelectorAll('.thumbnail').forEach((thumbnail) => {
    thumbnail.addEventListener('click', (e) => {
      const mainImage = document.getElementById('main-image');
      const newSrc = e.target.dataset.src;

      // Update the main image
      mainImage.src = newSrc;

      // Highlight the active thumbnail
      document.querySelectorAll('.thumbnail').forEach((img) => img.classList.remove('active'));
      e.target.classList.add('active');
    });
  });

  // Carousel-like flipping functionality
  let currentIndex = 0;
  const thumbnails = document.querySelectorAll('.thumbnail');
  const totalImages = thumbnails.length;

  // Auto-flip function
  setInterval(() => {
    thumbnails[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % totalImages;
    const nextSrc = thumbnails[currentIndex].dataset.src;

    // Update the main image and highlight thumbnail
    document.getElementById('main-image').src = nextSrc;
    thumbnails[currentIndex].classList.add('active');
  }, 5000); // Change every 5 seconds


  });
  