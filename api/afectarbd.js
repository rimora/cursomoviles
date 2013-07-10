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

	//alert('entra a funcion iniciar');
		function creartb(tx) {
			//alert('funcion creartb');	
    	 tx.executeSql('DROP TABLE IF EXISTS CLIENTES');
		 tx.executeSql('DROP TABLE IF EXISTS erpadmin_alcxc_pen_cob');
		 tx.executeSql('DROP TABLE IF EXISTS TEMPEDIDO');
		 tx.executeSql('DROP TABLE IF EXISTS TEMFACTURA');
		 tx.executeSql('DROP TABLE IF EXISTS ARTICULO');//se llena de tablas articulo, articulo_precio,descuento_nivel
		 tx.executeSql('DROP TABLE IF EXISTS ARTICULO_EXISTENCIA');//se llena de tablas articulo, articulo_precio,descuento_nivel
		 tx.executeSql('DROP TABLE IF EXISTS SUGERIDO');//
		 tx.executeSql('DROP TABLE IF EXISTS ENCPEDIDO');//
		 tx.executeSql('DROP TABLE IF EXISTS DETPEDIDO');//
		 tx.executeSql('DROP TABLE IF EXISTS PARAMETROS');//
		 tx.executeSql('DROP TABLE IF EXISTS PARAMETROS');//
		 tx.executeSql('DROP TABLE IF EXISTS ENCHISFAC');//
		 tx.executeSql('DROP TABLE IF EXISTS DETHISFAC');//
		 
		 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS ENCHISFAC (id INTEGER PRIMARY KEY AUTOINCREMENT, factura,monto,cliente,pedido,fecha)');  
		 tx.executeSql('CREATE TABLE IF NOT EXISTS DETHISFAC (id INTEGER PRIMARY KEY AUTOINCREMENT, factura,articulo,linea,cantidad,devuelto,precio,totlinea)');  
		 tx.executeSql('CREATE TABLE IF NOT EXISTS PARAMETROS (id INTEGER PRIMARY KEY AUTOINCREMENT, COD_ZON,NUM_PED,NUM_REC,NUM_DEV,NUM_FAC)'); 
         tx.executeSql('CREATE TABLE IF NOT EXISTS CLIENTES (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, clave TEXT NOT NULL,dia TEXT NOT NULL,direccion TEXT NOT NULL,telefono TEXT NOT NULL,tipo TEXT NOT NULL,diasc TEXT NOT NULL,lcredito,saldo )'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS erpadmin_alcxc_pen_cob (id INTEGER PRIMARY KEY AUTOINCREMENT, cod_zon TEXT NOT NULL, cod_tip_dc TEXT NOT NULL,num_doc TEXT NOT NULL,cod_clt TEXT NOT NULL,saldo TEXT NOT NULL,monto TEXT NOT NULL,fec_doc_ft TEXT NOT NULL,fec_ven TEXT NOT NULL,vencida TEXT NOT NULL)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS TEMPEDIDO (id INTEGER PRIMARY KEY AUTOINCREMENT, articulo TEXT NOT NULL,cantidad,cliente)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS TEMFACTURA (id INTEGER PRIMARY KEY AUTOINCREMENT, articulo TEXT NOT NULL,cantidad,cliente)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS ARTICULO (id INTEGER PRIMARY KEY AUTOINCREMENT, articulo TEXT NOT NULL,descripcion TEXT NOT NULL,clas TEXT NOT NULL,accion TEXT NOT NULL,impuesto,precio,descuento)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS ARTICULO_EXISTENCIA (id INTEGER PRIMARY KEY AUTOINCREMENT, articulo TEXT NOT NULL,BODEGA TEXT NOT NULL,existencia)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS SUGERIDO (id INTEGER PRIMARY KEY AUTOINCREMENT, cliente TEXT NOT NULL,articulo TEXT NOT NULL,cantidad)'); 
         tx.executeSql('CREATE TABLE IF NOT EXISTS ENCPEDIDO (id INTEGER PRIMARY KEY AUTOINCREMENT, NUM_PED,COD_ZON,DOC_PRO,COD_CLT,TIP_DOC,HOR_FIN,FEC_PED,FEC_DES,MON_IMP_VT,MON_CIV,MON_SIV,MON_DSC,OBS_PED,ESTADO,COD_CND,COD_BOD)'); 
         tx.executeSql('CREATE TABLE IF NOT EXISTS DETPEDIDO (id INTEGER PRIMARY KEY AUTOINCREMENT, NUM_PED,COD_ART,MON_PRC_MN,POR_DSC_AP,MON_TOT,MON_DSC,MON_PRC_MX,CNT_MAX)'); 

		 }		 
		 
		 
	function errorCB(err) {
  	  alert("Error processing SQL: "+err.code);
	}

	function successCB() {
     navigator.notification.alert('Tablas Generadas',null,'Generar Tablas','Aceptar');					;
	}	
}//function iniciar()
function insertar(){
		
		consultadb().transaction(insertarcli,function(err){
    	  alert("Error al insertar clientes: "+err.code+err.message);
          }, navigator.notification.alert('Datos insertados',null,'Insertar Datos','Aceptar'));
				
    	function insertarcli(tx) {	
		tx.executeSql('INSERT INTO PARAMETROS (COD_ZON,NUM_PED,NUM_REC,NUM_DEV,NUM_FAC) VALUES ("S04","S13000216","R13000656","D13000001","F13000646")'); 	
        tx.executeSql('INSERT INTO ENCHISFAC (factura,monto,cliente,pedido,fecha) VALUES ("00046441",140,"1020","F06000779","03/07/2013")');  		
		tx.executeSql('INSERT INTO DETHISFAC (factura,articulo,linea,cantidad,devuelto,precio,totlinea) VALUES ("00046441","ADE-04",0,2,0,100,140)')
		tx.executeSql('INSERT INTO ENCPEDIDO (NUM_PED,COD_ZON,DOC_PRO,COD_CLT,TIP_DOC,HOR_FIN,FEC_PED,FEC_DES,MON_IMP_VT,MON_CIV,MON_SIV,MON_DSC,OBS_PED,ESTADO,COD_CND,COD_BOD) VALUES("F01000597","S04","S","1020","F","10:20 AM","09/07/2013","09/07/2013",116,1116,1000,200,"PEDIDO X","S",30,"K01")'); 
		tx.executeSql('INSERT INTO DETPEDIDO (NUM_PED,COD_ART,MON_PRC_MN,POR_DSC_AP,MON_TOT,MON_DSC,MON_PRC_MX,CNT_MAX) VALUES("F01000597","AGU-10",102,20,1000,200,102,10)'); 
		tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia,direccion,telefono,tipo,diasc,lcredito,saldo) VALUES ("Farmacia UNO", "1020","Lunes","Dirección del cliente","2281545130","C","30",10000.00,9000.00)');      
        tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia,direccion,telefono,tipo,diasc,lcredito,saldo) VALUES ("Farmacia DOS", "1030","Martes","Dirección del cliente  DOS","2281545130","C","30",10000.00,5000.00)'); 
		tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia,direccion,telefono,tipo,diasc,lcredito,saldo) VALUES ("Farmacia TRES", "1040","Miercoles","Dirección del cliente","2281545130","C","30",3000.00,10000.00)');        
        tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia,direccion,telefono,tipo,diasc,lcredito,saldo) VALUES ("Farmacia CUATRO", "1050","Jueves","Dirección del cliente  CUATRO","2281545130","C","30",5000.00,8000.00)'); 
		 tx.executeSql('INSERT INTO erpadmin_alcxc_pen_cob (cod_zon,cod_tip_dc,num_doc,cod_clt,saldo,monto,fec_doc_ft,fec_ven,vencida) VALUES ("S04", "1","00041534","1020","437.55","437.55","08/05/2013","08/05/2013","S")');        
		 tx.executeSql('INSERT INTO erpadmin_alcxc_pen_cob (cod_zon,cod_tip_dc,num_doc,cod_clt,saldo,monto,fec_doc_ft,fec_ven,vencida) VALUES ("S04", "1","00041535","1020","888.55","1000.55","15/05/2013","15/05/2013","S")');  
		 tx.executeSql('INSERT INTO erpadmin_alcxc_pen_cob (cod_zon,cod_tip_dc,num_doc,cod_clt,saldo,monto,fec_doc_ft,fec_ven,vencida) VALUES ("S04", "1","00041537","1020","998.55","1000.55","15/05/2013","15/06/2013","N")');        
		 tx.executeSql('INSERT INTO erpadmin_alcxc_pen_cob (cod_zon,cod_tip_dc,num_doc,cod_clt,saldo,monto,fec_doc_ft,fec_ven,vencida) VALUES ("S04", "1","00041536","1030","5000.00","5000.00","08/06/2013","08/06/2013","N")');        
 		 tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento) VALUES ("ADE-04","ADEROGYL 15 SOL. C/5 AMP","OFERTA","ANTIDEA",16,100,30)'); 		  //cod_cl=clasificacion_2 de articulo (CLIE,CATA,OFER), cod_fam=clasificacion_1 de articulo (RESU)
		 tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento) VALUES ("AGU-10","AGUA OXIGENADA CON 100 ML.","CATA","ANTIGRIPAL",0,50,30)'); 
		 tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento) VALUES ("AMO-19","AMOXIL SUSP. 500 MG. C/75 ML.","OFERTA","ANTIDEA",16,40,30)'); 
		 tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento) VALUES ("AZA-02","ARTI DE PRUEBA","OFERTA","PRUEBA",16,100,40)'); 
		 tx.executeSql('INSERT INTO ARTICULO_EXISTENCIA ( articulo,bodega,existencia) VALUES ("ADE-04","K01",20)'); 
		 tx.executeSql('INSERT INTO ARTICULO_EXISTENCIA ( articulo,bodega,existencia) VALUES ("AGU-10","K01",30)'); 
		 tx.executeSql('INSERT INTO ARTICULO_EXISTENCIA ( articulo,bodega,existencia) VALUES ("AMO-19","K01",40)'); 
		 tx.executeSql('INSERT INTO ARTICULO_EXISTENCIA ( articulo,bodega,existencia) VALUES ("ADE-04","ALG",50)'); 
		 tx.executeSql('INSERT INTO ARTICULO_EXISTENCIA ( articulo,bodega,existencia) VALUES ("AGU-10","ALG",60)'); 
		 tx.executeSql('INSERT INTO ARTICULO_EXISTENCIA ( articulo,bodega,existencia) VALUES ("AMO-19","ALG",70)'); 
		 tx.executeSql('INSERT INTO SUGERIDO (cliente,articulo,cantidad) VALUES ("1020","ADE-04",5)'); 
		 tx.executeSql('INSERT INTO SUGERIDO (cliente,articulo,cantidad) VALUES ("1020","AGU-10",5)'); 
		 tx.executeSql('INSERT INTO SUGERIDO (cliente,articulo,cantidad) VALUES ("1020","AMO-19",5)'); 
		 tx.executeSql('INSERT INTO SUGERIDO (cliente,articulo,cantidad) VALUES ("1020","AZA-02",5)'); 
		 tx.executeSql('INSERT INTO SUGERIDO (cliente,articulo,cantidad) VALUES ("1030","AZA-02",5)'); 

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
          },alert("Artículo insertado en pedido"));
				
    	function insertadet(tx) {		
		//alert('entra a insert de detallepedido');
		tx.executeSql('INSERT INTO TEMPEDIDO (articulo,cantidad,cliente) VALUES ("'+articulo+'",'+cantidad+',"'+window.localStorage.getItem("clave")+'")');        
		}
	
}//function insertatemppedido
function insertatempfactura(articulo,cantidad){
	   //alert('inserttafactura'+cantidad);
	    consultadb().transaction(insertadet,function(err){
    	  alert("Error al insertar renglon factura: "+err.code+err.message);
          });
				
    	function insertadet(tx) {		
		
		tx.executeSql('INSERT INTO TEMFACTURA (articulo,cantidad,cliente) VALUES ("'+articulo+'",'+Number(cantidad)+',"'+window.localStorage.getItem("clave")+'")');
		tx.executeSql('UPDATE ARTICULO_EXISTENCIA SET existencia=existencia-'+Number(cantidad)+' WHERE articulo="'+articulo+'" and bodega="K01"');        
		}
	
}//function insertatempfactura
function eliminatemppedido(articulo){
	   
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al eliminar renglon: "+err.code+err.message);
          },alert("Artículo eliminado en pedido"));
				
    	function insertadet(tx) {		
		//alert('entra a delete de detallepedido');
		tx.executeSql('DELETE FROM TEMPEDIDO WHERE ARTICULO="'+articulo+'" and cliente="'+window.localStorage.getItem("clave")+'"');        
		}
	
}//function eliminatemppedido
function eliminatempfactura(articulo,cantidad){
	   
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al eliminar renglon de tempfactura: "+err.code+err.message);
          },alert("Artículo eliminado en tempfac"));
				
    	function insertadet(tx) {		
		//alert('entra a delete de detallefactura');
		tx.executeSql('DELETE FROM TEMFACTURA WHERE ARTICULO="'+articulo+'" and cliente="'+window.localStorage.getItem("clave")+'"');        
		tx.executeSql('UPDATE ARTICULO_EXISTENCIA SET existencia=existencia+'+cantidad+' WHERE articulo="'+articulo+'" and bodega="K01"');
		}
	
}//function eliminatempfactura
function modificatemppedido(articulo,cantidad){
	   
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al modifica renglon: "+err.code+err.message);
          },alert("Artículo modificado en pedido"));
				
    	function insertadet(tx) {		
		//alert('entra a modificar detallepedido');
		
		tx.executeSql('UPDATE TEMPEDIDO SET CANTIDAD='+cantidad+' WHERE ARTICULO="'+articulo+'" and cliente="'+window.localStorage.getItem("clave")+'"');        
		}
	
}//function modificatemppedido
function modificatempfactura(articulo,cantidad){
	   
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al modifica renglonen factura: "+err.code+err.message);
          },alert("Artículo modificado en factura"));
				
    	function insertadet(tx) {		
		alert('entra a modificar detallefactura cantidad: '+cantidad);		
		if (Number(cantidad)>0){
			tx.executeSql('UPDATE TEMFACTURA SET CANTIDAD=cantidad+'+cantidad+' WHERE ARTICULO="'+articulo+'" and cliente="'+window.localStorage.getItem("clave")+'"');        
			tx.executeSql('UPDATE ARTICULO_EXISTENCIA SET existencia=existencia-'+cantidad+' WHERE articulo="'+articulo+'" and bodega="K01"');
		}
		else{
			cantidad=Number(cantidad)*-1
			alert('cantidad menor a cero');
			tx.executeSql('UPDATE TEMFACTURA SET CANTIDAD=cantidad-'+cantidad+' WHERE ARTICULO="'+articulo+'" and cliente="'+window.localStorage.getItem("clave")+'"');        
			tx.executeSql('UPDATE ARTICULO_EXISTENCIA SET existencia=existencia+'+cantidad+' WHERE articulo="'+articulo+'" and bodega="K01"');	
		}
		}
	
}//function modificatempfactura
function limpiartemp(){
	   //limpia tablas temporales que tienen articulos en pedido y/o factura
	consultadb().transaction(limpiatabla,function(err){
    	  alert("Error al limpiar tablas: "+err.code+err.message);
          },alert("TABLAS VACIAS"));
				
    	function limpiatabla(tx) {				
		tx.executeSql('DELETE FROM TEMFACTURA ');        
		tx.executeSql('DELETE FROM TEMPEDIDO ');        
		
		}
	
}//function limpiartemp
function guardaencpedido(pedido,ruta,cliente,hora,fecha,impuesto,total,subtotal,descuento,obs,cond,bodega){
	   alert (pedido+ruta+cliente+hora+fecha+impuesto+total+subtotal+descuento+obs+cond+bodega);
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al insertar en pedido: "+err.code+err.message);
          },alert("Pedido Guardado"));
				
    	function insertadet(tx) {		
		//alert('entra a modificar detallefactura cantidad: '+cantidad);		
		
			tx.executeSql('INSERT INTO ENCPEDIDO (NUM_PED,COD_ZON,COD_CLT,TIP_DOC,HOR_FIN,FEC_PED,FEC_DES,MON_IMP_VT,MON_CIV,MON_SIV,MON_DSC,OBS_PED,ESTADO,COD_CND,COD_BOD) VALUES("'+pedido+'","'+ruta+'","'+cliente+'","S","'+hora+'","'+fecha+'","'+fecha+'",'+impuesto+','+total+','+subtotal+','+descuento+',"'+obs+'","S",'+cond+',"'+bodega+'")'); 
			limpiartemppedido()
		}
	
}//function guardaencpedido
function guardadetpedido(pedido,articulo,precio,pordescuento,totalinea,descuento,precio,cantidad){
	   alert (pedido+articulo+precio+pordescuento+totalinea+descuento+precio+cantidad);
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al insertar en detallepedido: "+err.code+err.message);
          },alert("Detalle Pedido Guardado"));
				
    	function insertadet(tx) {		
		//alert('entra a modificar detallefactura cantidad: '+cantidad);		
		
			tx.executeSql('INSERT INTO DETPEDIDO (NUM_PED,COD_ART,MON_PRC_MN,POR_DSC_AP,MON_TOT,MON_DSC,MON_PRC_MX,CNT_MAX) VALUES("'+pedido+'","'+articulo+'",'+precio+','+pordescuento+','+totalinea+','+descuento+','+precio+','+cantidad+')'); 
		}
	
}//function guardadetpedido

function limpiartemppedido(){
	   //limpia tablas temporales que tienen articulos en pedido y/o factura
	consultadb().transaction(limpiatabla,function(err){
    	  alert("Error al limpiar tabla de tempedido: "+err.code+err.message);
          });
				
    	function limpiatabla(tx) {						
		tx.executeSql('DELETE FROM TEMPEDIDO where cliente="'+window.localStorage.getItem("clave")+'"');        
		
		}
	
}//function limpiartemppedido
function limpiartempfactura(){
	   //limpia tablas temporales que tienen articulos en pedido y/o factura
	consultadb().transaction(limpiatabla,function(err){
    	  alert("Error al limpiar tabla de tempfactura: "+err.code+err.message);
          });
				
    	function limpiatabla(tx) {						
		tx.executeSql('DELETE FROM TEMFACTURA where cliente="'+window.localStorage.getItem("clave")+'"');        
		
		}
	
}//function limpiartempfactura
function actsaldocliente(importe){
	  
	consultadb().transaction(limpiatabla,function(err){
    	  alert("Error al actualizar saldo en cliente: "+err.code+err.message);
          });
				
    	function limpiatabla(tx) {						
		tx.executeSql('UPDATE CLIENTES SET SALDO='+importe+' where clave="'+window.localStorage.getItem("clave")+'"');        
		
		}
	
}//function limpiartemppedido