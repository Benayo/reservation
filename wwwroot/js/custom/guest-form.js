let apiKey = '';
let baseUrl = '';
let defaultArrivalTime = "";

$(document).ready(function() {
    $('#reservation').load('/shared/reservation-summary.html')
  
    let inactivityTimer;

    const sessionTimeoutDuration = 5 * 60 * 1000; 

    const clearSession = function() {
        sessionStorage.clear();
        toastr.error('Session has expired due to inactivity. Your data has been cleared.');
        window.location.href = '/view/bookings.html';
    };

    const resetInactivityTimer = function() {
        clearTimeout(inactivityTimer);
        sessionStorage.setItem('sessionStartTime', Date.now());
        inactivityTimer = setTimeout(clearSession, sessionTimeoutDuration);
    };

    const sessionStartTime = sessionStorage.getItem('sessionStartTime');
    if (sessionStartTime) {
        const elapsedTime = Date.now() - sessionStartTime;
        if (elapsedTime >= sessionTimeoutDuration) {
            clearSession();
            return;
        }
    } else {
        sessionStorage.setItem('sessionStartTime', Date.now());
    }

    $(document).on('mousemove keydown click scroll touchstart', function() {
        resetInactivityTimer();
    });

    resetInactivityTimer();

    if (!sessionStorage.getItem('bookingData')) {
        window.location.href = '/view/bookings.html';
        return;
    }



    $.getJSON('/appsettings.json', function(data) {

        apiKey = data.api.apiKey;
     baseUrl = data.api.baseUrl;
     defaultArrivalTime = data.appSettings.arrival




     $('#hotel-name').text(data.contactInfo.hotel);



     loadTermsOfUseModal()
     loadGuestEmailDetails()
     loadCountries();
     loadStates() 
  
   });


function loadTermsOfUseModal(){
$.ajax({
    url:   `${baseUrl}/Term/Detail`,
    method: 'GET',
    headers: {
      'X-API-KEY': apiKey
    },
    success: function(response) {
      $('#terms-text').html(response.detail);
    },
    error: function() {
        toastr.error('Failed to load terms of service.');
    }
  });
  
  $('a[href="#"]').on('click', function(e) {
    e.preventDefault(); 
    $('#terms-modal').fadeIn();
  });
  
  $('.modal-close').on('click', function() {
    $('#terms-modal').fadeOut();
  });
  
  $('#accept-terms').on('click', function() {
    $('#terms').prop('checked', true); 
    $('#terms-modal').fadeOut();
  });
  
  
  $('#cancel-terms').on('click', function() {
    $('#terms-modal').fadeOut();
  });}
  

    

    jQuery(document).ready(function ($) {

        $.getJSON('/appsettings.json', function (data){

            const defaultArrivalTime = data.appSettings.arrival

            $('#guest-arrival-time').val(defaultArrivalTime);


            const visibilitySettings = data.guestForm.visibility
  
            if (!visibilitySettings.captcha) {
              $("#human-verification").hide();
              $("#human-verification-content").hide();	
            };
       


            const recaptchaSiteKey = data.appSettings.recaptchaSiteKey;

            $('#recaptcha-container').attr('data-sitekey', recaptchaSiteKey)
        })

       


        $('#guest-arrival-time').timepicki(); 

         $('#guest-arrival-time').timepicki('setTime', defaultArrivalTime);


 
    })


function loadGuestEmailDetails(){
        var emailValue = sessionStorage.getItem('guestEmail');

        $.ajax({
            url: `${baseUrl}/Guest/Detail?email=${emailValue}`,
            method: 'GET',
            contentType: 'application/json',
            headers: {
                'X-API-KEY': apiKey
            },
            success: function(response) {


                if (response.errorCode === 0) {
                    var guestDetails = response.detail;

                    if (guestDetails === null) {
                        $('#guest-email').prop('disabled', false); 

                        $('#guest-email').val(emailValue || '');
                        toastr.error("User does not exists! Kindly fill out all required fields");
                    } else {
                        $('#guest-title').val(guestDetails.title || 'Mr.'); 
                        $('#guest-first-name').val(guestDetails.firstName || '');
                        $('#guest-last-name').val(guestDetails.lastName || '');
                        $('#guest-phone').val(guestDetails.phone || '');
                        $('#guest-email').val(guestDetails.email || '');
                        $('#guest-gender').val(guestDetails.gender || 'Male');
                        $('#guest-occupation').val(guestDetails.occupation || '');
                        $('#guest-country').val(guestDetails.country || ''); 
                        loadCountries(country);
                        $('#guest-state').val(guestDetails.state || '');
                        $('#guest-city').val(guestDetails.city || '');
                        $('#guest-address-line1').val(guestDetails.address1 || '');
                        $('#guest-address-line2').val(guestDetails.address2 || '');
                  toastr.success("User exists!");
                    }
                } else {
                    console.log('Error in API response: ' + response.errorMessage); 
                }
            },
            error: function() {
                toastr.error('An error occurred with the API request. Please try again.');
            }
        });



  
    }


    $('#guest-date-of-birth').datetimepicker({
        format: 'Y/m/d',  
        timepicker: false,  
        maxDate: new Date(),  
        scrollInput: false, 
        closeOnDateSelect: true 
    });


;
     
  
    function validateField(selector, errorSelector, errorMessage) {
        $(selector).blur(function() {
            if ($(this).val() === "") {
                $(errorSelector).text(errorMessage);
            }
        });

        $(selector).on('input', function() {
            if ($(this).val() !== "") {
                $(errorSelector).text('');
            }
        });
    }

    validateField('#guest-first-name', '#first-name-error', '*First name is required');
    validateField('#guest-last-name', '#last-name-error', '*Last name is required');
    validateField('#guest-email', '#email-error', '*Email is required');
    validateField('#guest-phone', '#phone-error', '*Phone number is required');
    validateField('#guest-address-line1', '#address-error', '*Address Line 1 is required');

    
    $('#guest-email').blur(function() {
        var emailValue = $(this).val();
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (emailValue === "") {
            $('#email-error').text('*Email is required');
        } else if (!emailPattern.test(emailValue)) {
            $('#email-error').text('*Please enter a valid email');
        }
    });

    $('#guest-email').on('input', function() {
        if ($(this).val() !== "") {
            $('#email-error').text('');
        }
    });

   
    
    



    
    function loadCountries() {
        $.ajax({
            url: `${baseUrl}/Country/GetSelectList`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey
            },
            success: function(response) {
                if (response && response.countries) {
                    populateCountryDropdown(response.countries);
                }
            },
            error: function(error) {
                console.error("Error fetching countries:", error);
            }
        });
    }

 

    function populateCountryDropdown(countries) {
        const countrySelect = $('#guest-country');
    
        countrySelect.empty();

        countries.forEach(function (country, index) {
            const option = $('<option>')
                .val(country.id)
                .text(country.name);
        
            if (index === 0) {
                option.attr('selected', 'selected');
            }
            countrySelect.append(option);
        });
        
        if (countries.length > 0) {
            loadStates(countries[0].id);
        }
    }
    
    
    $('#guest-country').change(function () {
        const selectedCountryId = $(this).val();
        if (selectedCountryId) {
            loadStates(selectedCountryId);
        } else {
            console.error('No country selected.');
        }
    });


    
    function loadStates(countryId) {
        if (!countryId) {
            return;
        }

        $.ajax({
            url: `${baseUrl}/State/GetSelectList?countryId=${countryId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey
            },
            success: function (response) {
                if (response && response.states) {
                    populateStateDropdown(response.states);
                }
            },
            error: function (error) {
                console.error("Error fetching states:", error);
            }
        });
    }

 
    function populateStateDropdown(states) {
        const stateSelect = $('#guest-state');
        stateSelect.empty();
        
        const urlParams = new URLSearchParams(window.location.search);
        const state = urlParams.get('state');
    
        states.forEach(function(stateData) {
            
            const option = $('<option>').val(stateData.id).text(stateData.name);
   
            if ( stateData.name === state) {
                console.log(state === stateData.name);
                option.attr('selected', 'selected'); 
            }
    
            
            stateSelect.append(option);
        });

        
    }


    


    $(document).on('click', "#guest-form-button", function(e) {
        e.preventDefault();


    var recaptchaResponse = grecaptcha.getResponse();

    if (recaptchaResponse.length == 0) {
        toastr.error('Please complete the reCAPTCHA to proceed.');
        return;  
    }




        var urlParams = new URLSearchParams(window.location.search);

    
        

        let isValid = true;
        const guestData = {
            guestTitle: $('#guest-title').val(),
            guestFirstName: $('#guest-first-name').val(),
            guestLastName: $('#guest-last-name').val(),
            guestGender: $('#guest-gender').val(),
            guestDateOfBirth: $('#guest-date-of-birth').val(),
            guestOccupation: $('#guest-occupation').val(),
            guestPhone: $('#guest-phone').val(),
            guestEmail: $('#guest-email').val() ||  urlParams.get('email'), 
            guestArrivalTime: $('#guest-arrival-time').val(),
            guestAddressLine1: $('#guest-address-line1').val(),
            guestAddressLine2: $('#guest-address-line2').val(),
            guestCountryId: $('#guest-country').val(),
            guestCountryName: $('#guest-country option:selected').text(), 
            guestState: $('#guest-state').val(),
            guestCity: $('#guest-city').val(),
            guestStateName: $('#guest-state option:selected').text(),
            guestPurpose: $('#guest-purpose').val(),
            guestAdditionalRequirements: $('#guest-requirements').val(),
            termsAccepted: $('#terms').is(':checked')
        };

        
        if (!guestData.guestFirstName || !guestData.guestLastName || !guestData.guestEmail || !guestData.guestPhone || !guestData.guestAddressLine1 || !guestData.termsAccepted) {
            toastr.error('Please fill out all required fields');
            isValid = false;
            return;
        }

        
        if (isValid) {
            let bookingData = JSON.parse(sessionStorage.getItem('bookingData')) || {};
            bookingData = { ...bookingData, ...guestData };
            sessionStorage.setItem('bookingData', JSON.stringify(bookingData));

            window.location.href = `/view/booking-preview.html`;  
        }
    });
   

});
