function getloc() {

    var localRadius = window.localStorage.getItem('radius');
    localRadius  = parseInt(localRadius);
    if (localRadius < 100 || isNaN(localRadius)) localRadius = 100;

    infowin = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({

        location: new google.maps.LatLng(Latitude, Longitude),
        radius: localRadius,
        type: ['store']
    }, foundStoresCallback);
}

// Success callback for locating stores in the area

function foundStoresCallback(results, status) {

    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    } else
        navigator.notification.alert('Google API error\n' + status, null, "Error", "OK");
}

// Place a pin for each store on the map

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowin.setContent(place.name);
        infowin.open(map, this);
    });
}