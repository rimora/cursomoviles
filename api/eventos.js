// EVENTOS
$(document).ready(function() {
	document.addEventListener("deviceready",function(){		
		window.location.href='#login';
			$('#regFoto').tap(function(){
			tomarfoto();
			});
	$('#regEnviar').tap(function(){		

		var nom=$('#regNom').val();
		var email=$('#regEmail').val();
		var tel=$('#regTel').val();
		var foto=$('#regFoto').attr('rel');
		if (nom!='' && email !='' && tel!='' && foto!=undefined && foto !='') {
			enviarRegistro(nom,tel,email,foto);
	/*		navigator.notification.confirm("Nombre: "+nom+"\nMail: "+email+"\nTelefono"+tel,function(botones){
		switch(botones){
		 case 1:
		  navigator.notification.beep(5);
		  break;
		 case 2:
		  navigator.notification.vibrate(500);
		  break;		
		}	
},"Titulo","Beep,Vibrar,Salir");*/
		} 
		else{
				navigator.notification.alert('Todos los campos son requeridos',null,'Error de Registro','Aceptar');
		//alert('Todos los campos son requeridos');	
			
		}
			
	});
	},false);
	
});

