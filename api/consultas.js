// consultas


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
}
function queryDB(tx){        
	tx.executeSql('SELECT * FROM DEMO',[],querySuccess,errorCB);    }
function querySuccess(tx,results){  
 var row = results.rows.item(0);  
$("#nomcli").text("Nombre:   hola2"+row['Name']);
$("#salcli").text("Saldo:    $1000.00"+row['Club']);


 }