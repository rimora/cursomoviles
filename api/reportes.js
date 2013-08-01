// Reportes
function repvencob(){
	
//alert('funcion repvencob');
		consultadb().transaction(poblarfac, function(err){
    	 		 alert("Error al obtener información para reporte: "+err.code+err.message);
         		});		
	function poblarfac(tx){  				
			var sql='SELECT a.clave,a.nombre,b.estado,sum(b.mon_civ-b.mon_dsc) as vendido,sum(c.mondoc) as cobrado FROM CLIENTES a ';		
				sql+=' left outer join ENCPEDIDO b on b.cod_clt=a.clave ';
				sql+=' left outer join ENCOBROS c on c.cliente=a.clave';
				sql+=' group by a.clave,a.nombre,b.estado';
				sql+=' having sum(b.mon_civ-b.mon_dsc)>0 or sum(c.mondoc)>0 ';

				//alert(sql);
				tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select recibos: "+err.code+err.message);
         		});    	
	}
	function listo(tx,results){ 
	           var totalv=0;
			   var totalpre=0;
			   var totalfac=0;
			   var totalcob=0;
				  
		      $("#gridrepven").empty();	
              $("#rtotalv").val(0);
			  $("#rpreventa").val(0);
			  $("#rfacturado").val(0);
			  $("#rtotalc").val(0);			  
			  var html = "";			 
			 		  		      
			  //agrega encabezado de grid
			  html+=' <div class="ui-block-a" style="width:300px" > ';            
              html+=' <div class="ui-bar ui-bar-a">Cliente</div></div> ';           
              html+=' <div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-a">Cobrado</div></div>';
              html+=' <div class="ui-block-c" style="width:90px"><div class="ui-bar ui-bar-a">Vendido</div></div>';
              html+=' <div class="ui-block-d" style="width:90px"><div class="ui-bar ui-bar-a">Preventa</div></div>';
			  html+=' <div class="ui-block-e" style="width:90px"><div class="ui-bar ui-bar-a">Facturado</div></div>';
			  

			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				     //descuento=(row['precio']/100)*row['descuento'];
					 //alert ('cobrado '+row['cobrado']+',estado'+row['estado']+',preventa '+row['vendido']);
					 if (row['cobrado']==null){//no hay cobro
					 	var cobrado=0;
					 }
					 else{
						var cobrado=Number(row['cobrado']); 
						 
					 }
					 
					 if (row['estado']=='F'){//es factura
					 	var facturado=Number(row['vendido']);					 
					 }
					 else if (row['estado']=='1'){//preventa
						var preventa=Number(row['vendido']);					 	 
					 }
					 else{
						 var preventa=0;					 	 
						 var facturado=0;					 
					 }
					 
					 var vendido=preventa+facturado;
					 
					 totalv+=vendido;
					 totalpre+=preventa;
					 totalfac+=facturado;
					 totalcob+=cobrado;
	
					html+='<div class="ui-block-a" style="width:300px"><div class="ui-bar ui-bar-e">'+row['nombre']+'</div></div>';
                    html+='<div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-b">'+cobrado.toFixed(2)+'</div></div>';
                    html+='<div class="ui-block-c" style="width:90px"><div class="ui-bar ui-bar-b">'+vendido.toFixed(2)+'</div></div>';
                    html+='<div class="ui-block-d" style="width:90px"><div class="ui-bar ui-bar-b">'+preventa.toFixed(2)+'</div></div>';
					html+='<div class="ui-block-e" style="width:90px"><div class="ui-bar ui-bar-b">'+facturado.toFixed(2)+'</div></div>';
					


                  	 
			  });//.each
					$("#gridrepven").append(html); 
					$("#rtotalv").val(totalv.toFixed(2));
					$("#rpreventa").val(totalpre.toFixed(2));
					$("#rfacturado").val(totalfac.toFixed(2));
					$("#rtotalc").val(totalcob.toFixed(2));
								
					//$("#montodep").val(montot.toFixed(2)); 			
					
					//alert('total'+total);					 
			
	   }//function exito

 // });	//$('#pclientes').live('pageshow',function(event, ui){
	
}// repvencob()
function repcierrecobro(){
	
	var totalcob=0;
	
	
		consultadb().transaction(poblarfac, function(err){
    	 		 alert("Error al obtener información para reporte: "+err.code+err.message);
         		});		
	function poblarfac(tx){  				
			var sql='SELECT a.cliente,b.nombre,a.recibo,a.mondoc as cobrado FROM ENCOBROS a ';		
				sql+=' inner join CLIENTES b on b.clave=a.cliente ';
				

				//alert(sql);
				tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select recibos: "+err.code+err.message);
         		});    	
	}
	function listo(tx,results){ 			  
		      $("#gridrepcierre").empty();	
              $("#rmontocob").val(0);
			  	  
			  var html = "";			 
			 		  		      
			  //agrega encabezado de grid
			  html+=' <div class="ui-block-a" style="width:300px" > ';            
              html+=' <div class="ui-bar ui-bar-a">Cliente</div></div> ';           
              html+=' <div class="ui-block-b" style="width:110px"><div class="ui-bar ui-bar-a">Recibo</div></div>';
              html+=' <div class="ui-block-c" style="width:90px"><div class="ui-bar ui-bar-a">Importe</div></div>';
			  

			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				     //descuento=(row['precio']/100)*row['descuento'];
					// alert ('cobrado '+row['cobrado']);
					 
					 var cobrado=Number(row['cobrado']); 
					
					 totalcob+=cobrado;
	
					html+='<div class="ui-block-a" style="width:300px" ><div class="ui-bar ui-bar-e"  >'+row['nombre']+'</div></div>';
                    html+='<div class="ui-block-b" style="width:110px"><div class="ui-bar ui-bar-b">'+row['recibo']+'</div></div>';
					html+='<div class="ui-block-c" style="width:90px"><div class="ui-bar ui-bar-b">'+cobrado.toFixed(2)+'</div></div>';
					


                  	 
			  });//.each
					$("#gridrepcierre").append(html); 
					$("#rmontocob").val(totalcob.toFixed(2));
					
	   }//function exito

 // });	//$('#pclientes').live('pageshow',function(event, ui){
	
}// repcierrecobro
function repinventario(){
		consultadb().transaction(poblarcat, function(err){
    	 		 alert("Error select Articulos para reporte : "+err.code+err.message);
         		});		
	function poblarcat(tx){  
	        //alert('entra al poblarcat armacatalogo');        	   
			var sql='SELECT a.articulo,a.descripcion,a.clas,a.accion,a.impuesto,a.descuento,b.existencia as ebodega,';
			sql+='a.precio';
			sql+=' FROM articulo a left outer join articulo_existencia b on b.articulo=a.articulo and b.bodega="K01" ';
			sql+=' order by a.descripcion';
			//alert('despues del sql armacatalogo');        
			
			
		    tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select catalogo: "+sql+err.code+err.message);
         	});    	
	}
	function listo(tx,results){  
		 $('#lrepinv').empty();
		 var cantidad=0;
		 var lineas=0;        
		 //alert('entra a listo de armacatalogo');
		 $.each(results.rows,function(index){   
		   //  alert('entra al each armacatalogo');        
			 var row = results.rows.item(index);         
			 //alert('despues del var row armacatalogo');           
			 var html="";	
			 //var precio=row['precio']*(1+(row['impuesto']/100));
			 var precio=Number(row['precio']);
			 if   (row['ebodega']==null)       
			 {
				var existencia=0; 				
				//alert('existencia es null'+existencia); 
			 }
			 else 
			 {
				 var existencia=row['ebodega']; 
				 
			 }
			 lineas+=1;
			 cantidad+=Number(existencia);
				 
			 html+='<li id=R'+row['articulo']+'>';
	         html+='<h3> '+row['descripcion']+'</h3>';
			 html+='Clasificación:'+row['clas']+' AcciónT:'+row['accion']+'<br/>Precio:'+precio.toFixed(2)+'    A bordo:'+existencia+'   </p></li>';
			 			 
			 $('#lrepinv').append(html);        	
			 //alert('despues de lcatalogo.append armacatalogo');        
		 });         
		 			 
		 $('#lrepinv').listview('refresh'); 
		 $("#rpiezas").val(cantidad);
		 $("#rlineas").val(lineas);
		 //alert('despues de lcatalogo listview armacatalogo');        
 	}

 // });	//$('#pclientes').live('pageshow',function(event, ui){
	
}//repinventario
function repvisitas(){
		consultadb().transaction(poblarfac, function(err){
    	 		 alert("Error al obtener información para reporte de visitas: "+err.code+err.message);
         		});		
	function poblarfac(tx){  				
			var sql='SELECT a.cliente,b.nombre,a.inicio,a.fin,a.notas,c.des_rzn as razon FROM VISITA a ';		
				sql+=' left outer join CLIENTES b on b.clave=a.cliente left outer join RAZONVISITA c on c.cod_rzn=a.razon';			

				//alert(sql);
				tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select visita: "+err.code+err.message);
         		});    	
	}
	function listo(tx,results){ 			  
		      $("#gridrepvisitas").empty();	              	  
			  var html = "";			 
			 		  		      
			  //agrega encabezado de grid
			  html+=' <div class="ui-block-a" style="width:200px" > ';            
              html+=' <div class="ui-bar ui-bar-a">Cliente</div></div> ';           
              html+=' <div class="ui-block-b" style="width:150px"><div class="ui-bar ui-bar-a">Razon</div></div>';
              html+=' <div class="ui-block-c" style="width:200px"><div class="ui-bar ui-bar-a">Inicio</div></div>';
			  html+=' <div class="ui-block-d" style="width:200px"><div class="ui-bar ui-bar-a">Fin</div></div>';
			  html+=' <div class="ui-block-e" style="width:200px"><div class="ui-bar ui-bar-a">Notas</div></div>';
			  

			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				     //descuento=(row['precio']/100)*row['descuento'];
					html+='<div class="ui-block-a" style="width:200px" ><div class="ui-bar ui-bar-e"  >'+row['nombre']+'</div></div>';
                    html+='<div class="ui-block-b" style="width:150px"><div class="ui-bar ui-bar-b">'+row['razon']+'</div></div>';
					html+='<div class="ui-block-c" style="width:200px"><div class="ui-bar ui-bar-b">'+row['inicio']+'</div></div>';
					html+='<div class="ui-block-d" style="width:200px"><div class="ui-bar ui-bar-b">'+row['fin']+'</div></div>';
					html+='<div class="ui-block-e" style="width:200px"><div class="ui-bar ui-bar-b">'+row['notas']+'</div></div>';
					


                  	 
			  });//.each
					$("#gridrepvisitas").append(html); 

	   }//function exito

 // });	//$('#pclientes').live('pageshow',function(event, ui){
	
}// repvisitas()