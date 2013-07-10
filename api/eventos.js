// EVENTOS
$(document).ready(function() {
	document.addEventListener("deviceready",function(){	

	/*	var db = window.openDatabase("Sardel", "1.0", "SardelDB", 1000000);
    $('#clientes').click(function() {
		db.transaction(consulta,errorconsulta,listo);
		
	
	});*/	
	window.localStorage.clear();
	window.localStorage.setItem("saldo",0);
	window.localStorage.setItem("consepedido","S03000375");
	window.localStorage.setItem("ruta","S04");
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
			alert('boton si pulsado');
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
	 $("#bdevoluciones").tap(function() {                   
				  //limpiartemp();
				  listafacturas();
				  
     });	
	 $("#listahistfac li").live('click',function(){
		          //al seleccionar un cliente de la lista, muestra sus datos
                  var factura = $(this).attr("id");
				  //alert (clavecli);
				  mostrarhistfac(factura);
				  //$.mobile.changePage($("#datoscli"));	  			  				  
    });
	 
  },false);//document.addEventListener("deviceready",function(){	
});//ultimo
			   
			   



