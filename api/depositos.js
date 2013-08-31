// depositos
function listarecibos(codigo){
	var totalefe=0; var totalche=0; var totalcheotros=0;	
		consultadb().transaction(poblarfac, function(err){
    	 		 alert("Error poblar recibos para deposito: "+err.code+err.message);
         		},function(){					
		      $("#griddepefe").empty();
			  $("#griddepche").empty();
			  $("#griddepcheotros").empty();
              $("#griddeptotal").empty();
			  var html = "";
			  var html2 = "";
			  var html3 = "";
			  var html4 = "";
			  var montot=0;			  		      
			  //agrega encabezado de grid				  
		     //descuento=(row['precio']/100)*row['descuento'];			
			 montot+=totalefe+totalche+totalcheotros;
             /*html+='<div class="ui-block-a" style="width:330px;text-align:center" ><div class="ui-bar ui-bar-a">Cobrado</div></div>';
			 html+='<div class="ui-block-b" style="width:100px;text-align: left" ><div class="ui-bar ui-bar-b">Ficha</div></div>';	 */
			 if (totalefe>0){				 
			 html+='<div class="ui-block-a" style="width:110px;text-align: right" ><div class="ui-bar ui-bar-a"  style="height: 40px">Efectivo</div></div>';
			 html+='<div class="ui-block-b" style="width:120px;text-align: left" ><div class="ui-bar ui-bar-a"  style="height: 40px">Ficha</div></div>';
	         html+='<div class="ui-block-a" style="width:110px;text-align: right"><div class="ui-bar ui-bar-b" >'+totalefe.toFixed(2)+'</div></div>';
    	     html+='<div class="ui-block-b" style="width:120px;padding:0px"><input name="" type="number" id="fichaefe" style="width:120px; color:#F00; font-weight:bold;height:30px; padding:0px" placeholder="Digita Ficha"></div>';
			 }
			 if (totalche>0){			 
			 html2+='<div class="ui-block-a" style="width:140px;text-align: left" ><div class="ui-bar ui-bar-a" style="height: 40px">Cheques mismo Banco</div></div>';
			 html2+='<div class="ui-block-b" style="width:120px;text-align: left" ><div class="ui-bar ui-bar-a"  style="height: 40px">Ficha</div></div>';
        	 html2+='<div class="ui-block-a" style="width:140px;text-align: right"><div class="ui-bar ui-bar-b" >'+totalche.toFixed(2)+'</div></div>';
			 html2+='<div class="ui-block-b" style="width:120px;padding:0px"><input name="" type="number" id="fichache" style="width:120px; color:#F00; font-weight:bold;height:30px; padding:0px" placeholder="Digita Ficha"></div>';
			 }
			 if (totalcheotros>0){			 
             html3+='<div class="ui-block-a" style="width:140px;text-align: left" ><div class="ui-bar ui-bar-a" style="height: 40px">Cheques Otros Bancos</div></div>';
			 html3+='<div class="ui-block-b" style="width:120px;text-align: left" ><div class="ui-bar ui-bar-a"  style="height: 40px">Ficha</div></div>';
             html3+='<div class="ui-block-a" style="width:140px;text-align: right"><div class="ui-bar ui-bar-b" >'+totalcheotros.toFixed(2)+'</div></div>';
			 html3+='<div class="ui-block-b" style="width:120px;padding:0px"><input name="" type="number" id="fichacheotros" style="width:120px; color:#F00; font-weight:bold;height:30px; padding:0px" placeholder="Digita Ficha"></div>';
			 }
			 html4+='<div class="ui-block-a" style="width:110px;text-align:right" ><div class="ui-bar ui-bar-a"  style="height: 40px">Total</div></div>';
			 html4+='<div class="ui-block-a" style="width:110px;text-align: right" ><div class="ui-bar ui-bar-b">'+montot.toFixed(2)+'</div></div>';	 
			 
			 $("#griddepefe").append(html);
			 $("#griddepche").append(html2);
			 $("#griddepcheotros").append(html3);
			 $("#griddeptotal").append(html4); 
			 guardadepositoefe(totalefe);
			 guardadepositoche(totalche);
			 guardadepositocheotros(totalcheotros);		 
			});		
			
	function poblarfac(tx){  				
			var sql='SELECT a.recibo,a.mondoc,b.nombre,a.monefe FROM ENCOBROS a ';		
				sql+=' left outer join CLIENTES b on b.clave=a.cliente WHERE a.depositado is null and a.monefe>0 ORDER BY a.recibo';
			var sql2='SELECT a.recibo,a.monto,a.numcheque,b.nombre,c.descripcion FROM CHEQUES a ';//recibos en efectivo no depositado
				sql2+=' left outer join CLIENTES b on b.clave=a.cliente left OUTER JOIN CUENTASB c on c.codigo=a.codbanco ';	
				sql2+=' left outer join ENCOBROS d on d.recibo=a.recibo WHERE d.depositado is null and  a.codbanco="'+codigo+'"  ORDER BY a.recibo';	//recibos con cheque no depositados
			//var sql3='SELECT sum(a.monefe) as efectivo FROM ENCOBROS a WHERE a.depositado is null';//cobrado en efectivo no depositado		
			     //cobrado con cheque no depositado, del banco seleccionado para depositar
			//var sql4='SELECT sum(a.monto) as cheque FROM CHEQUES a inner join ENCOBROS b on b.recibo=a.recibo WHERE b.depositado is null and  a.codbanco="'+codigo+'" ';		
			var sql3='SELECT a.recibo,a.monto,a.numcheque,b.nombre,c.descripcion FROM CHEQUES a ';//recibos en efectivo no depositado
				sql3+=' left outer join CLIENTES b on b.clave=a.cliente left OUTER JOIN CUENTASB c on c.codigo=a.codbanco ';	
				sql3+=' left outer join ENCOBROS d on d.recibo=a.recibo WHERE d.depositado is null and  a.codbanco<>"'+codigo+'"  ORDER BY a.recibo';	//recibos con cheque no depositados
			
			//var sql3='SELECT sum(a.monto) as cheque FROM CHEQUES a inner join ENCOBROS b on b.recibo=a.recibo WHERE b.depositado is null and  a.codbanco<>"'+codigo+'" ';		
				
				tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select recibos: "+err.code+err.message);
         		});    	
				tx.executeSql(sql2,[],cheques,function(err){
    	 		 alert("Error select cheques mismo banco para deposito: "+err.code+err.message);
         		});    	
				/*
				tx.executeSql(sql3,[],efectivo,function(err){
    	 		 alert("Error select efectivo sin depositar: "+err.code+err.message);
         		});*/
			/*	tx.executeSql(sql4,[],chequesbanco,function(err){
    	 		 alert("Error select cheques mismo banco: "+err.code+err.message);
         		});    	*/
				tx.executeSql(sql3,[],chequesotro,function(err){
    	 		 alert("Error select cheques otros bancos: "+err.code+err.message);
         		});    	
	}
	function listo(tx,results){ 			  
		      $("#gridrecibosefe").empty();				  
			  var html = "";			 
			 		  		      
			  //agrega encabezado de grid
			  //html+=' <div class="ui-block-a" style="width:60px;height:20px;margin-left:-10px" > ';            
              //html+=' <div class="ui-bar ui-bar-a">Sel</div></div> ';           
              html+=' <div class="ui-block-a" style="width:110px"><div class="ui-bar ui-bar-a">Recibo</div></div>';
             // html+=' <div class="ui-block-c" style="width:200px"><div class="ui-bar ui-bar-a">Cliente</div></div>';
              html+=' <div class="ui-block-b" style="width:80px"><div class="ui-bar ui-bar-a">Monto</div></div>';

			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				     //descuento=(row['precio']/100)*row['descuento'];
                     var efectivo=Number(row['monefe']);	
					 totalefe+=efectivo;				 
					 //montot+=Number(row['mondoc']);
              
					 
					//html+='<div class="ui-block-a" style="width:60px;height:20px;margin-left:-10px" >';              
           			//html+='<div class="ui-bar ui-bar-e" style="margin-right:-10px">';      		 		                   	
            		//html+='     <input type="checkbox" id="D'+row['recibo']+'" name="'+row['recibo']+'" value="'+row['monefe']+'" class="clasedep"  />';
                   	//html+='</div>';	
		            //html+='</div>';
                    html+='<div class="ui-block-a" style="width:110px"><div class="ui-bar ui-bar-b">'+row['recibo']+'</div></div>';
                    //html+='<div class="ui-block-c" style="width:200px"><div class="ui-bar ui-bar-b">'+row['nombre']+'</div></div>';
                    html+='<div class="ui-block-b" style="width:80px"><div class="ui-bar ui-bar-b">'+row['monefe']+'</div></div>';


                  	 
			  });//.each
					$("#gridrecibosefe").append(html); 
					//$("#tpedido").attr("value",total); 			
					//$("#montodep").val(montot.toFixed(2)); 			
					
					//alert('total'+total);					 
			
	   }//function exito
	   function cheques(tx,results){ 			  
		      $("#gridrecibosche").empty();				  
			  var html = "";			 
			 	  		      
			  //agrega encabezado de grid
			  //html+=' <div class="ui-block-a" style="width:60px;height:20px;margin-left:-10px" > ';            
              //html+=' <div class="ui-bar ui-bar-a">Sel</div></div> ';           
              //html+=' <div class="ui-block-a" style="width:110px;margin-left:-10px"><div class="ui-bar ui-bar-a">Recibo</div></div>';
			  html+=' <div class="ui-block-a" style="width:110px"><div class="ui-bar ui-bar-a">Recibo</div></div>';
              html+=' <div class="ui-block-b" style="width:300px"><div class="ui-bar ui-bar-a">Banco</div></div>';
			  html+=' <div class="ui-block-c" style="width:60px"><div class="ui-bar ui-bar-a">CH</div></div>';
              html+=' <div class="ui-block-d" style="width:80px"><div class="ui-bar ui-bar-a">Monto</div></div>';

			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				     //descuento=(row['precio']/100)*row['descuento'];
					 var cheque=Number(row['monto']);
					  totalche+=cheque;
					// montot+=Number(row['monto']);
					 
					//html+='<div class="ui-block-a" style="width:60px;height:20px;margin-left:-10px" >';              
           			//html+='<div class="ui-bar ui-bar-e" style="margin-right:-10px" >';      		 		                   	
            		//html+='     <input type="checkbox" id="D'+row['recibo']+'" name="'+row['recibo']+'" value="'+row['monto']+'" class="clasedep"  />';
                   	//html+='</div>';	
		            //html+='</div>';
                    html+='<div class="ui-block-a" style="width:110px"><div class="ui-bar ui-bar-b">'+row['recibo']+'</div></div>';
                    html+='<div class="ui-block-b" style="width:300px"><div class="ui-bar ui-bar-b">'+row['descripcion']+'</div></div>';
					html+='<div class="ui-block-c" style="width:60px"><div class="ui-bar ui-bar-b">'+row['numcheque']+'</div></div>';
                    html+='<div class="ui-block-d" style="width:80px"><div class="ui-bar ui-bar-b">'+cheque.toFixed(2)+'</div></div>';                  	 
			  });//.each
					$("#gridrecibosche").append(html); 
					//$("#tpedido").attr("value",total); 			
					//$("#montodep").val(montot.toFixed(2)); 			
					
					//alert('total'+total);					 
			
	   }//function cheques
	   
		/*	   
	    function efectivo(tx,results){ 			  		      
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
					 totalefe=Number(row['efectivo']);
			  });//.each
	   }//function efectivo
	   */
	   /* function chequesbanco(tx,results){ 			  		      
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
					 totalche=Number(row['cheque']);
			  });//.each

	   }//function efectivo*/
	    function chequesotro(tx,results){ 			  		      
			   $("#gridreciboscheotros").empty();				  
			  var html = "";			 
			 	  		      
			  //agrega encabezado de grid
			  //html+=' <div class="ui-block-a" style="width:60px;height:20px;margin-left:-10px" > ';            
              //html+=' <div class="ui-bar ui-bar-a">Sel</div></div> ';           
              //html+=' <div class="ui-block-a" style="width:110px;margin-left:-10px"><div class="ui-bar ui-bar-a">Recibo</div></div>';
			  html+=' <div class="ui-block-a" style="width:110px"><div class="ui-bar ui-bar-a">Recibo</div></div>';
              html+=' <div class="ui-block-b" style="width:300px"><div class="ui-bar ui-bar-a">Banco</div></div>';
			  html+=' <div class="ui-block-c" style="width:60px"><div class="ui-bar ui-bar-a">CH</div></div>';
              html+=' <div class="ui-block-d" style="width:80px"><div class="ui-bar ui-bar-a">Monto</div></div>';

			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				     //descuento=(row['precio']/100)*row['descuento'];
					 var cheque=Number(row['monto']);
					  totalcheotros+=cheque;
					// montot+=Number(row['monto']);
					 
					//html+='<div class="ui-block-a" style="width:60px;height:20px;margin-left:-10px" >';              
           			//html+='<div class="ui-bar ui-bar-e" style="margin-right:-10px" >';      		 		                   	
            		//html+='     <input type="checkbox" id="D'+row['recibo']+'" name="'+row['recibo']+'" value="'+row['monto']+'" class="clasedep"  />';
                   	//html+='</div>';	
		            //html+='</div>';
                    html+='<div class="ui-block-a" style="width:110px"><div class="ui-bar ui-bar-b">'+row['recibo']+'</div></div>';
                    html+='<div class="ui-block-b" style="width:300px"><div class="ui-bar ui-bar-b">'+row['descripcion']+'</div></div>';
					html+='<div class="ui-block-c" style="width:60px"><div class="ui-bar ui-bar-b">'+row['numcheque']+'</div></div>';
                    html+='<div class="ui-block-d" style="width:80px"><div class="ui-bar ui-bar-b">'+cheque.toFixed(2)+'</div></div>';                  	 
			  });//.each
					$("#gridreciboscheotros").append(html); 
					

	   }//function efectivo	  
	   /*
	    function depositado(tx,results){ 			  
		     $("#griddepositado").empty();				  
			  var html = "";			 
			  var montot=0;			  		      
			  //agrega encabezado de grid
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				     //descuento=(row['precio']/100)*row['descuento'];
					 var efectivo=Number(row['efectivo']);
					 var cheque=Number(row['cheque']);
					 montot+=Number(row['efectivo'])+Number(row['cheque']);
					 
				 html+='<div class="ui-block-a" style="width:120px" ><div class="ui-bar ui-bar-a">Efectivo</div></div>';
	             html+='<div class="ui-block-b" style="width:120px"><div class="ui-bar ui-bar-b" >'+efectivo.toFixed(2)+'</div></div>';
    	         html+='<div class="ui-block-a" style="width:120px"><div class="ui-bar ui-bar-a">Cheque</div></div>';
        	     html+='<div class="ui-block-b" style="width:120px"><div class="ui-bar ui-bar-b" >'+cheque.toFixed(2)+'</div></div>';
            	 html+='<div class="ui-block-a" style="width:120px"><div class="ui-bar ui-bar-a">Total</div></div>';
             	 html+='<div class="ui-block-b" style="width:120px"><div class="ui-bar ui-bar-b" >'+montot.toFixed(2)+'</div></div>';                  	 
			  });//.each
					$("#griddepositado").append(html); 
					//$("#tpedido").attr("value",total); 			
					//$("#montodep").val(montot.toFixed(2)); 			
					
					//alert('total'+total);			 
			
	   }//function depositado*/

 // });	//$('#pclientes').live('pageshow',function(event, ui){
	
}// listarecibos()
function poblarcuentadep(){
		consultadb().transaction(poblarc, function(err){
    	 		 alert("Error poblar cuentasbancarias para depositos: "+err.code+err.message);
         		});		
		function poblarc(tx){  
			var sql='SELECT a.codigo,a.cuenta,b.descripcion FROM CUENTASDEP a inner join CUENTASB b on b.codigo=a.codigo ';		
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
				    var codigocuenta=row['codigo']+'@'+row['cuenta'];	     			     
				    html+='    <option value="'+codigocuenta+'">';
		            html+='        '+row['descripcion'];
        		    html+='    </option>';
			  });//.each
				$("#menucuentad").append(html); 
				$("select#menucuentad").val("Banco").selectmenu("refresh");
 	}

 // });	//$('#pclientes').live('pageshow',function(event, ui){
	
}// poblarcuentadep
function guardadep(recibo,deposito){
	function listo(tx,results){ 	      
	      if (results.rows.length>0){
			  renglones=results.rows.length;
		  	 $.each(results.rows,function(index){           			 
			 var row = results.rows.item(index);  
			 var monche=row['monche'];//importe abonado a la factura
			 var monefe=row['monefe'];//factura afectada 
				
			 //alert('antes de llamar a funcion guardadetcob');
			 guardadetdep(monche,monefe,deposito,recibo);			 
			 //alert('despues de llamar a funcion guardadev');
			
		 	});
			//alert('antes de llamar a funcion guardaenccob');			
			//alert(cliente+','+tipo+','+ruta+','+recibo+','+horaini+','+horafin+','+estado+','+monche.toFixed(2)+','+monefe.toFixed(2)+','+totalrecibo.toFixed(2));
			 
			//alert('despues de llamar a funcion guardaenccob');
		  }//if (results.rows.length>0){		  
 	}//function listo(tx,results){ 
	function consultatemp(tx){  
	             //alert('ENTRA A CONSultatepm'); 
				  var sql='SELECT a.monche,a.monefe ';
	  			  sql+='FROM ENCOBROS a ';					  
				  sql+=' where a.recibo ="'+recibo+'"';		    				 
				//alert(sql);				
				
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error al preparar guardar linea deposito : "+linea+err.code+err.message);
         		});    									
	}
	consultadb().transaction(consultatemp, function(err){
    	 			 alert("Error select tabla ENCOBROS: "+err.code+err.message);
         		});		
				
}//function guardadep(recibo,deposito)
function recibosindep(){
	var sindeposito=false;
	function listo(tx,results){ 	      
	      if (results.rows.length>0){	
		  	 var row = results.rows.item(0);	 
		  	 navigator.notification.alert('Existen recibos sin relacionar a deposito '+row['recibo'],null,'Recibos sin depositos','Aceptar');
			 sindeposito=true;
		  }//if (results.rows.length>0){		  
 	}//function listo(tx,results){ 
	function consultatemp(tx){  
	             //alert('ENTRA A CONSultatepm'); 
				 var sql='SELECT a.recibo FROM ENCOBROS a ';		
					 sql+=' WHERE a.depositado is null ';
				    				 
				//alert(sql);				
				
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error en select para recibos sin deposito: "+err.code+err.message);
         		});    									
	}
	base.transaction(consultatemp, function(err){
    	 			 alert("Error select tabla ENCOBROS para recibos sin deposito: "+err.code+err.message);
         		},function(){
					if (sindeposito==false){
						 window.location.href='#pclientes';				                    
				 		 mostrarclientes("Lunes");
				 		 //$("select#menu").val("Lunes").selectmenu("refresh");   
				 		 $("select#menu").val("Lunes"); 							
					}
					
				});		
				
}//function recibosindep