$('.search-route-button').click(function(e){

    calcRoute();
    e.preventDefault();
});
$('.search-places-button').click(function(e){
    clearMarkers();
    findPlaces(boxes,0);
    e.preventDefault();
});
