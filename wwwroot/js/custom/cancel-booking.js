$(document).ready(function() {

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


  $('#rating-2').html(setRating(3));


    $('#terms-of-use-link').on('click', function(e) {
    e.preventDefault(); 
    $('#terms-modal').fadeIn();
  });
})