var socket = undefined;
var connectionEstablished = false;

function setIPAddress() {
    var address = window.localStorage.getItem('ip');

    if (ValidateIPaddress(address))
    {
        if (connectionEstablished) socket.disconnect();
        socket = io.connect('http://' + address + ':55217');

        socket.on('broadcast markers', function(data) {
            AddMarker(map, data);
        });
        connectionEstablished = true;
    }
}

function ValidateIPaddress(inputText)
{
    var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if(inputText.match(ipformat))
        return true;
    else
    {
        alert("You have entered an invalid IP address!");
        return false;
    }
}