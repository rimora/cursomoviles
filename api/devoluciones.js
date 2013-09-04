//devoluciones
var base = window.openDatabase("Database", "1.0", "SARDEL", 10000000);	
function listafacturas(cliente){
 // $('#pclientes').live('pageshow',function(event, ui){
		//alert('This page was just hidden: '+ ui.prevPage);		
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 1000000);
		base.transaction(poblarfac, function(err){
    	 		 alert("Error poblar facturas para devoluciones : "+err.code+err.message);
         		});		
	function poblarfac(tx){  
		    //alert('entra a poblarfac');
			var sql='SELECT * FROM ENCHISFAC WHERE CLIENTE="'+cliente+'" ORDER BY FACTURA';		
			
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
			 var monto=Number(row['monto']);		 
			 html+='<li id="'+row['factura']+'">';
	         html+='<a href="#"><h5> Documento: '+row['factura']+'</h5>';
			// html+='Total:  '+row['monto']+'    Pedido:   '+row['pedido']+'    Fecha:   '+row['fecha']+'</a></li>';
			 html+='Total:  '+monto.toFixed(2)+' Fecha:   '+row['fecha']+'</a></li>';
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
		var total=0;
		consultadb().transaction(consulta, errorconsulta);	
	function consulta(tx) {	
        var sql='SELECT a.factura,a.articulo,a.cantidad,a.devuelto,a.precio,a.totlinea,a.linea, ';
	    sql+=' b.descripcion,c.cantidad as temdev,c.obs FROM DETHISFAC a ';	
		sql+='left outer join articulo b on b.articulo=a.articulo left outer join TEMDEV c on c.linea=a.linea where a.factura="'+factura+'"';	
		
		tx.executeSql(sql ,[],exito,errorconsulta);
		}		
		function exito(tx,results){ 
			
		      $("#griddethistfac").empty();
			  $("#divdevueltos").empty();
			  var html = "";
			  var html2 = "";
			  //agrega encabezado de grid
			  html+=' <div class="ui-block-a" style="width:360px" ><div class="ui-bar ui-bar-a">Articulo</div></div> ';           
			  html+=' <div class="ui-block-b" style="width:50px"><div class="ui-bar ui-bar-a" style="text-align:right">Cant</div></div>';
			  html+=' <div class="ui-block-c" style="width:50px"><div class="ui-bar ui-bar-a" style="text-align:right">Dev</div></div>';
              html+=' <div class="ui-block-d" style="width:50px"><div class="ui-bar ui-bar-a" style="text-align:right">Disp</div></div>';            
			  html+='<div class="ui-block-e" style="width:160px">';			  
				  html+='<div class="ui-grid-a" style="margin-top:0px">';
					  	html+='<div class="ui-block-a" style="width:80px"><div class="ui-bar ui-bar-a" style="text-align:right">Precio</div></div>';
                        html+='<div class="ui-block-b" style="width:80px"><div class="ui-bar ui-bar-a" style="text-align:right">Total</div></div>'; 				  html+='</div></div>';   
			     
			  html2+='<h1><b>ARTICULOS DEVUELTOS</b></h1>';
           	  html2+='<div class="ui-grid-b" id="gridartdev">';
			  html2+=' <div class="ui-block-a" style="width:300px"><div class="ui-bar ui-bar-a">Articulo</div></div> ';           
              html2+=' <div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-a">Cantidad</div></div>';
			  html2+=' <div class="ui-block-c" style="width:200px"><div class="ui-bar ui-bar-a">Observaciones</div></div>';
              
				  
				  
				  
			  
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				     //descuento=(row['precio']/100)*row['descuento'];
				     //precio=row['precio']*(1+(row['impuesto']/100));	
					 //alert (row['temdev']);
					/*
					 if (row['temdev']==null){
						var devuelto= Number(row['devuelto']);												 
					 }
					 else {
					 	var devuelto= Number(row['devuelto'])+Number(row['temdev']);												 
					 }*/
					 var devuelto= Number(row['devuelto'])+Number(row['temdev']);												 
					 //alert (devuelto);
					 //alert( row['cantidad']);
					 var totlinea=Number(row['totlinea']);
					 var totimpdes=(Number(row['precio'])*Number(row['cantidad']))-Number(row['totlinea']);
					 var descuento=(totimpdes*100)/(Number(row['precio'])*Number(row['cantidad']));
					 var preciocdesc=Number(row['precio'])-((Number(row['precio'])/100)*Number(descuento));				     			     
					 var precio=Number(row['precio']);	
					 var disponible=Number(row['cantidad'])-Number(devuelto);			 
					 total+=Number(row['temdev'])*preciocdesc;
					 //importe=precio*row['cantidad'];
					 //total+=Number(importe);					 					                 	
					 html+=' <div class="ui-block-a" style="width:360px" ><div class="ui-bar ui-bar-b">'+row['descripcion']+'</div></div> ';           
			  html+=' <div class="ui-block-b" style="width:50px"><div class="ui-bar ui-bar-b" style="text-align:right">'+row['cantidad']+'</div></div>';
			  html+=' <div class="ui-block-c" style="width:50px"><div class="ui-bar ui-bar-b" style="text-align:right"><a href="#" class="clasedev" name="'+row['linea']+'">'+devuelto+'</a></div></div>';
              html+=' <div class="ui-block-d" style="width:50px"><div class="ui-bar ui-bar-b" style="text-align:right">'+disponible+'</div></div>';              
			  html+='<div class="ui-block-e" style="width:160px">';
			  
				  html+='<div class="ui-grid-a" style="margin-top:0px">';
					  	html+='<div class="ui-block-a" style="width:80px"><div class="ui-bar ui-bar-b" style="text-align:right">'+preciocdesc.toFixed(2)+'</div></div>';
                        html+='<div class="ui-block-b" style="width:80px"><div class="ui-bar ui-bar-b" style="text-align:right">'+totlinea.toFixed(2)+'</div></div>';  
						html+='</div></div>';
			if (Number(row['temdev']>0)){										
         	 html2+='<div class="ui-block-a" style="width:300px"><div class="ui-bar ui-bar-e">'+row['descripcion']+'</div></div>';
			 html2+='<div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-b">'+row['temdev']+'</div></div>';
			 html2+='<div class="ui-block-c" style="width:200px"><div class="ui-bar ui-bar-b">'+row['obs']+'</div></div>';
			}
                  	 
				  
                  	 
			  });//.each
					$("#griddethistfac").append(html); 
	               html2+='</div>'; 
				   html2+='<br>'; 				   
	               html2+='<div data-role="fieldcontain">';		
			        html2+='<label for="obsgendev" style="font-size:16px; color:#F00" >Observaciones Generales:</label>';
			        html2+='<textarea  style="width:30%"  name="obsgendev" id="obsgendev"></textarea>';
				   html2+='</div>';
				   $("#divdevueltos").append(html2); 
				   $("#gridtotaldev").empty(); 
				   html2='';
				   html2+='<div class="ui-block-a" style="width:120px" ><div class="ui-bar ui-bar-a">Total</div></div>';
                   html2+='<div class="ui-block-b" style="width:120px; text-align:right"><div class="ui-bar ui-bar-b" >'+total.toFixed(2)+'</div></div>';
				   $("#gridtotaldev").append(html2); 
					guardatotaldev(total);
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
		base.transaction(consulta, errorconsulta);	
	function consulta(tx) {	
        	var sql='SELECT a.articulo,a.cantidad,obs,b.descripcion ';
	    	sql+='FROM TEMDEV a left outer join articulo b on b.articulo=a.articulo where cantidad>0 ';	
				
			tx.executeSql(sql ,[],exito,errorconsulta);
	}		
		function exito(tx,results){ 
			
		      $("#gridartdev").empty();				  
			  var html = "";
		      var precio=0;
			  //agrega encabezado de grid
			  html+=' <div class="ui-block-a" style="width:300px" ><div class="ui-bar ui-bar-a">Articulo</div></div> ';           
              html+=' <div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-a">Cantidad</div></div>';
			  html+=' <div class="ui-block-c" style="width:300px"><div class="ui-bar ui-bar-a">Observaciones</div></div>';
              
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				    html+='<div class="ui-block-a" style="width:300px"><div class="ui-bar ui-bar-e">'+row['descripcion']+'</div></div>';   		 		                    
					html+='<div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-b">'+row['cantidad']+'</div></div>';                  
					html+='<div class="ui-block-c" style="width:300px"><div class="ui-bar ui-bar-b">'+row['obs']+'</div></div>';                  
                  	 
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
  
function guardadev(observagen,cargovendedor){	
var sumtotlineav=0; var summontodescv=0; var sumivalineav=0; var sumtotalv=0;
var conseped=window.localStorage.getItem("consepedido");
var longitud=conseped.length; var inicial=conseped.substr(0,3); var numpedido= conseped.substr(3,(longitud-3));
 //alert(numpedido); 
var incremetarp=Number(numpedido)+1;
 //alert(incremetarp); 
var pedido=inicial+pad(incremetarp,6);
 //alert(pedido); 
var vendedor= window.localStorage.getItem("vendedor");
var renglones=0; var sumtotal=0;
var sumtotlinea=0; var summontodesc=0; var sumivalinea=0;
var factura=window.localStorage.getItem("factura"); var cliente=window.localStorage.getItem("clave");
var consecutivo=window.localStorage.getItem("consedev"); var ruta=window.localStorage.getItem("ruta");
var bodega=window.localStorage.getItem("bodega");
var horaini=window.localStorage.getItem("fechahora");//fecha y hora actual guardada cuando inicio la devolución de la factura.
guardafechaactual();//guarda en memoria la fecha con hora, actuales
var horafin= window.localStorage.getItem("fechahora");//recuperamos la nueva fecha y hora actual
var fechadev=window.localStorage.getItem("fecha");//recuperamos la fecha actual
var longitud=consecutivo.length; var inicial=consecutivo.substr(0,3); var numdev= consecutivo.substr(3,(longitud-3));
 //alert(numdev); 
var incremetard=Number(numdev)+1;
 //alert(incremetard); 
var devolucion=inicial+pad(incremetard,6);
 //alert(devolucion); 
 var querydev=[];
 var i=0;
 var linea=1;
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
			 
			     //precio unitario del articulo en la factura (precio publico)* cantidad facturada, menos el total de la linea que incluye el descuento aplicado
			 var totimpdes=(Number(row['precio'])*Number(row['cantfac']))-Number(row['totlinea']);//se obtiene el importe de descuento de la linea de factura			 
			    //se obtiene el porcentaje de descuento asignado en la factura para calcularlo ahora en los renglones de la devolucion
			 var pordesc=(totimpdes*100)/(Number(row['precio'])*Number(row['cantfac']));			 
			 var cantidad=row['cantidad'];//cantidad devuelta			 
			 var linea=row['linea'];//linea afectada			 
			 var precio=row['precio'];//precio sin descuento y sin iva, precio publico asignado en la factura
			 var totalinea=Number(row['cantidad'])*Number(row['precio']);//total de linea devuelta sin descuento y sin iva
				 //monto de descuento aplicado a la linea de devolucion
			 var montodesc=(Number(totalinea)/100)*Number(pordesc); 
			 var lineacdes=totalinea-montodesc;//importe de linea con descuento
				//total de iva de la linea de devolucion
			 var ivalinea=lineacdes*(row['impuesto']/100);
			 //var preciociva=preciocdesc*(1+(row['impuesto']/100));			 			 
			 var articulo=row['articulo'];			 
			 var observa=row['obs'];
			
			 sumtotlinea+=totalinea;//suma del total de linea sin descuento y sin iva
			 sumtotal+=lineacdes+ivalinea;//
			 summontodesc+=montodesc;//suma del monto de descuento
			 sumivalinea+=ivalinea;//suma del total de linea sin descuento y sin iva
			 //alert('antes de llamar a funcion guardadev');
			 //guardadetdev(devolucion,ruta,articulo,totalinea.toFixed(2),precio,cantidad,observa,montodesc.toFixed(2),pordesc,factura,linea);
			querydev[i]='INSERT INTO DETDEV (num_dev,cod_zon,cod_art,ind_dev,mon_tot,mon_prc_mx,mon_prc_mn,cnt_max,obs_dev,mon_dsc,por_dsc_ap) VALUES("'+devolucion+'","'+ruta+'","'+articulo+'","B",'+totalinea.toFixed(2)+','+precio+','+precio+','+cantidad+',"'+observa+'",'+montodesc.toFixed(2)+','+pordesc+')'; 
			//alert('despues de insertadet');				
			i++;
			querydev[i]='UPDATE DETHISFAC SET devuelto=devuelto+'+cantidad+' where linea='+linea+' and factura="'+factura+'"';		
		     i++;
			 
			 if (cargovendedor=='S') {
			   querydev[i]='INSERT INTO DETPEDIDO (linea,num_ped,cod_art,mon_prc_mn,por_dsc_ap,mon_tot,mon_dsc,mon_prc_mx,cnt_max) VALUES('+linea+',"'+pedido+'","'+articulo+'",'+precio+','+pordesc+','+totalinea.toFixed(2)+','+montodesc.toFixed(2)+','+precio+','+cantidad+')'; 	 
				i++; 
			 }
			 else{
			 querydev[i]='UPDATE ARTICULO_EXISTENCIA SET existencia=existencia+'+cantidad+' WHERE articulo="'+articulo+'" and bodega="'+bodega+'"';
			 i++;
			 }
			 //actexis(articulo,cantidad);
			 //alert('despues de llamar a funcion guardadev');
			linea++;
		 	});//each
			//alert('antes de llamar a funcion guardaencdev');
			querydev[i]='INSERT INTO ENCDEV (num_dev,cod_zon,cod_clt,hor_ini,hor_fin,fec_dev,obs_dev,num_itm,est_dev,mon_siv,mon_dsc,por_dsc_ap,mon_imp_vt,mon_imp_cs,cod_bod,impreso,num_ref) VALUES("'+devolucion+'","'+ruta+'","'+cliente+'","'+horaini+'","'+horafin+'","'+fechadev+'","'+observagen+'",'+renglones+',"A",'+sumtotlinea.toFixed(2)+',0,0,'+sumivalinea.toFixed(2)+',0,"'+bodega+'","N","'+factura+'")'; 
			i++;
   			querydev[i]='UPDATE PARAMETROS SET num_dev="'+devolucion+'"';		
			i++;
			if (cargovendedor=='S') {				
				var totalpedido=Number(sumtotlinea)+Number(sumivalinea);								
				querydev[i]='INSERT INTO ENCPEDIDO (num_ped,cod_zon,cod_clt,tip_doc,hor_fin,fec_ped,fec_des,mon_imp_vt,mon_civ,mon_siv,mon_dsc,obs_ped,estado,cod_cnd,cod_bod) VALUES ("'+pedido+'","'+ruta+'","'+vendedor+'","S","'+horaini+'","'+fechadev+'","'+fechadev+'",'+sumivalinea.toFixed(2)+','+totalpedido.toFixed(2)+','+sumtotlinea.toFixed(2)+','+summontodesc.toFixed(2)+',"Venta por devolucion con cargo al vendedor","F",'+30+',"'+bodega+'")'; 
				//alert(querydev[i]);
				i++;				
				querydev[i]='UPDATE PARAMETROS SET num_fac="'+pedido+'"';		
				i++;	
				querydev[i]='UPDATE CLIENTES SET SALDO=saldo+'+sumtotal+' where clave="9999"';        					
			}
			
			
			// guardaencdev(devolucion,ruta,cliente,horaini,horafin,fechadev,observagen,renglones,sumtotlinea.toFixed(2),sumivalinea.toFixed(2),bodega,factura)
			//alert('despues de llamar a funcion guardaencdev');
		  }//if (results.rows.length>0){		  
 	}//function listo(tx,results){ 
	function consultatemp(tx){  
	          //   alert('ENTRA A CONSultatepm'); 
				  var sql='SELECT b.factura,a.articulo,a.cantidad,b.precio,a.obs,a.linea,b.totlinea,b.cantidad as cantfac, ';
	  			  sql+='c.impuesto,c.descuento FROM TEMDEV a left outer join DETHISFAC b on b.linea=a.linea ';					  
			      sql+='left outer join articulo c on c.articulo=a.articulo  ';
				  sql+=' where a.cantidad > 0 and b.factura="'+window.localStorage.getItem("factura")+'"';	

			    //alert(sql);
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error al preparar guardar devolución : "+linea+err.code+err.message);
         		});    									
	}
	base.transaction(consultatemp, function(err){
    	 			 alert("Error select tabla temporal dethisfac para devolver: "+err.code+err.message);
         		},function(){
						guardaencdev(querydev,sumtotal);	
					
				});		
				
}//function guardadev
function insertalindev(factura,linea,cantidad,observa){	
var cantmayor=false;

	function listo(tx,results){ 	      
	      if (results.rows.length>0){			
			 	var row = results.rows.item(0); 
			    var articulo=row['articulo'];
			 //if (row['cantidad']>0){
			 	//preparadetalletemp(row['articulo'],row['cantidad']);																
				var dif=Number(row['cantidad'])-Number(row['devuelto']);				
 			 	if (cantidad>dif){//se intenta devolver mas de la cantidad disponible para devolución
					navigator.notification.alert('Se intenta devolver una cantidad mayor que el disponible',null,'Error Indicando Cantidad','Aceptar');								 
					cantmayor=true;
				 }
				 //alert('pasa depues del if');
				
		  }//if (results.rows.length>0){		  
 	}//function listo(tx,results){ 
	function consultatemp(tx){   	       
				//alert('articulo de MODIFICAR temPEDIDO '+articulo);
				 var sql='SELECT a.articulo,a.cantidad,a.devuelto,a.linea, ';
	   			 sql+='b.cantidad as temdev FROM DETHISFAC a ';	
				 sql+='left outer join TEMDEV b on b.linea=a.linea where a.factura="'+factura+'" and a.linea='+linea;	
		
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar DETHISFAC : "+articulo+err.code+err.message);
         		});    									
	}
	base.transaction(consultatemp, function(err){
    	 			 alert("Error select tabla DETHISFAC: "+err.code+err.message);
         		},function(){
					if (cantmayor==false){
					 actualizatempdev(linea,cantidad,observa)
					 mostrarhistfac(factura);					 
					}
				});		
				
}//function insertalindev
function copiadethistempd(factura,estotal){	
	function listo(tx,results){
		   $.each(results.rows,function(index){           
			 var row = results.rows.item(index); 
			 var disponible=Number(row['cantidad'])-Number(row['devuelto']);			 
			 if (estotal=='S'){
				 actualizatempdev(row['linea'],disponible,'');
			 }
			 else{
				insertatempdev(row['articulo'],row['linea']);	 
				 
			 }
			 
		 });    		 	      
 	}//function listo(tx,results){ 
	function consultatemp(tx){   	       
				//alert('articulo de MODIFICAR temPEDIDO '+articulo);
				 var sql='SELECT a.articulo,a.linea,a.devuelto,a.cantidad ';
	   			 sql+='FROM DETHISFAC a ';	
				 sql+='where a.factura="'+factura+'"';	
		
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error copiar temporal TEMDEV : "+articulo+err.code+err.message);
         		});    									
	}
	base.transaction(consultatemp, function(err){
    	 			 alert("Error select copiar tabla temporal TEMDEV: "+err.code+err.message);
         		},function(){					
					mostrarhistfac(factura);						
				});		
				
}//function copiadethistempd
function mostrarddev(linea){	
	function listo(tx,results){ 	      
	      if (results.rows.length>0){			
			 	var row = results.rows.item(0); 
			    $("#cantd").val(row['cantidad']);
				$("#etiartd").empty();
				$("#etiartd").append('Artículo: '+row['descripcion'])
				//$("#obsrendev").val(row['obs']);			
				//$("#encdialogodev").val('Indica Cantidad a Devolver para: '+row['articulo']);
		  }//if (results.rows.length>0){		  
 	}//function listo(tx,results){ 
	function consultatemp(tx){   	       
				//alert('articulo de MODIFICAR temPEDIDO '+articulo);
				 var sql='SELECT a.cantidad,a.obs,a.articulo,b.descripcion ';
	   			 sql+='FROM TEMDEV a left outer join articulo b on b.articulo=a.articulo ';	
				 sql+='where a.linea='+linea;	
		
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar temporal para dialogo: "+articulo+err.code+err.message);
         		});    									
	}
	base.transaction(consultatemp, function(err){
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
function eliminatempdev(){
	   //alert('inserttafactura'+cantidad);
	    base.transaction(insertadet,function(err){
    	  alert("Error al eliminar temdevolucion: "+err.code+err.message);
          });
				
    	function insertadet(tx) {		
		//alert('entra a eliminar tempdev');
		   tx.executeSql('DELETE FROM TEMDEV ');		
		}
	
}//function eliminatempdev
function validavigencia(factura){	
var dias=0;
	function listo(tx,results){
		   $.each(results.rows,function(index){           
			 var row = results.rows.item(index); 
			 var fechaact=new Date();			 
			 var ffac=row['fecha'].split("/");
			 var fechafac=new Date(Number(ffac[2]),Number(ffac[1])-1,Number(ffac[0]));			 
			 dias = (fechaact - fechafac)/86400000; 
			 guardadiasfactura(dias);
		 });    		 	      
 	}//function listo(tx,results){ 
	function consultatemp(tx){   	       				
				 var sql='SELECT a.fecha ';
	   			 sql+='FROM ENCHISFAC a ';	
				 sql+='where a.factura="'+factura+'"';
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error query Consultar ENCHISFAC para vigencia : "+articulo+err.code+err.message);
         		});    									
	}
	base.transaction(consultatemp, function(err){
    	 			 alert("Error Consultar ENCHISFAC para vigencia : "+err.code+err.message);
         		},function(){
					if (dias>15){//si tiene antigüedad mayor a 15 dias la dev debe ser con cargo al vend.
					  navigator.notification.alert('La factura supera la antigüedad permitida para devolución (15 días), por lo tanto, la devolución será con cargo al vendedor',null,'Factura fuera de política permitida','Aceptar');					
					  cargovendedor='S';
					  }
				});		
				
}//function copiadethistempd
