// consultas
function consultadb()
{
	var db = window.openDatabase("Database", "1.0", "SARDEL", 1000000);			
	return db;	
}

function iniciar()
{		
	
	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 1000000);
db.transaction(creartb, errorCB, successCB);

	
		function creartb(tx) {
			alert('funcion creartb');	
    	 tx.executeSql('DROP TABLE IF EXISTS CLIENTES');
		 tx.executeSql('DROP TABLE IF EXISTS erpadmin_alcxc_pen_cob');
         tx.executeSql('CREATE TABLE IF NOT EXISTS CLIENTES (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, clave TEXT NOT NULL,dia TEXT NOT NULL,direccion TEXT NOT NULL,telefono TEXT NOT NULL,tipo TEXT NOT NULL,diasc TEXT NOT NULL,lcredito TEXT NOT NULL,saldo TEXT NOT NULL)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS erpadmin_alcxc_pen_cob (id INTEGER PRIMARY KEY AUTOINCREMENT, cod_zon TEXT NOT NULL, cod_tip_dc TEXT NOT NULL,num_doc TEXT NOT NULL,cod_clt TEXT NOT NULL,saldo TEXT NOT NULL,monto TEXT NOT NULL,fec_doc_ft TEXT NOT NULL,fec_ven TEXT NOT NULL)'); 
		 }
function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function successCB() {
    alert("success!");
}


		/*
		
		consultadb().transaction(populateDB,function(err)
		{
		alert("Error al insertar clientes: "+err.code+err.message);			
		},alert('bd generada'));
		function creartb(tx) {
		  alert('funcion creartb');	
		tx.executeSql('DROP TABLE IF EXISTS CLIENTES');
         tx.executeSql('CREATE TABLE IF NOT EXISTS CLIENTES (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, clave TEXT NOT NULL,dia TEXT NOT NULL)');   	
		}
		
	 */  
}
function insertar(){
		
		consultadb().transaction(insertarcli,function(err){
    	  alert("Error al insertar clientes: "+err.code+err.message);
          },alert("clientes insertados"));
				
    	function insertarcli(tx) {		
		tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia,direccion,telefono,tipo,diasc,lcredito,saldo) VALUES ("Farmacia UNO", "1020","Lunes","Dirección del cliente","2281545130","C","30","10000.00","3000.00")');        
        tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia,direccion,telefono,tipo,diasc,lcredito,saldo) VALUES ("Farmacia DOS", "1030","Martes","Dirección del cliente  DOS","2281545130","C","30","10000.00","5000.00")'); 
		tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia,direccion,telefono,tipo,diasc,lcredito,saldo) VALUES ("Farmacia TRES", "1040","Miercoles","Dirección del cliente","2281545130","C","30","30000.00","1000.00")');        
        tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia,direccion,telefono,tipo,diasc,lcredito,saldo) VALUES ("Farmacia CUATRO", "1050","Jueves","Dirección del cliente  CUATRO","2281545130","C","30","50000.00","8000.00")'); 
		 tx.executeSql('INSERT INTO erpadmin_alcxc_pen_cob (cod_zon,cod_tip_dc,num_doc,cod_clt,saldo,monto,fec_doc_ft,fec_ven) VALUES ("S04", "1","00041534","1020","437.55","437.55","08/05/2013","08/05/2013")');        
		 tx.executeSql('INSERT INTO erpadmin_alcxc_pen_cob (cod_zon,cod_tip_dc,num_doc,cod_clt,saldo,monto,fec_doc_ft,fec_ven) VALUES ("S04", "1","00041535","1020","888.55","1000.55","15/05/2013","15/05/2013")');  
		 tx.executeSql('INSERT INTO erpadmin_alcxc_pen_cob (cod_zon,cod_tip_dc,num_doc,cod_clt,saldo,monto,fec_doc_ft,fec_ven) VALUES ("S04", "1","00041537","1020","998.55","1000.55","15/05/2013","15/06/2013")');        
		 tx.executeSql('INSERT INTO erpadmin_alcxc_pen_cob (cod_zon,cod_tip_dc,num_doc,cod_clt,saldo,monto,fec_doc_ft,fec_ven) VALUES ("S04", "1","00041536","1030","5000.00","5000.00","08/06/2013","08/06/2013")');        


		}
}

function mostrarclientes(dia){
 // $('#pclientes').live('pageshow',function(event, ui){
		//alert('This page was just hidden: '+ ui.prevPage);
		
		var db = window.openDatabase("Database", "1.0", "SARDEL", 1000000);
		db.transaction(poblarcli, function(err){
    	 		 alert("Error select clientes : "+err.code+err.message);
         		});		
	
	function poblarcli(tx){  
	
	    if (dia!="Todos"){
			var sql='SELECT * FROM CLIENTES WHERE DIA="'+dia+'" ORDER BY nombre  '			
		}
		else {
			var sql='SELECT * FROM CLIENTES ORDER BY nombre   '			
		}
		tx.executeSql(sql,[],listo,function(err){
    	 		 alert("Error select clientes por dia: "+err.code+err.message);
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
   	   window.localStorage.clear();
	   saveidcliente(clavecli);
		//alert('entra mostrar cliente');
		$('#notascxc').text("Notas para el cliente " + clavecli);
		var db = window.openDatabase("Database", "1.0", "SARDEL", 200000);
		db.transaction(consulta, errorconsulta);
	
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
			  alert(saldot);
			  html += "<div class=ui-block-a><div class=ui-bar ui-bar-a><strong></strong> Tipo</div></div>";
			  html += "<div class=ui-block-b><strong></strong> Documento</div>";
			  html += "<div class=ui-block-c><strong></strong> Vencimiento</div>";
			  html += "<div class=ui-block-d><strong></strong> Saldo</div>";
			  html += "<div class=ui-block-e><strong></strong> Monto</div>";
			  $.each(results.rows,function(index){
				  var row = results.rows.item(index); 				     
				     if (row['cod_tip_dc']=="1"){
						 tipo="FACTURA"
					 }
					 else  {
						 tipo="OTRO" 
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
					$("#saldocli").text(saldot); 
					$("#montocli").text(montot); 
					alert(saldot);
	   }
 		
	function errorconsulta(err) {
    	alert("Error SQL al poblar cliente: "+err.code+err.message);
	}
//  });	

  }//funcion consulta(x)
function guardacliente(nombre,empresa,rfc,direccion,colonia,estado,municipio,telefono){
	consultadb().transaction(nuevocli,function(err){
    	  alert("Error al insertar cliente: "+err.code+err.message);
          },alert("clientes insertados"));
				
    	function nuevocli(tx) {		
		tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia,direccion,telefono,tipo,diasc,lcredito) VALUES ("Farmacia UNO", "1020","Lunes","Dirección del cliente","2281545130","C","30","10000.00")');        
        tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia,direccion,telefono,tipo,diasc,lcredito) VALUES ("Farmacia DOS", "1020","Lunes","Dirección del cliente DOS","2281545130","C","30","10000.00")');        
		}
	
}
function llamadascxc(){	
  alert ('depositos');
    $.get("demo_test.asp",function(data,status){
     // alert("Data: " + data + "\nStatus: " + status);
    });
  

}
function saveidcliente(clave){
	window.localStorage.setItem("clave",clave);
	//alert (window.localStorage.getItem("clave"));
	
	
}