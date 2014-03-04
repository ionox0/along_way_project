window.initialize = function () {
    var geocoder = new google.maps.Geocoder();
    var map;
    var service;
    var directionsService = new google.maps.DirectionsService();
    var markerArray = [];
    var initialLocation;
    var defaultLocation = new google.maps.LatLng(47.6101, -122.3420);
    var stepDisplay = new google.maps.InfoWindow();

    
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


    var codeAddress = function () {
        var address = document.getElementById("search").value;
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    };

    function calcRoute() {
        // for (var i = 0; i < markerArray.length; i++) {
        //   markerArray[i].setMap(null);
        // }

        // markerArray = [];

        var start = document.getElementById('start').value;
        var end = document.getElementById('end').value;
        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                // var warnings = document.getElementById('warnings_panel');
                // warnings.innerHTML = '<b>' + response.routes[0].warnings + '</b>';
                directionsDisplay.setDirections(response);
                // showSteps(response);
            }
        });
    }
    $("#startForm input[type='button']").click(calcRoute);

    directionsDisplay = new google.maps.DirectionsRenderer();
    var rendererOptions = {
        map: map
    };

    // stepDisplay = new google.maps.InfoWindow();
    directionsDisplay.setMap(map);



    function attachInstructionText(marker, text) {
        google.maps.event.addListener(marker, 'click', function () {
            stepDisplay.setContent(text);
            stepDisplay.open(map, marker);
        });
    }

    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    $("#search-places-button").click(performSearch);

    function performSearch() {
        var place = document.getElementById('typePlace').value;
        var request = {
            bounds: map.getBounds(),
            keyword: place
        };
        service.radarSearch(request, callback);
    }

    function callback(results, status) {
        clearSearch();
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            alert(status);
            return false;
        }
        for (var i = 0, result; result = results[i]; i++) {
            var marker = new google.maps.Marker({
                map: map,
                position: result.geometry.location
            });
            markerArray.push(marker);
            attachInstructionText(marker, "TEST!");
        }

        function clearSearch() {
            if (markerArray != null) {
                for (var i = 0; i < markerArray.length; i++) {
                    markerArray[i].setMap(null);
                }
            }
            markerArray = [];
        }
    }


    google.maps.event.addDomListener(window, 'load', initialize);
};

$(document).ready(function () {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC2CVRCqI-iLtJ5_MdAlXxeqe8qU193WuI&libraries=places&sensor=false&callback=initialize';
    document.body.appendChild(script);
});