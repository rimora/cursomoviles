// JavaScript Document
function enviarRegistro(nombre,telefono,email,foto){
$.ajax({  type: "POST",  url: "http://igitsoft.com/pgtest.php",  data: "nom="+nombre+"&tel="+telefono+"&ema="+email+"&id="+disp()['id']}).done(function( msg ) {  
if (msg==1){
	//subir Foto
uploadPhoto(foto,nombre);



}else{
navigator.notification.alert("Los datos no fueron enviados correctamente",null,"Error de registro","Aceptar");	
	
}


}); 
}


function reservaHB(t,p,h,d){
$.ajax({  type: "POST",  url: "http://igitsoft.com/pgtest.php",  data: "t="+t+"&p="+p+"&h="+h+"&d="+d}).done(function( msg ) {  
if (msg==1){
	//subir Foto
	navigator.notification.alert("Reserva Realizada",function()
	{
		window.location.href="#page";
	},"Reserva","Aceptar");	




}else{
navigator.notification.alert("Error",null,"Error de registro","Aceptar");	
	
}


}); 
}
