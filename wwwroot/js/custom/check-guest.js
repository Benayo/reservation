$(document).ready(function() {
    $('#reservation').load('/shared/reservation-summary.html');

    $(document).on('click', '#check-guest-button', function(e) {
        e.preventDefault();

        var emailValue = $('#check_guest_email').val().trim();
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (emailValue === "" || !emailPattern.test(emailValue)) {
            $('#email-error').text('*Please enter a valid email address!').show();
            return; 
        }


        sessionStorage.setItem('guestEmail', emailValue);

     
        window.location.href = '/view/guest-form.html';
    });

    $('#check_guest_email').on('input', function() {
        var emailValue = $(this).val().trim();
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        
        if (emailPattern.test(emailValue)) {
            $('#email-error').hide();
        }
    });
});
