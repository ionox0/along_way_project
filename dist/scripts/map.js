var map;
var initialLocation = new google.maps.LatLng(47.6101, -122.3420);;

function initialize() {

    function addMarker(initialLocation) {
        map.setCenter(initialLocation);
        var marker = new google.maps.Marker({
            position: initialLocation,
            map: map,
            title: 'Click to zoom'
        });
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            addMarker(initialLocation);
        });
    }
    // Browser doesn't support Geolocation
    else {
        addMarker(initialLocation);
    }

    var mapOptions = {
        zoom: 15,
        center: initialLocation
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}
