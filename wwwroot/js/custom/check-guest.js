$(document).ready(function() {
    $('#reservation').load('/shared/reservation-summary.html');


    $.getJSON('/appsettings.json', function(data) {

        
        $('#hotel-name').text(data.contactInfo.hotel);
    });
    
    if (!sessionStorage.getItem('sessionStartTime')) {
        sessionStorage.setItem('sessionStartTime', Date.now()); 
    }

    
    const sessionTimeoutDuration = 15 * 60 * 1000; 
    

    const checkSessionExpiration = function() {
        const sessionStartTime = sessionStorage.getItem('sessionStartTime');
        if (sessionStartTime) {
            const elapsedTime = Date.now() - sessionStartTime;
            if (elapsedTime >= sessionTimeoutDuration) {
                sessionStorage.clear(); 
                alert('Session has expired. Your data has been cleared.');

                window.location.href = '/view/bookings.html'
            }
        }
    };

    
    checkSessionExpiration();

    
    setInterval(checkSessionExpiration, 60 * 1000);

    
    
    if (!sessionStorage.getItem('bookingData')) {
        window.location.href = '/index.html'; 
        return; 
    }


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
