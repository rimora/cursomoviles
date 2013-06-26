// consultas
var existe=false;// utilizada para saber si un producto ya existe en la tabla de pedidos o factura detalle y no la inserten de nuevo desde el catalogo
function mostrarclientes(dia){
 // $('#pclientes').live('pageshow',function(event, ui){
		//alert('This page was just hidden: '+ ui.prevPage);		
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 1000000);
		consultadb().transaction(poblarcli, function(err){
    	 		 alert("Error select clientes : "+err.code+err.message);
         		});		
	function poblarcli(tx){  
	    
	    if (dia!="Todos"){
			var sql='SELECT * FROM CLIENTES WHERE DIA="'+dia+'" ORDER BY nombre  '			
		}
		else {
			var sql='SELECT * FROM CLIENTES ORDER BY nombre'			
		}
		tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select clientes por dia: "+err.code+err.message);
         		});    	
	}
	function listo(tx,results){  
		 $('#listaclientes').empty();        
		 $.each(results.rows,function(index){           
			 var row = results.rows.item(index);            
			 $('#listaclientes').append('<li id="'+row['clave']+'"><a href="#datoscli"><h3>'+row['clave']+'  '+row['nombre']+'</h3></a></li>');        
		 });         
		 $('#listaclientes').listview('refresh'); 
 	}

 // });	//$('#pclientes').live('pageshow',function(event, ui){
	
}// mostrarclientes
function mostrarcliente(clavecli){
//  $('#datoscli').live('pageshow',function(event, ui){
   	   window.localStorage.clear();
	   //guarda el cliente con el que se harán operaciones
	   saveidcliente(clavecli);
       var limite=0;
		$('#notascxc').text("Notas para el cliente " + clavecli);
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 200000);
		consultadb().transaction(consulta, errorconsulta);	
	function consulta(tx) {
		tx.executeSql('SELECT * FROM CLIENTES  WHERE clave="'+clavecli+'"',[],exito,errorconsulta);
		tx.executeSql('SELECT * FROM erpadmin_alcxc_pen_cob WHERE cod_clt="'+clavecli+'"',[],poblarfac,errorconsulta);    	
		//alert('entro a la consulta de datos de un cliente');
		}
	
		function exito(tx,results){         
	   		var row = results.rows.item(0);            
	   		$('#nomcli').text("Nombre: "+row['nombre']);
	   	    $('#clacli').text("Clave: "+row['clave']);
		    $('#direccion').text("Dirección: "+row['direccion']);
  	   		$('#telefono').text("Telefono: "+row['telefono']);
	   		$('#tipo').text("Tipo: "+row['tipo']);
  	   		$('#diascredito').text("Dias de Crédito: "+row['diasc']);
	   		$('#limitecredito').text("Límite de Crédito: "+row['lcredito']);
	   		$('#saldo').text("Saldo: "+row['saldo']);
			limite=row['lcredito'];
		}
		function poblarfac(tx,results){ 
		      $("#gridfaccli").empty();			  
			  var html = "";
			  var tipo="";
			  var saldot=0;
			  var montot=0;
			  var vencida="";
			  
			  html += "<div class=ui-block-a><div class=ui-bar ui-bar-a><strong></strong> Tipo</div></div>";
			  html += "<div class=ui-block-b><strong></strong> Documento</div>";
			  html += "<div class=ui-block-c><strong></strong> Vencimiento</div>";
			  html += "<div class=ui-block-d><strong></strong> Saldo</div>";
			  html += "<div class=ui-block-e><strong></strong> Monto</div>";
			  $.each(results.rows,function(index){
				  var row = results.rows.item(index); 				     
				     if (row['cod_tip_dc']=="1"){
						 tipo="FAC"
					 }
					 else  {
						 tipo="OTRO" 
					 }
					 if (row['vencida']=="S"){
						 vencida="S"
						 
					 }
					 saldot+=Number(row['saldo']);
					 montot+=Number(row['monto']);
					 html += "<div class=ui-block-a><strong></strong> " +tipo+"</div>";
					 html += "<div class=ui-block-b><strong></strong> "+row['num_doc']+"</div>";
                     html += "<div class=ui-block-c><strong></strong> "+row['fec_ven']+"</div>";
					 html += "<div class=ui-block-d><strong></strong> "+row['saldo']+"</div>";
                     html += "<div class=ui-block-e><strong></strong> "+row['monto']+"</div>";

                  	 
			  });
					$("#gridfaccli").append(html); 
					$("#saldocli").val(saldot); 
					$("#montocli").val(montot); 
					if (vencida=="S"){
						alert('El cliente tiene facturas vencidas, no podrá realizar ventas');
						
					}
					if (saldot>limite){
						alert('Cliente limite de credito excedido, no podrá realizar ventas');
						
					}

	   }
 		
	function errorconsulta(err) {
    	alert("Error SQL al poblar cliente: "+err.code+err.message);
	}
//  });	

  }//mostrarcliente

function llamadascxc(){	
  alert ('depositos');
    $.get("demo_test.asp",function(data,status){
     // alert("Data: " + data + "\nStatus: " + status);
    });
  

}

function preparadetalletemp(articulo,cantidad,existencia){
	   //para obtener el importe de descuento:
	   // dividir entre 100 el precio, multiplicar el resultado por el descuento y se obtiene el importe de descuento
	   //restar el importe de descuento al precio	   
	   var diferencia=existencia-cantidad;
	   alert('existencia '+existencia);
	   alert('cantidad '+cantidad);
	   
	   if (diferencia>=0){
	       insertatempfactura(articulo,cantidad);
	   }
	   else {
		   if (existencia>0){
			   insertatempfactura(articulo,cantidad);
               insertatemppedido(articulo,(cantidad-exis));
			   
		   }
		   else{
			   insertatemppedido(articulo,cantidad);
		   }
	   }
}//function insertatemppedido
function existeenpedido(articulo){
	existe=false;
	
	function listo(tx,results){ 	
	         alert('entra a funcion listo de existeenpedido');         	          
	     	 if (results.rows.length>0){
				alert('existe en pedido');  
				existe=true;  				
				alert('prueba de existe '+existe);  				
			  }
		  
 			}
	function existep(tx){  	
	        alert('entra a funcion existep');         	    
			var sql='SELECT articulo FROM TEMPEDIDO WHERE articulo="'+articulo+'"  ';			
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar existeTEMPEDIDO : "+err.code+err.message);
         		});    	
			sql='SELECT articulo FROM TEMFACTURA WHERE articulo="'+articulo+'"  ';			
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar existeTEMFACTURA : "+err.code+err.message);
         		});    	
								
	}
	consultadb().transaction(existep, function(err){
    	 		 alert("Error select tabla TEMPPEDIDO: "+err.code+err.message);
         		});		
	alert('prueba de existe2 '+existe);  
    return existe;
	
	
}//function insertatemppedido
function armacatalogo(){
 // $('#pclientes').live('pageshow',function(event, ui){
		//alert('This page was just hidden: '+ ui.prevPage);		
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 1000000);		
		consultadb().transaction(poblarcat, function(err){
    	 		 alert("Error select catálogo : "+err.code+err.message);
         		});		
	function poblarcat(tx){  	   
			var sql='SELECT a.articulo,a.descripcion,a.clas,a.accion,a.impuesto,a.descuento,b.existencia as ebodega,c.existencia as ealg,';
			sql+='(a.precio-((a.precio/100)*a.descuento)) as precio ';
			sql+='FROM articulo a left outer join articulo_existencia b on b.articulo=a.articulo and b.bodega="K01" ';
			sql+=' left outer join articulo_existencia c on c.articulo=a.articulo and c.bodega="ALG" order by a.descripcion';
			
			
			
		    tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select catalogo: "+sql+err.code+err.message);
         	});    	
	}
	function listo(tx,results){  
		 $('#lcatalogo').empty();        
		 $.each(results.rows,function(index){           
			 var row = results.rows.item(index);            
			 var html="";	         
			 html+='<li id='+row['articulo']+'>';
	         html+='<a href=""><img src="imagenes/sardel.jpg" width="100" height="100"/><h3> '+row['descripcion']+'</h3>';
			 html+='Clasificación:'+row['clas']+' AcciónT:'+row['accion']+'<br/>Precio:'+row['precio']+' Existencia:'+row['ebodega']+' ALG:'+row['ealg']+'</p></a></li>';
			 $('#lcatalogo').append(html);        
		 });         
		 $('#lcatalogo').listview('refresh'); 
 	}

 // });	//$('#pclientes').live('pageshow',function(event, ui){
	
}//armacatalogo

function sugerido(){
	var artsug=[];
	var cantsug=[];
	var exissug=[];
	var cliente=window.localStorage.getItem("clave");	
	var i=0;
	function listo(tx,results){ 	      
	      if (results.rows.length>0){
			$.each(results.rows,function(index){           
			 var row = results.rows.item(index);            			
			 if (row['cantidad']>0){
			 	//preparadetalletemp(row['articulo'],row['cantidad']);								
				artsug[i]=row['articulo'];
				cantsug[i]=row['cantidad'];
				exissug[i]=row['existencia'];
				i++;
			 }//if (row['cantidad']>0)			 
		  	}); //$.each       				  
		  }//if			  
		  /*else
		  {
			alert('no hubo resultados de sugerido');  
			
		  }*/
 	}//function listo(tx,results){ 
	function consultasug(tx){   	    	        
			var sql='SELECT * FROM SUGERIDO a left outer join articulo_existencia b on b.articulo=a.articulo and b.bodega="K01" WHERE cliente="'+cliente+'"  ';			
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar sugerido del cliente : "+cliente+err.code+err.message);
         		});    									
	}
	consultadb().transaction(consultasug, function(err){
    	 			 alert("Error select tabla sugerido: "+err.code+err.message);
         		},function(){
				 alert(artsug.length);
				 for (var i = 0, long = artsug.length; i < long; i++) {   					 
					   alert(artsug[i]+' '+cantsug[i]+' '+exissug[i]);
					   preparadetalletemp(artsug[i],cantsug[i],exissug[i])
				 }
				 mostrarpedido();
                 mostrarfactura(); 
				});		
				
}//function sugerido
