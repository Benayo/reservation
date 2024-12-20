$(document).ready(function(){
    $("#header").load('/shared/header.html');
    $("#footer").load('/shared/footer.html');  

    var guestData = JSON.parse(sessionStorage.getItem('guestData'));
    console.log(guestData);

    if(guestData) {
       
        $('#guest-success-name').text(guestData.guest.title + " " + guestData.guest.firstName + " " + guestData.guest.lastName);
        $('#arrival-time').text(guestData.reservations[0].arrivalTime);
        $('#check-in-date').text(guestData.reservations[0].checkInDate);
        $('#check-out-date').text(guestData.reservations[0].checkOutDate);
        $('#room-type').text(guestData.reservations[0].roomTypeId); // You may want to replace this with the room type name if available
        $('#total-amount').text(guestData.payment.amount);
    }
});
