//insertar reporte

$(document).ready(function() {
	//document.addEventListener("deviceready",function(){
		 
//	$("#regNom").val()='';
    $('#regEnviar').click(function(){
		//window.location.href='#login';
			
		if($("#regTipo").val() < 1 || $("#regTipo").val() > 2) {  
        alert("El Tipo debe ser 1 o 2 ");  
        return false;  
        }  

		
		
		var nombre = $("#regNom").val();
		var fecha =	 $("#regFecha").val();
		var tipo =	 $("#regTipo").val();
		var descripcion =	 $("#regDescri").val();
		var resumen =	 $("#regResu").val();
		var antecedente =	 $("#regAnte").val();
		var secuencia =	 $("#regSecu").val();
		var analisis =	 $("#regAn").val();
		var medida =	 $("#regMedi").val();
		var conclusion =	 $("#regCon").val();
		 
		if (nombre!='' && fecha!='' && tipo!='' && descripcion!='' && resumen!='' && antecedente!='' && secuencia!='' && 
		   analisis!='' && medida!='' && conclusion!=''){
		   
     //	var datosPassword = $("#regEmail").val()
	
  	//archivoValidacion = "http://revolucion.mobi/ejemplos/phonegap/envioFormulario/validacion_de_datos.php?jsoncallback=?"
	archivoValidacion ="http://aplicacion.netai.net/nuevo.php?jsoncallback=?"

	$.getJSON(archivoValidacion, {nombre:nombre,fecha:fecha,tipo:tipo,descripcion:descripcion,resumen:resumen,antecedente:antecedente,secuencia:secuencia,analisis:analisis,medida:medida,conclusion:conclusion})
	.done(function(respuestaServer) {
		
		//alert(respuestaServer.mensaje + "\nGenerado en: " + respuestaServer.hora + "\n" +respuestaServer.generador)		
		//alert(respuestaServer.Numreporte)
		//alert(respuestaServer.resultado)
		//if(respuestaServer.validacion == "ok"){
			if(respuestaServer.resultado >0){
		  
		 	/// si la validacion es correcta, muestra la pantalla "home"
			alert("El reporte generado es:"+respuestaServer.resultado)
			$.mobile.changePage("#page")
		  //document.getElementById('resuNombre').text(respuestaServer.Asegurador);
            
     		}else{
		  
        		  alert("El reporte no se generó")
		 // navigator.notification.alert("El reporte "+numreporte+" no existe, inténtelo de nuevo",null,"Error de Registro","Aceptar");

		  /// ejecutar una conducta cuando la validacion falla
		    }
		
	});//.getJson
	}//if validar campos obligatorios
	else{
	alert("Todos los campos son obligatorios");	
	}
		/*
		
		
		
		var nom=$('#regNom').val();
		var email=$('#regEmail').val();
		var tel=$('#regTel').val();
		if (nom!='' && email !='' && tel!='') {
			alert('CORRECTO');	*/
		 /* navigator.notification.confirm("Nombre: "+nom+"\nMail: "+email+"\nTelefono"+tel,function(botones){
			switch(botones){
			 case 1:
			  navigator.notification.beep(5);
			  break;
		 	 case 2:
	   		  navigator.notification.vibrate(500);
			  break;		
			}
          },"Titulo","Beep,Vibrar,Salir");*/
		/*} 
		else{
				//navigator.notification.alert('Todos los campos son requeridos',null,'Error de Registro','Aceptar');
		alert('Todos los campos son requeridos');	
			
		}
	*/		
	});
	//},false);
	
});

