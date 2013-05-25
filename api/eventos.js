// EVENTOS
$(document).ready(function() {
	document.addEventListener("deviceready",function(){		
        if (!islogin())		
     		window.location.href='#login';
			$('#regFoto').tap(function(){
			tomarfoto();
			});
	$('#regEnviar').tap(function(){		

		var nom=$('#regNom').val();
		var email=$('#regEmail').val();
		var tel=$('#regTel').val();
		var foto=$('#regFoto').attr('rel');
		if (nom!='' && email !='' && tel!='' && foto!= undefined && foto !='') {
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
	$("#nr1 li").tap(function(){
		if ($(this).index()!=0){
		     switch($(this).index()){
				case 1:
					$("#nr2").attr("th",1);
					break;
				case 2:
					$("#nr2").attr("th",2);
					break;
				case 3:
					$("#nr2").attr("th",3);
					break;		 
				 
			 }
			window.location.href="#nr2"
		}
		$("#reserva").tap(function(){
			var th =$("#nr2").attr("th");
			var pr =$("#nr2 select:eq(0)").val();
			var hb =$("#nr2 select:eq(1)").val();
			var ds =$("#nr2 select:eq(2)").val();
			
			
		});
	});
	},false);
	
});

