// consultas de articulos
function consultaexis(articulo,cantidad,tipo){	
        //tipo I= insertar, M=Modificar
		//cuando se modifica en facturas, se valida:
		//1. Si la diferencia entre la cantidad actual y la nueva es mayor a la existencia en bodega, 
		//		se valida si ya existe en pedido el producto para solicitarle al usuario que modifique la cantidad en pedido y solo se podrá
		//	    insertar en FACTURA la cantidad que no supere la existencia.
		//      ejemplo: articulo insertado en factura con existencia actual=5 y cantidad insertada=4, al modificar a 10
		
		//2. Si la diferencia es menor a la existencia en bodega, se modifica 
    	function existencia(tx){   	
	       // alert('entra a consulexis');    
			var sql='SELECT existencia FROM ARTICULO_EXISTENCIA WHERE articulo="'+articulo+'" AND bodega="K01"';			
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar existencia : "+err.code+err.message);
         		});    									
	    }
		function listo(tx,results){ 	 
	      //alert('entra a listo de consulexis');         
	      if (results.rows.length>0){			  
		    //alert('despues del rows.length');         
			var row = results.rows.item(0);    
			//alert('despues del var row');         			
			preparadetalletemp(articulo,cantidad,row['existencia'])
		  }		
		  else
		  {
			preparadetalletemp(articulo,cantidad,0)
		  }
		  
 		}
		consultadb().transaction(existencia,function(err){
    	  alert("Error al insertar renglon factura: "+err.code+err.message);
          });
	
}//function consultaexis
function consultaexis2(articulo){	
     
	  alert('entra a función');
	  consultadb().transaction(existencia,function(err){
    	  alert("Error al insertar renglon factura: "+err.code+err.message);
          },function()
		  	{
			  alert(exi);
			  return exi;
		  	}
		);
    	function existencia(tx){   	
	        alert('entra a consulexis');    
			var sql='SELECT existencia FROM ARTICULO_EXISTENCIA WHERE articulo="'+articulo+'" AND bodega="K01"';			
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar existencia : "+err.code+err.message);
         		});    									
	    }
		function listo(tx,results){ 	 
	      alert('entra a listo de consulexis');         
	      if (results.rows.length>0){			  
		    //alert('despues del rows.length');         
			var row = results.rows.item(0);    
			//alert('despues del var row');         			
			exi=row['existencia'];
		  }		
		  else
		  {
			exi=5000;
		  }
		  
 		}
		
	
}//function consultaexis