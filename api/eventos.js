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

function consulta(tx) {
     tx.executeSql('DROP TABLE IF EXISTS DEMO');
      tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Club TEXT NOT NULL)');        
	  tx.executeSql('INSERT INTO DEMO(Name,Club) VALUES ("Alexandre Pato", "AC Milan")');        
	  tx.executeSql('INSERT INTO DEMO(Name,Club) VALUES ("Van Persie", "Arsenal")');
}

function errorconsulta(err) {
    alert("Error processing SQL: "+err);
}

function listo() {
    alert("success!");
	db.transaction(queryDB,errorconsulta);
	 alert("PASO");
}
function queryDB(tx){        
	tx.executeSql('SELECT * FROM DEMO',[],querySuccess,errorconsulta);    
	alert("entro a queryDB");
	}
function querySuccess(tx,results){  
 $('#catalogo').empty();        
$.each(result.rows,function(index){           
 var row = result.rows.item(index);            
 $('#catalogo').append('<li><a href="#"><h3>'+row['Name']+'</h3><p>Club '+row['Club']+'</p></a></li>');        
 });         
 $('#catalogo').listview('refresh'); 
 }

	
});


});

