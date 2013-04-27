// JavaScript Document
function enviarRegistro(nombre,telefono,email){
$.ajax({  type: "POST",  url: "http://igitsoft.com/pgtest.php",  data: "nom="+nombre+"&tel="+telefono+"&ema="+email+"&id="+disp()[id]}).done(function( msg ) {  alert( "Data Saved: " + msg );
if (msg==1){
navigator.notification.confirm("Datos guardados satisfactoriamente",function(botones){
	
		switch(botones){
		 case 1:
		  navigator.notification.beep(5);
		  break;
		 case 2:
		  navigator.notification.vibrate(500);
		  break;		
		}	
},"Titulo","Beep,Vibrar,Salir");



}else{
navigator.notification.alert("Los datos no fueron enviados correctamente",null,"Error de registro","Aceptar");	
	
}


}); 
	
	
	
	
}