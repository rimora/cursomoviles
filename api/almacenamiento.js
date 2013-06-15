//Almacenamiento
function consultadb()
{
	var db = window.openDatabase("Tareas", "3.0", "TAREAS", 1000000);			
	return db;	
}

function iniciar()
{		
	
consultadb().transaction(creartb, errorCB, successCB);	
		function creartb(tx) {
     	 /*tx.executeSql('DROP TABLE IF EXISTS CLIENTES');
		 tx.executeSql('DROP TABLE IF EXISTS erpadmin_alcxc_pen_cob');*/
         tx.executeSql('CREATE TABLE IF NOT EXISTS TAREAS (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, detalle TEXT NOT NULL,estado TEXT NOT NULL,foto TEXT NOT NULL,fecha TEXT NOT NULL)'); 
		 }
function errorCB(err) {
    alert("Error al crear tabla tareas: "+err.code);
}

function successCB() {
    alert("BD creada");
}		
}

function savelogin(name,id){
	window.localStorage.setItem('nombre',name);
	window.localStorage.setItem('id',id);
	
	
}
function islogin(){
var id=window.localStorage.getItem('id');
	if (id != undefined)
	  return true;
	 else
	   return false;
}

function poblartarea(estado){
		
		consultadb().transaction(poblart, function(err){
    	 		 alert("Error select tareas : "+err.code+err.message);
         		});		
	
	function poblart(tx){  
	    var sql='SELECT * FROM TAREAS WHERE estado="'+estado+'" ORDER BY nombre  '			
	    
		tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error poblar tareas: "+err.code+err.message);
         		});    	
	}
	function listo(tx,results){  
		if (estado=="P"){
			$('#lpendientes').empty();        
			 $.each(results.rows,function(index){           
				 var row = results.rows.item(index);            
				 $('#lpendientes').append('<li id="'+row['id']+'"><a href="#ptarea"><h3>'+row['nombre']+'</h3></a></li>');        
			 });         
			 $('#lpendientes').listview('refresh'); 	
		}
		else {
		     $('#lcompletadas').empty();        
			 $.each(results.rows,function(index){           
				 var row = results.rows.item(index);            
				 $('#lcompletadas').append('<li id="'+row['id']+'"><a href="#"><h3>'+row['nombre']+'</h3></a></li>');        
			 });         
			 $('#lcompletadas').listview('refresh'); 	
		}
 	}
}
function nuevatarea(n,d,fo){
	var f=new Date();
	//var fecha=f.getDate()+'/'+ (f.getMonth()+1)+'/'+ f.getYear() + f.getFullYear();
	var fecha=f.getDate()+'/'+ (f.getMonth()+1)+'/'+ f.getYear();
	
	
	consultadb().transaction(function(tx){

       // alert('Tarea agregada');
    // tx.executeSql('DROP TABLE IF EXISTS reservaciones');
     tx.executeSql('INSERT INTO TAREAS (nombre,detalle,estado,foto,fecha) VALUES ("'+n+'","'+d+'","P","'+fo+'","'+fecha+'")');

	},function(err){
		alert(error.code);
		
	},successCB);
	function successCB() {
    	navigator.notification.alert('Tarea Agregada',function(){
		window.location.href="#page";
		
		
		},"Tarea Agregada","Aceptar");
	}


	
}
function completar(id){
	
	consultadb().transaction(function(tx){

       // alert('Tarea agregada');
    // tx.executeSql('DROP TABLE IF EXISTS reservaciones');
     tx.executeSql('UPDATE TAREAS SET estado="C" WHERE id='+id);

	},function(err){
		alert(error.code);
		
	},successCB);
	function successCB() {
    	navigator.notification.alert('Tarea Completada',function(){
		window.location.href="#page";
		
		
		},"Tarea Completada","Aceptar");
	}


	
}
function detalletarea(id){
//  $('#datoscli').live('pageshow',function(event, ui){
   	   consultadb().transaction(consulta, errorconsulta);
	var sql='';
		sql='SELECT * FROM TAREAS WHERE id='+id;
	function consulta(tx) {
		//alert(sql);
		tx.executeSql(sql,[],exito,errorconsulta);
		}
	
		function exito(tx,results){         
	   		var row = results.rows.item(0);            
	   		$('#detalleid').val(row['id']);
	   	    $('#detallen').val(row['nombre']);
		    $('#detalledesc').val(row['detalle']);
			$('#detallefecha').val(row['fecha']);
  	   		$('#detallefoto').val(row['foto']);
			$("#foto").attr({  src: row['foto']});
			$('#detalleid').attr('disabled', 'disabled');


		}
		
 		
	function errorconsulta(err) {
    	alert("Error SQL al poblar tarea: "+err.code+err.message);
	}
//  });	

}//detalletarea(id){
