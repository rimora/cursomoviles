// geolocalizacion
function initialize(latitud,longitud) {
				//Posición del mapa
				
				//var latlng = new google.maps.LatLng(-34.397, 150.644);
				var latlng = new google.maps.LatLng(latitud, longitud);
				var myOptions = {
					zoom: 8,
					center: latlng,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
				//Marcador
				var marker = new google.maps.Marker({
					position: latlng, 
					map: map, 
					title:"Mi posición"
				});
			}
			
function pruebalocalizacion(){
// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
navigator.geolocation.getCurrentPosition(onSuccess, onError);
/*var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};
*/

function onSuccess(p){
	
	initialize(p.coords.latitude,p.coords.longitude) ;
	
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}


	
	
	
	
	
	
}