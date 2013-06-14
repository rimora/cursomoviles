// crear e insertar en tablas
function consultadb()
{
	var db = window.openDatabase("Database", "1.0", "SARDEL", 1000000);			
	return db;	
}

function iniciar()
{		
	
	//var db = window.openDatabase("Database", "1.0", "Cordova Demo", 1000000);
consultadb().transaction(creartb, errorCB, successCB);

	alert('entra a funcion iniciar');
		function creartb(tx) {
			alert('funcion creartb');	
    	 tx.executeSql('DROP TABLE IF EXISTS CLIENTES');
		 tx.executeSql('DROP TABLE IF EXISTS erpadmin_alcxc_pen_cob');
		 tx.executeSql('DROP TABLE IF EXISTS TEMPEDIDO');
		 tx.executeSql('DROP TABLE IF EXISTS TEMFACTURA');
		 
		 
         tx.executeSql('CREATE TABLE IF NOT EXISTS CLIENTES (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, clave TEXT NOT NULL,dia TEXT NOT NULL,direccion TEXT NOT NULL,telefono TEXT NOT NULL,tipo TEXT NOT NULL,diasc TEXT NOT NULL,lcredito TEXT NOT NULL,saldo TEXT NOT NULL)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS erpadmin_alcxc_pen_cob (id INTEGER PRIMARY KEY AUTOINCREMENT, cod_zon TEXT NOT NULL, cod_tip_dc TEXT NOT NULL,num_doc TEXT NOT NULL,cod_clt TEXT NOT NULL,saldo TEXT NOT NULL,monto TEXT NOT NULL,fec_doc_ft TEXT NOT NULL,fec_ven TEXT NOT NULL,vencida TEXT NOT NULL)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS TEMPEDIDO (id INTEGER PRIMARY KEY AUTOINCREMENT, articulo TEXT NOT NULL,cantidad)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS TEMFACTURA (id INTEGER PRIMARY KEY AUTOINCREMENT, articulo TEXT NOT NULL,precio ,descuento,total,descontado,cantidad)'); 
		 }
	function errorCB(err) {
  	  alert("Error processing SQL: "+err.code);
	}

	function successCB() {
    alert("success!");
	}	
}//function iniciar()
function insertar(){
		
		consultadb().transaction(insertarcli,function(err){
    	  alert("Error al insertar clientes: "+err.code+err.message);
          },alert("clientes insertados"));
				
    	function insertarcli(tx) {		
		tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia,direccion,telefono,tipo,diasc,lcredito,saldo) VALUES ("Farmacia UNO", "1020","Lunes","Dirección del cliente","2281545130","C","30","10000.00","30000.00")');      
        tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia,direccion,telefono,tipo,diasc,lcredito,saldo) VALUES ("Farmacia DOS", "1030","Martes","Dirección del cliente  DOS","2281545130","C","30","10000.00","5000.00")'); 
		tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia,direccion,telefono,tipo,diasc,lcredito,saldo) VALUES ("Farmacia TRES", "1040","Miercoles","Dirección del cliente","2281545130","C","30","30000.00","10000.00")');        
        tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia,direccion,telefono,tipo,diasc,lcredito,saldo) VALUES ("Farmacia CUATRO", "1050","Jueves","Dirección del cliente  CUATRO","2281545130","C","30","50000.00","8000.00")'); 
		 tx.executeSql('INSERT INTO erpadmin_alcxc_pen_cob (cod_zon,cod_tip_dc,num_doc,cod_clt,saldo,monto,fec_doc_ft,fec_ven,vencida) VALUES ("S04", "1","00041534","1020","437.55","437.55","08/05/2013","08/05/2013","S")');        
		 tx.executeSql('INSERT INTO erpadmin_alcxc_pen_cob (cod_zon,cod_tip_dc,num_doc,cod_clt,saldo,monto,fec_doc_ft,fec_ven,vencida) VALUES ("S04", "1","00041535","1020","888.55","1000.55","15/05/2013","15/05/2013","S")');  
		 tx.executeSql('INSERT INTO erpadmin_alcxc_pen_cob (cod_zon,cod_tip_dc,num_doc,cod_clt,saldo,monto,fec_doc_ft,fec_ven,vencida) VALUES ("S04", "1","00041537","1020","998.55","1000.55","15/05/2013","15/06/2013","N")');        
		 tx.executeSql('INSERT INTO erpadmin_alcxc_pen_cob (cod_zon,cod_tip_dc,num_doc,cod_clt,saldo,monto,fec_doc_ft,fec_ven,vencida) VALUES ("S04", "1","00041536","1030","5000.00","5000.00","08/06/2013","08/06/2013","N")');        


		}
}//function insertar(){

function guardacliente(nombre,empresa,rfc,direccion,colonia,estado,municipio,telefono){
	consultadb().transaction(nuevocli,function(err){
    	  alert("Error al insertar cliente: "+err.code+err.message);
          },alert("clientes insertados"));
				
    	function nuevocli(tx) {		
		tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia,direccion,telefono,tipo,diasc,lcredito) VALUES ("Farmacia UNO", "1020","Lunes","Dirección del cliente","2281545130","C","30","10000.00")');        
        tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia,direccion,telefono,tipo,diasc,lcredito) VALUES ("Farmacia DOS", "1020","Lunes","Dirección del cliente DOS","2281545130","C","30","10000.00")');        
		}
	
}//function guardacliente(
function insertatemppedido(articulo,cantidad){
	   
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al insertar renglon: "+err.code+err.message);
          },alert("Artículo insertado"));
				
    	function insertadet(tx) {		
		alert('entra a insert de detallepedido');
		tx.executeSql('INSERT INTO TEMPEDIDO (articulo,cantidad) VALUES ("'+articulo+'",'+cantidad+')');        
		}
	
}//function insertatemppedido