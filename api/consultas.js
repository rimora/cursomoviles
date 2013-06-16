// consultas
function mostrarclientes(dia){
 // $('#pclientes').live('pageshow',function(event, ui){
		//alert('This page was just hidden: '+ ui.prevPage);		
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 1000000);
		consultadb().transaction(poblarcli, function(err){
    	 		 alert("Error select clientes : "+err.code+err.message);
         		});		
	function poblarcli(tx){  
	    
	    if (dia!="Todos"){
			var sql='SELECT * FROM CLIENTES WHERE DIA="'+dia+'" ORDER BY nombre  '			
		}
		else {
			var sql='SELECT * FROM CLIENTES ORDER BY nombre'			
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

 // });	//$('#pclientes').live('pageshow',function(event, ui){
	
}
function mostrarcliente(clavecli){
//  $('#datoscli').live('pageshow',function(event, ui){
   	   window.localStorage.clear();
	   //guarda el cliente con el que se harán operaciones
	   saveidcliente(clavecli);

		$('#notascxc').text("Notas para el cliente " + clavecli);
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 200000);
		consultadb().transaction(consulta, errorconsulta);	
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
			  var vencida="";
			  alert(saldot);
			  html += "<div class=ui-block-a><div class=ui-bar ui-bar-a><strong></strong> Tipo</div></div>";
			  html += "<div class=ui-block-b><strong></strong> Documento</div>";
			  html += "<div class=ui-block-c><strong></strong> Vencimiento</div>";
			  html += "<div class=ui-block-d><strong></strong> Saldo</div>";
			  html += "<div class=ui-block-e><strong></strong> Monto</div>";
			  $.each(results.rows,function(index){
				  var row = results.rows.item(index); 				     
				     if (row['cod_tip_dc']=="1"){
						 tipo="FAC"
					 }
					 else  {
						 tipo="OTRO" 
					 }
					 if (row['vencida']=="S"){
						 vencida="S"
						 
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
					$("#saldocli").val(saldot); 
					$("#montocli").val(montot); 
					if (vencida=="S"){
						alert('El cliente tiene facturas vencidas, no podrá');
						
					}
					alert(saldot);
	   }
 		
	function errorconsulta(err) {
    	alert("Error SQL al poblar cliente: "+err.code+err.message);
	}
//  });	

  }//mostrarcliente

function llamadascxc(){	
  alert ('depositos');
    $.get("demo_test.asp",function(data,status){
     // alert("Data: " + data + "\nStatus: " + status);
    });
  

}
function preparadetalletemp(articulo,cantidad){
	   var precio=100.00;
	   var descuento=10.00;
	   var total=cantidad*precio;
	   var descontado=(descuento/100)*total;

	
	insertatemppedido(articulo,cantidad);
	
	
}//function insertatemppedido
function mostrarpedido(){
	//muestra en un collapsible los renglones temporales de pedido, agregandolos en un grid
	//el usuario podrá eliminar los renglones que se selecciones por medio de checkbox
//  $('#datoscli').live('pageshow',function(event, ui){   	   
		//alert('entra mostrar pedido');
		//var db = window.openDatabase("Database", "1.0", "SARDEL", 200000);
		consultadb().transaction(consulta, errorconsulta);	
	function consulta(tx) {
		tx.executeSql('SELECT a.articulo,b.descripcion,b.precio,b.descuento,a.cantidad FROM TEMPEDIDO a left outer join articulo b on b.articulo=a.articulo',[],exito,errorconsulta);
		}
	
		
		function exito(tx,results){ 
		      $("#gridpedido").empty();			  
			  var html = "";
			  var tipo="";
			  var saldot=0;
			  var montot=0;			  
		      var precio=0;
	    	  var total=0;              
			  //agrega encabezado de grid
			  html+=' <div class="ui-block-a" style="width:70px;height:20px" > ';            
              html+=' <div class="ui-bar ui-bar-a">Elim.</div></div> ';           
              html+=' <div class="ui-block-b"><div class="ui-bar ui-bar-a">Articulo</div></div>';
              html+=' <div class="ui-block-c"><div class="ui-bar ui-bar-a">Descrip.</div></div>';
              html+=' <div class="ui-block-d"><div class="ui-bar ui-bar-a">Cantidad</div></div>';
              html+=' <div class="ui-block-e"><div class="ui-bar ui-bar-a">Precio</div></div>';
          
			  $.each(results.rows,function(index){
				  var row = results.rows.item(index); 				     			     
				     descuento=(row['precio']/100)*row['descuento'];
				     precio=row['precio']-descuento;				 
					 total+=precio*row['cantidad']
					 					 
					html+='<div class="ui-block-a" style="width:70px;height:20px" >';              
           			html+='<div class="ui-bar ui-bar-e"  >';      		 		
                   	html+='<div style="padding:0px; margin-top:-8px; margin-left:-10px">'; 
			        html+='     <label for="P'+row['articulo']+'" >&nbsp</label>';  
            		html+='     <input type="checkbox" id="P'+row['articulo']+'" name="'+row['articulo']+'" />';
                   	html+='		</div>';	
		            html+='   </div>';
            		html+='</div>';            
                    html+='<div class="ui-block-b"><div class="ui-bar ui-bar-b">'+row['articulo']+'</div></div>';
                    html+='<div class="ui-block-c"><div class="ui-bar ui-bar-b">'+row['descripcion']+'</div></div>';
                    html+='<div class="ui-block-d"><div class="ui-bar ui-bar-b">'+row['cantidad']+'</div></div>';
	                html+='<div class="ui-block-e"><div class="ui-bar ui-bar-b">'+precio+'</div></div> ';

                  	 
			  });//.each
					$("#gridpedido").append(html); 
					$("#tpedido").value(total); 			
					
					alert(total);
	   }//function exito
 		
	function errorconsulta(err) {
    	alert("Error SQL al poblar cliente: "+err.code+err.message);
	}
//  });	

  }//mostrarcliente