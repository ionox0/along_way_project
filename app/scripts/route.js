var routeBoxer = new RouteBoxer();

function calcRoute() {
 var directionsService = new google.maps.DirectionsService();
 var directionsDisplay = new google.maps.DirectionsRenderer();
 directionsDisplay.setMap(map);
 clearBoxes();
 var distance = parseFloat(20) * 1.609344;
 var start = document.getElementById('start').value;
 var end = document.getElementById('end').value;
 var request = {
   origin:start,
   destination:end,
   travelMode: google.maps.TravelMode.DRIVING
 };
 directionsService.route(request, function(result, status) {
   if (status == google.maps.DirectionsStatus.OK) {
     directionsDisplay.setDirections(result);
     var path = result.routes[0].overview_path;
     var boxes = routeBoxer.box(path, distance);
     drawBoxes(boxes);
     findPlaces(boxes,0);
   }
   else {
     alert("Directions query failed: " + status);
   }
 });
}
