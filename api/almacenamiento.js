// almacenamiento de datos locales
function saveidcliente(clave){
	window.localStorage.setItem("clave",clave);
	//alert (window.localStorage.getItem("clave"));
	
	
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
var fechaact=fecha.getFullYear()+"/"+(fecha.getMonth()+1)+"/"+fecha.getDate();
var hora=fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
var fechaactual=fechaact+" "+hora;	
//+"\nMilisegundo: "+fecha.getMilliseconds());
window.localStorage.setItem("fechahora",fechaactual);
window.localStorage.setItem("fecha",fechaact);
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




function tempdetalle(cantidad){	
	//alert(cantidad);	
	alert (window.localStorage.getItem("articulo"));	
}