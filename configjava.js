var jsonFile;

function loadData() {
 var http_r = new XMLHttpRequest();
 
 http_r.onreadystatechange = function() {
  if (http_r.readyState == 4) {
   jsonFile = JSON.parse(http_r.responseText);
   readData();
  }
 }
 var time = new Date().getTime(); //add time to prevent caching
 http_r.open("GET", 'systems.json?t='+ time, true);
 http_r.send();
}

function readData() {
 var pp = jsonFile.Passports;
 var PassDiv = document.getElementById('Passports')
 for (var passport in pp) { //reads the passport names and ips
  if (pp.hasOwnProperty(passport)) {
   var passData = document.createElement('div');
   passData.className = "passport";

   passData.innerHTML = "<table><tr><td>Name:</td><td><input type = text name = name value = " + passport + "></td></tr><tr><td>IP:</td><td><input type  = text name = ip value = \"" + pp[passport].ip + "\"></td></tr></table>";
   PassDiv.appendChild(passData);
  }
 }

 var sys = jsonFile.Systems;
 var SysDiv = document.getElementById('Systems');
 for (var system in sys) { //reads the properies of all the systems
  if (sys.hasOwnProperty(system)) {
   var sysData = document.createElement('div');
   sysData.className = "system";

   sysData.innerHTML = "<table><tr><td>Name:</td><td><input type = text name = name value = " +sys[system].name+ "></td></tr><tr><td>IP:</td><td><input type = text name = ip value = " +sys[system].ip+ "></td></tr><tr><td>Passport:</td><td><input type = text name = passport value = " + sys[system].passport+ "></td></tr><tr><td>Port:</td><td><input type = number name = port value = " + sys[system].port+ "></td></tr></table>";
//   console.info(system);
   SysDiv.appendChild(sysData);
  }
 }
}

function submit() {
 var PassChildren = document.getElementById('Passports').childNodes;
 var SysChildren = document.getElementById('Systems').childNodes;

 var data = '{"Systems" : {';
 
 for (var i = 0; i < SysChildren.length; i++) { //iterates over each system
  if (SysChildren[i].className == "system") { 
   //             system class   table         table body    table rows    
   var rows = SysChildren[i].childNodes[0].childNodes[0].childNodes;
   if (i !== 1) {
    data = data + ',';
   }
   for (var a = 0; a < rows.length; a++) { //iterates over the inputs for each system
    //console.info(rows[a].childNodes[1].childNodes[0].name);
    var input = rows[a].childNodes[1].childNodes[0]; //use .name and .value
    if (input.name == "name") {
     data = data + '"' + input.value + '" : {';
    }
    data = data + '"' + input.name + '" : "' + input.value + '",';
   }
   data = data + ' }';
  }
 }
 //data = data + ' }}';
 data = data + '}, "Passports" : {';

 for (var i = 0; i < PassChildren.length; i++) { //iterates over each system
  if (PassChildren[i].className == "passport") { 
   //             system class   table         table body    table rows    
   var rows = PassChildren[i].childNodes[0].childNodes[0].childNodes;
   for (var a = 0; a < rows.length; a++) { //iterates over the inputs for each system
    var input = rows[a].childNodes[1].childNodes[0]; //use .name and .value
    if (input.name == "name") {
     data = data + '"' + input.value +'" : {';
    } else {
     data = data + '"' + input.name + '" : "' + input.value + '",';
    }
   }
   data = data + '},';
  }
 }
 
 data = data + '}}';

 //encoding the data into valid json
 var json = JSON.stringify(eval("(" + data + ")"));
 json = 'json=' + json;

 //creating a post request to send data to server
 var http_r = new XMLHttpRequest();
 http_r.onreadystatechange = function() {  //handle server response
  if (http_r.readyState == 4) {
   alert(http_r.responseText);
  }
 }
 http_r.open("POST", "jsonWrite.php", true);
 http_r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 http_r.send(json);

}
