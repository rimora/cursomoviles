// crear e insertar en tablas
function consultadb()
{
	var db = window.openDatabase("Database", "1.0", "SARDEL", 10000000);			
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
		 tx.executeSql('DROP TABLE IF EXISTS CUENTASB');
		 tx.executeSql('DROP TABLE IF EXISTS CUENTASDEP');
		 tx.executeSql('DROP TABLE IF EXISTS CHEQUES');		 
		 tx.executeSql('DROP TABLE IF EXISTS PENCOBRO');
		 tx.executeSql('DROP TABLE IF EXISTS TEMPEDIDO');
		 tx.executeSql('DROP TABLE IF EXISTS TEMFACTURA');
		 tx.executeSql('DROP TABLE IF EXISTS TEMCOBROS');		 
		 tx.executeSql('DROP TABLE IF EXISTS TEMDEV');//
		 tx.executeSql('DROP TABLE IF EXISTS ARTICULO');//se llena de tablas articulo, articulo_precio,descuento_nivel
		 tx.executeSql('DROP TABLE IF EXISTS ARTICULO_EXISTENCIA');//se llena de tablas articulo, articulo_precio,descuento_nivel
		 tx.executeSql('DROP TABLE IF EXISTS SUGERIDO');//
		 tx.executeSql('DROP TABLE IF EXISTS ENCPEDIDO');//
		 tx.executeSql('DROP TABLE IF EXISTS DETPEDIDO');//
		 tx.executeSql('DROP TABLE IF EXISTS PARAMETROS');//		 
		 tx.executeSql('DROP TABLE IF EXISTS RAZONVISITA');//		 
		 tx.executeSql('DROP TABLE IF EXISTS VISITA');//		 
		 tx.executeSql('DROP TABLE IF EXISTS ENCHISFAC');//
		 tx.executeSql('DROP TABLE IF EXISTS DETHISFAC');//
		 tx.executeSql('DROP TABLE IF EXISTS ENCDEV');//
		 tx.executeSql('DROP TABLE IF EXISTS DETDEV');//
		 tx.executeSql('DROP TABLE IF EXISTS ENCOBROS');		 
		 tx.executeSql('DROP TABLE IF EXISTS DETCOBROS');	
		 tx.executeSql('DROP TABLE IF EXISTS ENCDEP');		 
		 tx.executeSql('DROP TABLE IF EXISTS DETDEP');		 
		 tx.executeSql('DROP TABLE IF EXISTS NOTASCOB');		 
	 

		 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS ENCHISFAC (id INTEGER PRIMARY KEY AUTOINCREMENT, factura,monto,cliente,pedido,fecha)');  
		 tx.executeSql('CREATE TABLE IF NOT EXISTS DETHISFAC (id INTEGER PRIMARY KEY AUTOINCREMENT, factura,articulo,linea,cantidad,devuelto,precio,totlinea)');  
		 tx.executeSql('CREATE TABLE IF NOT EXISTS PARAMETROS (id INTEGER PRIMARY KEY AUTOINCREMENT, cod_zon,num_ped,num_rec,num_dev,num_fac)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS RAZONVISITA (id INTEGER PRIMARY KEY AUTOINCREMENT, cod_rzn,des_rzn)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS VISITA (id INTEGER PRIMARY KEY AUTOINCREMENT,cliente,doc_pro,fecha_plan,fin,inicio,notas,razon,ruta,tipo)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS CUENTASB (id INTEGER PRIMARY KEY AUTOINCREMENT, codigo TEXT NOT NULL,descripcion)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS CUENTASDEP (id INTEGER PRIMARY KEY AUTOINCREMENT, codigo TEXT NOT NULL,cuenta,descripcion)'); 
         tx.executeSql('CREATE TABLE IF NOT EXISTS CLIENTES (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, clave TEXT NOT NULL,dia TEXT NOT NULL,direccion TEXT NOT NULL,telefono TEXT NOT NULL,tipo TEXT NOT NULL,diasc TEXT NOT NULL,lcredito,saldo )'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS PENCOBRO (id INTEGER PRIMARY KEY AUTOINCREMENT, tipo TEXT NOT NULL,documento TEXT NOT NULL,cliente TEXT NOT NULL,saldo,monto,fecha,fechaven,vencida,diasv)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS TEMPEDIDO (id INTEGER PRIMARY KEY AUTOINCREMENT, articulo TEXT NOT NULL,cantidad,cliente)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS TEMFACTURA (id INTEGER PRIMARY KEY AUTOINCREMENT, articulo TEXT NOT NULL,cantidad,cliente)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS TEMDEV (id INTEGER PRIMARY KEY AUTOINCREMENT, articulo TEXT NOT NULL,linea,cantidad,obs)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS TEMCOBROS (id INTEGER PRIMARY KEY AUTOINCREMENT, factura TEXT NOT NULL,abonado,saldo)'); 		 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS CHEQUES (id INTEGER PRIMARY KEY AUTOINCREMENT, codbanco,cliente,ruta,fecha,monto,numcheque,cuenta,recibo,tipo)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS ARTICULO (id INTEGER PRIMARY KEY AUTOINCREMENT, articulo TEXT NOT NULL,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS ARTICULO_EXISTENCIA (id INTEGER PRIMARY KEY AUTOINCREMENT, articulo TEXT NOT NULL,bodega TEXT NOT NULL,existencia)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS SUGERIDO (id INTEGER PRIMARY KEY AUTOINCREMENT, cliente TEXT NOT NULL,articulo TEXT NOT NULL,cantidad)'); 
         tx.executeSql('CREATE TABLE IF NOT EXISTS ENCPEDIDO (id INTEGER PRIMARY KEY AUTOINCREMENT, num_ped,cod_zon,doc_pro,cod_clt,tip_doc,hor_fin,fec_ped,fec_des,mon_imp_vt,mon_civ,mon_siv,mon_dsc,obs_ped,estado,cod_cnd,cod_bod)'); 
         tx.executeSql('CREATE TABLE IF NOT EXISTS DETPEDIDO (id INTEGER PRIMARY KEY AUTOINCREMENT, num_ped,cod_art,mon_prc_mn,por_dsc_ap,mon_tot,mon_dsc,mon_prc_mx,cnt_max)'); 
		  tx.executeSql('CREATE TABLE IF NOT EXISTS ENCDEV (id INTEGER PRIMARY KEY AUTOINCREMENT, num_dev,cod_zon,cod_clt,hor_ini,hor_fin,fec_dev,obs_dev,num_itm,est_dev,doc_pro,mon_siv,mon_dsc,por_dsc_ap,mon_imp_vt,mon_imp_cs,cod_bod,impreso,num_ref)'); 
         tx.executeSql('CREATE TABLE IF NOT EXISTS DETDEV  (id INTEGER PRIMARY KEY AUTOINCREMENT, num_dev,cod_zon,cod_art,ind_dev,mon_tot,mon_prc_mx,mon_prc_mn,cnt_max,obs_dev,mon_dsc,por_dsc_ap)'); 
		 tx.executeSql('CREATE TABLE IF NOT EXISTS ENCOBROS (id INTEGER PRIMARY KEY AUTOINCREMENT, cliente,tipo,ruta,recibo,doc_pro,fec_pro,hor_ini,hor_fin,impreso,estado,monche,monefe,mondoc,depositado)'); 
		  tx.executeSql('CREATE TABLE IF NOT EXISTS DETCOBROS (id INTEGER PRIMARY KEY AUTOINCREMENT, cliente,tipo,tipoaso,ruta,recibo,docafectado,doc_pro,fec_pro,estado,monto,saldo_doc)'); 
		  tx.executeSql('CREATE TABLE IF NOT EXISTS ENCDEP (id INTEGER PRIMARY KEY AUTOINCREMENT, codigo,cuenta,deposito,doc_pro,fec_dep,mon_dep,obs)'); 
		  tx.executeSql('CREATE TABLE IF NOT EXISTS DETDEP (id INTEGER PRIMARY KEY AUTOINCREMENT, monche,monefe,deposito,recibo,obs)'); 
		  tx.executeSql('CREATE TABLE IF NOT EXISTS NOTASCOB (id INTEGER PRIMARY KEY AUTOINCREMENT, factura,nota)'); 
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
		tx.executeSql('INSERT INTO PARAMETROS (cod_zon,num_ped,num_rec,num_dev,num_fac) VALUES ("S04","S04000216","R04000656","D04000001","F04000646")'); 	
		tx.executeSql('INSERT INTO RAZONVISITA (cod_rzn,des_rzn) VALUES ("R1","Ventas")'); 
		tx.executeSql('INSERT INTO RAZONVISITA (cod_rzn,des_rzn) VALUES ("R2","Cobros")'); 
		tx.executeSql('INSERT INTO RAZONVISITA (cod_rzn,des_rzn) VALUES ("R3","Local Cerrado")'); 
		tx.executeSql('INSERT INTO RAZONVISITA (cod_rzn,des_rzn) VALUES ("R4","No esta comprado")'); 
        tx.executeSql('INSERT INTO CUENTASB (codigo,descripcion) VALUES("ND","NO DEFINIDA")'); 
		tx.executeSql('INSERT INTO CUENTASB (codigo,descripcion) VALUES("BANCOMER","BBVA BANCOMER")'); 
		tx.executeSql('INSERT INTO CUENTASB (codigo,descripcion) VALUES("BANAMEX","Banamex")'); 
		tx.executeSql('INSERT INTO CUENTASB (codigo,descripcion) VALUES("HSBC","HSBC")'); 
		tx.executeSql('INSERT INTO CUENTASB (codigo,descripcion) VALUES("BSANTAND","Banco Nacional Santander Mexicano")'); 
		tx.executeSql('INSERT INTO CUENTASB (codigo,descripcion) VALUES("BITAL","Grupo Financiero Bital")'); 		
		tx.executeSql('INSERT INTO CUENTASDEP (codigo,cuenta,descripcion) VALUES("BSANTAND","92001407761","Santander")'); 
		tx.executeSql('INSERT INTO CUENTASDEP (codigo,cuenta,descripcion) VALUES("ND","110120113112","ERNESTO ARANA")'); 
		tx.executeSql('INSERT INTO CUENTASDEP (codigo,cuenta,descripcion) VALUES("BITAL","04045430485","HSBC")'); 		
		tx.executeSql('INSERT INTO ENCHISFAC (factura,monto,cliente,pedido,fecha) VALUES ("00046441",483,"1020","F06000779","03/07/2013")');  		
		tx.executeSql('INSERT INTO DETHISFAC (factura,articulo,linea,cantidad,devuelto,precio,totlinea) VALUES ("00046441","ADE-04",0,2,0,100,140)')		
		tx.executeSql('INSERT INTO DETHISFAC (factura,articulo,linea,cantidad,devuelto,precio,totlinea) VALUES ("00046441","AGU-10",1,5,0,50,175)')		
		tx.executeSql('INSERT INTO DETHISFAC (factura,articulo,linea,cantidad,devuelto,precio,totlinea) VALUES ("00046441","AMO-19",2,6,0,38,168)')		
		tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia,direccion,telefono,tipo,diasc,lcredito,saldo) VALUES ("Farmacia UNO", "1020","Lunes","Dirección del cliente","2281545130","C","30",10000.00,2324.65)');      
        tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia,direccion,telefono,tipo,diasc,lcredito,saldo) VALUES ("Farmacia DOS", "1030","Martes","Dirección del cliente  DOS","2281545130","C","30",30000.00,20000.00)'); 
		tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia,direccion,telefono,tipo,diasc,lcredito,saldo) VALUES ("Farmacia TRES", "1040","Miercoles","Dirección del cliente","2281545130","C","30",3000.00,0.00)');        
        tx.executeSql('INSERT INTO CLIENTES (nombre,clave,dia,direccion,telefono,tipo,diasc,lcredito,saldo) VALUES ("Farmacia CUATRO", "1050","Jueves","Dirección del cliente  CUATRO","2281545130","C","30",5000.00,0.00)'); 		
		tx.executeSql('INSERT INTO PENCOBRO (tipo,documento,cliente,saldo,monto,fecha,fechaven,vencida,diasv) VALUES ("1","00041534","1020",437.55,437.55,"08/05/2013","08/06/2013","S",54)');  		       
		tx.executeSql('INSERT INTO PENCOBRO (tipo,documento,cliente,saldo,monto,fecha,fechaven,vencida,diasv) VALUES ( "1","00041535","1020",888.55,1000.55,"15/05/2013","15/06/2013","S",31)');  
		tx.executeSql('INSERT INTO PENCOBRO (tipo,documento,cliente,saldo,monto,fecha,fechaven,vencida,diasv) VALUES ( "1","00041537","1020",998.55,1000.55,"15/05/2013","15/06/2013","S",31)');        
		tx.executeSql('INSERT INTO PENCOBRO (tipo,documento,cliente,saldo,monto,fecha,fechaven,vencida,diasv) VALUES ( "1","00041536","1030",5000.00,5000.00,"08/06/2013","08/07/2013","N",24)');        
		tx.executeSql('INSERT INTO PENCOBRO (tipo,documento,cliente,saldo,monto,fecha,fechaven,vencida,diasv) VALUES ( "1","00041540","1030",5000.00,5000.00,"08/06/2013","08/07/2013","N",24)');        
		tx.executeSql('INSERT INTO PENCOBRO (tipo,documento,cliente,saldo,monto,fecha,fechaven,vencida,diasv) VALUES ( "1","00041538","1030",5000.00,5000.00,"08/06/2013","08/07/2013","N",24)');        
		tx.executeSql('INSERT INTO PENCOBRO (tipo,documento,cliente,saldo,monto,fecha,fechaven,vencida,diasv) VALUES ( "1","00041539","1030",5000.00,5000.00,"08/06/2013","08/07/2013","N",24)');        
		tx.executeSql('INSERT INTO NOTASCOB (factura,nota) VALUES ( "00041534","notas de cobranza1")');        
		tx.executeSql('INSERT INTO NOTASCOB (factura,nota) VALUES ( "00041534","notas de cobranza2")');        
		tx.executeSql('INSERT INTO NOTASCOB (factura,nota) VALUES ( "00041534","notas de cobranza3")');        
		tx.executeSql('INSERT INTO NOTASCOB (factura,nota) VALUES ( "00041534","notas de cobranza4")');        
		tx.executeSql('INSERT INTO NOTASCOB (factura,nota) VALUES ( "00041534","notas de cobranza5")');        
		tx.executeSql('INSERT INTO NOTASCOB (factura,nota) VALUES ( "00041534","notas de cobranza6")');        
		tx.executeSql('INSERT INTO NOTASCOB (factura,nota) VALUES ( "00041534","notas de cobranza7")');        
		tx.executeSql('INSERT INTO NOTASCOB (factura,nota) VALUES ( "00041534","notas de cobranza8")');        
		tx.executeSql('INSERT INTO NOTASCOB (factura,nota) VALUES ( "00041534","notas de cobranza9")');        
		tx.executeSql('INSERT INTO NOTASCOB (factura,nota) VALUES ( "00041534","notas de cobranza10")');        
		tx.executeSql('INSERT INTO NOTASCOB (factura,nota) VALUES ( "00041535","notas de cobranza1")');        
		tx.executeSql('INSERT INTO NOTASCOB (factura,nota) VALUES ( "00041535","notas de cobranza2")');        
		tx.executeSql('INSERT INTO NOTASCOB (factura,nota) VALUES ( "00041535","notas de cobranza3")');        
		tx.executeSql('INSERT INTO NOTASCOB (factura,nota) VALUES ( "00041535","notas de cobranza4")');        
		tx.executeSql('INSERT INTO NOTASCOB (factura,nota) VALUES ( "00041535","notas de cobranza5")');        
		tx.executeSql('INSERT INTO NOTASCOB (factura,nota) VALUES ( "00041535","notas de cobranza6")');        
		tx.executeSql('INSERT INTO NOTASCOB (factura,nota) VALUES ( "00041535","notas de cobranza7")');        
		tx.executeSql('INSERT INTO NOTASCOB (factura,nota) VALUES ( "00041535","notas de cobranza8")');        
		tx.executeSql('INSERT INTO NOTASCOB (factura,nota) VALUES ( "00041535","notas de cobranza9")');        
		tx.executeSql('INSERT INTO NOTASCOB (factura,nota) VALUES ( "00041535","notas de cobranza10")'); 
		/*
 		 tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento) VALUES ("ADE-04","ADEROGYL 15 SOL. C/5 AMP","OFERTA","ANTIDEA",16,100,30)'); 		  //cod_cl=clasificacion_2 de articulo (CLIE,CATA,OFER), cod_fam=clasificacion_1 de articulo (RESU)
		 tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento) VALUES ("AGU-10","AGUA OXIGENADA CON 100 ML.","CATA","ANTIGRIPAL",0,50,30)'); 
		 tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento) VALUES ("AMO-19","AMOXIL SUSP. 500 MG. C/75 ML.","OFERTA","ANTIDEA",16,40,30)'); 
		 tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento) VALUES ("AZA-02","ARTI DE PRUEBA","OFERTA","PRUEBA",16,100,40)'); 
		 */
		 tx.executeSql('INSERT INTO ARTICULO_EXISTENCIA ( articulo,bodega,existencia) VALUES ("ACA-01","K01",20)'); 
		 tx.executeSql('INSERT INTO ARTICULO_EXISTENCIA ( articulo,bodega,existencia) VALUES ("ACE-01","K01",30)'); 
		 tx.executeSql('INSERT INTO ARTICULO_EXISTENCIA ( articulo,bodega,existencia) VALUES ("ACE-02","K01",40)'); 
		 tx.executeSql('INSERT INTO ARTICULO_EXISTENCIA ( articulo,bodega,existencia) VALUES ("ACF-01","ALG",50)'); 
		 tx.executeSql('INSERT INTO ARTICULO_EXISTENCIA ( articulo,bodega,existencia) VALUES ("ACL-01","ALG",60)'); 
		 tx.executeSql('INSERT INTO SUGERIDO (cliente,articulo,cantidad) VALUES ("1020","ACA-01",5)'); 
		 tx.executeSql('INSERT INTO SUGERIDO (cliente,articulo,cantidad) VALUES ("1020","ACE-01",5)'); 
		 tx.executeSql('INSERT INTO SUGERIDO (cliente,articulo,cantidad) VALUES ("1020","ACE-02",5)'); 
		 tx.executeSql('INSERT INTO SUGERIDO (cliente,articulo,cantidad) VALUES ("1020","ACF-01",5)'); 
		 tx.executeSql('INSERT INTO SUGERIDO (cliente,articulo,cantidad) VALUES ("1030","ACL-02",5)');
		 tx.executeSql('INSERT INTO SUGERIDO (cliente,articulo,cantidad) VALUES ("1030","ACA-01",5)'); 
		 tx.executeSql('INSERT INTO SUGERIDO (cliente,articulo,cantidad) VALUES ("1030","ACE-01",30)'); 
		 tx.executeSql('INSERT INTO SUGERIDO (cliente,articulo,cantidad) VALUES ("1030","ACE-02",45)'); 
		 tx.executeSql('INSERT INTO SUGERIDO (cliente,articulo,cantidad) VALUES ("1030","ACF-01",5)');  
		 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("ACA-01","ACANOL TABS 2MG C/12","CATALOGO","ANTIDIARREICO",0,85.77,55,"SANOFI AVENTIS","LOPERAMIDA","101")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("ACE-01","ACTE HIGADO BACALAO PERL C/30","CATALOGO","SUPLEMENTO ALIMENTICIO CON VITAMINAS",0,59.8,75,"SARDEL","ACEITE DE BACALAO","101")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("ACE-02","ACTE HIGADO TIBURON PERL C/30","CATALOGO","SUPLEMENTO ALIMENTICIO CON VITAMINAS",0,59.8,75,"SARDEL","ACEITE DE TIBURON","102")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("ACF-01","AC FAST TABS 500MG C/10","CATALOGO","ANALGESICO - ANTIPIRETICO",0,34,62,"HORMONA","PARACETAMOL","ND")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("ACL-01","ACLORAL TABS 150MG C/20","PRODUCTO DE BAJA","ANTIULCEROSO",0,99,54,"LIOMONT","RANITIDINA","ND")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("ACL-02","ACLORAL INYT 50MG/2ML C/5","PRODUCTO DE BAJA","ANTIULCEROSO",0,75,54,"LIOMONT","RANITIDINA","ND")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("ADA-04","ADALAT RETARD TABS 20 MG C/ 28    ","PRODUCTO DE BAJA","ND",0,209,54,"BAYER","NIFEDEPINO","ND")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("ADK-01","A-D-KAN SOL. ING. C/3 AMP.","PRODUCTO DE BAJA","ND",0,51,62,"SONS","VITAMINA A Y D","302")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("ADR-01","ADRIBEL SOLU 150MG C/120ML","CATALOGO","MUCOLITICO - BRONCODILATADOR",0,53.9,66,"BRULUART","AMBROXOL-SALBUTAMOL","ND")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("AER-01","AEROFLUX SOLU  150MG C/120ML","PRODUCTO DE BAJA","MUCOLITICO - BRONCODILATADOR",0,245,50,"SANFER S.A. DE C.V.","AMBROXOL-SALBUTAMOL","210")'); 

tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("AFL-01","AFLUSIL SUSP 2G C/120ML","PRUEBA","ANTIINFLAMATORIO - ANALGESICO     - ANTIPIRETICO",0,66,68,"LOEFFLER","IBUPROFENO","307")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("ALB-01","ALBENDAZOL SUSP 20MG C/20ML (APOT)","CLIENTE ESPECIFICO","ANTIHELMINTICO",0,36,70,"APOTEX","ALBENDAZOL","107")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("ALC-01","ALCACHOFA CAPS C/60","CATALOGO","SUPLEMENTO ALIMENTICIO",0,185,75,"SARDEL","ALCACHOFA","101")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("ALI-01","ALIVIN PLUS ADTO INYT 300,000U/3ML C/1","CATALOGO","ANTIBACTERIANO - ANALGESICO -ANTIPIRETICO - EXPECTORANTE",0,54.03,54,"VALEANT","BENCILPENICILINA-VIT C-PIRAZOLONA-GUAYAC","201")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("ALI-02","ALIVIN PLUS INF INYT 200,000U/2ML C/1","CATALOGO","ANTIBACTERIANO - ANALGESICO -ANTIPIRETICO - EXPECTORANTE",0,46.95,54,"VALEANT","BENCILPENICILINA-VIT C-PIRAZOLONA-GUAYAC","202")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("ALO-01","ALOPURINOL TABS 300MG C/20 (APOT)","CLIENTE ESPECIFICO","ANTIGOTOSO",0,177,85,"APOTEX","ALOPURINOL","101")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("AMB-01","AMBROXOL G.I. GTS. C/30 ML. (APOT)","CLIENTE ESPECIFICO","MUCOLITICO",0,98,75,"APOTEX","AMBROXOL","101")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("AMB-02","AMBROXOL SOLU 15MG C/120ML (APOT)","CATALOGO","MUCOLITICO",0,90,75,"APOTEX","AMBROXOL","107")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("AMB-04","AMBROXOL SOLU 300MG C/120ML (FARM)","CATALOGO","MUCOLITICO",0,39,78,"FARMACOS CONTINENTALES","AMBROXOL","ND")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("AMC-02","AMCEF INYT 1GR IM 3.5 ML","OPORTUNIDAD","ANTIBACTERIANO",0,350,94,"AMSA","CEFTRIAXONA","401")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("AME-01","AMEBYL SUSP 125MG C/120ML","CATALOGO","AMEBICIDA - GIARDICIDA - TRICOMONICIDA - ANTIBACTERIANO",0,114,66,"OFFENBACH","METRONIDAZOL-DIYODOHIDROXIQUINOLEINA","107")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("AME-02","AMEBYL TABS 400MG C/20","CATALOGO","AMEBICIDA - GIARDICIDA - TRICOMONICIDA - ANTIBACTERIANO",0,216,66,"OFFENBACH","METRONIDAZOL-DIYODOHIDROXIQUINOLEINA","101")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("AMI-01","AMIKACINA INYT 500MG/2ML C/1 (AMSA)","CATALOGO","ANTIBACTERIANO",0,90,88,"AMSA","AMIKACINA","101")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("AMI-03","AMIKACINA INYT 100MG/2ML C/1 (AMSA)","CATALOGO","ANTIBACTERIANO",0,45,85,"AMSA","AMIKACINA","ND")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("AMK-01","AMK INYT 100MG/2ML C/1","CATALOGO","ANTIBACTERIANO",0,49.84,82,"PISA","AMIKACINA","ND")'); 
tx.executeSql('INSERT INTO ARTICULO (articulo,descripcion,clas,accion,impuesto,precio,descuento,laboratorio,sal,ubi) VALUES ("AMK-02","AMK INYT 500MG/2ML C/1","CATALOGO","ANTIBACTERIANO",0,151.54,88,"PISA","AMIKACINA","201")'); 


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

function eliminatempfactura(articulo,cantidad){
	   
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al eliminar renglon de tempfactura: "+err.code+err.message);
          });
				
    	function insertadet(tx) {		
		//alert('entra a delete de detallefactura');
		tx.executeSql('DELETE FROM TEMFACTURA WHERE ARTICULO="'+articulo+'" and cliente="'+window.localStorage.getItem("clave")+'"');        
		tx.executeSql('UPDATE ARTICULO_EXISTENCIA SET existencia=existencia+'+cantidad+' WHERE articulo="'+articulo+'" and bodega="K01"');
		}
	
}//function eliminatempfactura
function modificatempfactura(articulo,cantidad){
	   
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al modifica renglonen factura: "+err.code+err.message);
          },alert("Artículo modificado en factura"));
				
    	function insertadet(tx) {		
		//alert('entra a modificar detallefactura cantidad: '+cantidad);		
		if (Number(cantidad)>0){
			tx.executeSql('UPDATE TEMFACTURA SET CANTIDAD=cantidad+'+cantidad+' WHERE ARTICULO="'+articulo+'" and cliente="'+window.localStorage.getItem("clave")+'"');        
			tx.executeSql('UPDATE ARTICULO_EXISTENCIA SET existencia=existencia-'+cantidad+' WHERE articulo="'+articulo+'" and bodega="K01"');
		}
		else{
			cantidad=Number(cantidad)*-1
			//alert('cantidad menor a cero');
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
	   //alert (pedido+ruta+cliente+hora+fecha+impuesto+total+subtotal+descuento+obs+cond+bodega);
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al insertar en pedido: "+err.code+err.message);
          },function(){
			mostrarpedido();  
			obtenerconse();	
			window.localStorage.setItem("sioperacion","S");		  
			navigator.notification.alert('Pedido Guardado',null,'Preventa','Aceptar');					  
			  
		  });
				
    	function insertadet(tx) {		
		//alert('entra a modificar detallefactura cantidad: '+cantidad);		
		
			tx.executeSql('INSERT INTO ENCPEDIDO (num_ped,cod_zon,cod_clt,tip_doc,hor_fin,fec_ped,fec_des,mon_imp_vt,mon_civ,mon_siv,mon_dsc,obs_ped,estado,cod_cnd,cod_bod) VALUES("'+pedido+'","'+ruta+'","'+cliente+'","S","'+hora+'","'+fecha+'","'+fecha+'",'+impuesto+','+total+','+subtotal+','+descuento+',"'+obs+'","1",'+cond+',"'+bodega+'")'); 
			tx.executeSql('UPDATE PARAMETROS SET num_ped="'+pedido+'"');		
			limpiartemppedido()
			
		}
	
}//function guardaencpedido

function guardaencfactura(pedido,ruta,cliente,hora,fecha,impuesto,total,subtotal,descuento,obs,cond,bodega){
	   //alert (pedido+ruta+cliente+hora+fecha+impuesto+total+subtotal+descuento+obs+cond+bodega);
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al insertar en factura: "+err.code+err.message);
          },function(){
			  
			mostrarfactura();  			 
            obtenerconse();	
			window.localStorage.setItem("sioperacion","S");		  
			navigator.notification.alert('Documento Guardado',null,'Venta a Bordo','Aceptar');					
			
			  
		  });
				
    	function insertadet(tx) {		
		//alert('entra a modificar detallefactura cantidad: '+cantidad);		
		
			tx.executeSql('INSERT INTO ENCPEDIDO (num_ped,cod_zon,cod_clt,tip_doc,hor_fin,fec_ped,fec_des,mon_imp_vt,mon_civ,mon_siv,mon_dsc,obs_ped,estado,cod_cnd,cod_bod) VALUES("'+pedido+'","'+ruta+'","'+cliente+'","S","'+hora+'","'+fecha+'","'+fecha+'",'+impuesto+','+total+','+subtotal+','+descuento+',"'+obs+'","F",'+cond+',"'+bodega+'")'); 
			tx.executeSql('UPDATE PARAMETROS SET num_fac="'+pedido+'"');		
			limpiartemppedido();
			
		}
	
}//function guardaencfactura
function guardadetfactura(pedido,articulo,precio,pordescuento,totalinea,descuento,precio,cantidad){
	   //alert (pedido+articulo+precio+pordescuento+totalinea+descuento+precio+cantidad);
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al insertar en detallefactura: "+err.code+err.message);
          },alert("Detalle Factura Guardado"));
				
    	function insertadet(tx) {		
		//alert('entra a modificar detallefactura cantidad: '+cantidad);		
		
			tx.executeSql('INSERT INTO DETPEDIDO (num_ped,cod_art,mon_prc_mn,por_dsc_ap,mon_tot,mon_dsc,mon_prc_mx,cnt_max) VALUES("'+pedido+'","'+articulo+'",'+precio+','+pordescuento+','+totalinea+','+descuento+','+precio+','+cantidad+')'); 
		}
	
}//function guardadetfactura

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
function actualizatempdev(linea,cantidad,observa){
	   //alert('actualiza tempdev'+cantidad+' '+linea);
	    consultadb().transaction(insertadet,function(err){
    	  alert("Error al modificar renglon temdevolucion: "+err.code+err.message);
          });
				
    	function insertadet(tx) {		
		tx.executeSql('UPDATE TEMDEV SET cantidad='+cantidad+',obs="'+observa+'" where linea='+linea);		
		}
	
}//function actualizatempdev
function insertatempdev(articulo,linea){
	   //alert('inserttafactura'+cantidad);
	    consultadb().transaction(insertadet,function(err){
    	  alert("Error al insertar renglon temdevolucion: "+err.code+err.message);
          });
				
    	function insertadet(tx) {		
		   tx.executeSql('INSERT INTO TEMDEV (articulo,linea,cantidad,obs) VALUES ("'+articulo+'",'+linea+','+0+',"")');		
		}
	
}//function actualizatempdev
function eliminatempdev(){
	   //alert('inserttafactura'+cantidad);
	    consultadb().transaction(insertadet,function(err){
    	  alert("Error al eliminar temdevolucion: "+err.code+err.message);
          });
				
    	function insertadet(tx) {		
		//alert('entra a eliminar tempdev');
		   tx.executeSql('DELETE FROM TEMDEV ');		
		}
	
}//function eliminatempdev
function guardaencdev(devolucion,ruta,cliente,horaini,horafin,fecha,obs,renglones,subtotal,impuesto,bodega,factura){
	  //alert(devolucion+' '+ruta+' '+cliente+' '+horaini+' '+horafin+' '+fecha+' '+obs+' '+renglones+' '+subtotal+' '+impuesto+' '+bodega+' '+factura);
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al insertar encabezado devolucion: "+err.code+err.message);
          },function(){
			   obtenerconse();			  
			   window.localStorage.setItem("sioperacion","S");
			   navigator.notification.alert('Devolución Guardada',null,'Devolución','Aceptar');					
			});
				
    	function insertadet(tx) {		
		//alert('entra a modificar detallefactura cantidad: '+cantidad);		
		
			tx.executeSql('INSERT INTO ENCDEV (num_dev,cod_zon,cod_clt,hor_ini,hor_fin,fec_dev,obs_dev,num_itm,est_dev,mon_siv,mon_dsc,por_dsc_ap,mon_imp_vt,mon_imp_cs,cod_bod,impreso,num_ref) VALUES("'+devolucion+'","'+ruta+'","'+cliente+'","'+horaini+'","'+horafin+'","'+fecha+'","'+obs+'",'+renglones+',"A",'+subtotal+',0,0,'+impuesto+',0,"'+bodega+'","N","'+factura+'")'); 
   			tx.executeSql('UPDATE PARAMETROS SET num_dev="'+devolucion+'"');		
//hor_ini:fecha y hora en que inicia la devolución
//hor_fin:fecha y hora en que guarda la devolución
//fec_dev: solo fecha de devolución
//mon_siv: suma de importe total de los renglones sin aplicar iva,descuento
//mon_dsc: no aplica, lleva cero
//por_dsc_ap: no aplica, lleva cero
//mon_imp_vt:suma de iva de los renglones
//mon_imp_cs: no aplica, lleva cero
		}
	
}//function guardaencdev
function guardadetdev(devolucion,ruta,articulo,totalinea,precio,cantidad,obs,descuento,pordescuento,factura,linea){
	  //alert(devolucion+ruta+articulo+' '+totalinea+' '+precio+' '+cantidad+' '+obs+' '+descuento+' '+pordescuento);
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al insertar en DETDEV: "+err.code+err.message);
          },alert("Detalle Devolucion Guardado"));
				
    	function insertadet(tx) {		
		//alert('entra a insertadet');				
			tx.executeSql('INSERT INTO DETDEV (num_dev,cod_zon,cod_art,ind_dev,mon_tot,mon_prc_mx,mon_prc_mn,cnt_max,obs_dev,mon_dsc,por_dsc_ap) VALUES("'+devolucion+'","'+ruta+'","'+articulo+'","B",'+totalinea+','+precio+','+precio+','+cantidad+',"'+obs+'",'+descuento+','+pordescuento+')'); 
			//alert('despues de insertadet');				
			tx.executeSql('UPDATE DETHISFAC SET devuelto=devuelto+'+cantidad+' where linea='+linea+' and factura="'+factura+'"');		
			//alert('despues de actualizar dethisfac');				
			
		}
//mon_tot:total de la linea sin iva,ni descuento (precio*cantidad)
//mon_prc_mx:precio
//mon_prc_mn:precio
//cnt_max: cantidad
//mon_dsc: importe de descuento aplicado a toda la linea
//por_dsc_ap: porcentaje de descuento aplicado a la linea

}//function guardadetdev
function actexis(articulo,cantidad){
	   
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al actualizar existencia: "+err.code+err.message);
          });
				
    	function insertadet(tx) {				
			if (Number(cantidad)>0){
			tx.executeSql('UPDATE ARTICULO_EXISTENCIA SET existencia=existencia+'+cantidad+' WHERE articulo="'+articulo+'" and bodega="'+window.localStorage.getItem("bodega")+'"');
			}
			else{
			cantidad=Number(cantidad)*-1
			//alert('cantidad menor a cero');			      
			tx.executeSql('UPDATE ARTICULO_EXISTENCIA SET existencia=existencia-'+cantidad+' WHERE articulo="'+articulo+'" and bodega="'+window.localStorage.getItem("bodega")+'"');	
			}
		}	
}//function  actexis

function actualizatempcob(factura,cantidad){
	   //alert('actualiza tempcob'+factura+' '+cantidad);
	    consultadb().transaction(insertadet,function(err){
    	  alert("Error al modificar renglon TEMCOBROS: "+err.code+err.message);
          });
				
    	function insertadet(tx) {		
		tx.executeSql('UPDATE TEMCOBROS SET abonado='+cantidad+' where factura="'+factura+'"');		
		}
	
}//function actualizatempcob(factura,cantidad)

function insertarcheque(nche,ncta,banco,monto){
	   //alert('inserta cheque');
	   var cliente=window.localStorage.getItem("clave");
	   var ruta=window.localStorage.getItem("ruta");
	   var fecha=window.localStorage.getItem("fecha");
	    consultadb().transaction(insertadet,function(err){
    	  alert("Error al insertar cheque: "+err.code+err.message);
          });
				
    	function insertadet(tx) {
			var sql='INSERT INTO CHEQUES (codbanco,cliente,ruta,fecha,monto,numcheque,cuenta,recibo,tipo) VALUES("'+banco+'","'+cliente+'","'+ruta+'", ';		
				sql+='"'+fecha+'",'+monto+',"'+nche+'","'+ncta+'","99999",5)';		
				//alert(sql);
		   tx.executeSql(sql);		
		}
	
}//function insertarcheque(nche,ncta,banco,monto)
function eliminacheque(id){
	   //alert('inserttafactura'+cantidad);
	    consultadb().transaction(insertadet,function(err){
    	  alert("Error al eliminar cheque: "+err.code+err.message);
          });
				
    	function insertadet(tx) {		
		//alert('entra a eliminar cheque');
		   tx.executeSql('DELETE FROM CHEQUES where id='+id);		
		}
	
}//function eliminacheque
function eliminachequexrecibo(){
	   //alert('inserttafactura'+cantidad);
	    consultadb().transaction(insertadet,function(err){
    	  alert("Error al eliminar cheque: "+err.code+err.message);
          });
				
    	function insertadet(tx) {		
		//alert('entra a eliminar cheque');
		   tx.executeSql('DELETE FROM CHEQUES where recibo="99999"');		
		}
	
}//function eliminacheque

function guardaenccob(cliente,tipo,ruta,recibo,horaini,horafin,estado,monche,monefe,totalrecibo){
	  //alert(cliente+','+tipo+','+ruta+','+recibo+','+horaini+','+horafin+','+estado+','+monche+','+monefe+','+totalrecibo);
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al insertar encabezado de cobro: "+err.code+err.message);
          },function(){
			actsaldo(totalrecibo*-1);  
			 
			 	consultadb().transaction(actcheque,function(err){
		    	  alert("Error al actualizar recibo en cheques: "+err.code+err.message); });				
    			function actcheque(tx) {		
					//alert('entra a modificar recibo de cheque: '+recibo);				
					tx.executeSql('UPDATE CHEQUES SET recibo="'+recibo+'" where recibo="99999" and cliente="'+cliente+'"');							
					tx.executeSql('UPDATE PARAMETROS SET num_rec="'+recibo+'"');		
				}  
				obtenerconse();
				window.localStorage.setItem("sioperacion","S");
		  });
				
    	function insertadet(tx) {		
		//alert('entra a modificar detallefactura cantidad: '+cantidad);				
			tx.executeSql('INSERT INTO ENCOBROS (cliente,tipo,ruta,recibo,hor_ini,hor_fin,impreso,estado,monche,monefe,mondoc) VALUES("'+cliente+'","'+tipo+'","'+ruta+'","'+recibo+'","'+horaini+'","'+horafin+'","N","'+estado+'",'+monche+','+monefe+','+totalrecibo+')'); 
		}
	
}//function guardaenccob
function guardadetcob(cliente,tipo,tipoaso,ruta,recibo,factura,estado,monto,saldo_doc){
	  //alert(cliente+' '+tipo+' '+tipoaso+' '+ruta+' '+recibo+' '+factura+' '+estado+' '+monto+' '+saldo_doc);
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al insertar en DETCOBROS: "+err.code+err.message);
          },function(){ //actualiza el saldo en las facturas pendientes de cobro de la tabla PENCOBRO
			   //alert('entra aqui');
			   
			 consultadb().transaction(actsaldofac,function(err){
		    	  alert("Error al actualizar saldo de factura: "+err.code+err.message); });
				
    			function actsaldofac(tx) {		
					//alert('entra a modificar saldo de factura: '+saldo_doc);				
					tx.executeSql('UPDATE PENCOBRO SET saldo='+saldo_doc+' where documento="'+factura+'"');		
				}  			  
		  });
				
    	function insertadet(tx) {		
		//alert('entra a insertadet');				
			tx.executeSql('INSERT INTO DETCOBROS (cliente,tipo,tipoaso,ruta,recibo,docafectado,estado,monto,saldo_doc) VALUES("'+cliente+'","'+tipo+'","'+tipoaso+'","'+ruta+'","'+recibo+'","'+factura+'","'+estado+'",'+monto+','+saldo_doc+')'); 
			//alert('despues de insertadet');				
			
		}

}//function guardadetcob
function guardadetdep(monche,monefe,deposito,recibo){
	  //alert(monche+' '+monefe+' '+deposito+' '+recibo);
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al insertar en DETDEP: "+err.code+err.message);
          },function(){ //actualiza el saldo en las facturas pendientes de cobro de la tabla PENCOBRO
			   //alert('entra aqui');
			   
			 consultadb().transaction(actsaldofac,function(err){
		    	  alert("Error al actualizar recibo: "+err.code+err.message); });
				
    			function actsaldofac(tx) {		
					//alert('entra a modificar saldo de factura: '+saldo_doc);				
					tx.executeSql('UPDATE ENCOBROS SET depositado="S" where recibo="'+recibo+'"');		
				}  			  
		  });
				
    	function insertadet(tx) {		
		//alert('entra a insertadet');				
			tx.executeSql('INSERT INTO DETDEP (monche,monefe,deposito,recibo) VALUES('+monche+','+monefe+',"'+deposito+'","'+recibo+'")'); 
						
			//alert('despues de insertadet');							
		}

}//function guardadetdep
function guardaencdep(codigo,cuenta,deposito,fecha,monto,obs){
	  //alert(cliente+' '+tipo+' '+tipoaso+' '+ruta+' '+recibo+' '+factura+' '+estado+' '+monto+' '+saldo_doc);
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al insertar en ENCDEP: "+err.code+err.message);
          });
				
    	function insertadet(tx) {		
		//alert('entra a insertadet');				
			tx.executeSql('INSERT INTO ENCDEP (codigo,cuenta,deposito,fec_dep,mon_dep,obs) VALUES("'+codigo+'","'+cuenta+'","'+deposito+'","'+fecha+'",'+monto+',"'+obs+'")'); 
			
			//alert('despues de insertadet');				

							/*	 tx.executeSql('CREATE TABLE IF NOT EXISTS ENCDEP (id INTEGER PRIMARY KEY AUTOINCREMENT, codigo,cuenta,deposito,doc_pro,fec_dep,mon_dep,obs)'); 
		  tx.executeSql('CREATE TABLE IF NOT EXISTS DETDEP (id INTEGER PRIMARY KEY AUTOINCREMENT, monche,monefe,deposito,recibo,obs)'); 
		  */
		}

}//function guardaencdep
function guardavisita(cliente,visitaini,visitafin,visitaini,notas,razon,ruta){
	  //alert(cliente+' '+tipo+' '+tipoaso+' '+ruta+' '+recibo+' '+factura+' '+estado+' '+monto+' '+saldo_doc);
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al insertar en VISITA: "+err.code+err.message);
          });
				
    	function insertadet(tx) {		
		//alert('entra a insertadet');				
			tx.executeSql('INSERT INTO VISITA (cliente,fecha_plan,fin,inicio,notas,razon,ruta) VALUES("'+cliente+'","'+visitaini+'","'+visitafin+'","'+visitaini+'","'+notas+'","'+razon+'","'+ruta+'")'); 
		}
 
}//function guardavisita

function f1_1(){
	  alert('entra a funcion f1_1');
	consultadb().transaction(insertadet,function(err){
    	  alert("Error al insertar en DETDEV: "+err.code+err.message);
          },alert("ok de consultadb().transaction f1_1"));
				
    	function insertadet(tx) {		
		alert('entra a insertadet de f1_1');				
		}

}//function f1_1
