let apiKey = '';
let baseUrl = '';
let defaultArrivalTime = "";

$(document).ready(function() {
    $('#reservation').load('/shared/reservation-summary.html')
  

    if (!sessionStorage.getItem('bookingData')) {
        window.location.href = '/index.html'; 
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
      alert('Failed to load terms of service.');
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

                
        //    var emailValue = sessionStorage.getItem('guestEmail');

                if (response.errorCode === 0) {
                    var guestDetails = response.detail;

                    if (guestDetails === null) {
                        $('#guest-email').prop('disabled', false); 

                        $('#guest-email').val(emailValue || '');
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
                  
                    }
                } else {
                    console.log('Error in API response: ' + response.errorMessage); 
                }
            },
            error: function() {
                alert('An error occurred with the API request. Please try again.');
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
        countries.forEach(function(country) {
            const option = $('<option>').val(country.id).text(country.name);
            countrySelect.append(option);
        });

        if (countries.length > 0) {
            loadStates(countries[0].id);
        }
    }

    function loadStates(countryId) {
        $.ajax({
            url: `${baseUrl}/State/GetSelectList?countryId=${countryId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey
            },
            success: function(response) {
                if (response && response.states) {
                    populateStateDropdown(response.states);
                }
            },
            error: function(error) {
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
            alert('Please fill all required fields.');
            isValid = false;
        }

        
        if (isValid) {
            let bookingData = JSON.parse(sessionStorage.getItem('bookingData')) || {};
            bookingData = { ...bookingData, ...guestData };
            sessionStorage.setItem('bookingData', JSON.stringify(bookingData));

            window.location.href = `/view/booking-preview.html`;  
        }
    });

    $('#guest-country').change(function() {
        const selectedCountryId = $(this).val();
        loadStates(selectedCountryId);
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
});
