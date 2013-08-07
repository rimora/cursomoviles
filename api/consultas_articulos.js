// consultas de articulos
function insertalinea(articulo,cantidad){	    	
	function listo(tx,results){ 	      
	      if (results.rows.length>0){			
			 var row = results.rows.item(0);            			
			 //if (row['cantidad']>0){
			 	//preparadetalletemp(row['articulo'],row['cantidad']);								
				var precio=row['precio']*(1+(row['impuesto']/100));
					   //alert(artsug[i]+' '+cantsug[i]+' '+exissug[i]);
					   if (validasaldo(cantidad*precio))
					   {
						 navigator.notification.alert('Limite de credito excedido',null,'Limite de credito excedido','Aceptar');					
						 return false;
						   
					   }
					   else{
						   if (row['existencia']==null){
								preparadetalletemp(articulo,cantidad,0);
						   }
							else
							  {
								preparadetalletemp(articulo,cantidad,row['existencia']);
							}
					   }
		  }//if			  
 	}//function listo(tx,results){ 
	function consultasug(tx){   	    	        			
			var sql='SELECT a.impuesto,(a.precio-((a.precio/100)*a.descuento)) as precio,';
			sql+='b.existencia ';	
			sql+='FROM ARTICULO a left outer join ';
			sql+='articulo_existencia b on b.articulo=a.articulo and b.bodega="K01" WHERE a.articulo="'+articulo+'"  ';
					
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar articulo : "+sql+err.code+err.message);
         		});    									
	}
	consultadb().transaction(consultasug, function(err){
    	 			 alert("Error select tabla articulo: "+err.code+err.message);
         		});		
}//function consultaexis
function gridvalorescat(){//muestra en un grid los totales de preventa y venta a bordo, asi como el limite de credito y el disponible
var limite=Number(window.localStorage.getItem("limite"));
var saldo=Number(window.localStorage.getItem("saldo"));
var disp=limite-saldo;
var subtotal=0;
var iva=0;
var total=0;

alert('entra');
	consultadb().transaction(consulta, errorconsulta,function(){
		var html="";
		$("#gridtotales").empty();
		      subtotal=total-iva;
			  html+='<div class="ui-block-a" style="width:90px"><div class="ui-bar ui-bar-a">Lim.Cred.</div></div>';
              html+='<div class="ui-block-b" style="width:80px"><div class="ui-bar ui-bar-a">Disp.</div></div>';
		      html+='<div class="ui-block-c" style="width:80px"><div class="ui-bar ui-bar-a">Subtotal</div></div>';
        	  html+='<div class="ui-block-d" style="width:70px"><div class="ui-bar ui-bar-a">IVA</div></div>';
              html+='<div class="ui-block-e" style="width:80px"><div class="ui-bar ui-bar-a">Total</div></div>';
			  html+='<div class="ui-block-a" style="width:90px"><div class="ui-bar ui-bar-b">'+limite.toFixed(2)+'</div></div>';
              html+='<div class="ui-block-b" style="width:80px"><div class="ui-bar ui-bar-b">'+disp.toFixed(2)+'</div></div>';
		      html+='<div class="ui-block-c" style="width:80px"><div class="ui-bar ui-bar-b">'+subtotal.toFixed(2)+'</div></div>';
        	  html+='<div class="ui-block-d" style="width:70px"><div class="ui-bar ui-bar-b">'+iva.toFixed(2)+'</div></div>';
              html+='<div class="ui-block-e" style="width:80px"><div class="ui-bar ui-bar-b">'+total.toFixed(2)+'</div></div>';
		$("#gridtotales").append(html); 	  
		$("#gridtotales").trigger('refresh');
	
		
		
	});	
	function consulta(tx) {		
		tx.executeSql('SELECT (b.precio-((b.precio/100)*b.descuento)) as precio,b.descuento,a.cantidad,b.impuesto FROM TEMPEDIDO a left outer join articulo b on b.articulo=a.articulo where a.cliente="'+window.localStorage.getItem("clave")+'"',[],exito,errorconsulta);
		}
			
		function exito(tx,results){ 	
			  var saldot=0;
			  var montot=0;			  
		      var precio=0;	    	  
			  var importe=0;         
			  var imporsiva=0;
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				     //descuento=(row['precio']/100)*row['descuento'];
				     precio=row['precio']*(1+(row['impuesto']/100));						 
					 alert(row['descuento']);
					 alert(precio);
					 importe=precio*row['cantidad'];
					 imporsiva=Number(row['precio'])*Number(row['cantidad']);
					 iva+=importe-imporsiva;
					 total+=Number(importe);
			  });//.each					
	   }//function exito
 		
	function errorconsulta(err) {
    	alert("Error SQL al llenar detalles pedido: "+err.code+err.message);
	}
//  });	

  }//
