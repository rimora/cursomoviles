// EVENTOS
$(document).ready(function() {
	document.addEventListener("deviceready",function(){	

	/*	var db = window.openDatabase("Sardel", "1.0", "SardelDB", 1000000);
    $('#clientes').click(function() {
		db.transaction(consulta,errorconsulta,listo);
		
	
	});*/	
	 //$('#divnumcobros').hide(); 
	 	
	 var longitud=0;
	window.localStorage.clear();
	//obtenerconse();//funcion que almacena localmente los consecutivos de documentos actuales.funcion en configuraciones.js
	window.localStorage.setItem("saldo",0);	
	window.localStorage.setItem("clave",'');	
	window.localStorage.setItem("ruta","S04");
	window.localStorage.setItem("bodega","K01");
	window.localStorage.setItem("sioperacion",'');
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
				  obtenerconse();//funcion que almacena localmente los consecutivos de documentos actuales.funcion en configuraciones.js
				  //$.mobile.changePage($("#datoscli"));	  			  				  
               });			   
			  
	$("#bclientes").tap(function() { 
                 //var clavecli = $(this).attr("id");
				 //botón clientes, genera lista con los clientes del día lunes
				  //alert ('llama a mostrar clientes');
				  $("#divclientes").hide();
				  window.location.href='#pclientes';				                    
				  mostrarclientes("Lunes");
				  //$("select#menu").val("Lunes").selectmenu("refresh");   
				  $("select#menu").val("Lunes");   
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
			   
	//*****PAGINA DATOS DEL CLIENTE *******
	$("#fotopros").tap(function() { 
				$('#fotopros').empty();
                tomarfotopros();  
     });	
	$("#bguardapros").tap(function() { 
                 var nom =  $("#prosnombre").val();
				 var cal =  $("#proscalle").val();
				 var ent=  $("#prosentre").val();
				 var num =  $("#prosnumero").val();
				 var tel =  $("#prostel").val();
				 var cel =  $("#proscel").val();
				 var col =  $("#proscol").val();
				 var edo =  $("#prosedo").val();
				 var mun =  $("#prosmun").val();
				 var loc =  $("#prosloc").val();
				 var nota =  $("#prosnotas").val();
				 var foto=$('#fotopros').attr('rel');			 
				 
				if (nom.length==0 || cal.length==0 || ent.length==0 || num.length==0 || tel.length==0 || cel.length==0 || col.length==0 || edo.length==0 || mun.length==0 || foto== undefined || foto =='' ){
					
				navigator.notification.alert('Faltan datos Obligatorios *',null,'Faltan Datos','Aceptar');					
					
				}else
				{
				  navigator.notification.alert('Prospecto Guardado',null,'Datos Guardados','Aceptar');					
				  $.mobile.changePage($("#pclientes"));	  			  				  
				}
				 
				  
     });
	 $("#fotoife").tap(function() { 
	 			$("#fotoife").empty();
                tomarfotoife();  
     });	
	 $("#fotoneg").tap(function() { 
	 			$("#fotoneg").empty();
                tomarfotoneg();  
     });
	$("#bguardacli").tap(function() { 
                 var nom =  $("#clinombre").val();
				 var ife =  $("#cliife").val();
				 var cal =  $("#clicalle").val();
				 var ent=  $("#clientre").val();
				 var num =  $("#clinumero").val();
				 var tel =  $("#clitel").val();
				 var cel =  $("#clicel").val();
				 var col =  $("#clicol").val();
				 var edo =  $("#cliedo").val();
				 var mun =  $("#climun").val();
				 var loc =  $("#cliloc").val();
				 var nota =  $("#clinotas").val();
				 //var fotoife=$('#fotoife').attr('rel');			 
				 var fotoneg=$('#fotoneg').attr('rel');			 
				 
				if (nom.length==0 || ife.length==0 || cal.length==0 || ent.length==0 || num.length==0 || tel.length==0 || cel.length==0 || col.length==0 || edo.length==0 || mun.length==0 || fotoneg== undefined || fotoneg =='' ){
					
				navigator.notification.alert('Faltan datos Obligatorios *',null,'Faltan Datos','Aceptar');					
					
				}else
				{
				  navigator.notification.alert('Cliente Guardado',null,'Datos Guardados','Aceptar');					
				  $.mobile.changePage($("#pclientes"));	  			  				  
				}
				 
				  
     });		
	
   $("#bvisita").tap(function() {    //inicia visita               				  
				  var cliente=window.localStorage.getItem("clave");//Obtiene clave del cliente 
				  if (cliente==''){
					  navigator.notification.alert('Debe seleccionar un cliente',null,'Error al iniciar visita','Aceptar');					
					  return false;
				  }
				  else{
				  eliminatempcob();
				  window.location.href='#pcobros';
				  $("#divencnum").hide();
				  $("#divnumcobros").hide();
				  $("#labelencpcobros").empty();	
				  $("#labelencpcobros").append("Cobrar Facturas pendientes del cliente: "+cliente);				  				 				  				  
				  copiatemcobros(cliente);//copia a tabla temporal las facturas pendientes de cobro. funcion de archivo cobros.js
				  //listafacturaspend(cliente);//lista las facturas pendientes de cobro, del cliente seleccionado				  				  
				  guardafechaactual();
				  iniciavisita();//guarda registro de fecha y hora de visita.funcion en almacenamiento.js			  
				  }
				  			  
				   
     });			   			   
    $("#menu").bind("change",function(event,ui){
		//alert($("#menu").val());
		window.localStorage.setItem("clave",'');//limpia clave de cliente
	    mostrarclientes($("#menu").val());	
		
		$("#divclientes").hide();		
	});
		
    $("#listaclientes li").live('click',function(){
		          //al seleccionar un cliente de la lista, muestra sus datos
                  var clavecli = $(this).attr("id");
				  
				  //alert (clavecli);
				  $('#divclientes').show();				  
				  mostrarcliente(clavecli);
				  
				 // window.location.href='#datoscli';
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
	
//****PAGINA DE OPERACIONES ******
		 $("#regresarop").tap(function() {                   				  				  
				  var operaciones=window.localStorage.getItem("sioperacion");//devuelve S si realizó alguna operacion de venta, cobro, devolucion.
				  if (operaciones=='S'){
					  window.location.href='#pvisita';					  
					  configuravisita();
				  }
				  else{
					  navigator.notification.confirm('¿Deseas Registrar la Visita?',onConfirm,'Registrar Visita','SI,NO');// botones 
					  function onConfirm(button) {
						if (button==1){			
							window.location.href='#pvisita';					  
							configuravisita();
        		  		 }
						 else{
							 window.location.href='#pclientes';					  
							 return false;
						 }
					  }//if (button==1){
				  }		  
					 
     	});//$("#regresarop").tap(function()		
//****PAGINA DE REGISTRO VISITA******
		 $("#bguardavisita").tap(function() {                   				  				  	
			var razon=$("#menurazonv").val();	
			var notas=$("#obsvisita").val();				
			var cliente=window.localStorage.getItem("clave");//recuperamos la clave del cliente
			var ruta=window.localStorage.getItem("ruta");//recuperamos la clave del cliente
			var visitaini=$("#visitaini").val();	
			var visitafin=$("#visitafin").val();	
			alert(razon);
			if (razon=='Razon') {
				navigator.notification.alert('Debe indicar razon de visita',null,'Error al guardar visita','Aceptar');					
			}else{
				navigator.notification.confirm('¿Deseas Registrar la Visita?',onConfirm,'Registrar Visita','SI,NO');// botones 
					  function onConfirm(button) {
						if (button==1){			
							guardavisita(cliente,visitaini,visitafin,visitaini,notas,razon,ruta);
							window.location.href='#pclientes';					  

        		  		 }
						 else{							 
							 return false;
						 }
					  
				  	 }		  
			
			
			
			 }
     	});//$("#bguardavisita").tap(function() {                   				  				  	
//**********VENTAS************	
$("#bventa").tap(function() {		 	 
                 var cliente=window.localStorage.getItem("clave");
				 //limpia los grid
				 $("#divnumventas").hide();
				 $('#divtotalesv').hide();  
				 $("#divventas").show();                 
				                
				  //limpiartemp();
				  validasug(cliente);//valida si tiene facturas o pedidos pendientes de imprimir para insertar o no pedido sugerido en caso de tenerlo
			 	  // mostrarpedido();
				  // mostrarfactura();
				  
});	

//$("a.clasep").live('click',function(){//al modificar linea de pedido
$("#gridpedido").delegate('.clasep','click',function(){//al modificar linea de pedido

                  var articulo = $(this).attr("name");
				  var desc=$(this).attr("id");
				  $('#etiartv').empty();
				  $('#etiartv').append(desc);
				  
				  //alert (articulo);
				   $('#cantv').val('');
				  $('#divnumventas').show();
				  $('#divtotales').hide();
				 guardaarticulo(articulo);//almacena localmente la clave de articulo 	
    });
$("#gridpedido").delegate('.descv','click',function(){//al dar click en la descripcion de un artículo, debe mostrar la ficha del mismo
                  var articulo = $(this).attr("name");				  
				  fichaarticulo(articulo);
				  window.location.href='#pficha';	
    });
$("#beliminarp").tap(function() {	
                 var cliente=window.localStorage.getItem("clave");
	function onConfirm(button) {
		if (button==1){			
			$('input:checkbox.checkv').each(function () {
           		if (this.checked) {
             	  //alert($(this).attr("name"));
				  //alert($(this).attr("value"));
				  
				 
					eliminatemppedido($(this).attr("name"),cliente)				    
				  
			   //alert($("#"+"c"+$(this).val()).val());
          		 }
				 else{
					//alert('no checado'); 
					//alert($(this).attr("name"));
				  	//alert($(this).attr("value"));
				 }
			});//$('input:checkbox.clasep').each(function () {						
					mostrarpedido(cliente);
					$('#divnumventas').hide();
				 	$('#divtotales').show();				    			

		}//if (button==1){
	}			 
    navigator.notification.confirm('¿Estas seguro de eliminar los registros seleccionados?',     // mensaje (message)
    onConfirm,      // función 'callback' a llamar con el índice del botón pulsado (confirmCallback)
    'Eliminar del pedido',            // titulo (title)
        'SI,NO'       // botones (buttonLabels)
    );
				  //$.mobile.changePage($("#datoscli"));	  			  				  
});
$("#bguardav").tap(function() { 
                 //var clavecli = $(this).attr("id");				 
		var cliente=window.localStorage.getItem("clave");			  
		var total=Number(window.localStorage.getItem("totalv"));
		var disp=Number(window.localStorage.getItem("dispv"));
		if (total<=0 || disp<0){
		   navigator.notification.alert('Total en cero o Disponible insuficiente para venta',null,'Error al guardar venta','Aceptar');										 
		   return false;
		}
		else{
		   navigator.notification.confirm('¿Confirma Guardar la Venta ?',onConfirm,'Guardar Venta','SI,NO'); 					 
		}			  
		function onConfirm(button) {
			if (button==1){
				guardarventa(cliente,'comentarios');		
				window.location.href='#poperaciones';
			}//if (button==1){
		}
});
$("#lcatalogo").delegate('.listart','click',function(){//al seleccionar un articulo de la lista
//$("#lcatalogo li").live('click',function(){
                  var cliente=window.localStorage.getItem("clave");			  
				  var articulo = $(this).attr("id");				  				  
				  existeenpedido(articulo,cliente);
});	
$("#lcatalogo").delegate('.fichaart','click',function(){//al seleccionar el boton de buscar en la lista del catalogo para mostrar ficha                  
				  var art= $(this).attr("id");				  
				  var longitud=art.length;				  
				  var articulo=art.substr(1,(longitud-1));
				  fichaarticulo(articulo);
				  window.location.href='#pficha';			  
				  //existeenpedido(articulo,cliente);
});	
$("#bgenerav").tap(function() { //boton aceptar del catalogo
                 //var clavecli = $(this).attr("id");
				 //muestra el pedido 
     			var cliente=window.localStorage.getItem("clave");			  
				mostrarpedido(cliente);  
				$("#divnumventas").hide();
				$('#divtotales').show(); 	
				  
				  
});	
$("#bcatalogo").tap(function(){
                 //var clavecli = $(this).attr("id");
				 //limpia los grid	
				  var cliente=window.localStorage.getItem("clave");			                    
				  gridvalorescat(cliente);
				   $('#divnumcat').hide();
				  window.location.href='#pcatalogo';
});
$("#bbuscaart").tap(function() { //boton buscar articulo en catalogo
                 //var clavecli = $(this).attr("id");
				 //muestra el pedido 
     			var criterio=$('#buscaart').val();			  				
				armacatalogo(criterio);				  
				  
});	


	 //*****D E V O L U C I O N E S *****
	 $("#bdevoluciones").tap(function() {                   
				  //limpiartemp();
				  window.location.href='#phistfac';
				  listafacturas();
				  eliminatempdev();
				   
     });	
	 $("#listahistfac li").live('click',function(){
		          //al seleccionar una factura de la lista, muestra los articulos
                  var factura = $(this).attr("id");
				  //alert (clavecli);
				  window.location.href='#pdethistfac';
				  $("#gridartdev").empty();	
				  $("#obsgendev").val('');
				  guardafactura(factura);//almacena localmente el numero de factura	
				  copiadethistempd();//copia a tabla temporal los renglones de la factura a devolver
				  mostrarhistfac(factura);//muestra el grid con los detalles de los artículos de factura
				  guardafechaactual();
				  
				  //$.mobile.changePage($("#datoscli"));	  			  				  
    });
	$("a.clasedev").live('click',function(){//al modificar linea de devolución.
                  var linea = $(this).attr("name");//el nombre tiene el numero de linea que corresponde al articulo en la tabla de DETHISFAC
				 /* var id = $(this).attr("id");
				  var longitud=id.length;
				  var posicion = id.indexOf('*'); 
				  var cantidad=Number(id.substring(posicion+1));*/
				 guardaarticulo(linea);//almacena localmente la linea, usando la función que guarda el articulo
				 window.location.href='#pcantidaddev';//muestra dialogo para indicar cantidad a modificar y observaciones.
				 mostrarddev(linea);
				 
				
    });
	$("#bcantidaddev").tap(function(){//boton aceptar del cuadro de dialogo
                 //var cantidad=$('#scantidad').attr('Val');
				 var cantidad=Number($('#cantidaddev').val());
				 var observa=$('#obsrendev').val()
				 //alert('observa '+observa);
				  //alert (cantidad);
				  if (cantidad<0){
					   navigator.notification.alert('Debe indicar cantidad valida',null,'Error Indicando Cantidad','Aceptar');					
					  
				  }
				  else
				  {
				    //obtiene el articulo pulsado en la lista
    				var linea = window.localStorage.getItem("articulo");
	     			//alert (cantidad);	  
					insertalindev(linea,cantidad,observa);					
    				 //alert('despues de llamada modificarlineap');
					 //mostrarpedido();
				  }
    });
	$("#regresardedev").tap(function(){
                function onConfirm(button) {
					if (button==1){
						 eliminatempdev();
						 window.location.href='#phistfac';
			
					}//if (button==1){
				}			 
    	navigator.notification.confirm('Se perderán los datos no guardados',     // mensaje (message)
	    onConfirm,      // función 'callback' a llamar con el índice del botón pulsado (confirmCallback)
    	'Generar Devolución',            // titulo (title)
        'ACEPTAR,CANCELAR'       // botones (buttonLabels)
	    );
    }); 
	$("#bguardadev").tap(function(){
                function onConfirm(button) {
					if (button==1){
						 var observagen=$("#obsgendev").val();
						 guardadev(observagen);//guarda la devolución.						 
						 window.location.href='#phistfac';
						 eliminatempdev();
			
					}//if (button==1){
				}			 
    	navigator.notification.confirm('¿Desea terminar y guardar la devolución?',     // mensaje (message)
	    onConfirm,      // función 'callback' a llamar con el índice del botón pulsado (confirmCallback)
    	'Guardar Devolución',            // titulo (title)
        'SI,NO'       // botones (buttonLabels)
	    );
    });  
	 $("#probarfunciones").tap(function(){
                function onConfirm(button) {
					if (button==1){						 
						alert('antes de llamar a f1');
						f1();					 
						alert('despues de llamar a f1');
					}//if (button==1){
				}			 
    	navigator.notification.confirm('¿Deseas terminar y guardar la devolución?',     // mensaje (message)
	    onConfirm,      // función 'callback' a llamar con el índice del botón pulsado (confirmCallback)
    	'Guardar Devolución',            // titulo (title)
        'SI,NO'       // botones (buttonLabels)
	    );
    });  	
  
	
 //*****C O B R O S *****	 
	  $("#bcobros").tap(function() {                   				  
				  var cliente=window.localStorage.getItem("clave");//Obtiene clave del cliente 
				  window.location.href='#pcobros';
				  $("#divencnum").hide();
				  $('#divnumcobros').hide();
				  $("#labelencpcobros").empty();	
				  $("#labelencpcobros").append("Cobrar Facturas pendientes del cliente: "+cliente);				  				 				  
				  eliminatempcob();
				  copiatemcobros(cliente);//copia a tabla temporal las facturas pendientes de cobro. funcion de archivo cobros.js
				  //listafacturaspend(cliente);//lista las facturas pendientes de cobro, del cliente seleccionado				  				  
				  guardafechaactual();
				  			  
				   
     });
	  $("#bpagarimp").tap(function() {  //indicar importe para distribuir entre facturas                                                 
		  $('#divnumcobros').show(); //muestra el teclado numerico con el input                        
		  $("#divencnum").empty();
		  var html='<label style="font-weight: bold">Distribuir Importe en Facturas</label>';    
		  $("#divencnum").append(html); 	
          $('#importecobro').val('');
          $("#divencnum").show();
		  window.localStorage.setItem("tipo","I");
		  longitud=8;
		  
       });
	    $("#blimpiar").tap(function() { //limpiar la columna "A pagar" del grid que muestra las facturas pendientes de cobro
		  var cliente=window.localStorage.getItem("clave");//Obtiene clave del cliente                                                   
          $('#divnumcobros').hide();//oculta el teclado numerico con el input                         
		   eliminatempcob();
		   copiatemcobros(cliente);
		   //listafacturaspend(cliente);//lista las facturas pendientes de cobro, del cliente seleccionado			    
		   $("#divencnum").hide();
       });
	   $("#bcopiarsaldo").tap(function() { //limpiar la columna "A pagar" del grid que muestra las facturas pendientes de cobro
	       var cliente=window.localStorage.getItem("clave");//Obtiene clave del cliente 
	       $('#divnumcobros').hide();//oculta el teclado numerico con el input
		   $("#divencnum").hide(); 
		   eliminatempcob();
	       copiatemcobros(cliente,'S');//copia a tabla temporal las facturas pendientes de cobro. funcion de archivo cobros.js
		   
		   	
       });	   
	 $("a.clasecob").live('click',function(){//para indicar importe a pagar de la factura
                  var factura = $(this).attr("name");//el nombre tiene el numero de documento en la tabla PENCOBRO
				 /* var id = $(this).attr("id");
				  var longitud=id.length;
				  var posicion = id.indexOf('*'); 
				  var cantidad=Number(id.substring(posicion+1));*/				 
				 //window.location.href='#pimportecob';//muestra dialogo para indicar cantidad a modificar y observaciones.
				 $('#divnumcobros').show();
				 longitud=8;
				 mostrardcob(factura);//muestra dialogo de cobro				
				 guardafactura(factura);//almacena localmente el numero de factura
				
    });
	$("a.clasenotcob").live('click',function(){//para mostrar las notas de la factura seleccionada
                  var factura = $(this).attr("name");//el nombre tiene el numero de documento en la tabla PENCOBRO
				 /* var id = $(this).attr("id");
				  var longitud=id.length;
				  var posicion = id.indexOf('*'); 
				  var cantidad=Number(id.substring(posicion+1));*/				 
				 //window.location.href='#pimportecob';//muestra dialogo para indicar cantidad a modificar y observaciones.
				 $('#divnumcobros').hide();
				 mostrarnotascob(factura);//muestra dialogo de cobro				
				 
				
    });
	$("#bcantidadcob").tap(function(){//boton aceptar del cuadro de dialogo
                 //var cantidad=$('#scantidad').attr('Val');
				 var cantidad=Number($('#cantidadcob').val());				 				 
				  //alert (cantidad);
				  if (cantidad<0){
					   navigator.notification.alert('Debe indicar cantidad valida',null,'Error Indicando Cantidad','Aceptar');					
					  
				  }
				  else
				  {
				    //obtiene el articulo pulsado en la lista
    				var factura = window.localStorage.getItem("factura");
	     			//alert (cantidad);	  
					insertacobro(factura,cantidad);	//actualiza cantidad a pagar de factura en tabla temporal de fac pend de cobro.Funcion en cobros.js				
    				 //alert('despues de llamada modificarlineap');
					 //mostrarpedido();
				  }
    });
	$("#regresardecob").tap(function(){
                function onConfirm(button) {
					if (button==1){						 
						 window.location.href='#poperaciones';
			
					}//if (button==1){
				}			 
    	navigator.notification.confirm('Se perderán los datos no guardados',     // mensaje (message)
	    onConfirm,      // función 'callback' a llamar con el índice del botón pulsado (confirmCallback)
    	'Generar Cobro',            // titulo (title)
        'ACEPTAR,CANCELAR'       // botones (buttonLabels)
	    );
    }); 
	
	$("#baceptarcob").tap(function() {                   				  
	            var saldofac=Number(window.localStorage.getItem("saldofac")); //saldo nuevo de facturas, guardado en funcion listafacturaspend de cobros.js
				var abono=Number(window.localStorage.getItem("abono")); //cantidad a pagar, guardada en funcion listafacturaspend de cobros.js
				if (abono==0){
					 navigator.notification.alert('Debe indicar abono para alguna factura',null,'Cantidad abonada igual a CERO','Aceptar');
					
				}
				 else{
					window.location.href='#paplicobros';									 	
					guardaefectivo(0);//inicia valor de cobrado en efectivo
					guardacheque(0);//inicia valor de cobrado en cheque				 	  					
				  	aplicacionpago(saldofac,abono);//muestra grid con datos de lo abonado y saldo pendiente de facturas 
					$('#divencaplic').show();
					$('#divcheques').hide();
					$('#divnumaplicob').hide();					
					eliminachequexrecibo();//elimina los cheques temporales.
					//gridtotalescob();
				 }
				  
				  
     });
	 $("#befectivo").tap(function() {//boton para cobrar con efectivo.                   				  
	 			$('#divnumaplicob').show();
				$('#importeapli').val('');
				$('#divcheques').hide();
				$('#etinum').empty();
				$('#etinum').append('Importe:');					
				window.localStorage.setItem("tipocob","E");
     });
	 $("#bcheque").tap(function() {//boton para cobrar con cheque	 			
				  poblarcuenta();	         				
				$('#divcheques').show();
				$('#divnumaplicob').show();
				$('#importeapli').val('');		
				//window.location.href='#pcheque';								
				//$("#numcuenta").val("");  				 
				poblarcheques();				
     });
	 $("#bnumche").tap(function() {//boton para cobrar con efectivo.                   				  	 															
				$('#divnumaplicob').show();
				$('#etinum').empty();
				$('#etinum').append('Numero:');		
				$('#importeapli').val('');		
				window.localStorage.setItem("tipocob","N");
				longitud=4;
				//$("#numcuenta").val("");  				 
     });
	 $("#bmontoche").tap(function() {//boton para cobrar con efectivo.                   				  	 															
				$('#divnumaplicob').show();
				$('#etinum').empty();
				$('#etinum').append('Importe:');	
				$('#importeapli').val('');			
				window.localStorage.setItem("tipocob","C");
				longitud=8;
				//$("#numcuenta").val("");  				 
     });
	 $("#baceptaraplic").tap(function() {                   				  
	        function onConfirm(button) {
					if (button==1){	
					   var pendiente=window.localStorage.getItem("pendiente");
					  // alert(pendiente);
					     guardacob();	//prepara datos para guardar las tablas cabecera y detalles de recibos.funcion en cobros.js 				 
						 window.location.href='#poperaciones';
			
					}//if (button==1){
				}			 
    	navigator.notification.confirm('¿Deseas terminar y guardar el Cobro?',     // mensaje (message)
	    onConfirm,      // función 'callback' a llamar con el índice del botón pulsado (confirmCallback)
    	'Guardar Cobro',            // titulo (title)
        'ACEPTAR,CANCELAR'       // botones (buttonLabels)
	    );    			  
				  
     });
	 $("#regresardeaplic").tap(function(){
                function onConfirm(button) {
					if (button==1){						 
						 window.location.href='#pcobros';
			
					}//if (button==1){
				}			 
    	navigator.notification.confirm('Se perderán los datos no guardados',     // mensaje (message)
	    onConfirm,      // función 'callback' a llamar con el índice del botón pulsado (confirmCallback)
    	'Generar Cobro',            // titulo (title)
        'ACEPTAR,CANCELAR'       // botones (buttonLabels)
	    );
    });
	 
	 $("#bagregacheque").tap(function() {                   				  
	        var nche=$("#numcheque").val();  			  
			//var ncta=$("#numcuenta").val();  			  
			var banco=$("#menucuentab").val();
			var monto=$("#monto").val();
		    var pendiente=saldopendiente();//obtiene el saldo pendiente de distribuir en los tipos de cobro
			 //alert(monto);
			 //alert(pendiente);

			if (nche=="" || banco=="Banco" || monto==0){
				navigator.notification.alert('Debe indicar numero de cheque,seleccionar banco y monto válidos',null,'Faltan Datos','Aceptar');				 	
				$("#monto").focus();			
				return false;
			}
			if (monto>pendiente || monto<0){
				navigator.notification.alert('La cantidad indicada excede el saldo pendiente por abonar o es inválida',null,'Cantidad inválida','Aceptar');
				$("#monto").focus();
				$("#monto").val(0); 
			}			
			else{
				insertarcheque(nche,"0",banco,monto);			
				$("select#menucuentab").val("Banco").selectmenu("refresh"); 
				$("#numcheque").val("");
				//$("#numcuenta").val("");  
				$("#monto").val(0); 
				poblarcheques();
			}
     });
	$("#beliminarche").tap(function() {                   				  
	       	function onConfirm(button) {
				if (button==1){
					$('input:checkbox.clasech').each(function () {
        		   		if (this.checked) {
						   //alert('nombre '+$(this).attr("name")+' valor '+$(this).attr("value"));
						   eliminacheque($(this).attr("name"))				    				   
						   
						   //alert($("#"+"c"+$(this).val()).val());
    		      		 }
					});//$('input:checkbox.clasep').each(function () {	
					poblarcheques();
					gridtotalescob();
				}//if (button==1){
			}			 
    	navigator.notification.confirm('¿Estas seguro de eliminar los registros seleccionados?',     // mensaje (message)
	    onConfirm,      // función 'callback' a llamar con el índice del botón pulsado (confirmCallback)
    	'Eliminar Cheque',            // titulo (title)
        'SI,NO'       // botones (buttonLabels)
    );
				 
				  
  }); 
  $("#salirdecheque").tap(function(){
    	
  }); 
//**********D E P O S I T O S	 *************
 $("#bdepositos").tap(function() {                   				  				  
				  window.location.href='#pdepositos';
				  listarecibos();
				  poblarcuentadep();
				  guardafechaactual();
				  $("#numficha").val(""); 
				  $("#totaldep").val(0); 
				  $("#obsdep").val("");
  });
  $("#regresardep").tap(function(){
                function onConfirm(button) {
					if (button==1){						 
						 window.location.href='#page';
			
					}//if (button==1){
				}			 
    	navigator.notification.confirm('Se perderán los datos no guardados',     // mensaje (message)
	    onConfirm,      // función 'callback' a llamar con el índice del botón pulsado (confirmCallback)
    	'Generar Deposito',            // titulo (title)
        'ACEPTAR,CANCELAR'       // botones (buttonLabels)
	    );
    }); 
	$("#bguardadep").tap(function(){
		var recibos='';
		var banco=$("#menucuentad").val();		
		guardafechaactual();//guarda en memoria la fecha con hora, actuales
		var fecha= window.localStorage.getItem("fechahora");//recuperamos la nueva fecha y hora actual
		var longitud=banco.length;
		

                function onConfirm(button) {
					if (button==1){						 						 
						 if ($("#numficha").val().length==0 || $("#totaldep").val()==0 || banco=='Banco'){
							 navigator.notification.alert('Debe indicar numero de ficha,banco y seleccionar algun recibo',null,'Faltan Datos','Aceptar');
							 return false;
							 
						 }
						 else{
							 var pos=banco.indexOf("@");
						     var codigo= banco.substr(0,(pos));
					         var cuenta=banco.substr(pos+1,longitud-(pos+1));
							 $('input:checkbox.clasedep').each(function () {
        		   				if (this.checked) {
						 		  //alert('nombre '+$(this).attr("name")+' valor '+$(this).val()+'banco '+banco+' codigo '+codigo+' cuenta '+cuenta);
								  
						   		guardadep($(this).attr("name"),$("#numficha").val())		//funcion en depositos.js		    				   
						          recibos='"'+$(this).attr("name")+'",'
						   //alert($("#"+"c"+$(this).val()).val());
    		      		 		}
							});//$('input:checkbox.clasep').each(function () {								 
							 //alert(recibos);
							 guardaencdep(codigo,cuenta,$("#numficha").val(),fecha,$("#totaldep").val(),$("#obsdep").val())
							 
						 }				 
						 
						 window.location.href='#page';
			
					}//if (button==1){
				}			  
    	navigator.notification.confirm('¿Desea terminar el deposito?',     // mensaje (message)
	    onConfirm,      // función 'callback' a llamar con el índice del botón pulsado (confirmCallback)
    	'Generar Deposito',            // titulo (title)
        'SI,NO'       // botones (buttonLabels)
	    );
    }); 
	 $("input:checkbox.clasedep").live("change",function(event){
			//alert('entra');
		if ($(this).prop("checked")){
			var total=$("#totaldep").val();
			var importe=$(this).val();
		   //alert("checado");
		   //alert($(this).val());
		   $("#totaldep").val(Number(total)+Number(importe));
		   
	   }
	   else{
		   //alert("NO checado");
		   //alert($(this).val());	
		   var total=$("#totaldep").val();
			var importe=$(this).val();
		   //alert("checado");
		   //alert($(this).val());
		   $("#totaldep").val(Number(total)-Number(importe));
	   }
  
     });
	 //**********R E P O R T E S	 *************	
	 $("#reporte1").tap(function() {     
	               navigator.notification.alert('entra tap reporte1',null,'pruebas','Aceptar');             				  				  
				  window.location.href='#prepcobven';
				  repvencob();								  
	  });
	 $("#reporte2").tap(function() {                   				  				  
				  window.location.href='#prepcierrecob';
				  repcierrecobro();								  
	  });
	 $("#reporte3").tap(function() {                   				  				  
				  window.location.href='#prepinventario';
				  repinventario();								  
	  });
	   $("#reporte4").tap(function() {                   				  				  
				  window.location.href='#prepvisitas';
				  repvisitas();								  
	  });
	   $("#botro").tap(function() {
	       navigator.notification.alert('entra tap reporte1',null,'pruebas','Aceptar');  
           toggleWatchPosition();                             
       });
       $("#b2otro").tap(function() {                                                   
           getCurrentPosition();                          
       }); 
	   //**********TECLADO NUMERICO	USADO EN COBROS *************	
	   $("#baceptarimp").tap(function() {                                                   
	       var tipo=window.localStorage.getItem("tipo");
		   
		   var cantidad=Number($('#importecobro').val());				 				 
				  //alert (cantidad);
				  if (cantidad.length==0){
					   navigator.notification.alert('Debe indicar cantidad valida',null,'Error Indicando Cantidad','Aceptar');					
					  
				  }
				  else
				  {
					  if (tipo=='I'){
						  if (cantidad==0 || cantidad.length==0 || isNaN(cantidad)){//
							navigator.notification.alert('Cantidad a pagar debe ser mayor a cero ',null,'Error Indicando Cantidad','Aceptar');						 					
							return false;				 
				 			}
						  var cliente= window.localStorage.getItem("clave");
						  pagarximp(cliente,cantidad);
			   			  window.localStorage.setItem("tipo",'O')
						  
					   }
		   			 else{
				    
    				var factura = window.localStorage.getItem("factura");
	     			//alert (cantidad);	  
					insertacobro(factura,cantidad);	//actualiza cantidad a pagar de factura en tabla temporal de fac pend de cobro.Funcion en cobros.js				
					
    				 //alert('despues de llamada modificarlineap');
					 //mostrarpedido();
					 }
				  }
           $('#divnumcobros').hide(); 
		   $("#divencnum").hide(); 
		   
       }); 
	   $("#bcancelarimp").tap(function() {                                                   
           $('#divnumcobros').hide(); 
		   $("#divencnum").hide(); 
       }); 
	   $("#b1").tap(function() {  
	    var importe=$('#importecobro').val();	                                                    
          $('#importecobro').val(importe+'1');                         
       });
	   $("#b2").tap(function() {                                                   
          var importe=$('#importecobro').val();	                                                    
          $('#importecobro').val(importe+'2');                         
       });
	   $("#b3").tap(function() {                                                   
          var importe=$('#importecobro').val();	                                                    
          $('#importecobro').val(importe+'3');                         
       });
	    $("#b4").tap(function() {  
	    var importe=$('#importecobro').val();	                                                    
          $('#importecobro').val(importe+'4');                         
       });
	   $("#b5").tap(function() {                                                   
          var importe=$('#importecobro').val();	                                                    
          $('#importecobro').val(importe+'5');                         
       });
	   $("#b6").tap(function() {                                                   
          var importe=$('#importecobro').val();	                                                    
          $('#importecobro').val(importe+'6');                         
       });
	     $("#b7").tap(function() {  
	    var importe=$('#importecobro').val();	                                                    
          $('#importecobro').val(importe+'7');                         
       });
	   $("#b8").tap(function() {                                                   
          var importe=$('#importecobro').val();	                                                    
          $('#importecobro').val(importe+'8');                         
       });
	   $("#b9").tap(function() {                                                   
          var importe=$('#importecobro').val();	                                                    
          $('#importecobro').val(importe+'9');                         
       });
	     $("#b0").tap(function() {  
	    var importe=$('#importecobro').val();	                                                    
          $('#importecobro').val(importe+'0');                         
       });
	   $("#bpunto").tap(function() {                                                   
          var importe=$('#importecobro').val();	                                                    
          $('#importecobro').val(importe+'.');                         
       });
	    $("#blimpiarinput").tap(function() {                                                                                                                
          $('#importecobro').val('');                         
       });
	   //**********TECLADO NUMERICO	USADO EN APLICACION DE COBROS *************	
	   $("#bacepapli").tap(function() {                                                   
	       var tipocob=window.localStorage.getItem("tipocob");
           var monto = parseFloat($("#importeapli").val()); 
		   
		   if (isNaN(monto)) { 
        //entonces (no es numero) 
        	 navigator.notification.alert('Debe indicar un valor válido',null,'Cantidad inválida','Aceptar');			 
			 return false;
	       }
		  if (tipocob=='E'){  //efectivo
		   
	     //intento convertir a entero. 
    	 //si era un entero no le afecta, si no lo era lo intenta convertir 
	    		 		 
		 var pendiente1=saldopendiente();//obtiene el saldo pendiente de distribuir en los tipos de cobro
		 var pendiente=pendiente1+Number(window.localStorage.getItem("efectivo"));//aumentamos el efectivo que tenga guardado, es decir, 
		 //si es modificación del importe, se anula para tomar este nuevo importe y actualizar el abono pendiente de distribuir en efectivo y cheque.		    
			if (monto>pendiente || monto<0){
				navigator.notification.alert('La cantidad indicada excede el saldo pendiente por abonar o es inválida',null,'Cantidad inválida','Aceptar');				
				$("#importeapli").val('');
				return false;
			}
			else{
		    
        	guardaefectivo(monto); 				
			gridtotalescob();
			$('#divnumaplicob').hide(); 		    
			}	    
		}//tipocob
		else if (tipocob=='N'){
			window.localStorage.setItem("numche",$("#importeapli").val());
			$('#divnumaplicob').hide();
			
			
		}
		else if (tipocob=='C'){
			var nche=window.localStorage.getItem("numche"); 			  			
			var banco=$("#menucuentab").val();			
		    var pendiente=saldopendiente();//obtiene el saldo pendiente de distribuir en los tipos de cobro
			 //alert(monto);
			 //alert(pendiente);

			if (nche=="" || banco=="Banco" || monto==0){
				navigator.notification.alert('Debe indicar numero de cheque,seleccionar banco y monto válidos',null,'Faltan Datos','Aceptar');				 								
				return false;
			}
			if (monto>pendiente || monto<0){
				navigator.notification.alert('La cantidad indicada excede el saldo pendiente por abonar o es inválida',null,'Cantidad inválida','Aceptar');				
				$("#importeapli").val(''); 
			}			
			else{
				insertarcheque(nche,"0",banco,monto);			
				$("select#menucuentab").val("Banco").selectmenu("refresh"); 
				window.localStorage.setItem('numche',''); 
				//$("#numcuenta").val("");  				
				$('#divnumaplicob').hide();
				poblarcheques();
				gridtotalescob();
			}
			
			
			
		}
		  
		   
       }); 
	   $("#bcanapli").tap(function() {                                                   
          $('#divnumaplicob').hide(); 		   
       }); 
	   $("#b11").tap(function() { 	     
	    var importe=$('#importeapli').val();	                                                    
		  // if (importe.length<longitud){ 
          $('#importeapli').val(importe+'1');                         
		   //}
       });
	   $("#b22").tap(function() {                                                   
          var importe=$('#importeapli').val();	                                                    
		  //if (importe.length<longitud){ 
          $('#importeapli').val(importe+'2');                         
		  //}
       });
	   $("#b33").tap(function() {                                                   
          var importe=$('#importeapli').val();	                                                    
		  //if (importe.length<longitud){ 
          $('#importeapli').val(importe+'3');                         
		  //}
       });
	    $("#b44").tap(function() {  
	    var importe=$('#importeapli').val();	                                                    
          $('#importeapli').val(importe+'4');                         
       });
	   $("#b55").tap(function() {                                                   
          var importe=$('#importeapli').val();	                                                    
          $('#importeapli').val(importe+'5');                         
       });
	   $("#b66").tap(function() {                                                   
          var importe=$('#importeapli').val();	                                                    
          $('#importeapli').val(importe+'6');                         
       });
	     $("#b77").tap(function() {  
	    var importe=$('#importeapli').val();	                                                    
          $('#importeapli').val(importe+'7');                         
       });
	   $("#b88").tap(function() {                                                   
          var importe=$('#importeapli').val();	                                                    
          $('#importeapli').val(importe+'8');                         
       });
	   $("#b99").tap(function() {                                                   
          var importe=$('#importeapli').val();	                                                    
          $('#importeapli').val(importe+'9');                         
       });
	     $("#b00").tap(function() {  
	    var importe=$('#importeapli').val();	                                                    
          $('#importeapli').val(importe+'0');                         
       });
	   $("#bpunto2").tap(function() {                                                   
          var importe=$('#importeapli').val();	                                                    
          $('#importeapli').val(importe+'.');                         
       });
	    $("#blimpiarapli").tap(function() {                                                                                                                
          $('#importeapli').val('');                         
       });
 //**********TECLADO NUMERICO	USADO EN CATALOGO *************	
 		var articulo = window.localStorage.getItem("articulo");
	   $("#bacepcat").tap(function() {                                                   	       
	   	   var cliente = window.localStorage.getItem("clave");
           var cantidad = parseInt($("#cantcat").val()); 		  
		   var articulo = window.localStorage.getItem("articulo");
		   if (isNaN(cantidad)) { 
        //entonces (no es numero) 
        	 navigator.notification.alert('Debe indicar un valor válido',null,'Cantidad inválida','Aceptar');			 
			 return false;
	       }
			if (cantidad<=0){
				navigator.notification.alert('La cantidad indicada debe ser mayor a cero',null,'Cantidad inválida','Aceptar');				
				$("#cantcat").val('');
				return false;
			}
			else{			
            insertatemppedido(articulo,cantidad,cliente);
			navigator.notification.alert('Artículo Agregado',null,'Agregar Artículo','Aceptar');					
			//actualizar grid de importes
			gridvalorescat(cliente);	
			$('#divnumcat').hide();
			$('#gridprevart').empty();
			}	    
		  
		   
       }); 
	   $("#bcanapli").tap(function() {                                                   
          $('#divnumcat').hide(); 
		  $('#gridprevart').empty();
		  
       }); 
	   $("#b111").tap(function() { 	     
	    var importe=$('#cantcat').val();	                                                    
		   //if (importe.length<longitud){ 
          $('#cantcat').val(importe+'1'); 
		  previolinea(articulo,parseInt($("#cantcat").val()));
		  // }
       });
	   $("#b222").tap(function() {                                                   
          var importe=$('#cantcat').val();	                                                    
		  //if (importe.length<longitud){ 
          $('#cantcat').val(importe+'2');                     
		  previolinea(articulo,parseInt($("#cantcat").val()));    
		  //}
       });
	   $("#b333").tap(function() {                                                   
          var importe=$('#cantcat').val();	                                                    
		 // if (importe.length<longitud){ 
          $('#cantcat').val(importe+'3'); 
		  previolinea(articulo,parseInt($("#cantcat").val()));                        
		  //}
       });
	    $("#b444").tap(function() {  
	    var importe=$('#cantcat').val();	                                                    
          $('#cantcat').val(importe+'4');
		  previolinea(articulo,parseInt($("#cantcat").val()));                         
       });
	   $("#b555").tap(function() {                                                   
          var importe=$('#cantcat').val();	                                                    
          $('#cantcat').val(importe+'5');   
		  previolinea(articulo,parseInt($("#cantcat").val()));                      
       });
	   $("#b666").tap(function() {                                                   
          var importe=$('#cantcat').val();	                                                    
          $('#cantcat').val(importe+'6'); 
		  previolinea(articulo,parseInt($("#cantcat").val()));                        
       });
	     $("#b777").tap(function() {  
	    var importe=$('#cantcat').val();	                                                    
          $('#cantcat').val(importe+'7');   
		  previolinea(articulo,parseInt($("#cantcat").val()));                      
       });
	   $("#b888").tap(function() {                                                   
          var importe=$('#cantcat').val();	                                                    
          $('#cantcat').val(importe+'8'); 
		  previolinea(articulo,parseInt($("#cantcat").val()));                        
       });
	   $("#b999").tap(function() {                                                   
          var importe=$('#cantcat').val();	                                                    
          $('#cantcat').val(importe+'9');   
		  previolinea(articulo,parseInt($("#cantcat").val()));                      
       });
	     $("#b000").tap(function() {  
	    var importe=$('#cantcat').val();	                                                    
          $('#cantcat').val(importe+'0');    
		  previolinea(articulo,parseInt($("#cantcat").val()));                     
       });
	   $("#bpunto3").tap(function() {                                                   
         /* var importe=$('#cantcat').val();	                                                    
          $('#cantcat').val(importe+'.');*/
       });
	    $("#blimpiarcant").tap(function() {                                                                                                                
          $('#cantcat').val('');                         
       });
//**********TECLADO NUMERICO USADO EN VENTAS *************	
	   $("#bacepven").tap(function() {                                                   	       
           var cantidad = parseInt($("#cantv").val()); 		  
		   var articulo = window.localStorage.getItem("articulo");
		   var cliente = window.localStorage.getItem("clave");
				  //alert (cantidad);
				   if (isNaN(cantidad)) { 
       					 //entonces (no es numero) 
        	 			navigator.notification.alert('Debe indicar un valor válido',null,'Cantidad inválida','Aceptar');			 
						return false;
			       }
				  if (cantidad<=0){
					   navigator.notification.alert('Debe indicar cantidad MAYOR A CERO',null,'Error Indicando Cantidad','Aceptar');					
					  return false;
				  }
				  else
				  {
					    modificatemppedido(articulo,cantidad,cliente);
						$('#divnumventas').hide();						
						mostrarpedido(cliente);
						$('#divtotales').show(); 	
				  }
       }); 
	   $("#bcanven").tap(function() {                                                   
          $('#divnumventas').hide(); 
		  $('#divtotales').show();		   
       }); 
	   $("#b1111").tap(function() { 	     
	    var importe=$('#cantv').val();	                                                    
		   //if (importe.length<longitud){ 
          $('#cantv').val(importe+'1');                         
		   //}
       });
	   $("#b2222").tap(function() {                                                   
          var importe=$('#cantv').val();	                                                    
		  //if (importe.length<longitud){ 
          $('#cantv').val(importe+'2');                         
		  //}
       });
	   $("#b3333").tap(function() {                                                   
          var importe=$('#cantv').val();	                                                    
		 // if (importe.length<longitud){ 
          $('#cantv').val(importe+'3');                         
		  //}
       });
	    $("#b4444").tap(function() {  
	    var importe=$('#cantv').val();	                                                    
          $('#cantv').val(importe+'4');                         
       });
	   $("#b5555").tap(function() {                                                   
          var importe=$('#cantv').val();	                                                    
          $('#cantv').val(importe+'5');                         
       });
	   $("#b6666").tap(function() {                                                   
          var importe=$('#cantv').val();	                                                    
          $('#cantv').val(importe+'6');                         
       });
	     $("#b7777").tap(function() {  
	    var importe=$('#cantv').val();	                                                    
          $('#cantv').val(importe+'7');                         
       });
	   $("#b8888").tap(function() {                                                   
          var importe=$('#cantv').val();	                                                    
          $('#cantv').val(importe+'8');                         
       });
	   $("#b9999").tap(function() {                                                   
          var importe=$('#cantv').val();	                                                    
          $('#cantv').val(importe+'9');                         
       });
	     $("#b0000").tap(function() {  
	    var importe=$('#cantv').val();	                                                    
          $('#cantv').val(importe+'0');                         
       });
	   $("#bpunto4").tap(function() {                                                   
          var importe=$('#cantv').val();	                                                    
          $('#cantv').val(importe+'.');                         
       });
	    $("#blimpiarcantv").tap(function() {                                                                                                                
          $('#cantv').val('');                         
       });


  },false);//document.addEventListener("deviceready",function(){	
});//$(document).ready(function() 
			   
			   



