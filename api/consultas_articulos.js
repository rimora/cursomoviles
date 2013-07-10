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
