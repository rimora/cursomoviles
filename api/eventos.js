// EVENTOS
$(document).ready(function() {
	//document.addEventListener("deviceready",function(){
	/*	var db = window.openDatabase("Sardel", "1.0", "SardelDB", 1000000);
    $('#clientes').click(function() {
		db.transaction(consulta,errorconsulta,listo);
		
	
	});*/
	
	function populateDB(tx) {
     tx.executeSql('DROP TABLE IF EXISTS DEMO');
     tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
     tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
     tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
}

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function successCB() {
    alert("success!");
}

var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
db.transaction(populateDB, errorCB, successCB);
	
		
	
	
$("li").click(function() {
                 var oID = $(this).attr("id");
				  //alert (oID);
				  $.mobile.changePage($("#datoscli"));
				  
				  
				  
               });

$('#datoscli').live('pageshow',function(event, ui){

//alert('This page was just hidden: '+ ui.prevPage);
$("#nomcli").text("Nombre:   hola2");
$("#salcli").text("Saldo:    $1000.00");
$("#dircli").text("Dirección:dirección del cliente");
inicia;
});



});

