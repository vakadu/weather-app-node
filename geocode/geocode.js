const request = require('request');

var geocodeAddress = (address, callback) => {

    var encoddedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encoddedAddress}`,
        json: true
    }, (error, response, body) => {

        if (error){
            callback('Unable to connect to google servers');
        }
        else if (body.status === 'ZERO_RESULTS'){
            callback('Unable to find that address')
        }
        else if (body.status === 'OK'){
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        // console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
        // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
        // console.log(`Address: ${body.results[0].formatted_address}`);
        // console.log(JSON.stringify(body, undefined, 2));
        // console.log(JSON.stringify(response, undefined, 2));
        //2 is indentation you can specify how much you want
        //body is data that comes back from server like html page
        //response is how request went, status code must be 200 for success
        }
    });
}

module.exports.geocodeAddress = geocodeAddress;
//anything we put in this object is available to anything that we require
