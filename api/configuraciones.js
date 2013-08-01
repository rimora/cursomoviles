//configuraciones iniciales
function obtenerconse(){
		consultadb().transaction(poblarfac, function(err){
    	 		 alert("Error al obtener consecutivos en parametros: "+err.code+err.message);
         		});		
	function poblarfac(tx){  				
			var sql='SELECT num_ped,num_rec,num_dev,num_fac FROM PARAMETROS  ';						
				tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select parametros: "+err.code+err.message);
         		});    	
	}
	function listo(tx,results){ 	          
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 
				  //alert (row['num_ped']+','+row['num_fac']+','+row['num_dev']+','+row['num_rec']);
				  window.localStorage.setItem("consepedido",row['num_ped']);
				  window.localStorage.setItem("consefactura",row['num_fac']);
                  window.localStorage.setItem("consedev",row['num_dev']);
                  window.localStorage.setItem("conserec",row['num_rec']);					 
			  });//.each
					
	   }//function exito	
}// obtenerconse()
