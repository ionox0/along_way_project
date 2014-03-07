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
            // addMarker(initialLocation);
        });
    }
    // Browser doesn't support Geolocation
    // else {
    //     addMarker(initialLocation);
    // }

    var mapOptions = {
        zoom: 15,
        center: initialLocation
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var start = document.getElementById('start');
    var end = document.getElementById('end');

    var start_complete = new google.maps.places.Autocomplete(start);
    start_complete.bindTo('bounds', map);

    var end_complete = new google.maps.places.Autocomplete(end);
    end_complete.bindTo('bounds', map);
<<<<<<< HEAD

    google.maps.event.addListener(start_complete, 'place_changed', function() {
=======
>>>>>>> 60cdc86d7ea16536bc69008972e323ed4538cd7a

    google.maps.event.addListener(start_complete, 'place_changed', function() {
        var place = start_complete.getPlace();
        if (!place.geometry) {
          return;
        }

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        }
        else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
       }
    });

    google.maps.event.addListener(end_complete, 'place_changed', function() {
        var place = end_complete.getPlace();
        if (!place.geometry) {
          return;
        }

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        }
        else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
       }
    });
}
