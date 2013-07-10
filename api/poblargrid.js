// POBLAR GRIDS DE PEDIDO, FACTURA
function mostrarpedido(){
	//muestra en un collapsible los renglones temporales de pedido, agregandolos en un grid
	//el usuario podrá eliminar los renglones que se selecciones por medio de checkbox
//  $('#datoscli').live('pageshow',function(event, ui){   	   

		//var db = window.openDatabase("Database", "1.0", "SARDEL", 200000);
		consultadb().transaction(consulta, errorconsulta);	
	function consulta(tx) {		
		tx.executeSql('SELECT a.articulo,b.descripcion,(b.precio-((b.precio/100)*b.descuento)) as precio,b.descuento,a.cantidad,b.impuesto FROM TEMPEDIDO a left outer join articulo b on b.articulo=a.articulo where a.cliente="'+window.localStorage.getItem("clave")+'"',[],exito,errorconsulta);
		}
	
		
		function exito(tx,results){ 
			
		      $("#gridpedido").empty();	
			  $("#tpedido").attr("value",0.0); 					  
			  var html = "";
			  var tipo="";
			  var saldot=0;
			  var montot=0;			  
		      var precio=0;
	    	  var total=0;      
			  var importe=0;         
			  //agrega encabezado de grid
			  html+=' <div class="ui-block-a" style="width:70px;height:20px" > ';            
              html+=' <div class="ui-bar ui-bar-a">Elim.</div></div> ';           
              html+=' <div class="ui-block-b" style="width:110px"><div class="ui-bar ui-bar-a">Articulo</div></div>';
              html+=' <div class="ui-block-c" style="width:300px"><div class="ui-bar ui-bar-a">Descrip.</div></div>';
              html+=' <div class="ui-block-d" style="width:90px"><div class="ui-bar ui-bar-a">Cantidad</div></div>';
              html+=' <div class="ui-block-e" style="width:90px"><div class="ui-bar ui-bar-a">Precio</div></div>';
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				     //descuento=(row['precio']/100)*row['descuento'];
				     precio=row['precio']*(1+(row['impuesto']/100));				 
					 importe=precio*row['cantidad'];
					 total+=Number(importe);
					 
					html+='<div class="ui-block-a" style="width:70px;height:20px" >';              
           			html+='<div class="ui-bar ui-bar-e"  >';      		 		
                   	html+='<div style="padding:0px; margin-top:-8px; margin-left:-10px">'; 
			        html+='     <label for="P'+row['articulo']+'" >&nbsp</label>';  
            		html+='     <input type="checkbox" id="P'+row['articulo']+'" name="'+row['articulo']+'" value="'+importe+'" class="clasep"  />';
                   	html+='		</div>';	
		            html+='   </div>';
            		html+='</div>';            
                    html+='<div class="ui-block-b" style="width:110px"><div class="ui-bar ui-bar-b">'+row['articulo']+'</div></div>';
                    html+='<div class="ui-block-c" style="width:300px"><div class="ui-bar ui-bar-b">'+row['descripcion']+'</div></div>';
                    html+='<div class="ui-block-d" style="width:90px"><div class="ui-bar ui-bar-b"><a href="#pmodcantidadp" class="clasep" name="'+row['articulo']+'" id="P'+row['articulo']+'*'+row['cantidad']+'" ><font color="FFFFFF">'+row['cantidad']+'</font></a></div></div>';
	                html+='<div class="ui-block-e" style="width:90px"><div class="ui-bar ui-bar-b">'+precio.toFixed(2)+'</div></div> ';

                  	 
			  });//.each
					$("#gridpedido").append(html); 
					//$("#tpedido").attr("value",total); 			
					$("#tpedido").val(total.toFixed(2)); 			
					
					//alert('total'+total);					 
			
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
		//alert('entra mostrar factura');
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 200000);
		consultadb().transaction(consulta,errorconsulta);	
	function consulta(tx) {		
		tx.executeSql('SELECT a.articulo,b.descripcion,(b.precio-((b.precio/100)*b.descuento)) as precio,a.cantidad,b.impuesto FROM TEMFACTURA a left outer join articulo b on b.articulo=a.articulo where a.cliente="'+window.localStorage.getItem("clave")+'"',[],exito,errorconsulta);		
		
		}
		function exito(tx,results){ 		    
			  $("#gridfactura").empty();	
			  $("#tfactura").attr("value",0.0); 		  
			  var html = "";
			  var tipo="";
			  var saldot=0;
			  var montot=0;			  
		      var precio=0;
	    	  var total=0;
			  var importe=0;              
			  //agrega encabezado de grid
			  html+=' <div class="ui-block-a" style="width:70px;height:20px" > ';            
              html+=' <div class="ui-bar ui-bar-a">Elim.</div></div> ';           
              html+=' <div class="ui-block-b" style="width:110px"><div class="ui-bar ui-bar-a">Articulo</div></div>';
              html+=' <div class="ui-block-c" style="width:300px"><div class="ui-bar ui-bar-a">Descrip.</div></div>';
              html+=' <div class="ui-block-d" style="width:90px"><div class="ui-bar ui-bar-a">Cantidad</div></div>';
              html+=' <div class="ui-block-e" style="width:90px"><div class="ui-bar ui-bar-a">Precio</div></div>';
			  $.each(results.rows,function(index){
				  var row = results.rows.item(index); 					    
				     //descuento=(row['precio']/100)*row['descuento'];
				     precio=row['precio']*(1+(row['impuesto']/100));				 
					 importe=precio*row['cantidad'];
					 total+=Number(importe);
					 					 
					html+='<div class="ui-block-a" style="width:70px;height:20px" >';              
           			html+='<div class="ui-bar ui-bar-e"  >';      		 		
                   	html+='<div style="padding:0px; margin-top:-8px; margin-left:-10px">'; 
			        html+='     <label for="F'+row['articulo']+'" >&nbsp</label>';  
            		html+='     <input type="checkbox" id="F'+row['articulo']+'" name="'+row['articulo']+'" value="'+importe+'" class="clasef"  />';
                   	html+='		</div>';	
		            html+='   </div>';
            		html+='</div>';            
                    html+='<div class="ui-block-b" style="width:110px"><div class="ui-bar ui-bar-b">'+row['articulo']+'</div></div>';
                    html+='<div class="ui-block-c" style="width:300px"><div class="ui-bar ui-bar-b">'+row['descripcion']+'</div></div>';
                    html+='<div class="ui-block-d" style="width:90px"><div class="ui-bar ui-bar-b"><a href="#pmodcantidadf" class="clasef" name="'+row['articulo']+'" id="F'+row['articulo']+'*'+row['cantidad']+'" ><font color="FFFFFF">'+row['cantidad']+'</font></a></div></div>';

	                html+='<div class="ui-block-e" style="width:90px"><div class="ui-bar ui-bar-b">'+precio.toFixed(2)+'</div></div> ';

                  	 
			  });//.each			        
					$("#gridfactura").append(html); 					
					//$("#tfactura").attr("value",total); 								 
					$("#tfactura").val(total.toFixed(2)); 								 
					//alert('total factura'+total);				 								
	   }//function exito
 		
	function errorconsulta(err) {
    	alert("Error SQL al llenar detalles factura: "+err.code+err.message);
		return false;
	}
//  });	

  }//mostrarfatura
