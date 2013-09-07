// EVENTOS
$(document).ready(function() {
	document.addEventListener("deviceready",function(){	

	/*	var db = window.openDatabase("Sardel", "1.0", "SardelDB", 1000000);
    $('#clientes').click(function() {
		db.transaction(consulta,errorconsulta,listo);
		
	
	});*/	
	 //$('#divnumcobros').hide(); 
	 var articulo='';	
	 var longitud=0;
	 var cargovendedor='';
	 var now = new Date();
	 var diasemana=now.getDay();
	


	window.localStorage.clear();
	//obtenerconse();//funcion que almacena localmente los consecutivos de documentos actuales.funcion en configuraciones.js
	window.localStorage.setItem("saldo",0);	
	window.localStorage.setItem("clave",'');	
	window.localStorage.setItem("ruta","S04");
	window.localStorage.setItem("bodega","K01");
	window.localStorage.setItem("sioperacion",'');
	window.localStorage.setItem("vendedor",'9999');	
	document.addEventListener("backbutton", function(){
			
		    return false;	
			
		}, false);
	$('#botonLogin').click(function() { 
			 	// recolecta los valores que inserto el usuario	
				var Usuario = $("#nombredeusuario").val()	
				var Pass = $("#clave").val()	  	
				if(Usuario == "r1"){
					if (diasemana == 1){					
						navigator.notification.alert('Es lunes. Y vuelta a empezar',null,'Saludos','Aceptar');					
					}
					else if (diasemana == 2){
						navigator.notification.alert('Es martes, mejor que lunes',null,'Saludos','Aceptar');					
					}
					else if (diasemana == 3){
						navigator.notification.alert('Es miércoles, ¿qué tal va la semana?',null,'Saludos','Aceptar');					
					}
					else if (diasemana == 4){
						navigator.notification.alert('Es jueves, ¿cómo estás hoy?',null,'Saludos','Aceptar');					
					}
					else if (diasemana == 5){
						navigator.notification.alert('¡Por fin es viernes!',null,'Saludos','Aceptar');					
					}
					else if (diasemana == 6){
						navigator.notification.alert('Es sábado. Que tengas un buen fin de semana',null,'Saludos','Aceptar');					
					}
					obtenerconse();//funcion que almacena localmente los consecutivos de documentos actuales.funcion en configuraciones.js
					window.location.href='#page';
		  		}else{		  		  
				alert('Usuario No Válio');
				}  	
	}); 
	
	$("#carga").tap(function() { 	                           
				  iniciar();
               });
     $("#envia").tap(function() { 
				  insertar();				  
               });			   
	$("#bclientes").tap(function() {                  
				 // recibosindep();//valida que no existan recibos sin deposito, en esta funcion abre ventana de clientes en caso de que pase la validación				  
				  window.location.href='#pclientes';				  				                    
		 		  mostrarclientes(diasemana-1);
		 		 //$("select#menu").val("Lunes").selectmenu("refresh");   
		 		 $("select#menu").val(diasemana-1).selectmenu("refresh");	
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
	 $("#menu").bind("change",function(event,ui){
		//alert($("#menu").val());
		window.localStorage.setItem("clave",'');//limpia clave de cliente
		//window.localStorage.setItem("clinom",'');//limpia nombre de cliente
	    mostrarclientes($("#menu").val());	
		
		$("#divclientes").hide();		
	});	   
    $("#listaclientes li").live('click',function(){
		          //al seleccionar un cliente de la lista, muestra sus datos				  
				  window.localStorage.setItem("saldo",0);
                  var clavecli = $(this).attr("id");
				  saveidcliente(clavecli);//guarda el cliente con el que se harán operaciones				  
				  //alert (clavecli);				  			  
				  mostrarcliente(clavecli);
				  $('#divclientes').show();	
				 // window.location.href='#datoscli';
				  //$.mobile.changePage($("#datoscli"));	  			  				  
    });
	$("#bvisita").tap(function() {    //inicia visita               				  
				  var cliente=window.localStorage.getItem("clave");//Obtiene clave del cliente 
				  //alert(cliente);
				  if (cliente==''){
					  navigator.notification.alert('Debe seleccionar un cliente',null,'Error al iniciar visita','Aceptar');					
					  return false;
				  }
				  else{
					 var saldo=Number(window.localStorage.getItem("saldo"));  
					// alert('saldo '+saldo);
					 if (saldo>0){
						 copiatemcobros(cliente);//copia a tabla temporal las facturas pendientes de cobro. funcion de archivo cobros.js
		                 window.location.href='#pcobros';
	                     $("#divencnum").hide();
				  		 $("#divnumcobros").hide();
					     $("#labelencpcobros").empty();	
				         $("#labelencpcobros").append("Cobrar Facturas pendientes del cliente: "+cliente);				         
				         //listafacturaspend(cliente);//lista las facturas pendientes de cobro, del cliente seleccionado				  				  
					 }
					 else{
						window.location.href='#poperaciones'; 						 
					 }
                     guardafechaactual();
				     iniciavisita();//guarda registro de fecha y hora de visita.funcion en almacenamiento.js			  
				  }
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
			//alert(razon);
			if (razon=='Razon') {
				navigator.notification.alert('Debe indicar razon de visita',null,'Error al guardar visita','Aceptar');					
			}else{		
				guardavisita(cliente,visitaini,visitafin,visitaini,notas,razon,ruta);
				window.location.href='#pclientes';					  
            }
     	});//$("#bguardavisita").tap(function() {                   				  				  	
//**********VENTAS************	
$("#bventa").tap(function() {		 	 
                 var cliente=window.localStorage.getItem("clave");
				 var vencida=window.localStorage.getItem("vencida");
				 var tipocli=window.localStorage.getItem("tipocliente");
             	 var saldo=Number(window.localStorage.getItem("saldo")); 
        		 var limite=Number(window.localStorage.getItem("limite")); 
		         var disp=limite-saldo;
        		 //if (disp<=0 || vencida=='S'){
				 if (vencida=='S' || tipocli=='SUSP' || disp<=0){
					 alert(vencida);
					 alert(tipocli);
					 alert(disp);
					navigator.notification.alert('Cliente con Saldo Vencido, Credito Suspendido o Límite de Crédito Excedido, realiza abono',null,'Acceso a Ventas','Aceptar');										 
				 }
				 else{
        				 window.location.href='#pventas';			
		 				 //limpia los grid
						 $("#divnumventas").hide();
				         $('#divtotalesv').hide();  
				         $("#divventas").show();                 
	                     validasug(cliente);//valida si tiene facturas o pedidos pendientes de imprimir para insertar o no pedido sugerido en caso de tenerlo
					}    	
				  
});	

//$("a.clasep").live('click',function(){//al modificar linea de pedido
$("#gridpedido").delegate('.clasep','click',function(){//al modificar linea de pedido

                  articulo = $(this).attr("name");
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
                   articulo = $(this).attr("name");				  
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
				guardarventa(cliente,'comentarios',total);		
				window.location.href='#poperaciones';
			}//if (button==1){
		}
});
$("#lcatalogo").delegate('.listart','click',function(){//al seleccionar un articulo de la lista
//$("#lcatalogo li").live('click',function(){
                  var cliente=window.localStorage.getItem("clave");			  
				   articulo = $(this).attr("id");				  				  
				  existeenpedido(articulo,cliente);
});	
$("#lcatalogo").delegate('.fichaart','click',function(){//al seleccionar el boton de buscar en la lista del catalogo para mostrar ficha                  
				  var art= $(this).attr("id");				  
				  var longitud=art.length;				  
				  articulo=art.substr(1,(longitud-1));
				  fichaarticulo(articulo);
				  window.location.href='#pficha';			  
				  //existeenpedido(articulo,cliente);
});	
//$("#bgenerav").tap(function() { //boton regresar a pedido del catalogo
$("#bgenerav").bind( "vclick", function( event ) {//boton regresar a pedido del catalogo
                 //var clavecli = $(this).attr("id");
				 //muestra el pedido 
     			var cliente=window.localStorage.getItem("clave");			  
				mostrarpedido(cliente);  
				$("#divnumventas").hide();
				$('#divtotales').show(); 	
				window.location.href='#pventas'; 
				  
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
				var bodega=window.localStorage.getItem("bodega");	 
     			var criterio=$('#buscaart').val();			  				
				armacatalogo(criterio,bodega);				  
				  
});	


	 //*****D E V O L U C I O N E S *****
	 $("#bdevoluciones").tap(function() {                   
				  //limpiartemp();
				  window.location.href='#ptipodev';
     });		 
	 $("#btipodev").tap(function() {                   
				  //limpiartemp();
				  var tipodev=$("#menutipodev").val();
				  if (tipodev=='1'){
				  window.location.href='#phistfac';
  				  var cliente=window.localStorage.getItem("clave");			                    				  
				  listafacturas(cliente);	
				  $("#divgriddev").hide();				  
				  $('#divnumdev').hide();

				  }
				  else if (tipodev=='2'){
					  alert('dev sin documento con cargo al vendedor');
					  
				  }
				  else if (tipodev=='3'){
					  alert('dev sin documento por cancelacion de cuenta');
					  
				  }				  
				  
     });		 

	 $("#listahistfac li").live('click',function(){
		          //al seleccionar una factura de la lista, muestra los articulos				  
                  var factura = $(this).attr("id");				  
                  cargovendedor='';
				  validavigencia(factura);			  
				  //var diasfac=window.localStorage.getItem("diasfac");	
				  //alert(diasfac);			  
				  
				  //window.location.href='#pdethistfac';				  				  
				  $("#divgriddev").show();				  
				  $('#divnumdev').hide();				  
                  eliminatempdev();
				  guardafactura(factura);//almacena localmente el numero de factura
				  copiadethistempd(factura);//copia a tabla temporal los renglones de la factura a devolver
				 // mostrarhistfac(factura);//muestra el grid con los detalles de los artículos de factura
				  guardafechaactual();
				  
				  //$.mobile.changePage($("#datoscli"));	  			  				  
    });
	$("#bdevtodo").tap(function() {                   
				  //limpiartemp();	
				  var factura=window.localStorage.getItem("factura");
				  copiadethistempd(factura,'S');					  
				  //mostrarhistfac(factura);
      			  //mostrarartdev();
     });
	$("a.clasedev").live('click',function(){//al modificar linea de devolución.
                  var linea = $(this).attr("name");//el nombre tiene el numero de linea que corresponde al articulo en la tabla de DETHISFAC
				 /* var id = $(this).attr("id");
				  var longitud=id.length;
				  var posicion = id.indexOf('*'); 
				  var cantidad=Number(id.substring(posicion+1));*/
				 guardaarticulo(linea);//almacena localmente la linea, usando la función que guarda el articulo
				 // window.location.href='#pcantidaddev';//muestra dialogo para indicar cantidad a modificar y observaciones.
				 mostrarddev(linea);
				 $('#divnumdev').show();
				 
				
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
				    //obtiene numero de linea, guardado en almacenamiento local con key articulo
    				
    				 //alert('despues de llamada modificarlineap');
					 //mostrarpedido();
				  }
    });
	$("#bregresadev").tap(function(){
                function onConfirm(button) {
					if (button==1){
						 eliminatempdev();
						 window.location.href='#poperaciones';
			
					}//if (button==1){
				}			 
    	navigator.notification.confirm('Se perderán los datos no guardados',     // mensaje (message)
	    onConfirm,      // función 'callback' a llamar con el índice del botón pulsado (confirmCallback)
    	'Generar Devolución',            // titulo (title)
        'ACEPTAR,CANCELAR'       // botones (buttonLabels)
	    );
    }); 
	$("#bguardadev").tap(function(){
		var total=Number(window.localStorage.getItem("totaldev"));//
		if (total>0){		
			navigator.notification.confirm('¿Desea terminar y guardar la devolución?',onConfirm,'Guardar Devolución','SI,NO');		
			
		}
		else{
			 navigator.notification.alert('El total de la devolución no es mayor a cero',null,'Guardar Devolución','Aceptar'); 
			
		}
                function onConfirm(button) {
					if (button==1){
						 var observagen=$("#obsgendev").val();
						// alert(cargovendedor);
						 var diasfac=window.localStorage.getItem("diasfac");	
						 if (diasfac>15){
							 cargovendedor='S'							 
						 }
						 guardadev(observagen,cargovendedor);//guarda la devolución.						 
						// window.location.href='#phistfac';						
						 eliminatempdev();
						 guardatotaldev(0);						 
						 $("#divgriddev").hide();
			
					}//if (button==1){
				}			 
    	
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
			  var nomcli=window.localStorage.getItem("clavenombre");//Obtiene clave del cliente
			  var saldo=Number(window.localStorage.getItem("saldo"));
			  //alert(saldo);
			  if (saldo>0){				  
				  window.location.href='#pcobros';
				  $("#divencnum").hide();
				  $('#divnumcobros').hide();
				  $("#labelencpcobros").empty();	
				  $("#labelencpcobros").append("Cobrar Facturas pendientes del cliente: "+nomcli);				  				 				  
				   
				  //eliminatempcob();
				  copiatemcobros(cliente);//copia a tabla temporal las facturas pendientes de cobro. funcion de archivo cobros.js
				  //listafacturaspend(cliente);//lista las facturas pendientes de cobro, del cliente seleccionado				  				  
				  guardafechaactual();
			  }else{
					  navigator.notification.alert('No existen facturas con saldo',null,'Cobros','Aceptar'); 
			  }				   
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
		   //eliminatempcob();
		   copiatemcobros(cliente);
		   //listafacturaspend(cliente);//lista las facturas pendientes de cobro, del cliente seleccionado			    
		   $("#divencnum").hide();
       });
	   $("#bcopiarsaldo").tap(function() { //limpiar la columna "A pagar" del grid que muestra las facturas pendientes de cobro
	       var cliente=window.localStorage.getItem("clave");//Obtiene clave del cliente 
	       $('#divnumcobros').hide();//oculta el teclado numerico con el input
		   $("#divencnum").hide(); 
		   //eliminatempcob();
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
				    //obtiene el numero de factura
    				var factura = window.localStorage.getItem("factura");
	     			//alert (cantidad);	  
					insertacobro(factura,cantidad);	//actualiza cantidad a pagar de factura en tabla temporal de fac pend de cobro.Funcion en cobros.js				
    				 //alert('despues de llamada modificarlineap');
					 //mostrarpedido();
				  }
    });
	$("#regresardecob").tap(function(){
		 var cliente=window.localStorage.getItem("clave"); 
		 consultasivencidas(cliente);
     	 var vencida=window.localStorage.getItem("vencida"); 
		 var saldo=Number(window.localStorage.getItem("saldo")); 
		 var limite=Number(window.localStorage.getItem("limite")); 
		 var disp=limite-saldo;
		 //if (disp<0 || vencida=='S'){
			 if (vencida=='S'){
			//mensaje,funcion callback,titulo,botones ('ACEPTAR,CANCELAR')
			navigator.notification.confirm('No realizaras abono y el cliente tiene facturas vencidas, solicita al cliente la firma del ticket de relacion de facturas pendientes',onConfirm,'No hay Cobro','ACEPTAR,CANCELAR');	 			 
		 }
		 else{
			window.location.href='#poperaciones'; 
			 
		 }
         function onConfirm(button) {
					if (button==1){						 
						 window.location.href='#poperaciones';			
					}//if (button==1){
				}			 
    	
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
	 	var pendiente=Number(saldopendiente());
		//alert('pendiente '+pendiente);
			if (pendiente>0){
				navigator.notification.alert('Saldo pendiente mayor a cero',null,'Indicar tipo de Pago','Aceptar');				 	
				return false;
			}
			else{
				navigator.notification.confirm('¿Deseas terminar y guardar el Cobro?',onConfirm,'Guardar Cobro','ACEPTAR,CANCELAR');    			  
				function onConfirm(button) {
					if (button==1){						   
					  // alert(pendiente);
					     guardacob();	//prepara datos para guardar las tablas cabecera y detalles de recibos.funcion en cobros.js 				 
						 window.location.href='#poperaciones';			
					}//if (button==1){
				}
			}
	        
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
				//alert(monto);
				//alert(pendiente);
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
				}//if (button==1){
			}			 
    	navigator.notification.confirm('¿Estas seguro de eliminar los registros seleccionados?',     // mensaje (message)
	    onConfirm,      // función 'callback' a llamar con el índice del botón pulsado (confirmCallback)
    	'Eliminar Cheque',            // titulo (title)
        'SI,NO'       // botones (buttonLabels)
    );
				 
				  
  });   
//**********D E P O S I T O S	 *************
 $("#bdepositos").tap(function() {                   				  				  
				  window.location.href='#pfichadep';
				  poblarcuentadep();				  
  });
  $("#bdatosdep").tap(function() { 
				var banco=$("#menucuentad").val();				
   				if (banco=='Banco'){
					 navigator.notification.alert('Debe seleccionar algún banco',null,'Seleccione Banco','Aceptar');					
				}else{
				  window.location.href='#pdepositos';
				  var pos=banco.indexOf("@");//el valor regresado en Banco es codigo+cuenta bancaria
                  var codigo= banco.substr(0,(pos));//se obtiene el codigo del catalogo de bancos, para relacionar con CUENTASB
  				  listarecibos(codigo);				  
				  guardafechaactual();	
	  			  $("#labeldeposito").empty();
				  $("#labeldeposito").append('Banco seleccionado: ');				  				  
				  $("#obsdep").val("");
				}
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
		var faltandatos=false;
		var banco=$("#menucuentad").val();
		guardafechaactual();//guarda en memoria la fecha con hora, actuales
		var fecha= window.localStorage.getItem("fechahora");//recuperamos la nueva fecha y hora actual
		var efectivo= Number(window.localStorage.getItem("depositoefe"));//
		var cheque= Number(window.localStorage.getItem("depositoche"));//
		var chequeotros= Number(window.localStorage.getItem("depositocheotros"));//
		var longitud=banco.length;
                function onConfirm(button) {
					if (button==1){						 						 
						if (efectivo>0){
							if ($("#fichaefe").val().length==0){
								faltandatos=true; }
						}
						if (cheque>0){
							if ($("#fichache").val().length==0){
								faltandatos=true; }
						}
						if (chequeotros>0){
							if ($("#fichacheotros").val().length==0){
								faltandatos=true; }
						}
						if (faltandatos){
							 navigator.notification.alert('Debe indicar numero de ficha para los importes a depositar',null,'Faltan Datos','Aceptar');
							 return false;
						 }
						 else{
							  
							 
							 var pos=banco.indexOf("@");
						     var codigo= banco.substr(0,(pos));
					         var cuenta=banco.substr(pos+1,longitud-(pos+1));
							 guardadep(codigo,cuenta,fecha,$("#obsdep").val());
							// alert('f1'+$("#fichaefe").val()+' f2 '+$("#fichache").val()+'f3 '+$("#fichacheotros").val());
							 
							 /*
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
							 */
						 }				 
						 
						
			
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
			var total=$("#totalselec").val();
			var importe=$(this).val();
			var monto=Number(total)+Number(importe);
		   //alert("checado");
		   //alert($(this).val());
		   $("#totalselec").val(monto.toFixed(2));
		   
	   }
	   else{
		   //alert("NO checado");
		   //alert($(this).val());	
		   	var total=$("#totalselec").val();
			var importe=$(this).val();
			var monto=Number(total)-Number(importe);
		   //alert("checado");
		   //alert($(this).val());
		   $("#totalselec").val(monto.toFixed(2));
	   }
  
     });
 $('#fichaefe').live('blur', function() {
    	if ($('#fichaefe').val()==$('#fichache').val() || $('#fichaefe').val()==$('#fichacheotros').val()){
			$('#fichaefe').val('');
			
		}
});
$('#fichache').live('blur', function() {
    	if ($('#fichache').val()==$('#fichaefe').val() || $('#fichache').val()==$('#fichacheotros').val()){
			$('#fichache').val('');			
		}
});
$('#fichacheotros').live('blur', function() {
    	if ($('#fichacheotros').val()==$('#fichache').val() || $('#fichacheotros').val()==$('#fichaefe').val()){
			$('#fichacheotros').val('');
			
		}
});
	 //**********R E P O R T E S	 *************	
	 $("#reporte1").tap(function() {     
	              //navigator.notification.alert('entra tap reporte1',null,'pruebas','Aceptar');             				  				  
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
	   //$("#bacepapli").tap(function() {                                                   
	   $("#bacepapli").bind( "vclick", function( event ) {
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
				alert('monto '+monto+' vs pendiente '+pendiente);
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
				
				$("select#menucuentab").val("Banco").selectmenu("refresh"); 
				window.localStorage.setItem('numche',''); 
				//$("#numcuenta").val("");  				
				$('#divnumaplicob').hide();				
				insertarcheque(nche,"0",banco,monto);			
				
			}
			
			
			
		}
		  
		   
       }); 
	   //$("#bcanapli").tap(function() {                                                   
	   $("#bcanapli").bind( "vclick", function( event ) {
          $('#divnumaplicob').hide(); 		   
       }); 
	   //$("#b11").tap(function() { 	     
	   $("#b11").bind( "vclick", function( event ) {	   
	    var importe=$('#importeapli').val();	                                                    
		  // if (importe.length<longitud){ 
          $('#importeapli').val(importe+'1');                         
		   //}
       });
	   //$("#b22").tap(function() {                                                   
	   $("#b22").bind( "vclick", function( event ) {	   
          var importe=$('#importeapli').val();	                                                    
		  //if (importe.length<longitud){ 
          $('#importeapli').val(importe+'2');                         
		  //}
       });
	   //$("#b33").tap(function() {                                                   
	   $("#b33").bind( "vclick", function( event ) {	   
          var importe=$('#importeapli').val();	                                                    
		  //if (importe.length<longitud){ 
          $('#importeapli').val(importe+'3');                         
		  //}
       });
	    //$("#b44").tap(function() {  
		$("#b44").bind( "vclick", function( event ) {	   
	    var importe=$('#importeapli').val();	                                                    
          $('#importeapli').val(importe+'4');                         
       });
	   //$("#b55").tap(function() {                                                   
	   $("#b55").bind( "vclick", function( event ) {	   
          var importe=$('#importeapli').val();	                                                    
          $('#importeapli').val(importe+'5');                         
       });
	   //$("#b66").tap(function() {                                                   
	   $("#b66").bind( "vclick", function( event ) {	   
          var importe=$('#importeapli').val();	                                                    
          $('#importeapli').val(importe+'6');                         
       });
	    // $("#b77").tap(function() {  
		$("#b77").bind( "vclick", function( event ) {	   
	    var importe=$('#importeapli').val();	                                                    
          $('#importeapli').val(importe+'7');                         
       });
	   //$("#b88").tap(function() {                                                   
	   $("#b88").bind( "vclick", function( event ) {	   
          var importe=$('#importeapli').val();	                                                    
          $('#importeapli').val(importe+'8');                         
       });
	   //$("#b99").tap(function() {                                                   
	   $("#b99").bind( "vclick", function( event ) {	   
          var importe=$('#importeapli').val();	                                                    
          $('#importeapli').val(importe+'9');                         
       });
	    // $("#b00").tap(function() {  
		$("#b00").bind( "vclick", function( event ) {	   
	    var importe=$('#importeapli').val();	                                                    
          $('#importeapli').val(importe+'0');                         
       });
	  //$("#bpunto2").tap(function() {                                                   
	  $("#bpunto2").bind( "vclick", function( event ) {	   
          var importe=$('#importeapli').val();	                                                    
          $('#importeapli').val(importe+'.');                         
       });
	   // $("#blimpiarapli").tap(function() {                                                                                                                
	   $("#blimpiarapli").bind( "vclick", function( event ) {	   
          $('#importeapli').val('');                         
       });
 //**********TECLADO NUMERICO	USADO EN CATALOGO *************	
 	   
	  // $("#bacepcat").tap(function() {                                                   	       
		$("#bacepcat").bind( "vclick", function( event ) {
			$("#bacepcat").addClass('ui-disabled');
	   	   var cliente = window.localStorage.getItem("clave");
           var cantidad = parseInt($("#cantcat").val()); 		  
		   //articulo = window.localStorage.getItem("articulo");
		   if (isNaN(cantidad)) { 
        //entonces (no es numero) 
        	 navigator.notification.alert('Debe indicar un valor válido',null,'Cantidad inválida','Aceptar');			 
			 return false;
	       }
			if (cantidad<=0){
				navigator.notification.alert('La cantidad indicada debe ser mayor a cero',null,'Cantidad inválida','Aceptar');				
				$("#cantcat").val('');
				$("#bacepcat").removeClass('ui-disabled'); 
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
	   //$("#b111").tap(function() { 
	   $("#b111").bind( "vclick", function( event ) {	     
	    var importe=$('#cantcat').val();	                                                    
		   //if (importe.length<longitud){ 
          $('#cantcat').val(importe+'1'); 
		  previolinea(articulo,parseInt($("#cantcat").val()));
		  // }
       });
	   //$("#b222").tap(function() {                                                   
	   $("#b222").bind( "vclick", function( event ) {
          var importe=$('#cantcat').val();	                                                    
		  //if (importe.length<longitud){ 
          $('#cantcat').val(importe+'2');                     
		  previolinea(articulo,parseInt($("#cantcat").val()));    
		  //}
       });
	   //$("#b333").tap(function() {                                                   
	   $("#b333").bind( "vclick", function( event ) {
          var importe=$('#cantcat').val();	                                                    
		 // if (importe.length<longitud){ 
          $('#cantcat').val(importe+'3'); 
		  previolinea(articulo,parseInt($("#cantcat").val()));                        
		  //}
       });
	    //$("#b444").tap(function() {  
		$("#b444").bind( "vclick", function( event ) {
	    var importe=$('#cantcat').val();	                                                    
          $('#cantcat').val(importe+'4');
		  previolinea(articulo,parseInt($("#cantcat").val()));                         
       });
	   //$("#b555").tap(function() {                                                   
	   $("#b555").bind( "vclick", function( event ) {
          var importe=$('#cantcat').val();	                                                    
          $('#cantcat').val(importe+'5');   
		  previolinea(articulo,parseInt($("#cantcat").val()));                      
       });
	   //$("#b666").tap(function() {                                                   
	   $("#b666").bind( "vclick", function( event ) {
          var importe=$('#cantcat').val();	                                                    
          $('#cantcat').val(importe+'6'); 
		  previolinea(articulo,parseInt($("#cantcat").val()));                        
       });
	     //$("#b777").tap(function() {  
		 $("#b777").bind( "vclick", function( event ) {
	    var importe=$('#cantcat').val();	                                                    
          $('#cantcat').val(importe+'7');   
		  previolinea(articulo,parseInt($("#cantcat").val()));                      
       });
	   //$("#b888").tap(function() {                                                   
	   $("#b888").bind( "vclick", function( event ) {
          var importe=$('#cantcat').val();	                                                    
          $('#cantcat').val(importe+'8'); 
		  previolinea(articulo,parseInt($("#cantcat").val()));                        
       });
	   //$("#b999").tap(function() {                                                   
	   $("#b999").bind( "vclick", function( event ) {
          var importe=$('#cantcat').val();	                                                    
          $('#cantcat').val(importe+'9');   
		  previolinea(articulo,parseInt($("#cantcat").val()));                      
       });
	     //$("#b000").tap(function() {  
		 $("#b000").bind( "vclick", function( event ) {
	    var importe=$('#cantcat').val();	                                                    
          $('#cantcat').val(importe+'0');    
		  previolinea(articulo,parseInt($("#cantcat").val()));                     
       });
	   //$("#bpunto3").tap(function() {		   
         /* var importe=$('#cantcat').val();	                                                    
          $('#cantcat').val(importe+'.');*/
       //});
	    //$("#blimpiarcant").tap(function() {
			$("#blimpiarcant").bind( "vclick", function( event ) {
          $('#cantcat').val('');                         
       });
	   
//**********TECLADO NUMERICO USADO EN VENTAS *************	
	   $("#bacepven").tap(function() {                                                   	       
	  
           var cantidad = parseInt($("#cantv").val()); 		  
		   //articulo = window.localStorage.getItem("articulo");
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
                                
       });
	    $("#blimpiarcantv").tap(function() {                                                                                                                
          $('#cantv').val('');                         
       });
//**********TECLADO NUMERICO USADO EN DEVOLUCIONES *************	
	   $("#bacepdev").tap(function() {                                                   	       
           var cantidad = parseInt($("#cantd").val()); 		  
		   //articulo = window.localStorage.getItem("articulo");
		   var cliente = window.localStorage.getItem("clave");
		   var linea = window.localStorage.getItem("articulo");
		   var factura= window.localStorage.getItem("factura");
	     			//alert (cantidad);	  
					
				  //alert (cantidad);
				   if (isNaN(cantidad)) { 
       					 //entonces (no es numero) 
        	 			navigator.notification.alert('Debe indicar un valor válido',null,'Cantidad inválida','Aceptar');			 
						return false;
			       }
				  if (cantidad<0){
					   navigator.notification.alert('Debe indicar cantidad MAYOR A CERO',null,'Error Indicando Cantidad','Aceptar');					
					  return false;
				  }
				  else
				  {
					    insertalindev(factura,linea,cantidad,'');					
						$('#divnumdev').hide();						
						
						
				  }
       }); 
	   $("#bcandev").tap(function() {                                                   
          $('#divnumdev').hide(); 		  
       }); 
	   $("#b11111").tap(function() { 	     
	    var importe=$('#cantd').val();	                                                    
		   //if (importe.length<longitud){ 
          $('#cantd').val(importe+'1');                         
		   //}
       });
	   $("#b22222").tap(function() {                                                   
          var importe=$('#cantd').val();	                                                    
		  //if (importe.length<longitud){ 
          $('#cantd').val(importe+'2');                         
		  //}
       });
	   $("#b33333").tap(function() {                                                   
          var importe=$('#cantd').val();	                                                    
		 // if (importe.length<longitud){ 
          $('#cantd').val(importe+'3');                         
		  //}
       });
	    $("#b44444").tap(function() {  
	    var importe=$('#cantd').val();	                                                    
          $('#cantd').val(importe+'4');                         
       });
	   $("#b55555").tap(function() {                                                   
          var importe=$('#cantd').val();	                                                    
          $('#cantd').val(importe+'5');                         
       });
	   $("#b66666").tap(function() {                                                   
          var importe=$('#cantd').val();	                                                    
          $('#cantd').val(importe+'6');                         
       });
	     $("#b77777").tap(function() {  
	    var importe=$('#cantd').val();	                                                    
          $('#cantd').val(importe+'7');                         
       });
	   $("#b88888").tap(function() {                                                   
          var importe=$('#cantd').val();	                                                    
          $('#cantd').val(importe+'8');                         
       });
	   $("#b99999").tap(function() {                                                   
          var importe=$('#cantd').val();	                                                    
          $('#cantd').val(importe+'9');                         
       });
	     $("#b00000").tap(function() {  
	    var importe=$('#cantd').val();	                                                    
          $('#cantd').val(importe+'0');                         
       });
	   $("#bpunto5").tap(function() {                                                   
                                
       });
	    $("#blimpiarcantd").tap(function() {                                                                                                                
          $('#cantd').val('');                         
       });
function formatonum(numero){ 
        // Variable que contendra el resultado final
		alert(numero);
        var resultado = "";
        
        // Si el numero empieza por el valor "-" (numero negativo)
        if(numero[0]=="-")
        {

            // Cogemos el numero eliminando los posibles puntos que tenga, y sin
            // el signo negativo
            nuevoNumero=numero.replace(/\./g,'').substring(1);
        }else{
						alert('entra ');
            // Cogemos el numero eliminando los posibles puntos que tenga
            nuevoNumero=numero.replace(/\./g,'');
        }
        
        // Si tiene decimales, se los quitamos al numero
        if(numero.indexOf(".")>=0)
            nuevoNumero=nuevoNumero.substring(0,nuevoNumero.indexOf("."));

        // Ponemos un punto cada 3 caracteres
        for (var j, i = nuevoNumero.length - 1, j = 0; i >= 0; i--, j++) 
            resultado = nuevoNumero.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + resultado; 
        
        // Si tiene decimales, se lo añadimos al numero una vez forateado con 
        // los separadores de miles
        if(numero.indexOf(".")>=0)
            resultado+=numero.substring(numero.indexOf("."));

        if(numero[0]=="-")
        {
            // Devolvemos el valor añadiendo al inicio el signo negativo
            return "-"+resultado;
        }else{
            return resultado;
        }
    }
	
$('#pclientes').live('pagebeforeshow',function(event, ui){
window.localStorage.setItem("clave",'');
$("#divclientes").hide();

});
$("#bcargaclientes").tap(function() {  
		  var ruta=window.localStorage.getItem("ruta");
		  //var direccion ="http://192.168.3.44/prueba.php?jsoncallback=?";
		  var direccion ="http://sardelfr03.zapto.org/prueba.php?jsoncallback=?";
          cargaclientes(ruta,direccion);                       		                  
		 // cargarutacli(ruta,direccion);                       		  
       });
$("#bcargaclientes2").tap(function() {  
		  var ruta=window.localStorage.getItem("ruta");
		  var direccion ="http://192.168.3.44/prueba.php";
		  //var direccion ="http://sardelfr03.zapto.org/prueba.php?jsoncallback=?";         
		  cargaclientes2(ruta,direccion);                       
		 // cargarutacli(ruta,direccion);                       		  
       });	
$("#benvia2").tap(function() {  
		  var ruta=window.localStorage.getItem("ruta");
		  //var direccion ="http://192.168.3.44/enviar.php";
		  var direccion ="http://sardelfr03.zapto.org/enviar.php";         
		  enviadatos(ruta,direccion);                       
		 // cargarutacli(ruta,direccion);                       		  
});		      
$("#detectar").tap(function() {  
	var estadoconexion=navigator.network.connection.type;
	if (estadoconexion==Connection.NONE){
		navigator.notification.alert('No hay conexion a Internet',null,'Detectar Conexion','Aceptar');
	}
	else{
		 navigator.notification.alert('Conectado a internet usando: '+estadoconexion,null,'Detectar Conexion','Aceptar');
	}
});		  

 
  },false);//document.addEventListener("deviceready",function(){	
});//$(document).ready(function() 
			   
			   



