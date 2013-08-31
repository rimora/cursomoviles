// cobros
var base = window.openDatabase("Database", "1.0", "SARDEL", 10000000);	
function listafacturaspend(cliente){
	//alert('entra a listafacturaspend '+cliente);
	 // $('#pclientes').live('pageshow',function(event, ui){
		//alert('This page was just hidden: '+ ui.prevPage);		
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 1000000);
		base.transaction(poblarfac, function(err){
    	 		 alert("Error poblar facturas para cobro: "+err.code+err.message);
         		});		
	function poblarfac(tx){  
			var sql='SELECT a.documento,a.saldo,a.monto,a.fechaven,b.abonado,a.vencida,a.diasv FROM PENCOBRO a ';		
				sql+=' left outer join TEMCOBROS b on b.factura=a.documento WHERE a.cliente="'+cliente+'" and a.saldo>0 ORDER BY fechaven'
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
			 var limite=Number(window.localStorage.getItem("limite"));		    	  
			 var disponible=0;
			 //agrega encabezado de grid
			  html+='<div class="ui-block-a" style="width:110px" ><div class="ui-bar ui-bar-a">Documento</div></div>';
              html+='<div class="ui-block-b" style="width:120px"><div class="ui-bar ui-bar-a">Vencimiento</div></div>';
		      html+='<div class="ui-block-c" style="width:90px"><div class="ui-bar ui-bar-a">Dias V.</div></div>';
        	  html+='<div class="ui-block-d" style="width:90px"><div class="ui-bar ui-bar-a">Importe</div></div>';
		      html+='<div class="ui-block-e"  >';
              html+='<div class="ui-grid-b"  style="margin-top:0px;width:280px">';
              html+='<div class="ui-block-a" style="width:90px">';
              html+='<div class="ui-bar ui-bar-a">Saldo</div></div>';
              html+='<div class="ui-block-b" style="width:100px">';
              html+='<div class="ui-bar ui-bar-a">A pagar</div></div>';
			  html+='<div class="ui-block-c" style="width:90px">';
              html+='<div class="ui-bar ui-bar-a">Notas</div></div>';
              html+='</div>';                    
              html+='</div>';			  
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
				     //descuento=(row['precio']/100)*row['descuento'];
				     //precio=row['precio']*(1+(row['impuesto']/100));											
						var abonado= Number(row['abonado']);												 						
						var monto= Number(row['monto']);												 						
						var saldo= Number(row['saldo']);												 						
						saldot+=Number(saldo);
						abonot+=abonado;						
					 //importe=precio*row['cantidad'];
					 //total+=Number(importe);					 
					if (row['vencida']=='S') {
						html+='<div class="ui-block-a" style="width:110px"><div class="ui-bar ui-bar-e"><a href="#" class="clasecob" name="'+row['documento']+'"><font color="#FFFFFF">'+row['documento']+'</font></a></div></div>';
					}
					else
					{
						html+='<div class="ui-block-a" style="width:110px"><div class="ui-bar ui-bar-b"><a href="#" class="clasecob" name="'+row['documento']+'"><font color="FFFFFF">'+row['documento']+'</font></a></div></div>';
					}
					
					 html+='<div class="ui-block-b" style="width:120px"><div class="ui-bar ui-bar-b">'+row['fechaven']+'</div></div>';
		      html+='<div class="ui-block-c" style="width:90px"><div class="ui-bar ui-bar-b">'+row['diasv']+'</div></div>';
        	  html+='<div class="ui-block-d" style="width:90px"><div class="ui-bar ui-bar-b">'+monto.toFixed(2)+'</div></div>';
		      html+='<div class="ui-block-e"  >';
              html+='<div class="ui-grid-b"  style="margin-top:0px;width:280px">';
              html+='<div class="ui-block-a" style="width:90px">';
              html+='<div class="ui-bar ui-bar-b">'+saldo.toFixed(2)+'</div></div>';
              html+='<div class="ui-block-b" style="width:100px">';
             // html+='<div class="ui-bar ui-bar-b"><a href="#" class="clasecob" name="'+row['documento']+'"><font color="FFFFFF">'+abonado.toFixed(2)+'</font></a></div></div>';
			  html+='<div class="ui-bar ui-bar-b">'+abonado.toFixed(2)+'</div></div>';
			  html+='<div class="ui-block-c" style="width:90px">';
			  html+='<div class="ui-bar ui-bar-b"><a href="#" class="clasenotcob" name="'+row['documento']+'"><font color="FFFFFF">Notas</font></div></div>';
              html+='</div>';                    
              html+='</div>';	                  	 
			  });//.each
			         resta=saldot-abonot;
					 disponible=Number(limite)-Number(resta);
					 html2+='<div class=ui-block-a style="width:170px; font-size:18px;font-weight:bold">Limite de Credito:</div>';
           	 html2+='<div class=ui-block-b style="width:100px"><label style="width:18%;font-size:18px; color:#F00;font-weight:bold">'+limite.toFixed(2)+'</label></div>';
             html2+='<div class=ui-block-c style="width:100px; font-size:18px;font-weight:bold">Disponible:</div>';
             html2+='<div class=ui-block-d style="width:100px"><label style="width:18%;font-size:18px; color:#F00;font-weight:bold">'+disponible.toFixed(2)+'</label></div>';
	         html2+='<div class=ui-block-a style="width:170px; font-size:18px;font-weight:bold">Saldo Total:</div>';
             html2+='<div class=ui-block-b style="width:100px"><label style="width:18%;font-size:18px; color:#F00;font-weight:bold">'+resta.toFixed(2)+'</label></div>';
             html2+='<div class=ui-block-c style="width:100px; font-size:18px;font-weight:bold">A Pagar:</div>';
             html2+='<div class=ui-block-d style="width:100px"><label style="width:18%;font-size:18px; color:#F00;font-weight:bold">'+abonot.toFixed(2)+'</label></div>';		    	
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
function copiatemcobros(cliente,copiar){	//llamada de eventos.js
//el parametro copiar indica si el usuario selecciono el boton de copiar la columna saldo a la columna a pagar
//
var querycob=[];
var i=0;
	function listo(tx,results){
		   $.each(results.rows,function(index){           
			 var row = results.rows.item(index); 			 
			 if (copiar=='S'){
				querycob[i]='INSERT INTO TEMCOBROS (factura,abonado,saldo) VALUES ("'+row['documento']+'",'+row['saldo']+','+row['saldo']+')';			 
			 }
			 else{
				 querycob[i]='INSERT INTO TEMCOBROS (factura,abonado,saldo) VALUES ("'+row['documento']+'",'+0+','+row['saldo']+')';						 
			 }
			 i++;
		 });    		 	      
 	}//function listo(tx,results){ 
	function consultatemp(tx){   	       
				//alert('articulo de MODIFICAR temPEDIDO '+articulo);
				 var sql='SELECT a.documento,a.saldo ';
	   			 sql+='FROM PENCOBRO a ';	
				 sql+='where a.cliente="'+cliente+'"';											
	   			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error copiar a temporal TEMCOBROS : "+articulo+err.code+err.message);
         		});    									
	}
	base.transaction(consultatemp, function(err){
    	 			 alert("Error select copiar a tabla temporal TEMCOBROS: "+err.code+err.message);
         		},function(){
					insertatempcob(querycob);
					listafacturaspend(cliente);//lista las facturas pendientes de cobro, del cliente seleccionado
					});		
				
}//function copiatemcobros()
function mostrardcob(factura){	
	var html="";
	
	$("#divencnum").empty();
	html='<label style="font-weight: bold;font-size:18px">Indicar Abono a Factura:</label><br>';
	html+='</center><label style="font-weight: bold; font-size:40px">'+factura+'</label></center>';
    //html+=' <a href="#" id ="bcopiarsaldofac" data-role="button" data-theme="b">Copiar Saldo a Pagar</a>';
	$("#divencnum").append(html);	
	$("#divencnum").show();

	function listo(tx,results){ 	      
	      if (results.rows.length>0){			
			 	var row = results.rows.item(0); 
				if (row['abonado']==0){
					$("#importecobro").val(row['saldo']);
				}
				else{
					$("#importecobro").val(row['abonado']);
					
				}
		  }//if (results.rows.length>0){		  
 	}//function listo(tx,results){ 
	function consultatemp(tx){   	       
				//alert('articulo de MODIFICAR temPEDIDO '+articulo);
				 var sql='SELECT a.factura,a.abonado,a.saldo ';
	   			 sql+='FROM TEMCOBROS a ';	
				 sql+='where a.factura="'+factura+'"';	
		
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar temporal TEMCOBROS para dialogo: "+articulo+err.code+err.message);
         		});    									
	}
	base.transaction(consultatemp, function(err){
    	 			 alert("Error select tabla temporal TEMCOBROS: "+err.code+err.message);
         		});		
				
}//function mostrardcob(factura)

function insertacobro(factura,cantidad){ //llamada de eventos.js
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
				 //alert('pasa depues del if');
				 actualizatempcob(factura,cantidad); //funcion de afectarbd.js
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
	base.transaction(consultatemp, function(err){
    	 			 alert("Error select tabla PENCOBRO: "+err.code+err.message);
         		});		
				
}//function insertacobro
function aplicacionpago(saldofac,abono){	
	var pendiente=Number(saldopendiente());//obtiene el saldo pendiente de distribuir en los tipos de cobro
	//alert('pendiente de aplicacionpago'+pendiente);
	
	var html="";
	var html2="";
	$("#gridaplicobros").empty();	
	$("#gridaplicobros2").empty();	
		
	html+='         <div class=ui-block-a style="width:170px"><div class="ui-bar ui-bar-a" style="font-size:18px;font-weight:bold">Saldo Total</div></div>';
		html+='    		<div class=ui-block-b style="width:170px"><div class="ui-bar ui-bar-a" style="font-size:18px;font-weight:bold">Total a Pagar</div></div>';
    html+='	        <div class=ui-block-a style="width:170px"><div class="ui-bar ui-bar-b" style="font-size:18px;font-weight:bold">'+saldofac.toFixed(2)+'</div></div>';
	html+='         <div class=ui-block-b style="width:170px"><div class="ui-bar ui-bar-b" style="font-size:18px;font-weight:bold">'+abono.toFixed(2)+'</div></div>';
    html2+='	    <div class=ui-block-a style="width:170px"><div class="ui-bar ui-bar-a" style="font-size:18px;font-weight:bold">Saldo Pendiente</div></div>';
	html2+='	    <div class=ui-block-b style="width:170px"><div class="ui-bar ui-bar-a" style="font-size:18px;font-weight:bold">Efectivo</div></div>';
	html2+='	    <div class=ui-block-c style="width:170px"><div class="ui-bar ui-bar-a" style="font-size:18px;font-weight:bold">Cheque</div></div>';
    html2+='        <div class=ui-block-a style="width:170px"><div class="ui-bar ui-bar-b" style="font-size:18px;font-weight:bold">'+pendiente.toFixed(2)+'</div></div>';
	html2+='        <div class=ui-block-b style="width:170px"><div class="ui-bar ui-bar-b" style="font-size:18px;font-weight:bold">0.00</div></div>';
	html2+='        <div class=ui-block-c style="width:170px"><div class="ui-bar ui-bar-b" style="font-size:18px;font-weight:bold">0.00</div></div>';
	
	$("#gridaplicobros").append(html); 	
	$("#gridaplicobros2").append(html2); 
	/*$("#efectivo").val(0); 	
	$("#cheque").val(0);*/
				
}//function aplicacionpago()
function otro(){	
alert('entra a otro');
}

function gridtotalescob(){	
//alert('entra a gridtotalescob()');
	var pendiente=Number(saldopendiente());//obtiene el saldo pendiente de distribuir en los tipos de cobro
	var montoche=Number(window.localStorage.getItem("cheque"));
	var montoefe=Number(window.localStorage.getItem("efectivo"));
	var html="";
	$("#gridaplicobros2").empty();	
    html+='<div class=ui-block-a style="width:170px"><div class="ui-bar ui-bar-a" style="font-size:18px;font-weight:bold">Saldo Pendiente</div></div>';
	html+='<div class=ui-block-b style="width:170px"><div class="ui-bar ui-bar-a" style="font-size:18px;font-weight:bold">Efectivo</div></div>';
	html+='<div class=ui-block-c style="width:170px"><div class="ui-bar ui-bar-a" style="font-size:18px;font-weight:bold">Cheque</div></div>';
    html+='<div class=ui-block-a style="width:170px"><div class="ui-bar ui-bar-b" style="font-size:18px;font-weight:bold">'+pendiente.toFixed(2)+'</div></div>';	
    html+='<div class=ui-block-b style="width:170px"><div class="ui-bar ui-bar-b" style="font-size:18px;font-weight:bold">'+montoefe.toFixed(2)+'</div></div>';	
    html+='<div class=ui-block-c style="width:170px"><div class="ui-bar ui-bar-b" style="font-size:18px;font-weight:bold">'+montoche.toFixed(2)+'</div></div>';
	$("#gridaplicobros2").append(html); 	
}//function actgridsaldo()
function poblarcuenta(){
		base.transaction(poblarc, function(err){
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
//alert('entra poblar cheques ');
 	base.transaction(consulta, errorconsulta,function(){
	  gridtotalescob();	
	});	
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
              html+=' <div class="ui-block-d" style="width:100px"><div class="ui-bar ui-bar-a">Monto</div></div>';
			if (results.rows.length>0){
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
					 var monto=Number(row['monto']);
					 montot+=monto.toFixed(2);
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
	                html+='<div class="ui-block-e" style="width:100px"><div class="ui-bar ui-bar-b">'+monto.toFixed(2)+'</div></div> ';                  	 
			  });//.each
			} 
			  		guardacheque(montot);					
					//alert('pendiente '+pendiente);					
					//alert('montot '+montot);					
					$("#gridcheques").append(html); 
					//$("#tpedido").attr("value",total); 													
					
					
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

  
function guardacob(){	

var totalrecibo=0;
var tipo='5';//recibo 5 o nt credito 7
var tipoaso='1';//documento abonado,factura 1 o nt credito 7
var estado='A'; //A=activo, N=anulado
var monefe=Number(window.localStorage.getItem("efectivo"));
var monche=Number(window.localStorage.getItem("cheque"));
var cliente=window.localStorage.getItem("clave");
var consecutivo=window.localStorage.getItem("conserec");
//alert(consecutivo);
var ruta=window.localStorage.getItem("ruta");
var horaini=window.localStorage.getItem("fechahora");//fecha y hora actual guardada cuando inicio la devolución de la factura.
guardafechaactual();//guarda en memoria la fecha con hora, actuales
var horafin= window.localStorage.getItem("fechahora");//recuperamos la nueva fecha y hora actual
var fecharec=window.localStorage.getItem("fecha");//recuperamos la fecha actual
var longitud=consecutivo.length;
var inicial=consecutivo.substr(0,3);
var numrec= consecutivo.substr(3,(longitud-3));
var incrementarec=Number(numrec)+1;
var recibo=inicial+pad(incrementarec,6);

   function pad(n, length){
	   //alert('entra a funcion'+n); 
  	 n = n.toString();
   	 while(n.length < length) n = "0" + n;
  	 return n;
   }
	function listo(tx,results){ 	      
	      if (results.rows.length>0){
			  renglones=results.rows.length;
		  	 $.each(results.rows,function(index){           			 
			 var row = results.rows.item(index);  
			 var monto=row['abonado'];//importe abonado a la factura
			 var factura=row['factura'];//factura afectada 
			 var saldo=row['saldo'];//saldo de la factura sin aplicar el abono
			 var saldo_doc=Number(saldo)-Number(monto);//saldo nuevo de la factura
			 
			 totalrecibo+=monto;//suma de los abonos a facturas			
			 //alert('antes de llamar a funcion guardadetcob');
			 guardadetcob(cliente,tipo,tipoaso,ruta,recibo,factura,estado,monto.toFixed(2),saldo_doc.toFixed(2));			 
			 //alert('despues de llamar a funcion guardadev');
			
		 	});
			//alert('antes de llamar a funcion guardaenccob');			
			//alert(cliente+','+tipo+','+ruta+','+recibo+','+horaini+','+horafin+','+estado+','+monche.toFixed(2)+','+monefe.toFixed(2)+','+totalrecibo.toFixed(2));
			 guardaenccob(cliente,tipo,ruta,recibo,horaini,horafin,estado,monche.toFixed(2),monefe.toFixed(2),totalrecibo.toFixed(2));
			//alert('despues de llamar a funcion guardaenccob');
		  }//if (results.rows.length>0){		  
 	}//function listo(tx,results){ 
	function consultatemp(tx){  
	             //alert('ENTRA A CONSultatepm'); 
				  var sql='SELECT a.factura,a.abonado,b.saldo,b.vencida ';
	  			  sql+='FROM TEMCOBROS a left outer join PENCOBRO b on b.documento=a.factura ';					  
				  sql+=' where a.abonado > 0 ';		    				 
				//alert(sql);				
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error al preparar guardar cobro : "+linea+err.code+err.message);
         		});    									
	}
	consultadb().transaction(consultatemp, function(err){
    	 			 alert("Error select tabla temporal temcobros: "+err.code+err.message);
         		});		
				
}//function guardacob
function pagarximp(cliente,cantidad){	
	var html="";
	var disponible=0;
	 function listo(tx,results){ 	      	       
			  $.each(results.rows,function(index){				  
				var row = results.rows.item(index);
			    var saldo=Number(row['saldo']);
				var factura=row['documento'];
			 //if (row['cantidad']>0){
			 	//preparadetalletemp(row['articulo'],row['cantidad']);																
 			 	if (cantidad>=saldo){//
				   actualizatempcob(factura,saldo); //funcion de afectarbd.js
				   cantidad=cantidad-saldo;
				   //alert('cantidad de pagarximp '+cantidad);
				 			 
				 }
				 else
				 {
				   //alert('cantidad menor a saldo '+cantidad);	 
                   actualizatempcob(factura,cantidad); //funcion de afectarbd.js
				   cantidad=0;
					 
				 }
				 
				 
				 //alert('pasa depues del if');
				 
				
		  });//.each	  
 	}//function listo(tx,results){ 
	function consultatemp(tx){   	       
				//alert('articulo de MODIFICAR temPEDIDO '+articulo);
				var sql='SELECT a.documento,a.saldo,a.monto,a.fechaven,b.abonado,a.vencida,a.diasv FROM PENCOBRO a ';		
				sql+=' left outer join TEMCOBROS b on b.factura=a.documento WHERE a.cliente="'+cliente+'" ORDER BY fechaven'
		
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar PENCOBRO : "+articulo+err.code+err.message);
         		});    									
	}
	base.transaction(consultatemp, function(err){
    	 			 alert("Error select tabla PENCOBRO: "+err.code+err.message);
         		}, function(){
					
				listafacturaspend(cliente);	
					
				});	
}//function pagarximp
function mostrarnotascob(factura){	
//alert(factura);
	var html="";
	
	$("#divencnum").empty();
	html='<label style="font-weight: bold">Notas para factura:'+factura+'</label><br>';
	html+='<textarea cols="30" rows="20">';

	function listo(tx,results){ 	      
	        $.each(results.rows,function(index){			
			 	var row = results.rows.item(0); 
				
				html+=row['nota']+'\n';
		    });//.each
			html+='</textarea>';   
			$("#divencnum").append(html);	
			$("#divencnum").show();	  		  
 	}//function listo(tx,results){ 
	function consultatemp(tx){   	       
				//alert('articulo de MODIFICAR temPEDIDO '+articulo);
				 var sql='SELECT a.nota ';
	   			 sql+='FROM NOTASCOB a ';	
				 sql+='where a.factura="'+factura+'"';	
		
								
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error consultar notas NOTASCOB : "+factura+err.code+err.message);
         		});    									
	}
	base.transaction(consultatemp, function(err){
    	 			 alert("Error select tabla NOTAS NOTASCOB: "+err.code+err.message);
         		});		
				
}//function mostrarnotascob(factura)
function eliminatempcob(){
	   //alert('inserttafactura'+cantidad);
	    base.transaction(insertadet,function(err){
    	  alert("Error al eliminar temcobros: "+err.code+err.message);
          });
				
    	function insertadet(tx) {		
		//alert('entra a eliminar temcobros');
		   tx.executeSql('DELETE FROM TEMCOBROS ');		
		}
	
}//function eliminatempcob()
function insertatempcob(querycob){
	 // navigator.notification.alert('entra insertatempcob '+factura+' '+abono+' '+saldo,null,'','Aceptar');	
	    base.transaction(insertadet,function(err){
    	  alert("Error al insertar renglon temcobros: "+err.code+err.message);
          });
				
    	function insertadet(tx) {
			for (var i=0, long =querycob.length; i<long; i++){				
				tx.executeSql(querycob[i]); 						   					   
			}// for (var i = 0, long = query.length; i < long; i++) 
		}
	
}//function insertatempcob(factura)
function insertarcheque(nche,ncta,banco,monto){
	   //alert('inserta cheque');
	   var cliente=window.localStorage.getItem("clave");
	   var ruta=window.localStorage.getItem("ruta");
	   var fecha=window.localStorage.getItem("fecha");
	    base.transaction(insertadet,function(err){
    	  alert("Error al insertar cheque: "+err.code+err.message);
          },function(){
			poblarcheques();  
		  });
				
    	function insertadet(tx) {
			var sql='INSERT INTO CHEQUES (codbanco,cliente,ruta,fecha,monto,numcheque,cuenta,recibo,tipo) VALUES("'+banco+'","'+cliente+'","'+ruta+'", ';		
				sql+='"'+fecha+'",'+monto+',"'+nche+'","'+ncta+'","99999",5)';		
				//alert(sql);
		   tx.executeSql(sql);		
		}
	
}//function insertarcheque(nche,ncta,banco,monto)
function consultasivencidas(cliente){
	var vencida='';
		base.transaction(poblarfac, function(err){
    	 		 alert("Error poblar facturas para cobro: "+err.code+err.message);
         		},function(){guardasivencida(vencida)});		
	function poblarfac(tx){  
			var sql='SELECT a.saldo,a.vencida FROM PENCOBRO a ';		
				sql+=' WHERE a.cliente="'+cliente+'" and a.saldo>0 '
			tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select facturas pendientes de cobro: "+err.code+err.message);
         		});    	
	}
	function listo(tx,results){  
			  $.each(results.rows,function(index){				  
				  var row = results.rows.item(index); 				     			     
					if (row['vencida']=='S') {
					  vencida='S';	
					}
			  });//.each
 	}
	

 // });	//$('#pclientes').live('pageshow',function(event, ui){
	
}// listafacturaspend(cliente)


