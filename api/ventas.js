// funciones para ventas
var base = window.openDatabase("Database", "1.0", "SARDEL", 10000000);	
function validasug(cliente){
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
			
			var sql='SELECT articulo FROM TEMPEDIDO WHERE cliente="'+cliente+'"  ';			
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar existeTEMPEDIDO : "+err.code+err.message);
         		});    
				/*	
			sql='SELECT articulo FROM TEMFACTURA WHERE cliente="'+window.localStorage.getItem("clave")+'" ';			
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar existeTEMFACTURA : "+err.code+err.message);
         		});    	*/
								
	}
	base.transaction(existep, function(err){
    	 		 alert("Error validando si tiene pedido sugerido: "+err.code+err.message);
         		},function(){
					//alert(existe);
					if (existe==false){   					
						sugerido(cliente);//inserta sugerido del cliente
					}
					else{
						mostrarpedido(cliente);
					}
					
					
					
					
					
				});		

    
	
	
}//VALIDA SUGERIDO
function sugerido(cliente){

	var artsug=[];
	var cantsug=[];
	var exissug=[];
	var preciosug=[];	
	//alert(window.localStorage.getItem("limite"));
	//alert(window.localStorage.getItem("saldo"));
	
	var i=0;
	function listo(tx,results){ 	      
	      if (results.rows.length>0){

			$.each(results.rows,function(index){           			
			 var row = results.rows.item(index);            			
				artsug[i]=row['articulo'];
				cantsug[i]=row['cantidad'];				
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
			var sql='SELECT a.articulo,a.cantidad ';
			sql+='FROM SUGERIDO a ';
			sql+='WHERE a.cliente="'+cliente+'"  ';

			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar sugerido del cliente : "+sql+err.code+err.message);
         		});    									
	}
	base.transaction(consultasug, function(err){
    	 			 alert("Error select tabla sugerido: "+err.code+err.message);
         		},function(){
				 //alert(artsug.length);
				 
				 for (var i = 0, long = artsug.length; i < long; i++) {   									   
								insertatemppedido(artsug[i],cantsug[i],cliente);
						   
					   
				 }// for (var i = 0, long = artsug.length; i < long; i++) {   					 				 
				 mostrarpedido(cliente);
                 //mostrarfactura(); 
				});		
				
}//function sugerido
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
function insertatemppedido(articulo,cantidad,cliente){
	   
	base.transaction(insertadet,function(err){
    	  alert("Error al insertar renglon: "+err.code+err.message);
          });
				
    	function insertadet(tx) {		
		//alert('entra a insert de detallepedido');
		tx.executeSql('INSERT INTO TEMPEDIDO (articulo,cantidad,cliente) VALUES ("'+articulo+'",'+cantidad+',"'+cliente+'")');        
		}
	
}//function insertatemppedido
function modificatemppedido(articulo,cantidad,cliente){
	   
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al modificar renglon: "+err.code+err.message);
          });
				
    	function insertadet(tx) {		
		//alert('entra a modificar detallepedido');
		
		tx.executeSql('UPDATE TEMPEDIDO SET CANTIDAD='+cantidad+' WHERE ARTICULO="'+articulo+'" and cliente="'+cliente+'"');        
		}
	
}//function modificatemppedido
function eliminatemppedido(articulo,cliente){
	   
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al eliminar renglon: "+err.code+err.message);
          });				
    	function insertadet(tx) {		
		//alert('entra a delete de detallepedido');
		tx.executeSql('DELETE FROM TEMPEDIDO WHERE ARTICULO="'+articulo+'" and cliente="'+cliente+'"');        
		}
	
}//function eliminatemppedido

function mostrarpedido(cliente){
 var limite=Number(window.localStorage.getItem("limite"));
 var saldo=Number(window.localStorage.getItem("saldo"));
 var disp=limite-saldo;
 
		var bodega='K01';
		base.transaction(consulta, errorconsulta);	
	function consulta(tx) {		
		tx.executeSql('SELECT a.articulo,b.descripcion,b.precio,b.descuento,a.cantidad,b.impuesto,c.existencia FROM TEMPEDIDO a left outer join articulo b on b.articulo=a.articulo left outer join ARTICULO_EXISTENCIA c on c.articulo=a.articulo and c.bodega="'+bodega+'" where a.cliente="'+cliente+'"',[],exito,errorconsulta);
		}
	
		
		function exito(tx,results){ 
			
		      $("#gridpedido").empty();				  
			  $("#divtotales").empty();				  
			  var html = "";
			  var tipo="";
			  var saldot=0; var montot=0; var precio=0; var total=0; var iva=0; var descuento=0; var parcial=0; var preciop=0; var preciocdesc=0;
			  var existencia=0; var abordo=0; var preventa=0; var dif=0; var cantidad=0; var arttotal=0; var pietotal=0; var artpre=0; var piepre=0;
			  var artabordo=0; var pieabordo=0; var totalpre=0; var totalabordo=0;
			  //agrega encabezado de grid			  			  
			  html+='<div class="ui-block-a" style="width:20px" ><div class="ui-bar ui-bar-a" style="padding-left:0px">T</div></div>';
          	  html+='<div class="ui-block-b" style="width:60px; margin-left:-10px" ><div class="ui-bar ui-bar-a">Elim</div></div>';
              html+='<div class="ui-block-c" style="width:300px; margin-left:-10px"><div class="ui-bar ui-bar-a">Articulo</div></div>';
		      html+='<div class="ui-block-d" style="width:80px"><div class="ui-bar ui-bar-a">PP</div></div>';              
              html+='<div class="ui-block-e" style="width:410px">';
              html+='<div class="ui-grid-d">';
					  	html+='<div class="ui-block-a" style="width:40px"><div class="ui-bar ui-bar-a" style="text-align:right; padding-left:0px">DV</div></div>';
						html+='<div class="ui-block-b" style="width:80px"><div class="ui-bar ui-bar-a" style="text-align:right">PV</div></div>';
                        html+='<div class="ui-block-c" style="width:50px"><div class="ui-bar ui-bar-a" style="text-align:right">Cant</div></div>';
                        html+='<div class="ui-block-d" style="width:80px"><div class="ui-bar ui-bar-a" style="text-align:right">Importe</div></div>';                        
                        html+='<div class="ui-block-e" style="width:150px">';
							
							html+='<div class="ui-grid-b" style="margin-top:0px">';
								html+='<div class="ui-block-a" style="width:50px"><div class="ui-bar ui-bar-a" style="text-align:right">Exi</div></div>';
								html+='<div class="ui-block-b" style="width:50px"><div class="ui-bar ui-bar-a" style="text-align:right">AB</div></div>';
	                           html+='<div class="ui-block-c" style="width:50px"><div class="ui-bar ui-bar-a" style="text-align:right">Pre</div></div>';
							html+='</div></div>';   
                 	html+='</div>';
                  html+='</div>';
          		
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 
				  	 					 
				     existencia=Number(row['existencia']);					 
					 cantidad=Number(row['cantidad']);		
					 pietotal+=cantidad;			 
					 arttotal+=1;			 					 
				     preciocdesc=Number(row['precio'])-((Number(row['precio'])/100)*Number(row['descuento']));				     			     
				     descuento=Number(row['descuento']);
					 iva=Number(row['impuesto']);					 
					 preciop=Number(row['precio']);
				     precio=Number(preciocdesc)*(1+(Number(row['impuesto'])/100));				 
					 parcial=precio*cantidad;
					 total+=Number(parcial);
					 dif=existencia-cantidad;					 
					 if (existencia==0){
						 preventa=cantidad;	
						 artpre+=1;	
						 totalpre+=	Number(parcial);						 
						 abordo=0;
					 }
					 else{
						 if (dif>=0){
						 preventa=0;						 
						 abordo=cantidad;						 						 
						 artabordo+=1;
						 totalabordo+=	Number(parcial);						 					 						 
						 }
						 else{
							 preventa=cantidad-existencia;					 
							 totalpre+=	precio*preventa;						 
							 artpre+=1;					 
							 abordo=existencia;						 						 
							 totalabordo+=precio*abordo
							 artabordo+=1;					 
						 }
							 
						 
					 }					 
					 pieabordo+=abordo;						 
					 piepre+=preventa;		
			  html+='<div class="ui-block-a" style="width:20px"><div class="ui-bar ui-bar-b" style="padding-left:0px">3</div></div>';		 
          	  html+='<div class="ui-block-b" style="width:60px;height:10px; margin-left:-10px">';              
           			html+='<div class="ui-bar ui-bar-e"  >';      		 		                   				        
            		html+='<input type="checkbox" name="'+row['articulo']+'" class="checkv" style="position:relative;height:10px">';
					html+='</div>';
            		html+='</div>';   
              html+='<div class="ui-block-c" style="width:300px; margin-left:-10px"><div class="ui-bar ui-bar-b" style="padding-left: 0px"><a href="#" class="descv" name="'+row['articulo']+'"  >'+row['descripcion']+'</a></div></div>';
		      html+='<div class="ui-block-d" style="width:80px"><div class="ui-bar ui-bar-b">'+preciop.toFixed(2)+'</div></div>';
              
              html+='<div class="ui-block-e" style="width:410px">';
              html+='<div class="ui-grid-d">';
		                html+='<div class="ui-block-a" style="width:40px"><div class="ui-bar ui-bar-b" style="text-align:right; padding-left:0px">'+descuento+'</div></div>';
						html+='<div class="ui-block-b" style="width:80px"><div class="ui-bar ui-bar-b" style="text-align:right">'+precio.toFixed(2)+'</div></div>';
                        html+='<div class="ui-block-c" style="width:50px"><div class="ui-bar ui-bar-b" style="text-align:right"><a href="#" class="clasep" name="'+row['articulo']+'" id="'+row['articulo']+' '+row['descripcion']+'" >'+cantidad+'</a></div></div>';
                        html+='<div class="ui-block-d" style="width:80px"><div class="ui-bar ui-bar-b" style="text-align:right">'+parcial.toFixed(2)+'</div></div>';
                        
                        html+='<div class="ui-block-e" style="width:150px">';
							html+='<div class="ui-grid-b" style="margin-top:0px">';
								html+='<div class="ui-block-a" style="width:50px"><div class="ui-bar ui-bar-b" style="text-align:right">'+existencia+'</div></div>';
								html+='<div class="ui-block-b" style="width:50px"><div class="ui-bar ui-bar-b" style="text-align:right">'+abordo+'</div></div>';
	                           html+='<div class="ui-block-c" style="width:50px"><div class="ui-bar ui-bar-b" style="text-align:right">'+preventa+'</div></div>';
							html+='</div></div>';   
                 	html+='</div>';
                  html+='</div>';
          	
			  
			
			  
			  });//.each
			
					$("#gridpedido").append(html);	
					disp=disp-total;				
					html="";
					html+='<center><label style="font-weight:bold; font-size:24px">Disponible:</label></center>';
       			    html+='<center><label style="font-weight:bold; font-size: 36px; color:#00F">'+disp.toFixed(2)+'</label></center>';
			        html+='<center><label style="font-weight:bold; font-size:24px">Preventa:</label></center>';				
					html+='<div class="ui-grid-a" id="gridtotalesp" style="text-align:left">';
	                html+='<div class="ui-block-a" style="width:90px" ><div class="ui-bar ui-bar-a">Piezas</div></div>';
	                html+='<div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-b" style="text-align:right">'+piepre.toFixed(0)+'</div></div>';
				    html+='<div class="ui-block-a" style="width:90px"><div class="ui-bar ui-bar-a">Articulos</div></div>';
		            html+='<div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-b" style="text-align:right">'+artpre.toFixed(0)+'</div></div>';
	                html+='<div class="ui-block-a" style="width:90px"><div class="ui-bar ui-bar-a">Total</div></div>';
	                html+='<div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-b" style="text-align:right">'+totalpre.toFixed(2)+'</div></div>';
					html+='</div>';
					html+='<center><label style="font-weight:bold; font-size:24px">A Bordo:</label></center>';
			        html+='<div class="ui-grid-a" id="gridtotalesf" style="text-align:left">';
		            html+='<div class="ui-block-a" style="width:90px" ><div class="ui-bar ui-bar-a">Piezas</div></div>';
                    html+='<div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-b" style="text-align:right">'+pieabordo.toFixed(0)+'</div></div>';
		            html+='<div class="ui-block-a" style="width:90px"><div class="ui-bar ui-bar-a">Articulos</div></div>';
                    html+='<div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-b" style="text-align:right">'+artabordo.toFixed(0)+'</div></div>';
                    html+='<div class="ui-block-a" style="width:90px"><div class="ui-bar ui-bar-a">Total</div></div>';
	                html+='<div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-b" style="text-align:right">'+totalabordo.toFixed(2)+'</div></div>';
		            html+='</div>';
					html+='<center><label style="font-weight:bold; font-size:24px">Total General:</label></center>';
		            html+='<div class="ui-grid-a"  style="text-align:left">';
                    html+='<div class="ui-block-a" style="width:90px" ><div class="ui-bar ui-bar-a">Piezas</div></div>';
                    html+='<div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-b" style="text-align:right">'+pietotal.toFixed(0)+'</div></div>';
		            html+='<div class="ui-block-a" style="width:90px"><div class="ui-bar ui-bar-a">Articulos</div></div>';
	                html+='<div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-b" style="text-align:right">'+arttotal.toFixed(0)+'</div></div>';
                    html+='<div class="ui-block-a" style="width:90px"><div class="ui-bar ui-bar-a">Total</div></div>';
                    html+='<div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-b" style="text-align:right">'+total.toFixed(2)+'</div></div>';
			        html+='</div>';					
					$("#divtotales").append(html);	
					guardatotalventa(total);
					guardadispventa(disp);

					
			
	   }//function exito
 		
	function errorconsulta(err) {
    	alert("Error SQL al llenar detalles pedido: "+err.code+err.message);
	}
//  });	

  }//mostrarpedido
 function armacatalogo(criterio){
 // $('#pclientes').live('pageshow',function(event, ui){
		//alert('This page was just hidden: '+ ui.prevPage);		
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 1000000);		
		base.transaction(poblarcat, function(err){
    	 		 alert("Error select catálogo : "+err.code+err.message);
         		});		
	function poblarcat(tx){  	        
			var sql='SELECT a.articulo,a.descripcion,a.descuento,b.existencia as ebodega,c.existencia as ealg,';			
			sql+='a.precio,a.clas,a.accion,a.laboratorio,a.sal ';
			sql+='FROM articulo a left outer join articulo_existencia b on b.articulo=a.articulo and b.bodega="K01" ';
			sql+=' left outer join articulo_existencia c on c.articulo=a.articulo and c.bodega="ALG" where a.articulo LIKE "%'+criterio+'%"';
			sql+=' or a.descripcion like "%'+criterio+'%" or a.clas like "%'+criterio+'%" or a.accion like "%'+criterio+'%" or a.laboratorio like "%'+criterio+'%" ';
			sql+=' or a.sal like "%'+criterio+'%" order by a.descripcion';
			/*
			var sql='SELECT a.articulo,a.descripcion,a.clas,a.accion,a.impuesto,a.descuento,b.existencia as ebodega,c.existencia as ealg,';			
			sql+='a.precio,a.laboratorio,a.sal ';
			sql+='FROM articulo a left outer join articulo_existencia b on b.articulo=a.articulo and b.bodega="K01" ';
			sql+=' left outer join articulo_existencia c on c.articulo=a.articulo and c.bodega="ALG" order by a.descripcion';*/
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
			 var descuento=row['descuento'];

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
			 //alert(row['descripcion']);		 
			 html+='<li>';
	        // html+='<a href=""><img src="imagenes/sardel.jpg" width="100" height="100"/><h3> '+row['descripcion']+'</h3>';
			 html+='<a href="" class="listart" id="'+row['articulo']+'"><h5>'+row['descripcion']+'&nbsp;&nbsp;&nbsp; PP:$'+precio.toFixed(2)+'    DV:'+descuento+'%    A bordo:'+existencia+'    ALG:'+existenciaalg+'</h5>';
			 html+='</a><a id="F'+row['articulo']+'" href="" data-role="button" data-icon="search" class="fichaart"></a></li>';
			 			 
			 $('#lcatalogo').append(html);        	
			 //alert('despues de lcatalogo.append armacatalogo');        
		 });         
		 			 
		 $('#lcatalogo').listview('refresh'); 
		 //alert('despues de lcatalogo listview armacatalogo');        
 	}

 // });	//$('#pclientes').live('pageshow',function(event, ui){
	
}//armacatalogo
function gridvalorescat(cliente){//muestra en un grid los totales de preventa y venta a bordo, asi como el limite de credito y el disponible
 var limite=Number(window.localStorage.getItem("limite"));
 var saldo=Number(window.localStorage.getItem("saldo"));
 var disp=limite-saldo;
		var bodega='K01';
		base.transaction(consulta, errorconsulta);	
	function consulta(tx) {		
		tx.executeSql('SELECT a.articulo,b.descripcion,b.precio,b.descuento,a.cantidad,b.impuesto,c.existencia FROM TEMPEDIDO a left outer join articulo b on b.articulo=a.articulo left outer join ARTICULO_EXISTENCIA c on c.articulo=a.articulo and c.bodega="'+bodega+'" where a.cliente="'+cliente+'"',[],exito,errorconsulta);
		}
	
		
		function exito(tx,results){ 
			
		      $("#gridtotales").empty();				  			  
			  var html = "";
			  var tipo="";
			  var saldot=0; var montot=0; var precio=0; var total=0; var iva=0; var descuento=0; var parcial=0; var preciop=0; var preciocdesc=0;
			  var existencia=0; var abordo=0; var preventa=0; var dif=0; var cantidad=0; var arttotal=0; var pietotal=0; var artpre=0; var piepre=0;
			  var artabordo=0; var pieabordo=0; var totalpre=0; var totalabordo=0;
			  //agrega encabezado de grid			  			  
          	  html+='<div class="ui-block-a" style="width:90px" ><div class="ui-bar ui-bar-a">Total</div></div>';
              html+='<div class="ui-block-b" style="width:100px"><div class="ui-bar ui-bar-a">Disponible</div></div>';
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 
					 cantidad=Number(row['cantidad']);							 			 
				     preciocdesc=Number(row['precio'])-((Number(row['precio'])/100)*Number(row['descuento']));				     			     
				     descuento=Number(row['descuento']);
					 iva=Number(row['impuesto']);					 
					 preciop=Number(row['precio']);
				     precio=Number(preciocdesc)*(1+(Number(row['impuesto'])/100));				 
					 parcial=precio*cantidad;
					 total+=Number(parcial);			  
			  });//.each					
					disp=disp-total;									
	                html+='<div class="ui-block-a" style="width:90px"><div class="ui-bar ui-bar-b">'+total.toFixed(2)+'</div></div>';
		            html+='<div class="ui-block-b" style="width:100px"><div class="ui-bar ui-bar-b">'+disp.toFixed(2)+'</div></div>';
					$("#gridtotales").append(html);	

					
			
	   }//function exito
 		
	function errorconsulta(err) {
    	alert("Error SQL al llenar grid de catalogo: "+err.code+err.message);
	}
//  });	

  }//
function existeenpedido(articulo,cliente){
	var existe=false;
	var descripcion='';
	function listo(tx,results){ 	
	         //alert('entra a funcion listo de existeenpedido');         	          			 
	     	 if (results.rows.length>0){				 			
				existe=true;  							
			  }
 	}
	function listo2(tx,results){ 	
	         //alert('entra a funcion listo de existeenpedido');         	          			 
	     	 if (results.rows.length>0){
				  var row = results.rows.item(0); 				 
				//alert('existe en pedido');  				
				descripcion=row['descripcion'];  				
				//alert('prueba de existe '+existe);  				
			  }
 	}
	function existep(tx){  	
	        //alert('entra a funcion existep');         	    
			var sql='SELECT articulo FROM TEMPEDIDO WHERE articulo="'+articulo+'" and cliente="'+cliente+'"  ';			
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar existeTEMPEDIDO : "+err.code+err.message);
         		});    									
			var sql='SELECT articulo,descripcion FROM ARTICULO WHERE articulo="'+articulo+'" ';			
			tx.executeSql(sql,[],listo2,function(err){
    	 		 alert("Error consultar articulo: "+err.code+err.message);
         		});    										
				
				
	}
	base.transaction(existep, function(err){
    	 		 alert("Error select tabla TEMPPEDIDO: "+err.code+err.message);
         		},function(){
					//alert(existe);
					if (existe){
					 navigator.notification.alert('Artículo ya fue ingresado, modifiquelo desde el pedido',null,'Artículo Ingresado','Aceptar');			 
					}
					else
					{
						guardaarticulo(articulo);//almacena localmente la clave de articulo 					 
						$('#etiart').empty();
						$('#etiart').append(articulo+' '+descripcion)
						//window.location.href='#pcantidad';
						$('#cantcat').val('1');//pone por defecto cantidad 1 en el teclado numerico
						 previolinea(articulo,1);// visualiza grid con el total del articulo 						
						$('#divnumcat').show();
					}
				});		

    
	
	
}//function existeenpedido
function fichaarticulo(articulo){//
		var bodega='K01';
		base.transaction(consulta, errorconsulta);	
	function consulta(tx) {
		var sql='SELECT a.articulo,a.descripcion,a.clas,a.accion,a.impuesto,a.descuento,b.existencia as ebodega,c.existencia as ealg,';			
			sql+='a.precio,a.laboratorio,a.sal ';
			sql+='FROM articulo a left outer join articulo_existencia b on b.articulo=a.articulo and b.bodega="K01" ';
			sql+=' left outer join articulo_existencia c on c.articulo=a.articulo and c.bodega="ALG"  WHERE a.articulo="'+articulo+'" order by a.descripcion';
					
		tx.executeSql(sql,[],exito,errorconsulta);
		}
		
		function exito(tx,results){ 
			
		      $("#divficha").empty();				  			  
			  var html = "";
			  var tipo="";
			  var saldot=0; var montot=0; var precio=0; var total=0; var iva=0; var descuento=0; var parcial=0; var preciop=0; var preciocdesc=0;
			  var existencia=0; var abordo=0; var preventa=0; var dif=0; var cantidad=0; var arttotal=0; var pietotal=0; var artpre=0; var piepre=0;
			  var artabordo=0; var pieabordo=0; var totalpre=0; var totalabordo=0;
			  //agrega encabezado de grid			  			            	  
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 
					/* cantidad=Number(row['cantidad']);							 			 
				     preciocdesc=Number(row['precio'])-((Number(row['precio'])/100)*Number(row['descuento']));				     			     
				     descuento=Number(row['descuento']);
					 iva=Number(row['impuesto']);					 
					 preciop=Number(row['precio']);
				     precio=Number(preciocdesc)*(1+(Number(row['impuesto'])/100));				 
					 parcial=precio*cantidad;
					 total+=Number(parcial);			  */
					 html+='<center><a href=""><img src="jquery-mobile/images/medicamento.png"/></a></center>';
				     html+='<div class="ui-grid-a" id="gridficha" style="text-align:left">';
			  	     html+='<div class="ui-block-a" style="width:120px" ><div class="ui-bar ui-bar-a">Articulo</div></div>';
		             html+='<div class="ui-block-b" style="width:300px"><div class="ui-bar ui-bar-b">'+row['descripcion']+'</div></div>';
				     html+='<div class="ui-block-a" style="width:120px"><div class="ui-bar ui-bar-a">Laboratorio</div></div>';
	                 html+='<div class="ui-block-b" style="width:300px"><div class="ui-bar ui-bar-b" >'+row['laboratorio']+'</div></div>';
       	             html+='<div class="ui-block-a" style="width:120px"><div class="ui-bar ui-bar-a">SAL</div></div>';
                     html+='<div class="ui-block-b" style="width:300px"><div class="ui-bar ui-bar-b" >'+row['sal']+'</div></div>';
                     html+='<div class="ui-block-a" style="width:120px"><div class="ui-bar ui-bar-a">Accion T</div></div>';
                     html+='<div class="ui-block-b" style="width:300px"><div class="ui-bar ui-bar-b" >'+row['accion']+'</div></div>';             		               
                     html+='<div class="ui-block-a" style="width:120px"><div class="ui-bar ui-bar-a">Clasificacion</div></div>';
                     html+='<div class="ui-block-b" style="width:300px"><div class="ui-bar ui-bar-b" >'+row['clas']+'</div></div>';         		               
					 html+='</div>';
			  });//.each					
					$("#divficha").append(html);				
			
	   }//function exito
 		
	function errorconsulta(err) {
    	alert("Error SQL al llenar ficha de articulo: "+err.code+err.message);
	}
//  });	

  }//
function guardarventa(cliente,obs,total){	
var cabinsertada=false;
var sumtotlineaped=0; var summontodescped=0; var sumivalineaped=0; var sumtotal=0; var bodega=window.localStorage.getItem("bodega");
var sumtotlineafac=0; var summontodescfac=0; var sumivalineafac=0; var sumtotalfac=0;
var consecutivo=window.localStorage.getItem("consepedido");
var consefac=window.localStorage.getItem("consefactura");
var ruta=window.localStorage.getItem("ruta");
var fecha = new Date();
var fechaact=fecha.getFullYear()+"/"+(fecha.getMonth()+1)+"/"+fecha.getDate();
var hora=fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
var fechayhora=fechaact+" "+hora;
//+"\nMilisegundo: "+fecha.getMilliseconds());
var longitud=consecutivo.length; var inicial=consecutivo.substr(0,3); var numpedido= consecutivo.substr(3,(longitud-3));
var incremetarp=Number(numpedido)+1; var pedido=inicial+pad(incremetarp,6);
var longfac=consefac.length; var inicialfac=consefac.substr(0,3); var numfac=consefac.substr(3,(longfac-3));
var incremetarf=Number(numfac)+1; var factura=inicialfac+pad(incremetarf,6);


var query=[];
   function pad(n, length){
	   //alert('entra a funcion'+n); 
  	 n = n.toString();
   	 while(n.length < length) n = "0" + n;
  	 return n;
   }
var i=0;
	function listo(tx,results){ 	      
	      if (results.rows.length>0){		
		  	 $.each(results.rows,function(index){   
			 var row = results.rows.item(index);    
			 alert('entra a listo');
			 var precio=Number(row['precio']);//precio sin descuento y sin iva			 
			 var pordesc=Number(row['descuento']);//porcentaje de descuento que se aplica 
			 var articulo=row['articulo'];			 
			 var preventa=0; var abordo=0; var totlinea=0; var montodesc=0; var lineacdes=0; var ivalinea=0; var preciocdesc=0; var preciociva=0;
			 var existencia=Number(row['existencia']);
			 var cantidad=Number(row['cantidad']);
			 var dif=existencia-cantidad;
					 if (existencia==0){
						 preventa=cantidad;							 
					 }
					 else{
						 if (dif>=0){						 
						 abordo=cantidad;						 
						 }
						 else{
							 preventa=cantidad-existencia;
							 abordo=existencia;
						 }
					 }					 
					 if (preventa>0){
						 alert('preventa');
						 totlinea=preventa*precio;//total de linea sin descuento y sin iva
						 montodesc=(Number(totlinea.toFixed(2))/100)*Number(row['descuento']); 
						 lineacdes=totlinea-montodesc;//importe de linea con descuento
						 //iva de la linea
						 ivalinea=lineacdes*(row['impuesto']/100); 
						 //precio del articulo con descuento sin aplicar iva
						 preciocdesc=row['precio']-((row['precio']/100)*Number(row['descuento']));  
						 //precio del articulo con descuento aplicando iva
						 preciociva=preciocdesc*(1+(row['impuesto']/100));	
						 sumtotlineaped+=Number(totlinea);//suma del total de linea sin descuento y sin iva
						 summontodescped+=Number(montodesc);//suma del monto de descuento de cada linea
						 sumivalineaped+=Number(ivalinea);//suma del total de iva de cada linea						 
						 query[i]='INSERT INTO DETPEDIDO (num_ped,cod_art,mon_prc_mn,por_dsc_ap,mon_tot,mon_dsc,mon_prc_mx,cnt_max) VALUES("'+pedido+'","'+articulo+'",'+precio+','+pordesc+','+totlinea.toFixed(2)+','+montodesc.toFixed(2)+','+precio+','+cantidad+')'; 
						 alert(query[i]);
					 }
					 if (abordo>0){
						 totlinea=abordo*precio;//total de linea sin descuento y sin iva
						 montodesc=(Number(totlinea.toFixed(2))/100)*Number(row['descuento']); 
						 lineacdes=totlinea-montodesc;//importe de linea con descuento
						 //iva de la linea
						 ivalinea=lineacdes*(row['impuesto']/100); 
						 //precio del articulo con descuento sin aplicar iva
						 preciocdesc=row['precio']-((row['precio']/100)*Number(row['descuento']));  
						 //precio del articulo con descuento aplicando iva
						 preciociva=preciocdesc*(1+(row['impuesto']/100));			 
						 sumtotlineafac+=Number(totlinea);//suma del total de linea sin descuento y sin iva
						 summontodescfac+=Number(montodesc);//suma del monto de descuento de cada linea
						 sumivalineafac+=Number(ivalinea);//suma del total de iva de cada linea
						 query[i]='INSERT INTO DETPEDIDO (num_ped,cod_art,mon_prc_mn,por_dsc_ap,mon_tot,mon_dsc,mon_prc_mx,cnt_max) VALUES("'+factura+'","'+articulo+'",'+precio+','+pordesc+','+totlinea.toFixed(2)+','+montodesc.toFixed(2)+','+precio+','+cantidad+')';						 
						 i++;
						 alert(query[i]);
						 query[i]='UPDATE ARTICULO_EXISTENCIA SET existencia=existencia-'+abordo+' WHERE articulo="'+articulo+'" and bodega="'+bodega+'"';						 alert(query[i]);
					 }
			 i++;
			 
			 //guardadetpedido(pedido,articulo,precio,pordesc,totlinea,montodesc,precio,cantidad);
			
			//alert('despues de llamar a funcion guardated');
			 
			 
			/* 
			 tx.executeSql('CREATE TABLE IF NOT EXISTS ENCPEDIDO (id INTEGER PRIMARY KEY AUTOINCREMENT, NUM_PED,COD_ZON,DOC_PRO,COD_CLT,TIP_DOC,HOR_FIN,FEC_PED,FEC_DES,MON_IMP_VT,MON_CIV,MON_SIV,MON_DSC,OBS_PED,ESTADO,COD_CND,COD_BOD)'); 
         tx.executeSql('CREATE TABLE IF NOT EXISTS DETPEDIDO (id INTEGER PRIMARY KEY AUTOINCREMENT, NUM_PED,COD_ART,MON_PRC_MN,POR_DSC_AP,MON_TOT,MON_DSC,MON_PRC_MX,CNT_MAX)'); 

			 */			 			 
		 	});
			sumtotal=Number(sumtotlineaped)+Number(sumivalineaped);
			sumtotalfac=Number(sumtotlineafac)+Number(sumivalineafac);
			 /*
			 alert(sumtotal);
			 alert(sumtotlinea);
			 alert(sumivalinea);			 */
			 if (sumtotal>0){
			query[i]='INSERT INTO ENCPEDIDO (num_ped,cod_zon,cod_clt,tip_doc,hor_fin,fec_ped,fec_des,mon_imp_vt,mon_civ,mon_siv,mon_dsc,obs_ped,estado,cod_cnd,cod_bod) VALUES ("'+pedido+'","'+ruta+'","'+cliente+'","S","'+fechayhora+'","'+fechaact+'","'+fechaact+'",'+sumivalineaped.toFixed(2)+','+sumtotal.toFixed(2)+','+sumtotlineaped.toFixed(2)+','+summontodescped.toFixed(2)+',"'+obs+'","F",'+30+',"'+bodega+'")'; 
			i++;			
			alert(query[i]);
			query[i]='UPDATE PARAMETROS SET num_ped="'+pedido+'"';		
			alert(query[i]);
			i++;			
			 }
			 if (sumtotalfac>0){
				query[i]='INSERT INTO ENCPEDIDO (num_ped,cod_zon,cod_clt,tip_doc,hor_fin,fec_ped,fec_des,mon_imp_vt,mon_civ,mon_siv,mon_dsc,obs_ped,estado,cod_cnd,cod_bod) VALUES ("'+factura+'","'+ruta+'","'+cliente+'","S","'+fechayhora+'","'+fechaact+'","'+fechaact+'",'+sumivalineafac.toFixed(2)+','+sumtotalfac.toFixed(2)+','+sumtotlineafac.toFixed(2)+','+summontodescfac.toFixed(2)+',"'+obs+'","F",'+30+',"'+bodega+'")'; 
			i++;			 
			alert(query[i]);
			query[i]='UPDATE PARAMETROS SET num_fac="'+factura+'"';		
			alert(query[i]);
			i++;
			 }
			query[i]='DELETE FROM TEMPEDIDO where cliente="'+cliente+'"';        
			alert(query[i]);
			
		  	 //guardaencpedido(pedido,ruta,cliente,fechayhora,fechaact,sumivalinea,(sumtotlinea+sumivalinea),sumtotlinea,summontodesc,obs,30,"K01");
				//alert('despues de llamar a funcion guardated');
		  }//if (results.rows.length>0){		  
 	}//function listo(tx,results){ 
	function consultatemp(tx){  
	             //alert('ENTRA A CONSultatepm'); 
				var sql='SELECT a.articulo,a.cantidad,b.impuesto,b.precio,';
				sql+='b.descuento,c.existencia ';	
				sql+='FROM TEMPEDIDO a left outer join articulo b on b.articulo=a.articulo left outer join ARTICULO_EXISTENCIA c ';
				sql+='on c.articulo=a.articulo and c.bodega="'+bodega+'" WHERE  a.cliente="'+cliente+'"  ';
			    //alert(sql);
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error al preparar pedido : "+articulo+err.code+err.message);
         		});    									
	}
	base.transaction(consultatemp, function(err){
    	 			 alert("Error select tabla temporal PEDIDO para guardarlo: "+err.code+err.message);
         		},function(){
								
					guardadetpedido(query,total);
					
				});		
				
}//function guardarventa
function guardadetpedido(query,total){
	   //alert (pedido+articulo+precio+pordescuento+totalinea+descuento+precio+cantidad);
	base.transaction(insertadet,function(err){
    	  alert("Error al insertar en detallepedido: "+err.code+err.message);
          },function(){		  
		 //alert('total '+total);
		   actsaldo(total);//actualiza saldo del cliente, la funcion esta en almacenamiento.js		   		   
		   window.localStorage.setItem("sioperacion",'S');
		   obtenerconse();
		   navigator.notification.alert('Venta Guardada',null,'Guardar Venta','Aceptar');										 });
		  				
    	function insertadet(tx) {		
		//alert('entra a modificar detallefactura cantidad: '+cantidad);		
			for (var i = 0, long = query.length; i < long; i++) {   									   								
				alert(query[i]);
				tx.executeSql(query[i]); 						   
					   
			}// for (var i = 0, long = query.length; i < long; i++) 
		}
	
}//function guardadetpedido
function previolinea(articulo,cantidad){		
//alert(articulo);

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

		base.transaction(consulta, errorconsulta);	
	function consulta(tx) {		
		tx.executeSql('SELECT a.articulo,a.descripcion,a.precio,a.descuento,a.impuesto FROM articulo a where a.articulo="'+articulo+'"',[],exito,errorconsulta);
		}		
		function exito(tx,results){ 
			
		      $("#gridprevart").empty();				  			  
			  var html = "";
			  var tipo="";
			  var precio=0; var iva=0; var descuento=0; var parcial=0; var preciop=0; var preciocdesc=0;			  			  			 	
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				  	 					 
				     preciocdesc=Number(row['precio'])-((Number(row['precio'])/100)*Number(row['descuento']));				     			     				     
				     precio=Number(preciocdesc)*(1+(Number(row['impuesto'])/100));				 
					 parcial=precio*Number(cantidad);					 
					 html+='<div class="ui-block-a" style="width:90px" ><div class="ui-bar ui-bar-a">Precio</div></div>';
					 html+='<div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-a">Cantidad</div></div>';
					 html+='<div class="ui-block-c" style="width:90px"><div class="ui-bar ui-bar-a">Total</div></div>';
	                 html+='<div class="ui-block-a" style="width:90px"><div class="ui-bar ui-bar-b" style="text-align:right">'+precio.toFixed(0)+'</div></div>';				    
		             html+='<div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-b" style="text-align:right">'+cantidad+'</div></div>';	                
	                 html+='<div class="ui-block-c" style="width:90px"><div class="ui-bar ui-bar-b" style="text-align:right">'+parcial.toFixed(2)+'</div></div>';
					 $("#gridprevart").append(html);
					 	//alert('despues de agregar html');						 
			  
			  });//.each											                
	   }//function exito
 		
	function errorconsulta(err) {
    	alert("Error SQL al llenar previo de articulo: "+err.code+err.message);
	}
//  });	

  }//previolinea
