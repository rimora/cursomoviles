// POBLAR GRIDS DE PEDIDO, FACTURA

function mostrarfactura(){
		//muestra en un collapsible los renglones temporales de pedido, agregandolos en un grid
	//el usuario podrá eliminar los renglones que se selecciones por medio de checkbox
//  $('#datoscli').live('pageshow',function(event, ui){   	   

		//var db = window.openDatabase("Database", "1.0", "SARDEL", 200000);
		consultadb().transaction(consulta, errorconsulta);	
	function consulta(tx) {		
		tx.executeSql('SELECT a.articulo,b.descripcion,b.precio,b.descuento,a.cantidad,b.impuesto,b.precio as preciop FROM TEMFACTURA a left outer join articulo b on b.articulo=a.articulo where a.cliente="'+window.localStorage.getItem("clave")+'"',[],exito,errorconsulta);
		}
	
		
		function exito(tx,results){ 
			
		      $("#gridpedido").empty();	
			  $("#tpedido").attr("value",0.00); 					  
			  var html = "";
			  var tipo="";
			  var saldot=0;
			  var montot=0;			  
		      var precio=0;
	    	  var total=0;      			  
			  var iva=0;
			  var descuento=0;
			  var parcial=0;
			  var preciop=0;
			   var preciocdesc=0;
			  //agrega encabezado de grid
			  html+=' <div class="ui-block-a" style="width:70px;height:20px" > ';            
              html+=' <div class="ui-bar ui-bar-a"><a href="#" id="beliminarp">Elim.</a></div></div> ';           
              html+=' <div class="ui-block-b" style="width:110px"><div class="ui-bar ui-bar-a">Articulo</div></div>';
              html+=' <div class="ui-block-c" style="width:300px"><div class="ui-bar ui-bar-a">Descrip.</div></div>';
              html+=' <div class="ui-block-d" style="width:80px"><div class="ui-bar ui-bar-a">Cantidad</div></div>';			  
		      html+='<div class="ui-block-e">';			  
              html+='<div class="ui-grid-b"  style="margin-top:0px;width:260px">';
			  /*
			  html+='<div class="ui-block-a" style="width:70px">';
              html+='<div class="ui-bar ui-bar-a">IVA</div></div>';*/
			  html+='<div class="ui-block-a" style="width:80px">';
              html+='<div class="ui-bar ui-bar-a">Descto</div></div>';
              /*
			  html+='<div class="ui-block-c" style="width:90px">';			  
              html+='<div class="ui-bar ui-bar-a">Precio P</div></div>';
			  */
              html+='<div class="ui-block-b" style="width:90px">';
              html+='<div class="ui-bar ui-bar-a">Precio</div></div>';
			  html+='<div class="ui-block-c" style="width:90px">';
              html+='<div class="ui-bar ui-bar-a">Parcial</div></div>';
              html+='</div>';                    
              html+='</div>';	
			  
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				     preciocdesc=Number(row['precio'])-((Number(row['precio'])/100)*Number(row['descuento']));				     			     
				     descuento=Number(row['descuento']);
					 iva=Number(row['impuesto']);					 
					 preciop=Number(row['preciop']);
				     precio=Number(preciocdesc)*(1+(Number(row['impuesto'])/100));				 
					 parcial=precio*Number(row['cantidad']);
					 total+=Number(parcial);
					 
					html+='<div class="ui-block-a" style="width:70px;height:20px" >';              
           			html+='<div class="ui-bar ui-bar-e"  >';      		 		
                   	html+='<div style="padding:0px; margin-top:-8px; margin-left:-10px">'; 
			        html+='     <label for="P'+row['articulo']+'" >&nbsp</label>';  
            		html+='     <input type="checkbox" id="P'+row['articulo']+'" name="'+row['articulo']+'" value="'+parcial+'" class="clasep"  />';
                   	html+='		</div>';	
		            html+='   </div>';
            		html+='</div>';            
                    html+='<div class="ui-block-b" style="width:110px"><div class="ui-bar ui-bar-b">'+row['articulo']+'</div></div>';
                    html+='<div class="ui-block-c" style="width:300px"><div class="ui-bar ui-bar-b">'+row['descripcion']+'</div></div>';
                    html+='<div class="ui-block-d" style="width:80px"><div class="ui-bar ui-bar-b"><a href="#" class="clasep" name="'+row['articulo']+'" id="'+row['articulo']+' '+row['descripcion']+'" ><font color="FFFFFF"></font>'+row['cantidad']+'</a></div></div>';

	                

                  	 html+='<div class="ui-block-e">';
              html+='<div class="ui-grid-b"  style="margin-top:0px;width:260px">';
                  /*
			  html+='<div class="ui-block-a" style="width:70px">';
              html+='<div class="ui-bar ui-bar-a">'+iva.toFixed(2)+'</div></div>';*/
			  html+='<div class="ui-block-a" style="width:80px">';
              html+='<div class="ui-bar ui-bar-b">'+descuento.toFixed(2)+'</div></div>';
              /*html+='<div class="ui-block-c" style="width:90px">';
              html+='<div class="ui-bar ui-bar-a">'+preciop.toFixed(2)+'</div></div>';*/
              html+='<div class="ui-block-b" style="width:90px">';
              html+='<div class="ui-bar ui-bar-b">'+precio.toFixed(2)+'</div></div>';
			  html+='<div class="ui-block-c" style="width:90px">';
              html+='<div class="ui-bar ui-bar-b">'+parcial.toFixed(2)+'</div></div>';
              html+='</div>';                    
              html+='</div>';	
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
  }//mostrarfatura
 function gridvaloresven(){//muestra en un grid los totales de preventa y venta a bordo, asi como el limite de credito y el disponible
var limite=Number(window.localStorage.getItem("limite"));
var saldo=Number(window.localStorage.getItem("saldo"));
var disp=limite-saldo;
var subtotal=0;
var iva=0;
var total=0;


	consultadb().transaction(consulta, errorconsulta);	
	function consulta(tx) {		
		tx.executeSql('SELECT b.precio,b.descuento,a.cantidad,b.impuesto FROM TEMPEDIDO a left outer join articulo b on b.articulo=a.articulo where a.cliente="'+window.localStorage.getItem("clave")+'"',[],exito,errorconsulta);
		tx.executeSql('SELECT b.precio,b.descuento,a.cantidad,b.impuesto FROM TEMFACTURA a left outer join articulo b on b.articulo=a.articulo where a.cliente="'+window.localStorage.getItem("clave")+'"',[],exito2,errorconsulta);
		}
			
		function exito(tx,results){ 	
			  var saldot=0;
			  var montot=0;			  
		      var precio=0;	    	  
			  var importe=0;         
			  var imporsiva=0;
			  var preciocdesc=0;
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				     preciocdesc=Number(row['precio'])-((Number(row['precio'])/100)*Number(row['descuento']));
				     precio=preciocdesc*(1+(Number(row['impuesto'])/100));						 
					// alert(row['descuento']);
					// alert(precio);
					 importe=precio*Number(row['cantidad']);
					 imporsiva=preciocdesc*Number(row['cantidad']);
					 iva+=importe-imporsiva;
					 total+=Number(importe);
			  });//.each	
			  var html="";
			  $("#gridtotalesv").empty();
		      subtotal=total-iva;
			  html+='<div class="ui-block-a" style="width:110px"><div class="ui-bar ui-bar-a">Lim.Cred.</div></div>';
              html+='<div class="ui-block-b" style="width:120px"><div class="ui-bar ui-bar-a">Disponible</div></div>';
		      html+='<div class="ui-block-c" style="width:90px"><div class="ui-bar ui-bar-a">Subtotal</div></div>';
        	  html+='<div class="ui-block-d" style="width:90px"><div class="ui-bar ui-bar-a">IVA</div></div>';
              html+='<div class="ui-block-e" style="width:90px"><div class="ui-bar ui-bar-a">Total</div></div>';
			  html+='<div class="ui-block-a" style="width:110px"><div class="ui-bar ui-bar-b">'+limite.toFixed(2)+'</div></div>';
              html+='<div class="ui-block-b" style="width:120px"><div class="ui-bar ui-bar-b">'+disp.toFixed(2)+'</div></div>';
		      html+='<div class="ui-block-c" style="width:90px"><div class="ui-bar ui-bar-b">'+subtotal.toFixed(2)+'</div></div>';
        	  html+='<div class="ui-block-d" style="width:90px"><div class="ui-bar ui-bar-b">'+iva.toFixed(2)+'</div></div>';
              html+='<div class="ui-block-e" style="width:90px"><div class="ui-bar ui-bar-b">'+total.toFixed(2)+'</div></div>';
		$("#gridtotalesv").append(html); 
		$("#gridtotalesv").trigger('refresh');				
	   }//function exito
	   function exito2(tx,results){ 	
			  var saldot=0;
			  var montot=0;			  
		      var precio=0;	    	  
			  var importe=0;         
			  var imporsiva=0;
			  var preciocdesc=0;
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				     preciocdesc=Number(row['precio'])-((Number(row['precio'])/100)*Number(row['descuento']));
				     precio=preciocdesc*(1+(Number(row['impuesto'])/100));						 
					// alert(row['descuento']);
					// alert(precio);
					 importe=precio*Number(row['cantidad']);
					 imporsiva=preciocdesc*Number(row['cantidad']);
					 iva+=importe-imporsiva;
					 total+=Number(importe);
			  });//.each	
			  var html="";
			  $("#gridtotalesv").empty();
		      subtotal=total-iva;
			  html+='<div class="ui-block-a" style="width:110px"><div class="ui-bar ui-bar-a">Lim.Cred.</div></div>';
              html+='<div class="ui-block-b" style="width:120px"><div class="ui-bar ui-bar-a">Disponible</div></div>';
		      html+='<div class="ui-block-c" style="width:90px"><div class="ui-bar ui-bar-a">Subtotal</div></div>';
        	  html+='<div class="ui-block-d" style="width:90px"><div class="ui-bar ui-bar-a">IVA</div></div>';
              html+='<div class="ui-block-e" style="width:90px"><div class="ui-bar ui-bar-a">Total</div></div>';
			  html+='<div class="ui-block-a" style="width:110px"><div class="ui-bar ui-bar-b">'+limite.toFixed(2)+'</div></div>';
              html+='<div class="ui-block-b" style="width:120px"><div class="ui-bar ui-bar-b">'+disp.toFixed(2)+'</div></div>';
		      html+='<div class="ui-block-c" style="width:90px"><div class="ui-bar ui-bar-b">'+subtotal.toFixed(2)+'</div></div>';
        	  html+='<div class="ui-block-d" style="width:90px"><div class="ui-bar ui-bar-b">'+iva.toFixed(2)+'</div></div>';
              html+='<div class="ui-block-e" style="width:90px"><div class="ui-bar ui-bar-b">'+total.toFixed(2)+'</div></div>';
		$("#gridtotalesv").append(html); 
		$("#gridtotalesv").trigger('refresh');				
	   }//function exito
 		
	function errorconsulta(err) {
    	alert("Error SQL al llenar detalles pedido: "+err.code+err.message);
	}
//  });	

  }//
