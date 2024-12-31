$(document).ready(function(){

$('#header').load('/shared/header.html')
$('#footer'.load('/shared/footer.html'))


$.getJSON('/appsettings.json', function(data) {

    $('#hotel-name').text(data.contactInfo.hotel);
});
})