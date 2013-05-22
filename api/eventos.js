// EVENTOS
$(document).ready(function() {
	//document.addEventListener("deviceready",function(){
	/*	var db = window.openDatabase("Sardel", "1.0", "SardelDB", 1000000);
    $('#clientes').click(function() {
		db.transaction(consulta,errorconsulta,listo);
		
	
	});*/
	
	


		
	
	
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
var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
db.transaction(consulta, errorconsulta, listo);
	
});



});

