var map;

function initialize() {
 var chicago = new google.maps.LatLng(41.850033, -87.6500523);
 var mapOptions = {
   zoom:7,
   center: chicago
 };
 map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}
//google.maps.event.addDomListener(window, 'load', initialize);
//    if (navigator.geolocation) {
//        browserSupportFlag = true;
//        navigator.geolocation.getCurrentPosition(function (position) {
//            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//            addMarker(initialLocation);
//        }, function () {
//            handleNoGeolocation(browserSupportFlag);
//        });
//    }
//    // Browser doesn't support Geolocation
//    else {
//        initialLocation = defaultLocation;
//        addMarker(initialLocation);
//    }


   

