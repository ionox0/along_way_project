infoWindow = new google.maps.InfoWindow();
service = new google.maps.places.PlacesService(map);
$("button[type=submit]").click(performSearch);



    function performSearch() {
        var place = document.getElementById('typePlace').value;
        var request = {
            bounds: map.getBounds(),
            keyword: place
        };
        service.radarSearch(request, callback);
    }

    function callback(results, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            alert(status);
            return;
        }
        for (var i = 0, result; result = results[i]; i++) {
            var marker = new google.maps.Marker({
                map: map,
                position: result.geometry.location
            });
        }
    }
