$('.search-route-button').click(function(e){
    $('#banana').show();
    calcRoute();
    e.preventDefault();

});
$('.search-places-button').click(function(e){
    clearMarkers();
    findPlaces(boxes,0);
    e.preventDefault();
});
$('#yelpify').click(function(e){
  console.log('please wait');
  clearMarkers();
  getRating(allPlaces, 0);
})
