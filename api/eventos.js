// EVENTOS
$(document).ready(function() {
	//document.addEventListener("deviceready",function(){
	/*	var db = window.openDatabase("Sardel", "1.0", "SardelDB", 1000000);
    $('#clientes').click(function() {
		db.transaction(consulta,errorconsulta,listo);
		
	
	});*/
	$('#formulario').submit(function() { 
			 	// recolecta los valores que inserto el usuario	
				var Usuario = $("#nombredeusuario").val()	
				var Pass = $("#clave").val()	  	
				if(Usuario == "r1"){
					$.mobile.changePage("#page")
		  		}else{		  		  
				alert('Usuario No Válio');
				}  	
	});
	
	$("#carga").click(function() {
                 //var clavecli = $(this).attr("id");
				  //alert (oID);
				  iniciar();
				  //$.mobile.changePage($("#datoscli"));	  			  				  
               });
     $("#envia").click(function() {
                 //var clavecli = $(this).attr("id");
				  //alert (oID);
				  insertar();
				  //$.mobile.changePage($("#datoscli"));	  			  				  
               });			   
			  
	$("#clientes").click(function() {
                 //var clavecli = $(this).attr("id");
				  //alert (oID);				  
                  
				  mostrarclientes("Lunes");
				  $("select#menu").val("Lunes").selectmenu("refresh");
				  //$.mobile.changePage($("#datoscli"));	  			  				  
               });
    $("#menu").bind("change",function(event,ui){
		//alert($("#menu").val());
	    mostrarclientes($("#menu").val());	
		
	});
		
    $("li").bind("click",function(event,ui) {
                  var clavecli = $(this).attr("id");
				  alert (clavecli);
				  mostrarcliente(clavecli);
				  //$.mobile.changePage($("#datoscli"));	  			  				  
               });
});
			   
			   


