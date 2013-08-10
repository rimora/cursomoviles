//configuraciones iniciales
function obtenerconse(){
		consultadb().transaction(poblarfac, function(err){
    	 		 alert("Error al obtener consecutivos en parametros: "+err.code+err.message);
         		});		
	function poblarfac(tx){  				
	       alert('antes de sql');
			var sql='SELECT num_ped,num_rec,num_dev,num_fac FROM PARAMETROS  ';						
			alert('despues de sql');
				tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select parametros: "+err.code+err.message);
         		});    	
	}
	function listo(tx,results){ 	          
				alert('entra a listo');
			  $.each(results.rows,function(index){				  
			  alert('entra al each');
				  var row = results.rows.item(index); 
				  //alert (row['num_ped']+','+row['num_fac']+','+row['num_dev']+','+row['num_rec']);
				  alert('antes de conseped');
				  window.localStorage.setItem("consepedido",row['num_ped']);
				  alert('antes de consefac');
				  window.localStorage.setItem("consefactura",row['num_fac']);
				  alert('antes de num dev');
                  window.localStorage.setItem("consedev",row['num_dev']);
				  alert('antes de num rec');
                  window.localStorage.setItem("conserec",row['num_rec']);		
				  alert('despues de num rec');			 

			  });//.each
					
	   }//function exito	
}// obtenerconse()
