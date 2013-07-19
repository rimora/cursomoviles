// depositos
function listarecibos(){
	var cliente=window.localStorage.getItem("clave");
		consultadb().transaction(poblarfac, function(err){
    	 		 alert("Error poblar recibos para deposito: "+err.code+err.message);
         		});		
	function poblarfac(tx){  
				alert('entra poblarfac');
			var sql='SELECT a.recibo,a.mondoc,b.nombre FROM ENCOBROS a ';		
				sql+=' left outer join CLIENTES b on b.clave=a.cliente WHERE a.cliente="'+cliente+'" ORDER BY a.recibo';
				alert(sql);
				tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select recibos: "+err.code+err.message);
         		});    	
	}
	function listo(tx,results){ 
			  alert('entra de depositos');
		      $("#gridrecibosdep").empty();				  
			  var html = "";			 
			  var montot=0;			  		      
			  //agrega encabezado de grid
			  html+=' <div class="ui-block-a" style="width:70px;height:20px" > ';            
              html+=' <div class="ui-bar ui-bar-a">Selec.</div></div> ';           
              html+=' <div class="ui-block-b" style="width:110px"><div class="ui-bar ui-bar-a">Recibo</div></div>';
              html+=' <div class="ui-block-c" style="width:300px"><div class="ui-bar ui-bar-a">Cliente</div></div>';
              html+=' <div class="ui-block-d" style="width:90px"><div class="ui-bar ui-bar-a">Monto</div></div>';

			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				     //descuento=(row['precio']/100)*row['descuento'];
					 montot+=Number(row['mondoc']);
					 
					html+='<div class="ui-block-a" style="width:70px;height:20px" >';              
           			html+='<div class="ui-bar ui-bar-e"  >';      		 		
                   	html+='<div style="padding:0px; margin-top:-8px; margin-left:-10px">'; 
			        html+='     <label for="D'+row['recibo']+'" >&nbsp</label>';  
            		html+='     <input type="checkbox" id="D'+row['recibo']+'" name="'+row['recibo']+'" value="'+row['mondoc']+'" class="clasedep"  />';
                   	html+='		</div>';	
		            html+='   </div>';
            		html+='</div>';            
                    html+='<div class="ui-block-b" style="width:110px"><div class="ui-bar ui-bar-b">'+row['recibo']+'</div></div>';
                    html+='<div class="ui-block-c" style="width:300px"><div class="ui-bar ui-bar-b">'+row['nombre']+'</div></div>';
                    html+='<div class="ui-block-d" style="width:90px"><div class="ui-bar ui-bar-b">'+row['mondoc']+'</div></div>';


                  	 
			  });//.each
					$("#gridrecibosdep").append(html); 
					//$("#tpedido").attr("value",total); 			
					//$("#montodep").val(montot.toFixed(2)); 			
					
					//alert('total'+total);					 
			
	   }//function exito

 // });	//$('#pclientes').live('pageshow',function(event, ui){
	
}// listarecibos()
function poblarcuentadep(){
		consultadb().transaction(poblarc, function(err){
    	 		 alert("Error poblar cuentasbancarias para depositos: "+err.code+err.message);
         		});		
		function poblarc(tx){  
			var sql='SELECT a.codigo,a.descripcion FROM CUENTASDEP a ';		
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select CUENTASDEP : "+err.code+err.message);
         		});    	
		}
		function listo(tx,results){  
			 $("#menucuentad").empty();				 
			  var html = "";			  
 				    html+='    <option value="Banco">';
		            html+='        Banco';
        		    html+='    </option>';
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				    html+='    <option value="'+row['codigo']+'">';
		            html+='        '+row['descripcion'];
        		    html+='    </option>';
			  });//.each
				$("#menucuentad").append(html); 
				$("select#menucuentad").val("Banco").selectmenu("refresh");
 	}

 // });	//$('#pclientes').live('pageshow',function(event, ui){
	
}// poblarcuentadep