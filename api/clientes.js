// CLIENTES
function mostrarclientes(dia){	
 // $('#pclientes').live('pageshow',function(event, ui){
		//alert('This page was just hidden: '+ ui.prevPage);		
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 1000000);
		consultadb().transaction(poblarcli, function(err){
    	 		 alert("Error select clientes : "+err.code+err.message);
         		});		
	function poblarcli(tx){  
	    
	    if (dia!="Todos"){
			var sql='SELECT b.clave,b.nombre FROM RUTA_CLIENTE a inner join CLIENTES b on b.clave=a.cliente WHERE a.dia='+dia+' ORDER BY nombre  '			
		}
		else {
			var sql='SELECT b.clave,b.nombre FROM RUTA_CLIENTE a inner join CLIENTES b on b.clave=a.cliente ORDER BY nombre  '			
		}
		tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select clientes por dia: "+err.code+err.message);
         		});    	
	}
	function listo(tx,results){  
		 $('#listaclientes').empty();        
		 $.each(results.rows,function(index){           
			 var row = results.rows.item(index);            
			 $('#listaclientes').append('<li id="'+row['clave']+'"><a href="#">'+row['clave']+'  '+row['nombre']+'</a></li>');        
		 });    
		 //alert('antes de refresh de lista');  		 
		 $('#listaclientes').listview('refresh'); 
		 //alert('despues de refresh de lista');
 	}
	
 // });	//$('#pclientes').live('pageshow',function(event, ui){
	
}// mostrarclientes
function mostrarcliente(clavecli){
//  $('#datoscli').live('pageshow',function(event, ui){
       var limite=0;
	   var saldo=0;
	   var disponible=0;
	   var vencida='NO';
	   var nombre='';
		$('#notascxc').text("Notas para el cliente " + clavecli);
		$('#clienteselec').empty();
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 200000);
		consultadb().transaction(consulta, errorconsulta,function(){
			var html='';
			guardaclientenombre(clavecli+' '+nombre);
			$('#clienteselec').append("Cliente Seleccionado:" + clavecli+' '+nombre);
			$('#gridtotalescli').empty();
			html='<div class="ui-block-a" style="width:120px" ><div class="ui-bar ui-bar-a">Lim. Cred</div></div>';
            html+='<div class="ui-block-b" style="width:120px"><div class="ui-bar ui-bar-a" >Ocupado</div></div>';
            html+='<div class="ui-block-c" style="width:120px"><div class="ui-bar ui-bar-a">Disponible</div></div>';
			html+='<div class="ui-block-d" style="width:120px"><div class="ui-bar ui-bar-a">Fac Ven</div></div>';
            html+='<div class="ui-block-a" style="width:120px"><div class="ui-bar ui-bar-b" >'+limite.toFixed(2)+'</div></div>';
            html+='<div class="ui-block-b" style="width:120px"><div class="ui-bar ui-bar-b">'+saldo.toFixed(2)+'</div></div>';
            html+='<div class="ui-block-c" style="width:120px"><div class="ui-bar ui-bar-b" >'+disponible.toFixed(2)+'</div></div>';			
			html+='<div class="ui-block-d" style="width:120px"><div class="ui-bar ui-bar-b" >'+vencida+'</div></div>';			
			$('#gridtotalescli').append(html);	
			
			
		});	
	function consulta(tx) {
		tx.executeSql('SELECT * FROM CLIENTES  WHERE clave="'+clavecli+'"',[],exito,errorconsulta);
		tx.executeSql('SELECT a.fechaven,b.tipo,b.diasc FROM PENCOBRO a inner join CLIENTES b on b.clave=a.cliente WHERE a.saldo>0 and a.cliente="'+clavecli+'"',[],poblarfac,errorconsulta);    	
		//alert('entro a la consulta de datos de un cliente');
		}
	
		function exito(tx,results){         			
	   		var row = results.rows.item(0);            
	   		/*
			$('#nomcli').text("Clave: "+row['clave']+" Nombre: "+row['nombre']);
	   	    $('#clacli').text();
		    $('#direccion').text("Dirección: "+row['direccion']);
  	   		$('#telefono').text("Telefono: "+row['telefono']);
	   		$('#tipo').text("Estado: Credito "+row['tipo']);
  	   		$('#diascredito').text("Dias de Crédito: "+row['diasc']);
	   		$('#limitecredito').text("Límite de Crédito: "+row['lcredito']);
	   		$('#saldo').text("Saldo: "+row['saldo']);
			limite=Number(row['lcredito']);*/
			nombre=row['nombre'];
			$('#nomcli').text("Clave: "+row['clave']+" Nombre: "+row['nombre']);  	   		    
			$('#direccion').text("Dirección: "+row['direccion']+" Telefono: "+row['telefono']);  	   		
	   		$('#tipo').text("Estado:"+row['tipo']+" Dias de Crédito: "+row['diasc']);
	   		//$('#limitecredito').text("Límite de Crédito: "+row['lcredito']+" Saldo: "+row['saldo']);			
			limite=Number(row['lcredito']);			
			saldo=Number(row['saldo']);
			disponible=Number(limite-saldo);
			
			
			window.localStorage.setItem("limite",Number(row['lcredito']));
			window.localStorage.setItem("saldo",Number(row['saldo']));
			window.localStorage.setItem("tipocliente",row['tipo']);
			window.localStorage.setItem("diascredito",row['diasc']);
			window.localStorage.setItem("direntrega",row['dir_ent']);
		}
		function poblarfac(tx,results){ 			 
			  var tipo="";			  
			  $.each(results.rows,function(index){
				  var row = results.rows.item(index); 	
				  //alert('entra y no deberia'+row['fechaven']);			  
				  var dias=diasvencida(row['fechaven']);		 
				  //tenemos los dias despues del vencimiento				   
				  	if (dias>=31){
						 	vencida="SI"						 
					}					
			  });					
					
					if (vencida=="SI") {
						//navigator.notification.alert('El cliente tiene facturas vencidas, no podrá realizar ventas',null,'Saldo Vencido','Aceptar');					
						//$("#bventa").addClass('ui-disabled');
						guardasivencida('S');						
					}
					else
					{
						guardasivencida('');						
					}
					/*
					else if (saldo>limite){						
						navigator.notification.alert('Cliente con limite de credito excedido, no podrá realizar ventas',null,'Limite de Crédito Excedido','Aceptar');					
						$("#bventa").addClass('ui-disabled');
					}					
					else {			
						$("#bventa").removeClass('ui-disabled'); 
					}*/

	   }
 		
	function errorconsulta(err) {
    	alert("Error SQL al poblar cliente: "+err.code+err.message);
	}
//  });	

  }//mostrarcliente
