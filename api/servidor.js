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
//<input type="file" name="archivo1"