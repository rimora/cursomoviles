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
	var fecha=f.getDate()+'/'+ (f.getMonth()+1)+'/'+ f.getYear() + f.getFullYear();
	
	
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
function mostrartarea(clavecli){
//  $('#datoscli').live('pageshow',function(event, ui){
   	   window.localStorage.clear();
	   saveidcliente(clavecli);
		alert('entra mostrar cliente');
		$('#notascxc').text("Notas para el cliente " + clavecli);
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 200000);
		consultadb().transaction(consulta, errorconsulta);
	
	function consulta(tx) {
		tx.executeSql('SELECT * FROM CLIENTES  WHERE clave="'+clavecli+'"',[],exito,errorconsulta);
		tx.executeSql('SELECT * FROM erpadmin_alcxc_pen_cob WHERE cod_clt="'+clavecli+'"',[],poblarfac,errorconsulta);    	
		//alert('entro a la consulta de datos de un cliente');
		}
	
		function exito(tx,results){         
	   		var row = results.rows.item(0);            
	   		$('#nomcli').text("Nombre: "+row['nombre']);
	   	    $('#clacli').text("Clave: "+row['clave']);
		    $('#direccion').text("Dirección: "+row['direccion']);
  	   		$('#telefono').text("Telefono: "+row['telefono']);
	   		$('#tipo').text("Tipo: "+row['tipo']);
  	   		$('#diascredito').text("Dias de Crédito: "+row['diasc']);
	   		$('#limitecredito').text("Límite de Crédito: "+row['lcredito']);
	   		$('#saldo').text("Saldo: "+row['saldo']);
		}
		function poblarfac(tx,results){ 
		      $("#gridfaccli").empty();			  
			  var html = "";
			  var tipo="";
			  var saldot=0;
			  var montot=0;
			  var vencida="";
			  alert(saldot);
			  html += "<div class=ui-block-a><div class=ui-bar ui-bar-a><strong></strong> Tipo</div></div>";
			  html += "<div class=ui-block-b><strong></strong> Documento</div>";
			  html += "<div class=ui-block-c><strong></strong> Vencimiento</div>";
			  html += "<div class=ui-block-d><strong></strong> Saldo</div>";
			  html += "<div class=ui-block-e><strong></strong> Monto</div>";
			  $.each(results.rows,function(index){
				  var row = results.rows.item(index); 				     
				     if (row['cod_tip_dc']=="1"){
						 tipo="FAC"
					 }
					 else  {
						 tipo="OTRO" 
					 }
					 if (row['vencida']=="S"){
						 vencida="S"
						 
					 }
					 saldot+=Number(row['saldo']);
					 montot+=Number(row['monto']);
					 html += "<div class=ui-block-a><strong></strong> " +tipo+"</div>";
					 html += "<div class=ui-block-b><strong></strong> "+row['num_doc']+"</div>";
                     html += "<div class=ui-block-c><strong></strong> "+row['fec_ven']+"</div>";
					 html += "<div class=ui-block-d><strong></strong> "+row['saldo']+"</div>";
                     html += "<div class=ui-block-e><strong></strong> "+row['monto']+"</div>";

                  	 
			  });
					$("#gridfaccli").append(html); 
					$("#saldocli").val(saldot); 
					$("#montocli").val(montot); 
					if (vencida=="S"){
						alert('El cliente tiene facturas vencidas, no podrá');
						
					}
					alert(saldot);
	   }
 		
	function errorconsulta(err) {
    	alert("Error SQL al poblar cliente: "+err.code+err.message);
	}
//  });	

  }//funcion consulta(x)
