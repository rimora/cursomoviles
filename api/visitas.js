// REGISTRO DE VISITAS
function configuravisita(){
		consultadb().transaction(poblarc, function(err){
    	 		 alert("Error poblar razones de visitas: "+err.code+err.message);
         		});		
		function poblarc(tx){  
			var sql='SELECT cod_rzn,des_rzn FROM RAZONVISITA ';		
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select RAZONVISITA : "+err.code+err.message);
         		});    	
		}
		function listo(tx,results){  
			 $("#menurazonv").empty();				 
			  var html = "";			  
 				    html+='    <option value="Razon de Visita">';
		            html+='        Razon';
        		    html+='    </option>';
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 			
				    var razon=row['cod_rzn'];	     			     
					//alert(row['des_rzn']);
				    html+='    <option value="'+razon+'">';
		            html+='        '+row['des_rzn'];
        		    html+='    </option>';				
			  });//.each
				$("#menurazonv").append(html); 
				$("select#menurazonv").val("Razon").selectmenu("refresh");
				$("#visitaini").val(window.localStorage.getItem("visitaini"));
     			guardafechaactual();//guarda en memoria la fecha con hora, actuales
				$("#visitafin").val(window.localStorage.getItem("fechahora"));
				$("#obsvisita").val("");
 	}

 // });	//$('#pclientes').live('pageshow',function(event, ui){
	
}// poblarcuentadep