// Captura
function tomarfoto(){
	
// capture callback

navigator.device.capture.captureImage(function(mediafiles){
	
    path = mediaFiles[0].fullPath;
	$('#regFoto').append('<img src="'+path+'" width="100%" />');
        // do something interesting with the file
    
	
	
	},function(error){
// capture error callback
    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
}, {limit:2});

}