// JavaScript Document
function disp(){
  var array= new Array();
  var array2=	new Array('hola',2,5,'adios');
  var array3= [];
  array3['name']=device.name;
  array3['phoengap']=device.cordova;
  array3['platform']=device.platform;
  array3['id']=device.uuid;
  array3['model']=device.model;
  array3['version']=device.version;
  	return array3;
}