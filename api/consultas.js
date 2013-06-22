// consultas
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
function preparadetalletemp(articulo,cantidad){
	   //para obtener el importe de descuento:
	   // dividir entre 100 el precio, multiplicar el resultado por el descuento y se obtiene el importe de descuento
	   //restar el importe de descuento al precio
	   var exis=existencia(articulo);
	   var diferencia=exis-cantidad;
	   if (diferencia>=0){
	       insertatempfactura(articulo,cantidad);
	   }
	   else {
		   if (exis>0){
			   insertatempfactura(articulo,cantidad);
               insertatemppedido(articulo,(cantidad-exis));
			   
		   }
		   else{
			   insertatemppedido(articulo,cantidad);
		   }
	   }
}//function insertatemppedido
function mostrarpedido(){
	//muestra en un collapsible los renglones temporales de pedido, agregandolos en un grid
	//el usuario podrá eliminar los renglones que se selecciones por medio de checkbox
//  $('#datoscli').live('pageshow',function(event, ui){   	   
		alert('entra mostrar pedido');
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 200000);
		consultadb().transaction(consulta, errorconsulta);	
	function consulta(tx) {		
		tx.executeSql('SELECT a.articulo,b.descripcion,b.precio,b.descuento,a.cantidad,b.impuesto FROM TEMPEDIDO a left outer join articulo b on b.articulo=a.articulo',[],exito,errorconsulta);
		
		}
	
		
		function exito(tx,results){ 
		      $("#gridpedido").empty();			  
			  var html = "";
			  var tipo="";
			  var saldot=0;
			  var montot=0;			  
		      var precio=0;
	    	  var total=0;              
			  //agrega encabezado de grid
			  html+=' <div class="ui-block-a" style="width:70px;height:20px" > ';            
              html+=' <div class="ui-bar ui-bar-a">Elim.</div></div> ';           
              html+=' <div class="ui-block-b"><div class="ui-bar ui-bar-a">Articulo</div></div>';
              html+=' <div class="ui-block-c"><div class="ui-bar ui-bar-a">Descrip.</div></div>';
              html+=' <div class="ui-block-d"><div class="ui-bar ui-bar-a">Cantidad</div></div>';
              html+=' <div class="ui-block-e"><div class="ui-bar ui-bar-a">Precio</div></div>';
          
			  $.each(results.rows,function(index){
				  var row = results.rows.item(index); 				     			     
				     descuento=(row['precio']/100)*row['descuento'];
				     precio=row['precio']-descuento;				 
					 total+=precio*row['cantidad'];
					 alert(total);					 
					html+='<div class="ui-block-a" style="width:70px;height:20px" >';              
           			html+='<div class="ui-bar ui-bar-e"  >';      		 		
                   	html+='<div style="padding:0px; margin-top:-8px; margin-left:-10px">'; 
			        html+='     <label for="P'+row['articulo']+'" >&nbsp</label>';  
            		html+='     <input type="checkbox" id="P'+row['articulo']+'" name="'+row['articulo']+'" />';
                   	html+='		</div>';	
		            html+='   </div>';
            		html+='</div>';            
                    html+='<div class="ui-block-b"><div class="ui-bar ui-bar-b">'+row['articulo']+'</div></div>';
                    html+='<div class="ui-block-c"><div class="ui-bar ui-bar-b">'+row['descripcion']+'</div></div>';
                    html+='<div class="ui-block-d"><div class="ui-bar ui-bar-b">'+row['cantidad']+'</div></div>';
	                html+='<div class="ui-block-e"><div class="ui-bar ui-bar-b">'+precio+'</div></div> ';

                  	 
			  });//.each
					$("#gridpedido").append(html); 
					$("#tpedido").value(total); 			
					
					alert(total);
	   }//function exito
 		
	function errorconsulta(err) {
    	alert("Error SQL al llenar detalles pedido: "+err.code+err.message);
	}
//  });	

  }//mostrarpedido
function mostrarfactura(){
	//muestra en un collapsible los renglones temporales de pedido, agregandolos en un grid
	//el usuario podrá eliminar los renglones que se selecciones por medio de checkbox
//  $('#datoscli').live('pageshow',function(event, ui){   	   
		alert('entra mostrar factura');
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 200000);
		consultadb().transaction(consulta, errorconsulta);	
	function consulta(tx) {		
		tx.executeSql('SELECT a.articulo,b.descripcion,b.precio,b.descuento,a.cantidad,b.impuesto FROM TEMFACTURA a left outer join articulo b on b.articulo=a.articulo',[],exito,errorconsulta);
		
		}
	
		
		function exito(tx,results){ 
		      $("#gridfactura").empty();			  
			  var html = "";
			  var tipo="";
			  var saldot=0;
			  var montot=0;			  
		      var precio=0;
	    	  var total=0;              
			  //agrega encabezado de grid
			  html+=' <div class="ui-block-a" style="width:70px;height:20px" > ';            
              html+=' <div class="ui-bar ui-bar-a">Elim.</div></div> ';           
              html+=' <div class="ui-block-b"><div class="ui-bar ui-bar-a">Articulo</div></div>';
              html+=' <div class="ui-block-c"><div class="ui-bar ui-bar-a">Descrip.</div></div>';
              html+=' <div class="ui-block-d"><div class="ui-bar ui-bar-a">Cantidad</div></div>';
              html+=' <div class="ui-block-e"><div class="ui-bar ui-bar-a">Precio</div></div>';
          
			  $.each(results.rows,function(index){
				  var row = results.rows.item(index); 				     			     
				     descuento=(row['precio']/100)*row['descuento'];
				     precio=row['precio']-descuento;				 
					 total+=precio*row['cantidad'];
					 					 
					html+='<div class="ui-block-a" style="width:70px;height:20px" >';              
           			html+='<div class="ui-bar ui-bar-e"  >';      		 		
                   	html+='<div style="padding:0px; margin-top:-8px; margin-left:-10px">'; 
			        html+='     <label for="F'+row['articulo']+'" >&nbsp</label>';  
            		html+='     <input type="checkbox" id="F'+row['articulo']+'" name="'+row['articulo']+'" />';
                   	html+='		</div>';	
		            html+='   </div>';
            		html+='</div>';            
                    html+='<div class="ui-block-b"><div class="ui-bar ui-bar-b">'+row['articulo']+'</div></div>';
                    html+='<div class="ui-block-c"><div class="ui-bar ui-bar-b">'+row['descripcion']+'</div></div>';
                    html+='<div class="ui-block-d"><div class="ui-bar ui-bar-b">'+row['cantidad']+'</div></div>';
	                html+='<div class="ui-block-e"><div class="ui-bar ui-bar-b">'+precio+'</div></div> ';

                  	 
			  });//.each
					$("#gridfactura").append(html); 
					$("#tfactura").value(total); 			
					
					alert(total);
	   }//function exito
 		
	function errorconsulta(err) {
    	alert("Error SQL al llenar detalles factura: "+err.code+err.message);
	}
//  });	

  }//mostrarfatura
function existeenpedido(articulo){
	var existe=false;
	consultadb().transaction(existep, function(err){
    	 		 alert("Error select tabla TEMPPEDIDO: "+err.code+err.message);
         		});		
	function existep(tx){   	    
			var sql='SELECT articulo FROM TEMPEDIDO WHERE articulo="'+articulo+'"  '			
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar existeTEMPEDIDO : "+err.code+err.message);
         		});    	
			sql='SELECT articulo FROM TEMFACTURA WHERE articulo="'+articulo+'"  '			
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar existeTEMFACTURA : "+err.code+err.message);
         		});    	
								
	}
	function listo(tx,results){ 
	      
	      if (results.rows.length>0){
			alert('existe en pedido');  
			existe=true;  
		  }
		  
 	}
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
		/*	var sql='SELECT a.articulo,a.descripcion,a.clas,a.accion,a.impuesto,a.descuento,b.existencia as ebodega,c.existencia as c.ealg,';
			sql+='(a.precio-((a.precio/100)*a.descuento)) as precio ';
			sql+='FROM articulo a left outer join articulo_existencia b on b.articulo=a.articulo and b.bodega="K01" ';
			sql+=' left outer join articulo_existencia c on c.articulo=a.articulo and c.bodega="ALG" ORDER BY a.descripcion  '			*/
			var sql='SELECT a.articulo,a.descripcion,a.clas,a.accion,a.impuesto,a.descuento,b.existencia as ebodega,c.existencia as ealg,';
			sql+='(a.precio-((a.precio/100)*a.descuento)) as precio ';
			sql+='FROM articulo a left outer join articulo_existencia b on b.articulo=a.articulo and b.bodega="K01" ';
			sql+=' left outer join articulo_existencia c on c.articulo=a.articulo and c.bodega="ALG" ';
			
			
			
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
function existencia(articulo){
	var existe=0;
	consultadb().transaction(existebodega, function(err){
    	 		 alert("Error select tabla ARTICULO_EXISTENCIA: "+err.code+err.message);
         		});		
	function existebodega(tx){   	    
			var sql='SELECT existencia FROM ARTICULO_EXISTENCIA WHERE articulo="'+articulo+'" AND bodega="K01"';			
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar existencia : "+err.code+err.message);
         		});    	
								
	}
	function listo(tx,results){ 
	      
	      if (results.rows.length>0){
			var row = results.rows.item(index);    
			existe=row['existencia'];			

		  }
		  
 	}
    return existe;
	
	
}//function existencia

