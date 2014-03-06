var placesServices;
var place = document.getElementById('place').value;

function findPlaces(boxes, searchIndex) {
    var nowOpen = document.getElementById('checkbox1').value ;
    var maxPrice = document.getElementById('max-price').value || 4;
    var place = document.getElementById('place').value;
    placesServices = new google.maps.places.PlacesService(map);
    var request = {
        bounds: boxes[searchIndex],
        keyword: place,
        maxPriceLevel: maxPrice,
        openNow: nowOpen
    }
    placesServices.radarSearch(request, function (results, status) {

        if (status != google.maps.places.PlacesServiceStatus.OK) {
            alert("Request[" + searchIndex + "] failed: " + status);
            return;
        }
        for (var i = 0, result; result = results[i]; i++) {

            //if (result.rating != null){
            var marker = createMarker(result);

            markers.push(marker);
            //}
        }
        // console.log(placesServices.getDetails());

        searchIndex++;
        if (searchIndex < boxes.length)
            findPlaces(boxes, searchIndex);

    });
}
