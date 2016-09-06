function takePic() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        sourceType: Camera.PictureSourceType.CAMERA,
        destinationType: Camera.DestinationType.FILE_URI
    });
}

function onSuccess(imgData) {
    console.log('Image successfully taken\n');
    infoWindow.setContent('<p><b>Vi se nalazite ovde!</b><br>' +
        '<img width="80" src=' + imgData + '></p>');

    infoWindow.setPosition(new google.maps.LatLng(Latitude, Longitude));
    infoWindow.open(map);

    map.setCenter({lat: Latitude, lng: Longitude});
}

function onFail(message) {
    console.log('Failed to load picture because: ' + message);
}