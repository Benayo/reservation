$(document).ready(function () {
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
});