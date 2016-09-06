
var Latitude = undefined;
var Longitude = undefined;


// Get geo coordinates

function getMapLocation() {

    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, {
            enableHighAccuracy: true,
            timeout: 10000
        });
    else
        console.log('Geolocation not supported');
}

// Success callback for get geo coordinates

var onMapSuccess = function (position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;

    getMap(Latitude, Longitude);

    google.maps.event.addListener(map, 'click', function(event) {
        addMarker(event.latLng, map);
    });
}

// Get map by using coordinates

function getMap(latitude, longitude) {

    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var latLong = new google.maps.LatLng(latitude, longitude);

    map.setCenter(latLong);

    var contentString =
        '<b>You are here!</b><br>You can take photo';

    infoWindow = new google.maps.InfoWindow({
        map: map,
        content: contentString
    });
    infoWindow.setPosition(latLong);
}


// Error callback
function onMapError(error) {
    navigator.notification.alert("Geolocation error: " + error.message + "\nApplication functionalities are limited", null, "Error", "OK");
}

// Adds a marker to the map.
function addMarker(location, map) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: 'images/marker.png'
    });

    var date = document.getElementById("datum").value;

    var contentString = $('#ime_radnje').val();
    if (!contentString) contentString = "Radnja sa popustom";

    var infow = new google.maps.InfoWindow({
        content: contentString //+ '<br>Popust vazi do: ' + '<b>' + date + '</b>'
    });

    marker.addListener('click', function() {
        infow.open(map, marker);
    });

    if (connectionEstablished) {
        var object = new Object();
        object.location = location;
        object.info = contentString;
        object.deadline = date;
        socket.emit('marker set', object);
    }

}
