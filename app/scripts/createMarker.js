var infowindow = new google.maps.InfoWindow();
var gmarkers = [];

function createMarker(place){
  if (place.icon) {
    var image = new google.maps.MarkerImage(
      place.icon,
      new google.maps.Size(71, 71),
      new google.maps.Point(0, 0),
      new google.maps.Point(17, 34),
      new google.maps.Size(25, 25));
  }
  else var image = null;

  var marker=new google.maps.Marker({
    map:map,
    icon: image,
    position:place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', toggleBounce());
  var request =  {
    reference: place.reference
  };
  google.maps.event.addListener(marker,'click',function(){
    placesServices.getDetails(request, function(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        var contentStr = '<h5>'+place.name+'</h5><p>'+place.formatted_address;
        if (!!place.formatted_phone_number) contentStr += '<br>'+place.formatted_phone_number;
        if (!!place.website) contentStr += '<br><a target="_blank" href="'+place.website+'">'+place.website+'</a>';
        contentStr += '<br>'+place.types+'</p>';
        infowindow.setContent(contentStr);
        infowindow.open(map,marker);
      } else {
        var contentStr = "<h5>No Result, status="+status+"</h5>";
        infowindow.setContent(contentStr);
        infowindow.open(map,marker);
      }
    });
  });
  gmarkers.push(marker);
}

function clearMarkers() {
  if (gmarkers.length > 0) {
    for (var i = 0; i < gmarkers.length; i++) {
      gmarkers[i].setMap(null);
    }
  }
  gmarkers = [];
}

function toggleBounce() {

  if (this.getAnimation() != null) {
    this.setAnimation(null);
  } else {
    this.setAnimation(google.maps.Animation.BOUNCE);
  }
}
