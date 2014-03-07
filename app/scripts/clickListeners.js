$('.search-route-button').click(function(e){
    calcRoute();
    e.preventDefault();
});
$('.search-places-button').click(function(e){
    clearMarkers();
    findPlaces(boxes,0);
    e.preventDefault();
});
$('#yelpify').click(function(e){
  clearMarkers();
  console.log('asdf');
  getRating(allPlaces, 0);
})
