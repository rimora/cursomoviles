//Almacenamiento
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
function accesobd(){
	var db = window.openDatabase("Hotel", "1.0", "Hotel DB", 1000000);
    return db;
	
}
function reservaInt(t,p,h,d){
	var f=new Date();
	var fecha=f.getDate()+'/'+ (f.getMonth()+1)+'/'+ f.getYear() + f.getFullYear();
	
	
	accesobd().transaction(function(tx){

     tx.executeSql('DROP TABLE IF EXISTS DEMO');
     tx.executeSql('CREATE TABLE IF NOT EXISTS reservaciones (id unique, tipohabitacion,personas,habitaciones,dias)');
     tx.executeSql('INSERT INTO reservaciones (tipohabitacion,personas,habitaciones,dias) VALUES ("'+t+'","'+p+'","'+h+'","'+d+'")');
 tx.executeSql('CREATE TABLE IF NOT EXISTS historial (id unique, tipohabitacion,personas,habitaciones,dias,fecha)');
      tx.executeSql('INSERT INTO historial (tipohabitacion,personas,habitaciones,dias,fecha) VALUES ("'+t+'","'+p+'","'+h+'","'+d+'","'+fecha+'")');

	},function(err){
		alert(error.code);
		
	},function(err){
		alert(error.code);
	});

	function errorCB(err) {
    alert("Error processing SQL: "+err);
	}

	function successCB() {
    	navigator.notification.alert('esperando conexion a internet',function(){
		window.location.href="#page";
		
		
		},"datos guardados","Aceptar");
	}


	
}