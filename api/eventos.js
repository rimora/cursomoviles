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

var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
db.transaction(consulta, errorconsulta, listo);
	
});

function consulta(tx) {
     tx.executeSql('DROP TABLE IF EXISTS DEMO');
      tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Club TEXT NOT NULL)');        
	  tx.executeSql('INSERT INTO DEMO(Name,Club) VALUES ("Alexandre Pato", "AC Milan")');        
	  tx.executeSql('INSERT INTO DEMO(Name,Club) VALUES ("Van Persie", "Arsenal")');
}

function errorconsulta(err) {
    alert("Error processing SQL: "+err);
}

function listo(db) {
    alert("success!");
	db.transaction(queryDB,errorconsulta);
}
function queryDB(tx){        
	tx.executeSql('SELECT * FROM DEMO',[],querySuccess,errorCB);    }
function querySuccess(tx,results){  
 var row = results.rows.item(0);  
  alert(row['Name']);
$("#nomcli").text("Nombre:   hola2"+row['Name']);
$("#salcli").text("Saldo:    $1000.00"+row['Club']);
	

 }

});

