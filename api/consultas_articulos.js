// consultas de articulos
function consultaexis(articulo){
	var existenciab=0;   
	    consultadb().transaction(existencia,function(err){
    	  alert("Error al insertar renglon factura: "+err.code+err.message);
          });
				
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
		    alert('despues del rows.length');         
			var row = results.rows.item(0);    
			alert('despues del var row');         
			existenciab=row['existencia'];			
			alert('existencia de consulta '+existenciab);
			
		  }		
 	}
	return existenciab;
}//function insertatemppedido
