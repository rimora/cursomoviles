// cobros
function listafacturaspend(cliente){
 // $('#pclientes').live('pageshow',function(event, ui){
		//alert('This page was just hidden: '+ ui.prevPage);		
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 1000000);
		consultadb().transaction(poblarfac, function(err){
    	 		 alert("Error poblar facturas para cobro: "+err.code+err.message);
         		});		
	function poblarfac(tx){  
			var sql='SELECT a.documento,a.saldo,a.monto,a.fechaven,b.abonado FROM PENCOBRO a ';		
				sql+=' left outer join TEMCOBROS b on b.factura=a.documento WHERE a.cliente="'+cliente+'" ORDER BY fechaven'
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select facturas pendientes de cobro: "+err.code+err.message);
         		});    	
	}
	function listo(tx,results){  
		 $("#gridfacpendientes").empty();	
		 $("#gridencabcobros").empty();	
			  //$("#tpedido").attr("value",0.0); 					  
			  var html = "";			  
			  var html2 = "";			  
			  var saldot=0;
			  var abonot=0;			  
		      var resta=0;	    	  
			  //agrega encabezado de grid
			  //agrega encabezado de grid
			  html+=' <div class="ui-block-a" style="width:110px" ><div class="ui-bar ui-bar-a">Factura</div></div> ';           
              html+=' <div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-a">A pagar</div></div>';
              html+=' <div class="ui-block-c" style="width:90px"><div class="ui-bar ui-bar-a">Saldo</div></div>';
              html+=' <div class="ui-block-d" style="width:130px"><div class="ui-bar ui-bar-a">Venc.</div></div>';
              html+=' <div class="ui-block-e" style="width:90px"><div class="ui-bar ui-bar-a">Monto</div></div>';
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				     //descuento=(row['precio']/100)*row['descuento'];
				     //precio=row['precio']*(1+(row['impuesto']/100));											
						var abonado= Number(row['abonado']);												 						
						saldot+=Number(row['saldo']);
						abonot+=abonado;
					 //importe=precio*row['cantidad'];
					 //total+=Number(importe);					 
					html+='<div class="ui-block-a" style="width:110px"><div class="ui-bar ui-bar-e">'+row['documento']+'</div></div>';   		 		
					html+='<div class="ui-block-b" style="width:90px"><div class="ui-bar ui-bar-b"><a href="#" class="clasecob" name="'+row['documento']+'"><font color="FFFFFF">'+abonado.toFixed(2)+'</font></a></div></div>';
					html+='<div class="ui-block-c" style="width:90px"><div class="ui-bar ui-bar-b">'+row['saldo']+'</div></div>';
                    html+='<div class="ui-block-d" style="width:130px"><div class="ui-bar ui-bar-b">'+row['fechaven']+'</div></div>';                    
	                html+='<div class="ui-block-e" style="width:90px"><div class="ui-bar ui-bar-b">'+row['monto']+'</div></div> ';
					
                  	 
			  });//.each
			         resta=saldot-abonot;
		    	html2+='<div class=ui-block-a style="width:100px">Saldo Total:</div>';
	            html2+='<div class=ui-block-b style="width:200px"><label style="width:18%;font-size:20px; color:#F00">'+resta.toFixed(2)+'</label></div>';
            	html2+='<div class=ui-block-c style="width:70px">A Pagar:</div>';
            	html2+='<div class=ui-block-d style="width:100px"><label style="width:18%;font-size:20px; color:#F00">'+abonot.toFixed(2)+'</label></div>';
				$("#gridfacpendientes").append(html); 
				$("#gridencabcobros").append(html2); 
				guardasaldofac(saldot);
				guardaabono(abonot);
					//$("#tpedido").attr("value",total); 			
					//$("#tpedido").val(total.toFixed(2)); 			
					
					//alert('total'+total);					
 	}
	

 // });	//$('#pclientes').live('pageshow',function(event, ui){
	
}// listafacturaspend(cliente)
function copiatemcobros(cliente){	
	function listo(tx,results){
		   $.each(results.rows,function(index){           
			 var row = results.rows.item(index); 
			 insertatempcob(row['documento']);
		 });    		 	      
 	}//function listo(tx,results){ 
	function consultatemp(tx){   	       
				//alert('articulo de MODIFICAR temPEDIDO '+articulo);
				 var sql='SELECT a.documento ';
	   			 sql+='FROM PENCOBRO a ';	
				 sql+='where a.cliente="'+cliente+'"';	
		
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error copiar a temporal TEMCOBROS : "+articulo+err.code+err.message);
         		});    									
	}
	consultadb().transaction(consultatemp, function(err){
    	 			 alert("Error select copiar a tabla temporal TEMCOBROS: "+err.code+err.message);
         		});		
				
}//function copiatemcobros()
function mostrardcob(factura){	
	function listo(tx,results){ 	      
	      if (results.rows.length>0){			
			 	var row = results.rows.item(0); 
			    $("#cantidadcob").val(row['abonado']);				
				$("#encdialogocob").val('Indica Cantidad a Pagar: '+row['factura']);
		  }//if (results.rows.length>0){		  
 	}//function listo(tx,results){ 
	function consultatemp(tx){   	       
				//alert('articulo de MODIFICAR temPEDIDO '+articulo);
				 var sql='SELECT a.factura,a.abonado ';
	   			 sql+='FROM TEMCOBROS a ';	
				 sql+='where a.factura="'+factura+'"';	
		
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar temporal TEMCOBROS para dialogo: "+articulo+err.code+err.message);
         		});    									
	}
	consultadb().transaction(consultatemp, function(err){
    	 			 alert("Error select tabla temporal TEMCOBROS: "+err.code+err.message);
         		});		
				
}//function mostrardcob(factura)

function insertacobro(factura,cantidad){	
	function listo(tx,results){ 	      
	      if (results.rows.length>0){			
			 	var row = results.rows.item(0); 
			    var saldo=Number(row['saldo']);
			 //if (row['cantidad']>0){
			 	//preparadetalletemp(row['articulo'],row['cantidad']);																
 			 	if (cantidad>saldo){//
					navigator.notification.alert('Cantidad a pagar debe ser menor o igual al saldo '+cantidad+'  '+saldo,null,'Error Indicando Cantidad','Aceptar');						 					
					return false;				 
				 }
				 alert('pasa depues del if');
				 actualizatempcob(factura,cantidad);
				 listafacturaspend(window.localStorage.getItem("clave"));
				
		  }//if (results.rows.length>0){		  
 	}//function listo(tx,results){ 
	function consultatemp(tx){   	       
				//alert('articulo de MODIFICAR temPEDIDO '+articulo);
				 var sql='SELECT a.documento,a.saldo ';
	   			 sql+=' FROM PENCOBRO a ';	
				 sql+=' where a.documento="'+factura+'"';	
		
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar PENCOBRO : "+articulo+err.code+err.message);
         		});    									
	}
	consultadb().transaction(consultatemp, function(err){
    	 			 alert("Error select tabla PENCOBRO: "+err.code+err.message);
         		});		
				
}//function insertacobro
function aplicacionpago(saldofac,abono){	
	var pendiente=Number(saldopendiente());//obtiene el saldo pendiente de distribuir en los tipos de cobro
	alert('pendiente de aplicacionpago'+pendiente);
	var html="";
	var html2="";
	$("#gridaplicobros").empty();	
	$("#gridaplicobros2").empty();	
	html+='         <div class=ui-block-a style="width:170px"><div class="ui-bar ui-bar-b">Saldo Total:</div></div>';
    html+='	        <div class=ui-block-b style="width:170px"><div class="ui-bar ui-bar-e" style="font-size:16px; color:#F00">'+saldofac.toFixed(2)+'</div></div>';
	html+='    		<div class=ui-block-a style="width:170px"><div class="ui-bar ui-bar-b">Total a Pagar:</div></div>';
	html+='         <div class=ui-block-b style="width:170px"><div class="ui-bar ui-bar-e">'+abono.toFixed(2)+'</div></div>';
    html+='    	    <br><br';           
    html2+='	    <div class=ui-block-a style="width:170px"><div class="ui-bar ui-bar-b">Saldo Pendiente:</div></div>';
    html2+='        <div class=ui-block-b style="width:170px"><div class="ui-bar ui-bar-e" style="font-size:16px; color:#F00">'+pendiente.toFixed(2)+'</div></div>';
	
	$("#gridaplicobros").append(html); 	
	$("#gridaplicobros2").append(html2); 
	$("#efectivo").val(0); 	
	$("#cheque").val(0);
				
}//function aplicacionpago()
function actgridsaldo(){	
	var pendiente=saldopendiente();//obtiene el saldo pendiente de distribuir en los tipos de cobro
	alert('pendiente '+pendiente);
	var html="";
	$("#gridaplicobros2").empty();
    html+='	    <div class=ui-block-a style="width:170px"><div class="ui-bar ui-bar-b">Saldo Pendiente:</div></div>';
    html+='     <div class=ui-block-b style="width:170px"><div class="ui-bar ui-bar-e" style="font-size:16px; color:#F00">'+pendiente.toFixed(2)+'</div></div>';
	$("#gridaplicobros2").append(html); 	
				
}//function actgridsaldo()
function poblarcuenta(){
		consultadb().transaction(poblarc, function(err){
    	 		 alert("Error poblar cuentasbancarias: "+err.code+err.message);
         		});		
		function poblarc(tx){  
			var sql='SELECT a.codigo,a.descripcion FROM CUENTASB a ';		
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select CUENTASB : "+err.code+err.message);
         		});    	
		}
		function listo(tx,results){  
			 $("#menucuentab").empty();				 
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
				$("#menucuentab").append(html); 
				$("select#menucuentab").val("Banco").selectmenu("refresh");
 	}

 // });	//$('#pclientes').live('pageshow',function(event, ui){
	
}// poblarcuenta()
function poblarcheques(){	
alert('entra poblar cheques ');
 	consultadb().transaction(consulta, errorconsulta);	
	function consulta(tx) {		
		tx.executeSql('SELECT a.id,a.codbanco,a.monto,a.numcheque,b.descripcion from CHEQUES a left outer join CUENTASB b on b.codigo=a.codbanco where a.recibo="99999"',[],exito,errorconsulta);
		}
		
	
		
		function exito(tx,results){ 
			
		      $("#gridcheques").empty();				  
			  var html = "";
			  var montot=0;			  		      
			  //agrega encabezado de grid
			  html+=' <div class="ui-block-a" style="width:70px;height:20px" > ';            
              html+=' <div class="ui-bar ui-bar-a">Elim.</div></div> ';           
              html+=' <div class="ui-block-b" style="width:110px"><div class="ui-bar ui-bar-a">Cheque</div></div>';
              html+=' <div class="ui-block-c" style="width:300px"><div class="ui-bar ui-bar-a">Banco</div></div>';
              html+=' <div class="ui-block-d" style="width:110px"><div class="ui-bar ui-bar-a">Monto</div></div>';
			if (results.rows.length>0){
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
					 var monto=Number(row['monto']);
					 montot+=monto;
					html+='<div class="ui-block-a" style="width:70px;height:20px" >';              
           			html+='<div class="ui-bar ui-bar-e"  >';      		 		
                   	html+='<div style="padding:0px; margin-top:-8px; margin-left:-10px">'; 
			        html+='     <label for="CH'+row['numcheque']+'" >&nbsp</label>';  
            		html+='     <input type="checkbox" id="CH'+row['numcheque']+'" name="'+row['id']+'" value="'+row['monto']+'" class="clasech"  />';
                   	html+='		</div>';	
		            html+='   </div>';
            		html+='</div>';            
                    html+='<div class="ui-block-b" style="width:110px"><div class="ui-bar ui-bar-b">'+row['numcheque']+'</div></div>';
                    html+='<div class="ui-block-c" style="width:300px"><div class="ui-bar ui-bar-b">'+row['descripcion']+'</div></div>';
	                html+='<div class="ui-block-e" style="width:110px"><div class="ui-bar ui-bar-b">'+monto.toFixed(2)+'</div></div> ';

                  	 
			  });//.each
			} 
			  		guardacheque(montot);
					var pendiente=saldopendiente();
					alert('pendiente '+pendiente);					
					alert('montot '+montot);					
					$("#gridcheques").append(html); 
					//$("#tpedido").attr("value",total); 			
					$("#totalcheques").val(montot.toFixed(2)); 			
					$("#cheque").val(montot.toFixed(2)); 			
					$("#spendiente").val(pendiente.toFixed(2)); 
					
					//alert('total'+total);					 
			
	   }//function exito
 		
	function errorconsulta(err) {
    	alert("Error SQL al llenar detalles pedido: "+err.code+err.message);
	}
//  });	

  }//mostrarpedido
function saldopendiente(){//lo que resta por distribuir del importe del recibo indicado por el usuario
var abono=window.localStorage.getItem("abono");//lo que el usuario indicó que se abonará (el total del recibo)			
var montoefe=window.localStorage.getItem("efectivo");//el importe indicado en efectivo hasta el momento
var montoche=window.localStorage.getItem("cheque");//el importe indicado en cheque hasta el momento
var pendiente=Number(abono)-Number(montoefe)-Number(montoche);	

return pendiente;

}

  
function guardacob(observagen){	
var cabinsertada=false;
var renglones=0;
var sumtotlinea=0;
var summontodesc=0;
var sumivalinea=0;
var factura=window.localStorage.getItem("factura");
var cliente=window.localStorage.getItem("clave");
var consecutivo=window.localStorage.getItem("consedev");
var ruta=window.localStorage.getItem("ruta");
var bodega=window.localStorage.getItem("bodega");
var horaini=window.localStorage.getItem("fechahora");//fecha y hora actual guardada cuando inicio la devolución de la factura.
guardafechaactual();//guarda en memoria la fecha con hora, actuales
var horafin= window.localStorage.getItem("fechahora");//recuperamos la nueva fecha y hora actual
var fechadev=window.localStorage.getItem("fecha");//recuperamos la fecha actual
var longitud=consecutivo.length;
var inicial=consecutivo.substr(0,3);
var numdev= consecutivo.substr(3,(longitud-3));
 alert(numdev); 
var incremetard=Number(numdev)+1;
 alert(incremetard); 
var devolucion=inicial+pad(incremetard,6);
 alert(devolucion); 
   function pad(n, length){
	   alert('entra a funcion'+n); 
  	 n = n.toString();
   	 while(n.length < length) n = "0" + n;
  	 return n;
   }
	function listo(tx,results){ 	      
	      if (results.rows.length>0){
			  renglones=results.rows.length;
		  	 $.each(results.rows,function(index){           			 
			 var row = results.rows.item(index);  
			 var cantidad=row['cantidad'];//cantidad vendida			 
			 var linea=row['linea'];//linea afectada			 
			 var precio=row['precio'];//precio sin descuento y sin iva			 
			 var pordesc=row['descuento'];//porcentaje de descuento que se aplica 
			 var totalinea=Number(row['cantidad'])*Number(row['precio']);//total de linea sin descuento y sin iva
			 var montodesc=(Number(totalinea)/100)*Number(row['descuento']); 
			 var lineacdes=totalinea-montodesc;//importe de linea con descuento
			 var ivalinea=lineacdes*(row['impuesto']/100);			 			 
			 //var preciociva=preciocdesc*(1+(row['impuesto']/100));			 			 
			 var articulo=row['articulo'];			 
			 var observa=row['obs'];
			
			 sumtotlinea+=sumtotlinea+totalinea;//suma del total de linea sin descuento y sin iva
			 //summontodesc+=summontodesc+montodesc;//suma del total de linea sin descuento y sin iva
			 sumivalinea+=sumivalinea+ivalinea;//suma del total de linea sin descuento y sin iva
			 alert('antes de llamar a funcion guardadev');
			 guardadetdev(devolucion,ruta,articulo,totalinea.toFixed(2),precio,cantidad,observa,montodesc.toFixed(2),pordesc,factura,linea);
			 actexis(articulo,cantidad);
			 alert('despues de llamar a funcion guardadev');
			
		 	});
			alert('antes de llamar a funcion guardaencdev');
			 guardaencdev(devolucion,ruta,cliente,horaini,horafin,fechadev,observagen,renglones,sumtotlinea.toFixed(2),sumivalinea.toFixed(2),bodega,factura)
			alert('despues de llamar a funcion guardaencdev');
		  }//if (results.rows.length>0){		  
 	}//function listo(tx,results){ 
	function consultatemp(tx){  
	             alert('ENTRA A CONSultatepm'); 
				  var sql='SELECT b.factura,a.articulo,a.cantidad,b.precio,a.obs,a.linea, ';
	  			  sql+='c.impuesto,c.descuento FROM TEMDEV a left outer join DETHISFAC b on b.linea=a.linea ';					  
			      sql+='left outer join articulo c on c.articulo=a.articulo  ';
				  sql+=' where a.cantidad > 0 and b.factura="'+window.localStorage.getItem("factura")+'"';	

			    alert(sql);
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error al preparar guardar devolución : "+linea+err.code+err.message);
         		});    									
	}
	consultadb().transaction(consultatemp, function(err){
    	 			 alert("Error select tabla temporal dethisfac para devolver: "+err.code+err.message);
         		});		
				
}//function guardadev





