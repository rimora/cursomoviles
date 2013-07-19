//devoluciones
function listafacturas(){
 // $('#pclientes').live('pageshow',function(event, ui){
		//alert('This page was just hidden: '+ ui.prevPage);		
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 1000000);
		consultadb().transaction(poblarfac, function(err){
    	 		 alert("Error poblar facturas para devoluciones : "+err.code+err.message);
         		});		
	function poblarfac(tx){  
		    //alert('entra a poblarfac');
			var sql='SELECT * FROM ENCHISFAC WHERE CLIENTE="'+window.localStorage.getItem("clave")+'" ORDER BY FACTURA';		
			
		    //alert(sql);
		tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select historico facturas: "+err.code+err.message);
         		});    	
	}
	function listo(tx,results){  
	      //alert('entra a listo');
		 $('#listahistfac').empty(); 		     
		 $.each(results.rows,function(index){           
			 var row = results.rows.item(index); 
			 var html="";               			 
			 html+='<li id="'+row['factura']+'">';
	         html+='<a href="#pdethistfac"><h5> Factura: '+row['factura']+'</h5>';
			 html+='Total:  '+row['monto']+'    Pedido:   '+row['pedido']+'    Fecha:   '+row['fecha']+'</a></li>';
			 //alert('antes del append de listfac '+html);
			 $('#listahistfac').append(html);  			
			 //alert('despues del append de listfac '+html); 
		 });    
		 //alert('antes de refresh de lista');  		 
		 $('#listahistfac').listview('refresh'); 
		 //alert('despues de refresh de lista');
 	}

 // });	//$('#pclientes').live('pageshow',function(event, ui){
	
}// listafacturas()
function mostrarhistfac(factura){
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 200000);
		consultadb().transaction(consulta, errorconsulta);	
	function consulta(tx) {	
        var sql='SELECT a.factura,a.articulo,a.cantidad,a.devuelto,a.precio,a.totlinea,a.linea, ';
	    sql+='(a.precio-((a.precio/100)*b.descuento)) as preciocdesc,b.descripcion,c.cantidad as temdev FROM DETHISFAC a ';	
		sql+='left outer join articulo b on b.articulo=a.articulo left outer join TEMDEV c on c.linea=a.linea where a.factura="'+factura+'"';	
		
		tx.executeSql(sql ,[],exito,errorconsulta);
		}		
		function exito(tx,results){ 
			
		      $("#griddethistfac").empty();				  
			  var html = "";
		      var precio=0;
			  //agrega encabezado de grid
			  html+=' <div class="ui-block-a" style="width:110px" ><div class="ui-bar ui-bar-a">Articulo</div></div> ';           
              html+=' <div class="ui-block-b" style="width:300px"><div class="ui-bar ui-bar-a">Descrip.</div></div>';
              html+=' <div class="ui-block-c" style="width:90px"><div class="ui-bar ui-bar-a">Disp.</div></div>';
              html+=' <div class="ui-block-d" style="width:90px"><div class="ui-bar ui-bar-a">Devuelto</div></div>';
              html+=' <div class="ui-block-e" style="width:90px"><div class="ui-bar ui-bar-a">Precio</div></div>';
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				     //descuento=(row['precio']/100)*row['descuento'];
				     //precio=row['precio']*(1+(row['impuesto']/100));	
					 //alert (row['temdev']);
					 if (row['temdev']==null){
						var devuelto= Number(row['devuelto']);												 
					 }
					 else {
					 	var devuelto= Number(row['devuelto'])+Number(row['temdev']);												 
					 }
					 //alert (devuelto);
					 //alert( row['cantidad']);
					 precio=row['preciocdesc'];	
					 var disponible=Number(row['cantidad'])-Number(devuelto);			 
					 //importe=precio*row['cantidad'];
					 //total+=Number(importe);					 
					html+='<div class="ui-block-a" style="width:110px"><div class="ui-bar ui-bar-e">'+row['articulo']+'</div></div>';   		 		                    html+='<div class="ui-block-b" style="width:300px"><div class="ui-bar ui-bar-b">'+row['descripcion']+'</div></div>';
                    html+='<div class="ui-block-c" style="width:90px"><div class="ui-bar ui-bar-b">'+disponible+'</div></div>';
                    html+='<div class="ui-block-d" style="width:90px"><div class="ui-bar ui-bar-b"><a href="#" class="clasedev" name="'+row['linea']+'"><font color="FFFFFF">'+devuelto+'</font></a></div></div>';
	                html+='<div class="ui-block-e" style="width:90px"><div class="ui-bar ui-bar-b">'+precio.toFixed(2)+'</div></div> ';
                  	 
			  });//.each
					$("#griddethistfac").append(html); 
					//$("#tpedido").attr("value",total); 			
					//$("#tpedido").val(total.toFixed(2)); 			
					
					//alert('total'+total);					 
			
	   }//function exito
 		
	function errorconsulta(err) {
    	alert("Error al llenar detalles historico factura "+err.code+err.message);
	}
//  });	

  }//mostrarhistfac
  
  function mostrarartdev(){
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 200000);
		consultadb().transaction(consulta, errorconsulta);	
	function consulta(tx) {	
        	var sql='SELECT a.articulo,a.cantidad,obs ';
	    	sql+='FROM TEMDEV a where cantidad>0 ';	
				
			tx.executeSql(sql ,[],exito,errorconsulta);
	}		
		function exito(tx,results){ 
			
		      $("#gridartdev").empty();				  
			  var html = "";
		      var precio=0;
			  //agrega encabezado de grid
			  html+=' <div class="ui-block-a" style="width:110px" ><div class="ui-bar ui-bar-a">Articulo</div></div> ';           
              html+=' <div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-a">Cantidad</div></div>';
			  html+=' <div class="ui-block-c" style="width:500px"><div class="ui-bar ui-bar-a">Observaciones</div></div>';
              
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				    html+='<div class="ui-block-a" style="width:110px"><div class="ui-bar ui-bar-e">'+row['articulo']+'</div></div>';   		 		                    html+='<div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-b">'+row['cantidad']+'</div></div>';                  
					html+='<div class="ui-block-c" style="width:500px"><div class="ui-bar ui-bar-b">'+row['obs']+'</div></div>';                  
                  	 
			  });//.each
					$("#gridartdev").append(html); 
					//$("#tpedido").attr("value",total); 			
					//$("#tpedido").val(total.toFixed(2)); 			
					
					//alert('total'+total);					 
			
	   }//function exito
 		
	function errorconsulta(err) {
    	alert("Error al llenar detalles devoluciones "+err.code+err.message);
	}
//  });	

  }//mostrarartdev
  
function guardadev(observagen){	
var cabinsertada=false;
var renglones=0;
var sumtotlinea=0;
var summontodesc=0;
var sumivalinea=0;
var factura=window.localStorage.getItem("factura");
var cliente=window.localStorage.getItem("clave");
var consecutivo=window.localStorage.getItem("consedev");
var ruta=window.localStorage.getItem("ruta");
var bodega=window.localStorage.getItem("bodega");
var horaini=window.localStorage.getItem("fechahora");//fecha y hora actual guardada cuando inicio la devolución de la factura.
guardafechaactual();//guarda en memoria la fecha con hora, actuales
var horafin= window.localStorage.getItem("fechahora");//recuperamos la nueva fecha y hora actual
var fechadev=window.localStorage.getItem("fecha");//recuperamos la fecha actual
var longitud=consecutivo.length;
var inicial=consecutivo.substr(0,3);
var numdev= consecutivo.substr(3,(longitud-3));
 //alert(numdev); 
var incremetard=Number(numdev)+1;
 //alert(incremetard); 
var devolucion=inicial+pad(incremetard,6);
 //alert(devolucion); 
   function pad(n, length){
	//   alert('entra a funcion'+n); 
  	 n = n.toString();
   	 while(n.length < length) n = "0" + n;
  	 return n;
   }
	function listo(tx,results){ 	      
	      if (results.rows.length>0){
			  renglones=results.rows.length;
		  	 $.each(results.rows,function(index){           			 
			 var row = results.rows.item(index);  
			 var cantidad=row['cantidad'];//cantidad vendida			 
			 var linea=row['linea'];//linea afectada			 
			 var precio=row['precio'];//precio sin descuento y sin iva			 
			 var pordesc=row['descuento'];//porcentaje de descuento que se aplica 
			 var totalinea=Number(row['cantidad'])*Number(row['precio']);//total de linea sin descuento y sin iva
			 var montodesc=(Number(totalinea)/100)*Number(row['descuento']); 
			 var lineacdes=totalinea-montodesc;//importe de linea con descuento
			 var ivalinea=lineacdes*(row['impuesto']/100);			 			 
			 //var preciociva=preciocdesc*(1+(row['impuesto']/100));			 			 
			 var articulo=row['articulo'];			 
			 var observa=row['obs'];
			
			 sumtotlinea+=sumtotlinea+totalinea;//suma del total de linea sin descuento y sin iva
			 //summontodesc+=summontodesc+montodesc;//suma del total de linea sin descuento y sin iva
			 sumivalinea+=sumivalinea+ivalinea;//suma del total de linea sin descuento y sin iva
			 //alert('antes de llamar a funcion guardadev');
			 guardadetdev(devolucion,ruta,articulo,totalinea.toFixed(2),precio,cantidad,observa,montodesc.toFixed(2),pordesc,factura,linea);
			 actexis(articulo,cantidad);
			 //alert('despues de llamar a funcion guardadev');
			
		 	});
			//alert('antes de llamar a funcion guardaencdev');
			 guardaencdev(devolucion,ruta,cliente,horaini,horafin,fechadev,observagen,renglones,sumtotlinea.toFixed(2),sumivalinea.toFixed(2),bodega,factura)
			//alert('despues de llamar a funcion guardaencdev');
		  }//if (results.rows.length>0){		  
 	}//function listo(tx,results){ 
	function consultatemp(tx){  
	          //   alert('ENTRA A CONSultatepm'); 
				  var sql='SELECT b.factura,a.articulo,a.cantidad,b.precio,a.obs,a.linea, ';
	  			  sql+='c.impuesto,c.descuento FROM TEMDEV a left outer join DETHISFAC b on b.linea=a.linea ';					  
			      sql+='left outer join articulo c on c.articulo=a.articulo  ';
				  sql+=' where a.cantidad > 0 and b.factura="'+window.localStorage.getItem("factura")+'"';	

			    //alert(sql);
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error al preparar guardar devolución : "+linea+err.code+err.message);
         		});    									
	}
	consultadb().transaction(consultatemp, function(err){
    	 			 alert("Error select tabla temporal dethisfac para devolver: "+err.code+err.message);
         		});		
				
}//function guardadev
function insertalindev(linea,cantidad,observa){	
	function listo(tx,results){ 	      
	      if (results.rows.length>0){			
			 	var row = results.rows.item(0); 
			    var articulo=row['articulo'];
			 //if (row['cantidad']>0){
			 	//preparadetalletemp(row['articulo'],row['cantidad']);																
				var dif=Number(row['cantidad'])-Number(row['devuelto']);
				//alert ('dif '+dif);
				//alert ('cantidad '+cantidad);
				//alert ('linea '+linea);
 			 	if (cantidad>dif){//se intenta devolver mas de la cantidad disponible para devolución
					navigator.notification.alert('Se intenta devolver una cantidad mayor que el disponible',null,'Error Indicando Cantidad','Aceptar');						 					return false;				 
				 }
				 //alert('pasa depues del if');
				 actualizatempdev(linea,cantidad,observa)
				 mostrarhistfac(window.localStorage.getItem("factura"));
				 mostrarartdev();
		  }//if (results.rows.length>0){		  
 	}//function listo(tx,results){ 
	function consultatemp(tx){   	       
				//alert('articulo de MODIFICAR temPEDIDO '+articulo);
				 var sql='SELECT a.articulo,a.cantidad,a.devuelto,a.linea, ';
	   			 sql+='b.cantidad as temdev FROM DETHISFAC a ';	
				 sql+='left outer join TEMDEV b on b.linea=a.linea where a.factura="'+window.localStorage.getItem("factura")+'" and a.linea='+linea;	
		
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar DETHISFAC : "+articulo+err.code+err.message);
         		});    									
	}
	consultadb().transaction(consultatemp, function(err){
    	 			 alert("Error select tabla DETHISFAC: "+err.code+err.message);
         		});		
				
}//function insertalindev
function copiadethistempd(){	
	function listo(tx,results){
		   $.each(results.rows,function(index){           
			 var row = results.rows.item(index); 
			 insertatempdev(row['articulo'],row['linea']);
		 });    		 	      
 	}//function listo(tx,results){ 
	function consultatemp(tx){   	       
				//alert('articulo de MODIFICAR temPEDIDO '+articulo);
				 var sql='SELECT a.articulo,a.linea ';
	   			 sql+='FROM DETHISFAC a ';	
				 sql+='where a.factura="'+window.localStorage.getItem("factura")+'"';	
		
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error copiar temporal TEMDEV : "+articulo+err.code+err.message);
         		});    									
	}
	consultadb().transaction(consultatemp, function(err){
    	 			 alert("Error select copiar tabla temporal TEMDEV: "+err.code+err.message);
         		});		
				
}//function copiadethistempd
function mostrarddev(linea){	
	function listo(tx,results){ 	      
	      if (results.rows.length>0){			
			 	var row = results.rows.item(0); 
			    $("#cantidaddev").val(row['cantidad']);
				$("#obsrendev").val(row['obs']);			
				$("#encdialogodev").val('Indica Cantidad a Devolver para: '+row['articulo']);
		  }//if (results.rows.length>0){		  
 	}//function listo(tx,results){ 
	function consultatemp(tx){   	       
				//alert('articulo de MODIFICAR temPEDIDO '+articulo);
				 var sql='SELECT a.cantidad,a.obs,a.articulo ';
	   			 sql+='FROM TEMDEV a ';	
				 sql+='where a.linea='+linea;	
		
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar temporal para dialogo: "+articulo+err.code+err.message);
         		});    									
	}
	consultadb().transaction(consultatemp, function(err){
    	 			 alert("Error select tabla temporal TEMDEV: "+err.code+err.message);
         		});		
				
}//function mostrarddev(linea)



function f1(){	
	function listo(tx,results){ 	      
	         alert('antes de listo de f1');
			 f1_1();			 
			 alert('despues de listo de f1');
 	}//function listo(tx,results){ 
	function consultatemp(tx){  
	             alert('ENTRA A CONSultatepm'); 
				  var sql='SELECT * FROM TEMDEV ';
								
				  tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error en select: "+err.code+err.message);
         		  },alert('funcion ok, del select'));    									
	}
	consultadb().transaction(consultatemp, function(err){
    	 			 alert("Error select tabla temporal dethisfac para devolver: "+err.code+err.message);
         		},alert('funcion ok, del consultadb().transaction'));		
				
}//function prueba funcion1
