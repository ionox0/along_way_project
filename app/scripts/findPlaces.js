var placesServices;
var minRating = 1;

function findPlaces(boxes, searchIndex, place) {
   placesServices = new google.maps.places.PlacesService(map);
   var request = {
       bounds: boxes[searchIndex],
// List of supported types
// https://developers.google.com/places/documentation/supported_types
       keyword: place
     }
   placesServices.radarSearch(request, function (results, status) {
       if (status != google.maps.places.PlacesServiceStatus.OK) {
           alert("Request["+searchIndex+"] failed: "+status);
           return;
       }

       //document.getElementById('side_bar').innerHTML += "bounds["+searchIndex+"] returns "+results.length+" results<br>"
       for (var i = 0, result; result = results[i]; i++) {

           //if (placesServices..getDetails(.rating > minRating){
               var marker = createMarker(result);
           //}
       }
       searchIndex++;
       if (searchIndex < boxes.length)
           findPlaces(boxes,searchIndex, place);
   });
}

// function clearPlaces() {
//   if (markers != null) {
//     for (var i = 0; i < markers.length; i++) {
//       markers[i].setMap(null);
//     }
//   }
//   markers = null;
// }