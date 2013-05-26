// consultas
function consultadb()
{
	var db = window.openDatabase("Database", "1.0", "SARDEL", 1000000);		
	return db;	
}



function iniciar()
{		
		consultadb().transaction(consulta, function(err){
    	  alert("Error processing SQL al crear BD: "+err.message);
          },alert('bd generada'));	
				
		function consulta(tx) {
         tx.executeSql('DROP TABLE IF EXISTS CLIENTES');
         tx.executeSql('CREATE TABLE IF NOT EXISTS CLIENTES (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, clave TEXT NOT NULL,dia TEXT NOT NULL)');        		 
     	}		
	   
}
function insertar(){
		
		consultadb().transaction(insertarcli,function(err){
    	  alert("Error al insertar clientes: "+err.code+err.message);
          },listacliente);
		alert('funcion insertar');			
    	function insertarcli(tx) {
		tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia) VALUES ("Cesar Menso", "1020","Lunes")');        
    	tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia) VALUES ("Diego Morales", "1010","Martes")');		 		
		}
        function listacliente(tx){
			var db = window.openDatabase("Database", "1.0", "SARDEL", 200000);
			 db.transaction(function(tx){      			
		    	tx.executeSql('SELECT * FROM CLIENTES ',[],
			  function(tx,results){  	
		     	alert('entra a función muestra');		
		 	 	$.each(results.rows,function(index){           
			 		var row = results.rows.item(index);            
 			 		alert(row['clave']);
			 		alert(row['nombre']);		
				});         
			  },function(err){
    	 		 alert("Error select de clientes: "+err);
         		})}, errorCB);;
			  
		alert('despues de clientes insertados');  
		}
		
		
}

function mostrarclientes(dia){
 // $('#pclientes').live('pageshow',function(event, ui){
		//alert('This page was just hidden: '+ ui.prevPage);
		
		var db = window.openDatabase("Database", "1.0", "SARDEL", 200000);
		db.transaction(poblarcli, function(err){
    	 		 alert("Error abrir bd: "+err);
         		});		
	
	function poblarcli(tx){  
	
	    if (dia!="Todos"){
			var sql='SELECT * FROM CLIENTES WHERE DIA="'+dia+'"'			
		}
		else {
			var sql='SELECT * FROM CLIENTES '			
		}
		tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select clientes por dia: "+err);
         		});    	
	}
	function listo(tx,results){  
		 $('#listaclientes').empty();        
		 $.each(results.rows,function(index){           
			 var row = results.rows.item(index);            
			 $('#listaclientes').append('<li id="'+row['clave']+'"><a href="#datoscli"><h3>'+row['clave']+'  '+row['nombre']+'</h3></a></li>');        
		 });         
		 $('#listaclientes').listview('refresh'); 
 	}

//  });	//$('#pclientes').live('pageshow',function(event, ui){
	
}
function mostrarcliente(clavecli){
//  $('#datoscli').live('pageshow',function(event, ui){
		alert('entra mostrar cliente');
		var db = window.openDatabase("Database", "1.0", "SARDEL", 200000);
		db.transaction(consulta, errorconsulta);
	
	function consulta(tx) {
		tx.executeSql('SELECT * FROM CLIENTES WHERE clave="'+clavecli+'"',[],exito,errorconsulta);    	
		alert('entro a la consulta de datos de un cliente');
		}
	
	function exito(tx,results){         
	   var row = results.rows.item(0);            
	   $('#nomcli').text(row['nombre']);
  	   $('#clacli').text(row['clave']);
 		}
	function errorconsulta(err) {
    	alert("Error SQL al poblar cliente: "+err);
	}
//  });	

}