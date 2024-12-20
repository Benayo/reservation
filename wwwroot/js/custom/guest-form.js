$(document).ready(function() {
    // Load header and footer
    $("#header").load('/shared/header.html');
    $("#footer").load('/shared/footer.html');
    $('#reservation').load('/shared/reservation-summary.html');

  
    loadCountries();
    
    function loadCountries() {
        $.ajax({
            url: 'https://guestapi.roomability.io/Country/GetSelectList',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'WEB_ZtxI7rfuxyz0xaSQmJi73R123wCMEcjNQmzTrma1b2c3'
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
            url: `https://guestapi.roomability.io/State/GetSelectList?countryId=${countryId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY':'WEB_ZtxI7rfuxyz0xaSQmJi73R123wCMEcjNQmzTrma1b2c3'
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
        states.forEach(function(state) {
            const option = $('<option>').val(state.id).text(state.name);
            stateSelect.append(option);
        });
    }

    
    function populateEmail() {
        const bookingData = JSON.parse(sessionStorage.getItem('bookingData'));
        if (bookingData && bookingData.email) {
            $('#guest-email').val(bookingData.email);
        }
    }

    
    $(document).on('click', "#guest-form-button", function(e) {
      e.preventDefault();
      
        
        
        const guestData = {
            guestTitle: $('#guest-title').val(),
            guestFirstName: $('#guest-first-name').val(),
            guestLastName: $('#guest-last-name').val(),
            guestGender: $('#guest-gender').val(),
            guestDateOfBirth: $('#guest-date-of-birth').val(),
            guestOccupation: $('#guest-occupation').val(),
            guestPhone: $('#guest-phone').val(),
            guestEmail: $('#guest-email').val(),
            guestArrivalTime:  $('#guest-arrival-time').val(),
            guestAddressLine1: $('#guest-address-line1').val(),
            guestAddressLine2: $('#guest-address-line2').val(),
            guestCountryId: $('#guest-country').val(),
            guestCountryName: $('#guest-country option:selected').text(), 
            guestState: $('#guest-state').val(),
            guestStateName: $('#guest-state option:selected').text(),
            guestPurpose: $('#guest-purpose').val(),
            guestAdditionalRequirements: $('#guest-requirements').val(),
            termsAccepted: $('#terms').is(':checked'),
        };

       
        let bookingData = JSON.parse(sessionStorage.getItem('bookingData')) || {};
        bookingData = { ...bookingData, ...guestData };  
        sessionStorage.setItem('bookingData', JSON.stringify(bookingData));

        console.log(bookingData)
        
        window.location.href = '/view/booking-preview.html';
    });

  
    populateEmail();

    
    $('#guest-country').change(function() {
        const selectedCountryId = $(this).val();
        loadStates(selectedCountryId);
    });
});
