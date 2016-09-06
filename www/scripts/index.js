

(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {

        $('#ip_submit').on('touchend', setIPAddress);
        $('#ip_address').on('input', saveIP);

        $('#datum').val(new Date().toDateInputValue());
        document.addEventListener('offline', noConnectionNotification, false);
        $('#radiusInput').on('input', savelocal);
        $('#getLocations').on('touchend', getloc);
        $('#takePicture').on('touchend', takePic);
        getMapLocation();

    }

})();

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

function savelocal() {
    window.localStorage.setItem('radius', $('#radiusInput').val());
}

function saveIP() {
    window.localStorage.setItem('ip', $('#ip_address').val());
}

function noConnectionNotification() {
    navigator.notification.alert("No internet connection\nApplication functionalities are limited", null, "Error", "OK");
}