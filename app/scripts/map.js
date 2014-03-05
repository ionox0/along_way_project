var map;
var initialLocation;
var defaultLocation = new google.maps.LatLng(47.6101, -122.3420);

function initialize() {

    var mapOptions = {
        zoom: 15,
        center: initialLocation
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    function addMarker(initialLocation) {
        map.setCenter(initialLocation);
        var marker = new google.maps.Marker({
            position: initialLocation,
            map: map,
            title: 'Click to zoom'
        });
    }

    if (navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            addMarker(initialLocation);
        }, function () {
            handleNoGeolocation(browserSupportFlag);
        });
    }
    // Browser doesn't support Geolocation
    else {
        initialLocation = defaultLocation;
        addMarker(initialLocation);
    }
}
