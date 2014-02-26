var geocoder;
var map;
var directionsService;
var markerArray = []

function initialize() {
  geocoder = new google.maps.Geocoder();
  directionsService = new google.maps.DirectionsService();

  var latlng = new google.maps.LatLng(47.623, -122.336);

  var mapOptions = {
    zoom: 15,
    center: latlng
  }

  var rendererOptions = {
    map: map
  }

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
  stepDisplay = new google.maps.InfoWindow();
}

function calcRoute() {
  for (var i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  markerArray = [];

  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      var warnings = document.getElementById('warnings_panel');
      warnings.innerHTML = '<b>' + response.routes[0].warnings + '</b>';
      directionsDisplay.setDirections(response);
      showSteps(response);
    }
  });
}

function showSteps(directionResult) {
  var myRoute = directionResult.routes[0].legs[0];
  for (var i = 0; i < myRoute.steps.length; i++) {
    var marker = new google.maps.Marker({
      position: myRoute.steps[i].start_location,
      map: map
    });
    attachInstructionText(marker, myRoute.steps[i].instructions);
    markerArray[i] = marker;
  }
}

function attachInstructionText(marker, text) {
  google.maps.event.addListener(marker, 'click', function() {
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}

function codeAddress(id) {
  var address = document.getElementById(id).value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);