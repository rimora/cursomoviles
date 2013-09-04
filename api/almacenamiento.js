// almacenamiento de datos locales
function saveidcliente(clave){
	window.localStorage.setItem("clave",clave);		
}
function guardaclientenombre(cadena){
	window.localStorage.setItem("clavenombre",cadena);		
}
function guardaarticulo(articulo){
	window.localStorage.setItem("articulo",articulo);
	//alert (window.localStorage.getItem("clave"));
}
function guardafactura(factura){
	window.localStorage.setItem("factura",factura);
	//alert (window.localStorage.getItem("clave"));
}
function actsaldo(importe){
	//alert(importe);
	var saldoact=Number(window.localStorage.getItem("saldo"))+Number(importe);
	//alert(saldoact);
	window.localStorage.setItem("saldo",saldoact);
	actsaldocliente(saldoact);//actualiza el saldo del cliente en la tabla clientes
	//alert (window.localStorage.getItem("clave"));
}
function guardafechaactual(){
var fecha = new Date();
var fechaact=fecha.getFullYear()+"-"+rellenar((fecha.getMonth()+1),2)+"-"+fecha.getDate();
var hora=fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
var fechaactual=fechaact+" "+hora;	
//+"\nMilisegundo: "+fecha.getMilliseconds());
window.localStorage.setItem("fechahora",fechaactual);
window.localStorage.setItem("fecha",fechaact);
}
function iniciavisita(){
var fecha = new Date();
var fechaact=fecha.getFullYear()+"/"+(fecha.getMonth()+1)+"/"+fecha.getDate();
var hora=fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
var fechaactual=fechaact+" "+hora;	
window.localStorage.setItem("visitaini",fechaactual);
}
function guardasaldofac(saldo){
	window.localStorage.setItem("saldofac",saldo);
}
function guardaabono(abono){
	window.localStorage.setItem("abono",abono);
}
function guardaefectivo(efectivo){	
	window.localStorage.setItem("efectivo",efectivo);
}
function guardacheque(cheque){
	window.localStorage.setItem("cheque",cheque);
}
function guardapendiente(pendiente){
	window.localStorage.setItem("pendiente",pendiente);
}
function guardatotalventa(total){
	window.localStorage.setItem("totalv",total);
}
function guardadispventa(disp){
	window.localStorage.setItem("dispv",disp);
}
function guardasivencida(cadena){
	window.localStorage.setItem("vencida",cadena);
}
function guardatotaldev(total){
	window.localStorage.setItem("totaldev",total);
}
function guardadiasfactura(dias){
	window.localStorage.setItem("diasfac",dias);
}
function guardadepositoefe(importe){
	window.localStorage.setItem("depositoefe",importe);
}
function guardadepositoche(importe){
	window.localStorage.setItem("depositoche",importe);
}
function guardadepositocheotros(importe){
	window.localStorage.setItem("depositocheotros",importe);
}




function tomarfotopros(){
	
// capture callback

navigator.device.capture.captureImage(function(mediaFiles){
	
    path = mediaFiles[0].fullPath;
	$('#fotopros').append('<img src="'+path+'" width="50%" />').attr('rel',path);
        // do something interesting with the file
    
	
	
	},function(error){
// capture error callback
    navigator.notification.alert('Error al tomar foto: ' + error.code, null, 'Error al capturar foto');
}, {limit:1});

}

function tomarfotoife(){
	
// capture callback

navigator.device.capture.captureImage(function(mediaFiles){
	
    path = mediaFiles[0].fullPath;
	$('#fotoife').append('<img src="'+path+'" width="50%" />').attr('rel',path);
        // do something interesting with the file
    
	
	
	},function(error){
// capture error callback
    navigator.notification.alert('Error al tomar foto: ' + error.code, null, 'Error al capturar foto');
}, {limit:1});

}
function tomarfotoneg(){
	
// capture callback

navigator.device.capture.captureImage(function(mediaFiles){
	
    path = mediaFiles[0].fullPath;
	$('#fotoneg').append('<img src="'+path+'" width="50%" />').attr('rel',path);
        // do something interesting with the file
    
	
	
	},function(error){
// capture error callback
    navigator.notification.alert('Error al tomar foto: ' + error.code, null, 'Error al capturar foto');
}, {limit:1});

}
function tempdetalle(cantidad){	
	//alert(cantidad);	
	alert (window.localStorage.getItem("articulo"));	
}