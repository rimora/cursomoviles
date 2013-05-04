// Captura
function tomarfoto(){
	
// capture callback

navigator.device.capture.captureImage(function(mediaFiles){
	
    path = mediaFiles[0].fullPath;
	$('#regFoto').append('<img src="'+path+'" width="100%" />').attr('rel',path);
        // do something interesting with the file
    
	
	
	},function(error){
// capture error callback
    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
}, {limit:2});

}