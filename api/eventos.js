// EVENTOS
$(document).ready(function() {
	document.addEventListener("deviceready",function(){	

	/*	var db = window.openDatabase("Sardel", "1.0", "SardelDB", 1000000);
    $('#clientes').click(function() {
		db.transaction(consulta,errorconsulta,listo);
		
	
	});*/
	document.addEventListener("backbutton", function(){
			
		    return false;	
			
		}, false);
	$('#botonLogin').click(function() { 
			 	// recolecta los valores que inserto el usuario	
				var Usuario = $("#nombredeusuario").val()	
				var Pass = $("#clave").val()	  	
				if(Usuario == "r1"){

					window.location.href='#page';
		  		}else{		  		  
				alert('Usuario No Válio');
				}  	
	});
	
	$("#carga").tap(function() { 	           
                 //var clavecli = $(this).attr("id");
				  //alert ("llama a iniciar");
				  iniciar();
				  //$.mobile.changePage($("#datoscli"));	  			  				  
               });
     $("#envia").tap(function() { 
                 //var clavecli = $(this).attr("id");
				  //alert (oID);
				  insertar();
				  //$.mobile.changePage($("#datoscli"));	  			  				  
               });			   
			  
	$("#clientes").tap(function() { 
                 //var clavecli = $(this).attr("id");
				 //botón clientes, genera lista con los clientes del día lunes
				  alert ('llama a mostrar clientes');				                    
				  mostrarclientes("Lunes");
				  $("select#menu").val("Lunes").selectmenu("refresh");
				  //$.mobile.changePage($("#datoscli"));	  			  				  
               });
  /*  $("#bguardacli").tap(function() { 
	            var nombre = $("#nomnuevocli").val()	
				var empresa = $("#empnuevocli").val()	
				var rfc = $("#rfcnuevocli").val()	  	
				var direccion = $("#dirnuevocli").val()	  	
				var colonia = $("#colnuevocli").val()	  	
				var estado = $("#edonuevocli").val()	  	
				var municipio = $("#munnuevocli").val()	  	
				var telefono = $("#telnuevocli").val()	  					
				guardacliente(nombre,empresa,rfc,direccion,colonia,estado,municipio,telefono);
				 
               });*/			   
    $("#menu").bind("change",function(event,ui){
		//alert($("#menu").val());
	    mostrarclientes($("#menu").val());	
		
	});
		
    $("#listaclientes li").live('click',function(){
		          //al seleccionar un cliente de la lista, muestra sus datos
                  var clavecli = $(this).attr("id");
				  alert (clavecli);
				  mostrarcliente(clavecli);
				  //$.mobile.changePage($("#datoscli"));	  			  				  
    });
	 
	$("#depositos").tap(function() { 
                 //var clavecli = $(this).attr("id");
				  
				  llamadascxc();
				  //$.mobile.changePage($("#datoscli"));	  			  				  
     });				   
  /*
   $("#checkcli").bind("change",function(event){
				  alert($("#menu").val());
				  //llamadascxc();
				  
	   if ($("#checkcli").prop("checked")){
		   alert("checado");
		   
	   }
	   else{
		   alert("NO checado");
		   
	   }
  
     });	*/
	 $( "#colprueba" ).bind("expand",function(event)
	 {
		 alert("abre")
	 });
	 $( "#colprueba2" ).bind("expand",function(event)
	 {
		 alert("abre");
		 
		 
		 
		 
		 
		 
	 });

	  $( "#colprueba" ).bind("collapse",function(event)
	 {
		 alert("cierra")
	 });

	$("#reportes").click(function() { 	 
		var cadena="555.5";
		var saldo=0;
	//alert(Number(cadena)+1);
	
	
		 $("#gridprueba").empty();
	    	var html = "";
					 html += "<div class=ui-block-a><strong>Tipo</strong>creado por codigo.</div>";
					 html += "<div class=ui-block-b><strong>Documento</strong> El texto que se ecriba aquí se amoldará a la otra mitad de pagina.</div>";
                     html += "<div class=ui-block-c><strong>Vence</strong> El texto que se ecriba aquí se amoldará a la mitad de pagina.</div>";
					 html += "<div class=ui-block-d><strong>Saldo</strong> El texto que se ecriba aquí se amoldará a la otra mitad de pagina.</div>";
                     html += "<div class=ui-block-e><strong>Monto</strong> El texto que se ecriba aquí se amoldará a la otra mitad de pagina.</div>";

                  	 html += "<div class=ui-block-a><strong>Tipo</strong> El texto que se ecriba aquí se amoldará a la mitad de pagina.</div>";
					 html += "<div class=ui-block-b><strong>Documento</strong> El texto que se ecriba aquí se amoldará a la otra mitad de pagina.</div>";
                     html += "<div class=ui-block-c><strong>Vence</strong> El texto que se ecriba aquí se amoldará a la mitad de pagina.</div>";
					 html += "<div class=ui-block-d><strong>Saldo</strong> El texto que se ecriba aquí se amoldará a la otra mitad de pagina.</div>";
                     html += "<div class=ui-block-e><strong>Monto</strong> El texto que se ecriba aquí se amoldará a la otra mitad de pagina.</div>";
			$("#gridprueba").append(html);  

		});

$("#bmodificarp").tap(function() { 
                 //var clavecli = $(this).attr("id");
				 
		$('input:checkbox.clasep').each(function () {
			var contador=0;
           if (this.checked) {
               alert($(this).attr("name"));
			   contador++;
			   var articulo=$(this).attr("name");
			   //alert($("#"+"c"+$(this).val()).val());
           }		   
		});//$('input:checkbox.clasep').each(function () {
			alert(contador);
		if (contador>1) {
		   navigator.notification.alert('Solo debe seleccionar un articulo',null,'Error Modificando Pedido','Aceptar');					
		}
		if (contador==1) {
			 alert(articulo);
		     guardaarticulo(articulo);//almacena localmente la clave de articulo 					 
			 window.location.href='#pmodcantidadp';
		}	
		
				  //$.mobile.changePage($("#datoscli"));	  			  				  
});
$("#beliminarp").tap(function() { 
                 //var clavecli = $(this).attr("id");				 
	function onConfirm(button) {
		if (button==1){
			$('input:checkbox.clasep').each(function () {
           		if (this.checked) {
             	  alert($(this).attr("name"));
				  alert($(this).attr("value"));
				   eliminatemppedido($(this).attr("name"))				    
			   //alert($("#"+"c"+$(this).val()).val());
          		 }
			});//$('input:checkbox.clasep').each(function () {	
			mostrarpedido();
		}//if (button==1){
	}			 
    navigator.notification.confirm('¿Estas seguro de eliminar los registros seleccionados?',     // mensaje (message)
    onConfirm,      // función 'callback' a llamar con el índice del botón pulsado (confirmCallback)
    'Eliminar del pedido',            // titulo (title)
        'SI,NO'       // botones (buttonLabels)
    );
				  //$.mobile.changePage($("#datoscli"));	  			  				  
});
$("#beliminarf").tap(function() { 
                 //var clavecli = $(this).attr("id");
		function onConfirm(button) {
		if (button==1){
			$('input:checkbox.clasef').each(function () {
           		if (this.checked) {
				   eliminatempfactura($(this).attr("name"),Number($(this).attr("value")))				    
			   //alert($("#"+"c"+$(this).val()).val());
          		 }
			});//$('input:checkbox.clasep').each(function () {	
			mostrarfactura();
		}//if (button==1){
	}			 
    navigator.notification.confirm('¿Estas seguro de eliminar los registros seleccionados?',     // mensaje (message)
    onConfirm,      // función 'callback' a llamar con el índice del botón pulsado (confirmCallback)
    'Eliminar de factura',            // titulo (title)
        'SI,NO'       // botones (buttonLabels)
    );
				  //$.mobile.changePage($("#datoscli"));	  			  				  
});


	$("#bpruebas").tap(function() { 	
     //llama a funcion que prepara las tablas temporales, insertando el articulo y cantidad
	//alert($("#scantidad").val());	
	
	//preparadetalletemp(window.localStorage.getItem("articulo"),$("#scantidad").val())
	  alert('boton pruebas2');
      alert(consultaexis("ADE-04"));
	  insertatempfactura("ADE-04",5);
      iniciar();
	});
	$("#lcatalogo li").live('click',function(){
                  var articulo = $(this).attr("id");
				 // alert (articulo);
				 existeenpedido(articulo);
    });
	$("#botoncantidad").tap(function(){
                 //var cantidad=$('#scantidad').attr('Val');
				 var cantidad=$('#scantidad').val();
				  alert (cantidad);
				  if (cantidad<=0){
					  alert ('No es posible indicar cantidad cero');
					  
				  }
				  else
				  {
				    //obtiene el articulo pulsado en la lista
    				var articulo = window.localStorage.getItem("articulo");
	     			//alert (articulo);	  
					 consultaexis(articulo,cantidad);
				  }
    });
	$("#botonmodcantidadp").tap(function(){
                 //var cantidad=$('#scantidad').attr('Val');
				 var cantidad=$('#modcantidadp').val();
				  //alert (cantidad);
				  if (cantidad<=0){
					   navigator.notification.alert('Debe indicar cantidad MAYOR A CERO',null,'Error Indicando Cantidad','Aceptar');					
					  
				  }
				  else
				  {
				    //obtiene el articulo pulsado en la lista
    				var articulo = window.localStorage.getItem("articulo");
	     			alert (cantidad);	  
					 modificatemppedido(articulo,cantidad);
					 mostrarpedido();
				  }
    });
	$("#guardapros").tap(function() { 
                 //var clavecli = $(this).attr("id");
				  
				 alert('Prospecto Guardado');
				  $.mobile.changePage($("#pclientes"));	  			  				  
				  
     });	
	 $("#bgenerav").tap(function() { 
                 //var clavecli = $(this).attr("id");
				 //muestra el pedido o factura armados				 
				  mostrarpedido();
				  mostrarfactura();
				  
     });	
	 $("#bventa").tap(function() { 
                 //var clavecli = $(this).attr("id");
				 //limpia los grid
                  $("#gridpedido").empty();
				  $("#gridfactura").empty();
				  limpiartemp();
				  sugerido();
				  //insertatempfactura("ADE-04",50);
				  
     });	
	 $("#bcatalogo").tap(function(){
                 //var clavecli = $(this).attr("id");
				 //limpia los grid
                  armacatalogo();
				  
     });
	 $("#binicializar").click(function(){
                 //var clavecli = $(this).attr("id");
				 //limpia los grid
                  pruebalocalizacion();
				  
     });
	 
	 
	 
  },false);//document.addEventListener("deviceready",function(){	
});//ultimo
			   
			   



