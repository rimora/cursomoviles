// consultas

function llamadascxc(){	
  alert ('depositos');
    $.get("demo_test.asp",function(data,status){
     // alert("Data: " + data + "\nStatus: " + status);
    });
  

}

function preparadetalletemp(articulo,cantidad,existencia){
	   //var existencia=consultaexis(articulo);
	   var diferencia=existencia-cantidad;
	  // alert('existencia '+existencia);
	  // alert('cantidad '+cantidad);
	   
	   if (diferencia>=0){		  
	       insertatempfactura(articulo,cantidad);
	   }
	   else {
		   if (existencia>0){
			   insertatempfactura(articulo,existencia);
               insertatemppedido(articulo,(cantidad-existencia));
			   
		   }
		   else{
			   insertatemppedido(articulo,cantidad);
		   }
	   }
}//function insertatemppedido
function existeenpedido(articulo,des){
	var existe=false;
	function listo(tx,results){ 	
	         //alert('entra a funcion listo de existeenpedido');         	          
	     	 if (results.rows.length>0){
				//alert('existe en pedido');  				
				existe=true;  				
				//alert('prueba de existe '+existe);  				
			  }
			 
			 
 	}
	function existep(tx){  	
	        //alert('entra a funcion existep');         	    
			var sql='SELECT articulo FROM TEMPEDIDO WHERE articulo="'+articulo+'" and cliente="'+window.localStorage.getItem("clave")+'"  ';			
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar existeTEMPEDIDO : "+err.code+err.message);
         		});    	
			sql='SELECT articulo FROM TEMFACTURA WHERE articulo="'+articulo+'" and cliente="'+window.localStorage.getItem("clave")+'" ';			
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar existeTEMFACTURA : "+err.code+err.message);
         		});    	
								
	}
	consultadb().transaction(existep, function(err){
    	 		 alert("Error select tabla TEMPPEDIDO: "+err.code+err.message);
         		},function(){
					//alert(existe);
					if (existe){
   					alert('Artículo ya fue ingresado, modifiquelo desde el pedido o factura');
					}
					else
					{
						guardaarticulo(articulo);//almacena localmente la clave de articulo 					 
						$('#etiart').empty();
						$('#etiart').append('Articulo: '+articulo+' '+des)
						//window.location.href='#pcantidad';
						$('#cantcat').val('1');						
						$('#divnumcat').show();
						
					}
				});		

    
	
	
}//function existeenpedido
function armacatalogo(){
 // $('#pclientes').live('pageshow',function(event, ui){
		//alert('This page was just hidden: '+ ui.prevPage);		
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 1000000);		
		consultadb().transaction(poblarcat, function(err){
    	 		 alert("Error select catálogo : "+err.code+err.message);
         		});		
	function poblarcat(tx){  
	        //alert('entra al poblarcat armacatalogo');        	   
			var sql='SELECT a.articulo,a.descripcion,a.clas,a.accion,a.impuesto,a.descuento,b.existencia as ebodega,c.existencia as ealg,';
			//sql+='(a.precio-((a.precio/100)*a.descuento)) as precio,a.laboratorio,a.sal ';
			sql+='a.precio,a.laboratorio,a.sal ';
			sql+='FROM articulo a left outer join articulo_existencia b on b.articulo=a.articulo and b.bodega="K01" ';
			sql+=' left outer join articulo_existencia c on c.articulo=a.articulo and c.bodega="ALG" order by a.descripcion';
			//alert('despues del sql armacatalogo');        
			
			
		    tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select catalogo: "+sql+err.code+err.message);
         	});    	
	}
	function listo(tx,results){  
		 $('#lcatalogo').empty();        
		 //alert('entra a listo de armacatalogo');
		 $.each(results.rows,function(index){   
		   //  alert('entra al each armacatalogo');        
			 var row = results.rows.item(index);         
			 //alert('despues del var row armacatalogo');           
			 var html="";	
			 //var precio=row['precio']*(1+(row['impuesto']/100));
			 var precio=row['precio'];

			 if   (row['ebodega']==null)       
			 {
				var existencia=0; 				
				//alert('existencia es null'+existencia); 
			 }
			 else 
			 {
				 var existencia=row['ebodega']; 
				 
			 }
			  if   (row['ealg']==null)       
			 {
				var existenciaalg=0; 				
				//alert('existencia es null'+existencia); 
			 }
			 else 
			 {
				 var existenciaalg=row['ealg']; 
			 }	
			 alert(row['descripcion']);		 
			 html+='<li id='+row['articulo']+' title='+row['descripcion']+'>';
	        // html+='<a href=""><img src="imagenes/sardel.jpg" width="100" height="100"/><h3> '+row['descripcion']+'</h3>';
			 html+='<a href=""><h3>'+row['descripcion']+'</h3>';
			 html+='Clas.:'+row['clas']+', AcciónT:'+row['accion']+'<br/> Lab:'+row['laboratorio']+',SAL:'+row['sal']+',Precio:'+precio.toFixed(2)+', A bordo:'+existencia+'   ALG:'+existenciaalg+'</a></li>';
			 			 
			 $('#lcatalogo').append(html);        	
			 //alert('despues de lcatalogo.append armacatalogo');        
		 });         
		 			 
		 $('#lcatalogo').listview('refresh'); 
		 //alert('despues de lcatalogo listview armacatalogo');        
 	}

 // });	//$('#pclientes').live('pageshow',function(event, ui){
	
}//armacatalogo
function validasug()
{
var existe=false;	
	function listo(tx,results){ 	
	         //alert('entra a funcion listo de existeenpedido');         	          
	     	 if (results.rows.length>0){
				//alert('existe en pedido');  
				existe=true;  				
				//alert('prueba de existe '+existe);  				
			  }
			 
 	}
	function existep(tx){  	
	        //alert('entra a funcion existep');         	    
			var sql='SELECT articulo FROM TEMPEDIDO WHERE cliente="'+window.localStorage.getItem("clave")+'"  ';			
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar existeTEMPEDIDO : "+err.code+err.message);
         		});    	
			sql='SELECT articulo FROM TEMFACTURA WHERE cliente="'+window.localStorage.getItem("clave")+'" ';			
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar existeTEMFACTURA : "+err.code+err.message);
         		});    	
								
	}
	consultadb().transaction(existep, function(err){
    	 		 alert("Error validando si tiene pedido sugerido: "+err.code+err.message);
         		},function(){
					//alert(existe);
					if (existe==false){   					
						sugerido();//inserta sugerido del cliente
					}
				});		

    
	
	
}//VALIDA SUGERIDO



function sugerido(){
	var artsug=[];
	var cantsug=[];
	var exissug=[];
	var preciosug=[];
	var cliente=window.localStorage.getItem("clave");	
	//alert(window.localStorage.getItem("limite"));
	//alert(window.localStorage.getItem("saldo"));
	
	var i=0;
	function listo(tx,results){ 	      
	      if (results.rows.length>0){
			$.each(results.rows,function(index){           			
			 var row = results.rows.item(index);            			
			 //if (row['cantidad']>0){
			 	//preparadetalletemp(row['articulo'],row['cantidad']);								
				artsug[i]=row['articulo'];
				cantsug[i]=row['cantidad'];
				exissug[i]=row['existencia'];
				preciosug[i]=row['precio']*(1+(row['impuesto']/100));
				i++;
				
			 //}//if (row['cantidad']>0)			 
		  	}); //$.each       				  
		  }//if			  
		  /*else
		  {
			alert('no hubo resultados de sugerido');  
			
		  }*/
 	}//function listo(tx,results){ 
	function consultasug(tx){   	    	        			
			var sql='SELECT a.articulo,a.cantidad,b.impuesto,(b.precio-((b.precio/100)*b.descuento)) as precio,';
			sql+='c.existencia ';	
			sql+='FROM SUGERIDO a left outer join articulo b on b.articulo=a.articulo ';
			sql+='left outer join articulo_existencia c on c.articulo=a.articulo and c.bodega="K01" WHERE a.cliente="'+cliente+'"  ';
					
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar sugerido del cliente : "+sql+err.code+err.message);
         		});    									
	}
	consultadb().transaction(consultasug, function(err){
    	 			 alert("Error select tabla sugerido: "+err.code+err.message);
         		},function(){
				 //alert(artsug.length);
				 
				 for (var i = 0, long = artsug.length; i < long; i++) {   					 
					   //alert(artsug[i]+' '+cantsug[i]+' '+exissug[i]);
					   

					   if (validasaldo(cantsug[i]*preciosug[i]))
					   {
						   navigator.notification.alert('Limite de credito excedido,no se cargaron todos los articulos',null,'Limite de credito excedido','Aceptar');					
						   return false;
						   
					   }
					   else{
						   if (exissug[i]==null){
								preparadetalletemp(artsug[i],cantsug[i],0);
						   }
							else
							  {
								preparadetalletemp(artsug[i],cantsug[i],exissug[i]);
							}
					   }
					   
				 }// for (var i = 0, long = artsug.length; i < long; i++) {   					 
				 mostrarpedido();
                 mostrarfactura(); 
				});		
				
}//function sugerido
function validasaldo(importe)
{
	//alert('limite '+window.localStorage.getItem("limite"));
	//alert('saldo '+window.localStorage.getItem("saldo"));
	var limite=Number(window.localStorage.getItem("limite"));
	var saldo=Number(window.localStorage.getItem("saldo"))+Number(importe);
	//alert('importe '+importe);
	//alert('saldo nuevo'+saldo);
	if (saldo>limite){
		//alert('saldo mayor a limite '+saldo+'  '+limite);
	   return true;	   	
	}
	else{
		//alert('actualiza saldo'+saldo);
	  // window.localStorage.setItem("saldo",saldo);
	   actsaldo(importe)
	   return false;
	}	
}
function eliminalinea(articulo,importe,tipo){	
	function listo(tx,results){ 	      
	      if (results.rows.length>0){			
			 var row = results.rows.item(0);            			
			 //if (row['cantidad']>0){
			 	//preparadetalletemp(row['articulo'],row['cantidad']);								
				var cantidad=row['cantidad'];
				var saldoant=Number(window.localStorage.getItem("saldo"));
				//window.localStorage.setItem("saldo",saldoant-importe);
				actsaldo(importe*-1);
				//alert(window.localStorage.getItem("saldo"));
				if (tipo=="F"){
					eliminatempfactura(articulo,cantidad)
				}
				else {
					eliminatemppedido(articulo,cantidad)
				}
			 //}//if (row['cantidad']>0)			 
                 mostrarfactura();
				 mostrarpedido();
				 
		  }//if			  
		  /*else
		  {
			alert('no hubo resultados de sugerido');  
			
		  }*/
 	}//function listo(tx,results){ 
	function consultatemp(tx){   
	        if (tipo=="F"){
				//alert('articulo de eliminar temfactura '+articulo);
				var sql='SELECT * FROM TEMFACTURA WHERE articulo="'+articulo+'" and cliente="'+window.localStorage.getItem("clave")+'"   ';  	
			}
			else {
				var sql='SELECT * FROM TEMPEDIDO WHERE articulo="'+articulo+'" and cliente="'+window.localStorage.getItem("clave")+'"  ';  	
			}
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar temporal del cliente : "+articulo+err.code+err.message);
         		});    									
	}
	consultadb().transaction(consultatemp, function(err){
    	 			 alert("Error select tabla temporal: "+err.code+err.message);
         		});		
				
}//function eliminalinea
function modificalineap(articulo,cantidad){	
	function listo(tx,results){ 	      
	      if (results.rows.length>0){			
			 var row = results.rows.item(0);            			
			 //if (row['cantidad']>0){
			 	//preparadetalletemp(row['articulo'],row['cantidad']);								
				var cantini=row['cantidad'];
				var precio=row['precio']*(1+(row['impuesto']/100));
				var dif=cantidad-cantini;
				if (cantini!=cantidad)
				{
					if (dif>0){
						 if (validasaldo(dif*precio))
					  	 {
						   		navigator.notification.alert('Limite de credito excedido,no se puede modificar',null,'Limite de credito excedido','Aceptar');					
						   		return false;						   
					   	 }
					   	 else{
						 	modificatemppedido(articulo,cantidad);   						   
					   	 }
					}
					else{						
						actsaldo(dif*precio);					
						modificatemppedido(articulo,cantidad);	
						
					}
					mostrarpedido();
					
				}
				
		  }//if (results.rows.length>0){		  
 	}//function listo(tx,results){ 
	function consultatemp(tx){   
	       
				//alert('articulo de MODIFICAR temPEDIDO '+articulo);
				var sql='SELECT a.articulo,a.cantidad,b.impuesto,(b.precio-((b.precio/100)*b.descuento)) as precio,';
				sql+='c.existencia ';	
				sql+='FROM TEMPEDIDO a left outer join articulo b on b.articulo=a.articulo ';
				sql+='left outer join articulo_existencia c on c.articulo=a.articulo and c.bodega="K01" WHERE a.articulo="'+articulo+'" and a.cliente="'+window.localStorage.getItem("clave")+'"  ';
			
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar temporal PEDIDO : "+articulo+err.code+err.message);
         		});    									
	}
	consultadb().transaction(consultatemp, function(err){
    	 			 alert("Error select tabla temporal PEDIDO: "+err.code+err.message);
         		});		
				
}//function modificalineap
function modificalineaf(articulo,cantidad){
	var cliente=window.localStorage.getItem("clave");	
	function listo(tx,results){ 	      
	      if (results.rows.length>0){			
			 var row = results.rows.item(0);            			
			 //if (row['cantidad']>0){
			 	//preparadetalletemp(row['articulo'],row['cantidad']);								
				var cantini=row['cantidad'];
				var precio=row['precio']*(1+(row['impuesto']/100));
				var dif=cantidad-cantini;
				var exis=row['existencia'];
				var difexis=dif-row['existencia'];
				var cantpedido=row['cantpedido'];
				
				if (cantini!=cantidad)
				{
					if (dif>0){
						//alert('dif mayor a cero');
						if ((difexis>0) && (exis>0)){// hay existencia para agregar a factura y la diferencia a pedido
							if (validasaldo(exis*precio))//valida para modificar en factura
					  	 	{
						   		navigator.notification.alert('Limite de credito excedido,no se pueden agregar '+exis+' pzas en factura',null,'Limite de credito excedido','Aceptar');					
						   		return false;						   
						   	 }
						   	 else{
							 	modificatempfactura(articulo,exis);   						   
						   	 }	
								 if (validasaldo(difexis*precio))//valida para insertar o modificar en pedido
					  	 	{
						   		navigator.notification.alert('Limite de credito excedido,no se pueden agregar '+difexis+' pzas en pedido',null,'Limite de credito excedido','Aceptar');					
						   		return false;						   
						   	 }
						   	 else{
								 if (cantpedido>0){//existe en pedido, agrega la diferencia
								    //alert('existe en pedido');
									 modificatemppedido(articulo,cantpedido+difexis);//la funcion modificatemppedido inserta directo el valor, por eso la suma
								 }
								 else
								 {
									insertatemppedido(articulo,difexis); 									 
								 }								 					   
						   	 }	//else

						}//if (difexis>=0){
						else if (difexis<=0) {//la existencia es suficiente para agregar a factura
						    if (validasaldo(dif*precio))//valida para modificar en factura
					  	 	{
						   		navigator.notification.alert('Limite de credito excedido,no se pueden agregar '+dif+' pzas en factura',null,'Limite de credito excedido','Aceptar');					
						   		return false;						   
						   	 }
						   	 else{							 	
									modificatempfactura(articulo,dif); 									 								 	
						   	 }							
						}
						else {//la existencia es cero para agregar a factura,se agrega todo a pedido
							  if (validasaldo(dif*precio))//valida para modificar en factura
					  	 	{
						   		navigator.notification.alert('Limite de credito excedido,no se pueden agregar '+dif+' pzas en pedido',null,'Limite de credito excedido','Aceptar');					
						   		return false;						   
						   	 }
						   	 else{
							 	if (cantpedido>0){//existe en pedido, agrega la diferencia
									 modificatemppedido(articulo,cantpedido+dif);//la funcion modificatemppedido inserta directo el valor, por eso la suma  									 
								 }
								 else
								 {
									insertatemppedido(articulo,dif); 									 
								 }	
						   	 }	
						
						}
						 
					}
					else{						
					//alert('dif menor a cero');
						actsaldo(dif*precio);					
						modificatempfactura(articulo,dif);	
						
					}
					//alert('antes llamar a mostrar pedido y factura');
					mostrarpedido();
					mostrarfactura();
					
				}
				
		  }//if (results.rows.length>0){		  
 	}//function listo(tx,results){ 
	function consultatemp(tx){   
				var sql='SELECT a.articulo,a.cantidad,b.impuesto,(b.precio-((b.precio/100)*b.descuento)) as precio,';
				sql+='c.existencia,d.cantidad as cantpedido ';	
				sql+='FROM TEMFACTURA a left outer join articulo b on b.articulo=a.articulo ';
				sql+='left outer join articulo_existencia c on c.articulo=a.articulo and c.bodega="K01" ';
				sql+='left outer join TEMPEDIDO d on d.articulo=a.articulo WHERE a.articulo="'+articulo+'"  ';
			
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar temporal FACTURA para modificar : "+articulo+err.code+err.message);
         		});    									
	}
	consultadb().transaction(consultatemp, function(err){
    	 			 alert("Error select tabla temporal PEDIDO para modificar: "+err.code+err.message);
         		});		
				
}//function modificalineaf
function imprimirped(obs){	
var cabinsertada=false;
var sumtotlinea=0;
var summontodesc=0;
var sumivalinea=0;
var consecutivo=window.localStorage.getItem("consepedido");
var ruta=window.localStorage.getItem("ruta");
var fecha = new Date();
var fechaact=fecha.getFullYear()+"/"+(fecha.getMonth()+1)+"/"+fecha.getDate();
var hora=fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
var fechayhora=fechaact+" "+hora;
//+"\nMilisegundo: "+fecha.getMilliseconds());
var longitud=consecutivo.length;
var inicial=consecutivo.substr(0,3);
var numpedido= consecutivo.substr(3,(longitud-3));
 //alert(numpedido); 
var incremetarp=Number(numpedido)+1;
 //alert(incremetarp); 
var pedido=inicial+pad(incremetarp,6);
 //alert(pedido); 
   function pad(n, length){
	   //alert('entra a funcion'+n); 
  	 n = n.toString();
   	 while(n.length < length) n = "0" + n;
  	 return n;
   }
	function listo(tx,results){ 	      
	      if (results.rows.length>0){		
		  	 $.each(results.rows,function(index){           			 
			 var row = results.rows.item(index);    
			 var precio=row['precio'];//precio sin descuento y sin iva			 
			 var pordesc=row['descuento'];//porcentaje de descuento que se aplica 
			 var totlinea=Number(row['cantidad'])*Number(row['precio']);//total de linea sin descuento y sin iva
			 var montodesc=(Number(totlinea)/100)*Number(row['descuento']); 
			 var lineacdes=totlinea-montodesc;//importe de linea con descuento
			 var ivalinea=lineacdes*(row['impuesto']/100);			 
			 var preciocdesc=row['preciocdesc'];	//precio con descuento sin iva		 
			 var preciociva=preciocdesc*(1+(row['impuesto']/100));			 
			 var cantidad=row['cantidad'];
			 var articulo=row['articulo'];

			 sumtotlinea+=sumtotlinea+totlinea;//suma del total de linea sin descuento y sin iva
			 summontodesc+=summontodesc+montodesc;//suma del total de linea sin descuento y sin iva
			 sumivalinea+=sumivalinea+ivalinea;//suma del total de linea sin descuento y sin iva
			 //alert('antes de llamar a funcion guardated');
			 guardadetpedido(pedido,articulo,precio,pordesc,totlinea,montodesc,precio,cantidad);
			//alert('despues de llamar a funcion guardated');
			 
			 
			/* 
			 tx.executeSql('CREATE TABLE IF NOT EXISTS ENCPEDIDO (id INTEGER PRIMARY KEY AUTOINCREMENT, NUM_PED,COD_ZON,DOC_PRO,COD_CLT,TIP_DOC,HOR_FIN,FEC_PED,FEC_DES,MON_IMP_VT,MON_CIV,MON_SIV,MON_DSC,OBS_PED,ESTADO,COD_CND,COD_BOD)'); 
         tx.executeSql('CREATE TABLE IF NOT EXISTS DETPEDIDO (id INTEGER PRIMARY KEY AUTOINCREMENT, NUM_PED,COD_ART,MON_PRC_MN,POR_DSC_AP,MON_TOT,MON_DSC,MON_PRC_MX,CNT_MAX)'); 

			 */			 			 
		 	});
			//alert('antes de llamar a funcion guardaenc');
		  	 guardaencpedido(pedido,ruta,window.localStorage.getItem("clave"),fechayhora,fechaact,sumivalinea,(sumtotlinea+sumivalinea),sumtotlinea,summontodesc,obs,30,"K01");
				//alert('despues de llamar a funcion guardated');
		  }//if (results.rows.length>0){		  
 	}//function listo(tx,results){ 
	function consultatemp(tx){  
	             //alert('ENTRA A CONSultatepm'); 
				var sql='SELECT a.articulo,a.cantidad,b.impuesto,(b.precio-((b.precio/100)*b.descuento)) as preciocdesc,';
				sql+='b.descuento,b.precio ';	
				sql+='FROM TEMPEDIDO a left outer join articulo b on b.articulo=a.articulo ';
				sql+='WHERE  a.cliente="'+window.localStorage.getItem("clave")+'"  ';
			    //alert(sql);
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error al preparar pedido : "+articulo+err.code+err.message);
         		});    									
	}
	consultadb().transaction(consultatemp, function(err){
    	 			 alert("Error select tabla temporal PEDIDO para guardarlo: "+err.code+err.message);
         		});		
				
}//function imprimirped

function imprimirfac(obs){	
var cabinsertada=false;
var sumtotlinea=0;
var summontodesc=0;
var sumivalinea=0;
var consecutivo=window.localStorage.getItem("consefactura");
var ruta=window.localStorage.getItem("ruta");
var fecha = new Date();
var fechaact=fecha.getFullYear()+"/"+(fecha.getMonth()+1)+"/"+fecha.getDate();
var hora=fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
var fechayhora=fechaact+" "+hora;
//+"\nMilisegundo: "+fecha.getMilliseconds());
var longitud=consecutivo.length;
var inicial=consecutivo.substr(0,3);
var numpedido= consecutivo.substr(3,(longitud-3));
 //alert(numpedido); 
var incremetarp=Number(numpedido)+1;
// alert(incremetarp); 
var pedido=inicial+pad(incremetarp,6);
// alert(pedido); 
   function pad(n, length){
	   //alert('entra a funcion'+n); 
  	 n = n.toString();
   	 while(n.length < length) n = "0" + n;
  	 return n;
   }
	function listo(tx,results){ 	      
	      if (results.rows.length>0){		
		  	 $.each(results.rows,function(index){           			 
			 var row = results.rows.item(index);    
			 var precio=row['precio'];//precio sin descuento y sin iva			 
			 var pordesc=row['descuento'];//porcentaje de descuento que se aplica 
			 var totlinea=Number(row['cantidad'])*Number(row['precio']);//total de linea sin descuento y sin iva
			 var montodesc=(Number(totlinea)/100)*Number(row['descuento']); 
			 var lineacdes=totlinea-montodesc;//importe de linea con descuento
			 var ivalinea=lineacdes*(row['impuesto']/100);			 
			 var preciocdesc=row['preciocdesc'];	//precio con descuento sin iva		 
			 var preciociva=preciocdesc*(1+(row['impuesto']/100));			 
			 var cantidad=row['cantidad'];
			 var articulo=row['articulo'];

			 sumtotlinea+=sumtotlinea+totlinea;//suma del total de linea sin descuento y sin iva
			 summontodesc+=summontodesc+montodesc;//suma del total de linea sin descuento y sin iva
			 sumivalinea+=sumivalinea+ivalinea;//suma del total de linea sin descuento y sin iva
			 //alert('antes de llamar a funcion guardated');
			 guardadetfactura(pedido,articulo,precio,pordesc,totlinea,montodesc,precio,cantidad);
			//alert('despues de llamar a funcion guardated');
			 
			 
			/* 
			 tx.executeSql('CREATE TABLE IF NOT EXISTS ENCPEDIDO (id INTEGER PRIMARY KEY AUTOINCREMENT, NUM_PED,COD_ZON,DOC_PRO,COD_CLT,TIP_DOC,HOR_FIN,FEC_PED,FEC_DES,MON_IMP_VT,MON_CIV,MON_SIV,MON_DSC,OBS_PED,ESTADO,COD_CND,COD_BOD)'); 
         tx.executeSql('CREATE TABLE IF NOT EXISTS DETPEDIDO (id INTEGER PRIMARY KEY AUTOINCREMENT, NUM_PED,COD_ART,MON_PRC_MN,POR_DSC_AP,MON_TOT,MON_DSC,MON_PRC_MX,CNT_MAX)'); 

			 */			 			 
		 	});
			//alert('antes de llamar a funcion guardaenc');
		  	 guardaencfactura(pedido,ruta,window.localStorage.getItem("clave"),fechayhora,fechaact,sumivalinea,(sumtotlinea+sumivalinea),sumtotlinea,summontodesc,obs,30,"K01");
				//alert('despues de llamar a funcion guardated');
		  }//if (results.rows.length>0){		  
 	}//function listo(tx,results){ 
	function consultatemp(tx){  
	             //alert('ENTRA A CONSultatepm'); 
				var sql='SELECT a.articulo,a.cantidad,b.impuesto,(b.precio-((b.precio/100)*b.descuento)) as preciocdesc,';
				sql+='b.descuento,b.precio ';	
				sql+='FROM TEMPEDIDO a left outer join articulo b on b.articulo=a.articulo ';
				sql+='WHERE  a.cliente="'+window.localStorage.getItem("clave")+'"  ';
			    //alert(sql);
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error al preparar pedido : "+articulo+err.code+err.message);
         		});    									
	}
	consultadb().transaction(consultatemp, function(err){
    	 			 alert("Error select tabla temporal PEDIDO para guardarlo: "+err.code+err.message);
         		});		
				
}//function imprimirfac


