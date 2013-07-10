//devoluciones
function listafacturas(){
 // $('#pclientes').live('pageshow',function(event, ui){
		//alert('This page was just hidden: '+ ui.prevPage);		
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 1000000);
		consultadb().transaction(poblarfac, function(err){
    	 		 alert("Error poblar facturas para devoluciones : "+err.code+err.message);
         		});		
	function poblarfac(tx){  
		    alert('entra a poblarfac');
			//var sql='SELECT * FROM ENCHISFAC WHERE CLIENTE="'+window.localStorage.getItem("clave")+'" ORDER BY FACTURA';		
			var sql='SELECT * FROM ENCHISFAC ';		
		    alert(sql);
		tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select historico facturas: "+err.code+err.message);
         		});    	
	}
	function listo(tx,results){  
	      alert('entra a listo');
		 $('#listahistfac').empty(); 		     
		 $.each(results.rows,function(index){           
			 var row = results.rows.item(index); 
			 var html="";               			 
			 html+='<li id="'+row['factura']+'">';
	         html+='<a href="#pdethistfac"><h5> '+row['factura']+'</h3>';
			 html+='Total:'+row['monto']+' Pedido:'+row['pedido']+' Fecha:'+row['fecha']+'</a></li>';
			 alert('antes del append de listfac '+html);
			 $('#listahistfac').append(html);  			
			 alert('despues del append de listfac '+html); 
		 });    
		 alert('antes de refresh de lista');  		 
		 $('#listahistfac').listview('refresh'); 
		 alert('despues de refresh de lista');
 	}

 // });	//$('#pclientes').live('pageshow',function(event, ui){
	
}// listafacturas()
function mostrarhistfac(factura){
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 200000);
		consultadb().transaction(consulta, errorconsulta);	
	function consulta(tx) {	
        var sql='SELECT a.factura,a.articulo,a.cantidad,a.devuelto,a.precio,a.totlinea,a.linea ';
	    sql+='(a.precio-((a.precio/100)*b.descuento)) as preciocdesc,b.descripcion FROM DETHISFAC a ';	
		sql+='left outer join articulo b on b.articulo=a.articulo where a.factura="'+factura+'"';	
		
		tx.executeSql(sql ,[],exito,errorconsulta);
		}		
		function exito(tx,results){ 
			
		      $("#griddethistfac").empty();				  
			  var html = "";
			  var tipo="";
			  var saldot=0;
			  var montot=0;			  
		      var precio=0;
	    	  var total=0;      
			  var importe=0;         
			  //agrega encabezado de grid
			  html+=' <div class="ui-block-a" style="width:110px" > ';            
              html+=' <div class="ui-bar ui-bar-a">Articulo</div></div> ';           
              html+=' <div class="ui-block-b" style="width:300px"><div class="ui-bar ui-bar-a">Descrip.</div></div>';
              html+=' <div class="ui-block-c" style="width:90px"><div class="ui-bar ui-bar-a">Cantidad</div></div>';
              html+=' <div class="ui-block-d" style="width:90px"><div class="ui-bar ui-bar-a">Devuelto</div></div>';
              html+=' <div class="ui-block-e" style="width:90px"><div class="ui-bar ui-bar-a">Precio</div></div>';
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				     //descuento=(row['precio']/100)*row['descuento'];
				     //precio=row['precio']*(1+(row['impuesto']/100));				 
					 precio=row['preciocdesc'];				 
					 //importe=precio*row['cantidad'];
					 //total+=Number(importe);
					 
					html+='<div class="ui-block-a" style="width:110px" >';              
           			html+='<div class="ui-bar ui-bar-e"  >'+row['articulo']+'</div></div>';   		 		                    
					html+='<div class="ui-block-b" style="width:300px"><div class="ui-bar ui-bar-b">'+row['descripcion']+'</div></div>';
                    html+='<div class="ui-block-c" style="width:90px"><div class="ui-bar ui-bar-b">'+row['cantidad']+'</div></div>';
                    html+='<div class="ui-block-d" style="width:90px"><div class="ui-bar ui-bar-b"><a href="#pcantidaddev" class="clasedev" name="'+row['linea']+'" id="D'+row['factura']+'" ><font color="FFFFFF">'+row['devuelto']+'</font></a></div></div>';
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