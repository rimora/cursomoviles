// EVENTOS
$(document).ready(function() {
	document.addEventListener("deviceready",function(){	

	/*	var db = window.openDatabase("Sardel", "1.0", "SardelDB", 1000000);
    $('#clientes').click(function() {
		db.transaction(consulta,errorconsulta,listo);
		
	
	});*/	
	window.localStorage.clear();
	window.localStorage.setItem("saldo",0);
	window.localStorage.setItem("consepedido","S04000375");
	window.localStorage.setItem("consedev","D04000375");
	window.localStorage.setItem("ruta","S04");
	window.localStorage.setItem("bodega","K01");
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
				  //alert ('llama a mostrar clientes');
				  window.location.href='#pclientes';				                    
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
				  //alert (clavecli);
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
$("a.clasep").live('click',function(){//al modificar linea de pedido
                  var articulo = $(this).attr("name");
				  alert (articulo);
				 guardaarticulo(articulo);//almacena localmente la clave de articulo 	
    });
$("a.clasef").live('click',function(){//al modificar linea de factura
                  var articulo = $(this).attr("name");
				 /* var id = $(this).attr("id");
				  var longitud=id.length;
				  var posicion = id.indexOf('*'); 
				  var cantidad=Number(id.substring(posicion+1));*/
				 guardaarticulo(articulo);//almacena localmente la clave de articulo 	
				
    });


/*$("#bmodificarp").tap(function() { 
                 //var clavecli = $(this).attr("id");
		var contador=0;	
		
		$('input:checkbox.clasep').each(function () {
			alert('entra each');
           if (this.checked) {
               alert($(this).attr("name"));
			   contador++;
			   alert('contador'+contador);
			   var articulo=$(this).attr("name");
			   //alert($("#"+"c"+$(this).val()).val());
           }		   
		});//$('input:checkbox.clasep').each(function () {			
		if (contador > 1) {
		   navigator.notification.alert('Solo debe seleccionar un articulo',null,'Error Modificando Pedido','Aceptar');					
		
		} else{
			if (contador == 1){
		         alert('contador=1,'+articulo);
			     guardaarticulo(articulo);//almacena localmente la clave de articulo 					 
				 window.location.href='#pmodcantidadp';					
			}
		}
				  //$.mobile.changePage($("#datoscli"));	  			  				  
});*/
$("#beliminarp").tap(function() { 
                 //var clavecli = $(this).attr("id");				 
	function onConfirm(button) {
		if (button==1){			
			$('input:checkbox.clasep').each(function () {
           		if (this.checked) {
             	  alert($(this).attr("name"));
				  alert($(this).attr("value"));
				   eliminalinea($(this).attr("name"),$(this).attr("value"),"P")				    
			   //alert($("#"+"c"+$(this).val()).val());
          		 }
				 else{
					alert('no checado'); 
					alert($(this).attr("name"));
				  	alert($(this).attr("value"));
				 }
			});//$('input:checkbox.clasep').each(function () {	
			//mostrarpedido();
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
				   alert('nombre '+$(this).attr("name")+' valor '+$(this).attr("value"));
				   eliminalinea($(this).attr("name"),Number($(this).attr("value")),"F")				    
				   
			   //alert($("#"+"c"+$(this).val()).val());
          		 }
			});//$('input:checkbox.clasep').each(function () {	
			
		}//if (button==1){
	}			 
    navigator.notification.confirm('¿Estas seguro de eliminar los registros seleccionados?',     // mensaje (message)
    onConfirm,      // función 'callback' a llamar con el índice del botón pulsado (confirmCallback)
    'Eliminar de factura',            // titulo (title)
        'SI,NO'       // botones (buttonLabels)
    );
				  //$.mobile.changePage($("#datoscli"));	  			  				  
});
$("#bimprimirp").tap(function() { 
                 //var clavecli = $(this).attr("id");
		function onConfirm(button) {
		if (button==1){
			imprimirped($("#pcomentario").val());
			
		}//if (button==1){
	}			 
    navigator.notification.confirm('¿Confirma generar pedido?',     // mensaje (message)
    onConfirm,      // función 'callback' a llamar con el índice del botón pulsado (confirmCallback)
    'Generar Pedido',            // titulo (title)
        'SI,NO'       // botones (buttonLabels)
    );
				  //$.mobile.changePage($("#datoscli"));	  			  				  
});

	$("#bpruebas").tap(function() { 	
     //llama a funcion que prepara las tablas temporales, insertando el articulo y cantidad
	//alert($("#scantidad").val());	
	
	//preparadetalletemp(window.localStorage.getItem("articulo"),$("#scantidad").val())
	  alert('boton pruebas2');
	  alert('ya');
	    
	  var c=0;
	  
	  var c=consultaexis2("ADE-04");
      alert('despues de llamada'+c);	
	  function consultaexis2(articulo){	
     
	  alert('entra a función');
	  consultadb().transaction(existencia,function(err){
    	  alert("Error al insertar renglon factura: "+err.code+err.message);
          },function()
		  	{
			  alert(exi);
			  return exi;
		  	}
		);
    	function existencia(tx){   	
	        alert('entra a consulexis');    
			var sql='SELECT existencia FROM ARTICULO_EXISTENCIA WHERE articulo="'+articulo+'" AND bodega="K01"';			
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar existencia : "+err.code+err.message);
         		});    									
	    }
		function listo(tx,results){ 	 
	      alert('entra a listo de consulexis');         
	      if (results.rows.length>0){			  
		    //alert('despues del rows.length');         
			var row = results.rows.item(0);    
			//alert('despues del var row');         			
			exi=row['existencia'];
		  }		
		  else
		  {
			exi=5000;
		  }
		  
 		}
		
	
}//function consultaexis  
      //iniciar();
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
					  navigator.notification.alert('Debe indicar cantidad MAYOR A CERO',null,'Error Indicando Cantidad','Aceptar');					
					  
				  }
				  else
				  {
				    //obtiene el articulo pulsado en la lista
    				var articulo = window.localStorage.getItem("articulo");
	     			//alert (articulo);	  
					 insertalinea(articulo,cantidad);
				  }
    });
	$("#botonmodcantidadp").tap(function(){
                 //var cantidad=$('#scantidad').attr('Val');
				 var cantidad=Number($('#modcantidadp').val());
				  //alert (cantidad);
				  if (cantidad<=0){
					   navigator.notification.alert('Debe indicar cantidad MAYOR A CERO',null,'Error Indicando Cantidad','Aceptar');					
					  
				  }
				  else
				  {
				    //obtiene el articulo pulsado en la lista
    				var articulo = window.localStorage.getItem("articulo");
	     			//alert (cantidad);	  
					 modificalineap(articulo,cantidad);
					 //alert('despues de llamada modificarlineap');
					 //mostrarpedido();
				  }
    });
	$("#botonmodcantidadf").tap(function(){
                 //var cantidad=$('#scantidad').attr('Val');
				 var cantidad=$('#modcantidadf').val();
				  //alert (cantidad);
				 
				  if (cantidad<=0){
					   navigator.notification.alert('Debe indicar cantidad MAYOR A CERO',null,'Error Indicando Cantidad','Aceptar');					
					  
				  }
				  else
				  {				    
					var articulo = window.localStorage.getItem("articulo");					
					modificalineaf(articulo,cantidad);
				  }
    });
	$("#guardapros").tap(function() { 
                 //var clavecli = $(this).attr("id");
				  
				 alert('Prospecto Guardado');
				  $.mobile.changePage($("#pclientes"));	  			  				  
				  
     });	
	 $("#bgenerav").tap(function() { //boton aceptar del catalogo
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
				  //limpiartemp();
				  validasug();//valida si tiene facturas o pedidos pendientes de imprimir para insertar o no pedido sugerido en caso de tenerlo
				  mostrarpedido();
				  mostrarfactura();
				  
     });	
	 $("#bcatalogo").tap(function(){
                 //var clavecli = $(this).attr("id");
				 //limpia los grid				  
                  armacatalogo();
				  window.location.href='#pcatalogo';
				  
				  
     });
	 $("#binicializar").click(function(){
                 //var clavecli = $(this).attr("id");
				 //limpia los grid
                  pruebalocalizacion();
				  
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
				 alert('observa '+observa);
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
    	navigator.notification.confirm('¿Desea terminar y guardar la devolución?',     // mensaje (message)
	    onConfirm,      // función 'callback' a llamar con el índice del botón pulsado (confirmCallback)
    	'Guardar Devolución',            // titulo (title)
        'SI,NO'       // botones (buttonLabels)
	    );
    });  
	$("input").blur(function(){
     
	
	
	});
 //*****C O B R O S *****	 
	  $("#bcobros").tap(function() {                   				  
				  var cliente=window.localStorage.getItem("clave");//Obtiene clave del cliente 
				  window.location.href='#pcobros';
				  $("#labelencpcobros").empty();	
				  $("#labelencpcobros").append("Facturas pendientes del cliente: "+cliente);				  
				  eliminatempcob();
				  copiatemcobros(cliente);//copia a tabla temporal las facturas pendientes de cobro
				  listafacturaspend(cliente);//lista las facturas pendientes de cobro, del cliente seleccionado				  				  
				  guardafechaactual();
				  			  
				   
     });
	 $("a.clasecob").live('click',function(){//para indicar importe a pagar de la factura
                  var factura = $(this).attr("name");//el nombre tiene el numero de documento en la tabla PENCOBRO
				 /* var id = $(this).attr("id");
				  var longitud=id.length;
				  var posicion = id.indexOf('*'); 
				  var cantidad=Number(id.substring(posicion+1));*/				 
				 window.location.href='#pimportecob';//muestra dialogo para indicar cantidad a modificar y observaciones.
				 mostrardcob(factura);//muestra dialogo de cobro
				 guardafactura(factura);//almacena localmente el numero de factura
				 
				
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
					insertacobro(factura,cantidad);					
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
	            var saldofac=window.localStorage.getItem("saldofac");
				var abono=window.localStorage.getItem("abono");
				if (abono==0){
					 navigator.notification.alert('Debe indicar abono para alguna factura',null,'Cantidad abonada igual a CERO','Aceptar');
					
				}
				 else{
					window.location.href='#paplicobros';
					guardaefectivo(0);//inicia valor de cobrado en efectivo
					guardacheque(0);//inicia valor de cobrado en cheque				 	  					
				  	aplicacionpago(saldofac,abono);//muestra grid con datos de lo abonado y saldo pendiente de facturas 
					eliminachequexrecibo();//elimina los cheques temporales.
					
				 }
				  
				  
     });
	 $("#baceptaraplic").tap(function() {                   				  
	            			  
				  
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
	 $("#efectivo").blur(function(){
               
	     //intento convertir a entero. 
    	 //si era un entero no le afecta, si no lo era lo intenta convertir 
	     var montoefe = parseInt($("#efectivo").val()); 		 		 
		 var pendiente=saldopendiente();//obtiene el saldo pendiente de distribuir en los tipos de cobro
		 alert(montoefe);
		 alert(pendiente);
	    //Compruebo si es un valor numérico 
    	 if (isNaN(montoefe)) { 
        //entonces (no es numero) 
        	 navigator.notification.alert('Debe indicar un valor válido',null,'Cantidad inválida','Aceptar');
			 $("#efectivo").focus();
	     }else{ 
    	    //En caso contrario (Si era un número) devuelvo el valor 
			if (montoefe>pendiente || montoefe<0){
				navigator.notification.alert('La cantidad indicada excede el saldo pendiente por abonar o es inválida',null,'Cantidad inválida','Aceptar');
				$("#efectivo").focus();
			}
			else{
        	guardaefectivo(montoefe); 			
			actgridsaldo();
			}
	     } 
	   
    });
	$("#bcheque").tap(function() {                   			
		  	window.location.href='#pcheque';
			poblarcuenta();	         
			$("#numcheque").val("");
			$("#numcuenta").val("");  
			$("#monto").val(0); 
			poblarcheques();
				  
     }); 
	 $("#bagregacheque").tap(function() {                   				  
	        var nche=$("#numcheque").val();  			  
			var ncta=$("#numcuenta").val();  			  
			var banco=$("#menucuentab").val();
			var monto=$("#monto").val();
		    var pendiente=saldopendiente();//obtiene el saldo pendiente de distribuir en los tipos de cobro
			 alert(monto);
			 alert(pendiente);

			if (nche=="" || ncta=="" || banco=="Banco" || monto==0){
				navigator.notification.alert('Debe indicar numero de cheque, de cuenta,seleccionar banco y monto válidos',null,'Faltan Datos','Aceptar');
				 ;	
							
			}
			if (monto>pendiente || valor<0){
				navigator.notification.alert('La cantidad indicada excede el saldo pendiente por abonar o es inválida',null,'Cantidad inválida','Aceptar');
				$("#monto").focus();
			}			
			else{
				insertarcheque(nche,ncta,banco,monto);			
				$("select#menucuentab").val("Banco").selectmenu("refresh"); 
				$("#numcheque").val("");
				$("#numcuenta").val("");  
				$("#monto").val(0); 
				poblarcheques();
			}
     });
	$("#eliminarche").tap(function() {                   				  
	       	function onConfirm(button) {
				if (button==1){
					$('input:checkbox.clasech').each(function () {
        		   		if (this.checked) {
						   alert('nombre '+$(this).attr("name")+' valor '+$(this).attr("value"));
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
  $("#salirdecheque").tap(function(){
    	actgridsaldo();
  }); 
//**********D E P O S I T O S	 *************
 $("#bdepositos").tap(function() {                   				  				  
				  window.location.href='#pdepositos';
				  listarecibos();
				  poblarcuentadep();
				  guardafechaactual();
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
	 
  },false);//document.addEventListener("deviceready",function(){	
});//$(document).ready(function() 
			   
			   



