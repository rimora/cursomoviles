// almacenamiento de datos locales
function saveidcliente(clave){
	window.localStorage.setItem("clave",clave);
	//alert (window.localStorage.getItem("clave"));
	
	
}
function guardaarticulo(articulo){
	window.localStorage.setItem("articulo",articulo);
	//alert (window.localStorage.getItem("clave"));
}
function actsaldo(importe){
	//alert(importe);
	var saldoact=Number(window.localStorage.getItem("saldo"))+Number(importe);
	//alert(saldoact);
	window.localStorage.setItem("saldo",saldoact);
	actsaldocliente(saldoact)
	//alert (window.localStorage.getItem("clave"));
}
function tempdetalle(cantidad){	
	//alert(cantidad);	
	alert (window.localStorage.getItem("articulo"));	
}