// Adds a marker to the map.
function AddMarker(map, markerInfo) {
    var marker = new google.maps.Marker({
        position: markerInfo.location,
        map: map,
        icon: 'images/marker.png'
    });

    var contentString = markerInfo.info + '<br>Popust vazi do: ' + '<b>' + markerInfo.deadline + '</b>';

    var info = new google.maps.InfoWindow({
        content: contentString
    });

    marker.addListener('click', function() {
        info.open(map, marker);
    });
}
