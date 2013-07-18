var jsonFile;

function loadData() {
 var http_r = new XMLHttpRequest();
 
 http_r.onreadystatechange = function() {
  if (http_r.readyState == 4) {
   jsonFile = JSON.parse(http_r.responseText);
   readData();
  }
 }
 http_r.open("GET", 'systems.json', true);
 http_r.send();
}

function readData() {
 var pp = jsonFile.Passports;
 var PassDiv = document.getElementById('Passports')
 for (var passport in pp) { //reads the passport names and ips
  if (pp.hasOwnProperty(passport)) {
   var passData = document.createElement('div');
   passData.className = "passport";

   passData.innerHTML = "<table><tr><td>Name:</td><td><input type = text name = ppName value = " + passport + "></td></tr><tr><td>IP:</td><td><input type  = text name = ppIP value = \"" + pp[passport].ip + "\"></td></tr></table>";
   PassDiv.appendChild(passData);
  }
 }

 var sys = jsonFile.Systems;
 var SysDiv = document.getElementById('Systems');
 for (var system in sys) { //reads the properies of all the systems
  if (sys.hasOwnProperty(system)) {
   var sysData = document.createElement('div');
   sysData.className = "system";

   sysData.innerHTML = "<table><tr><td>Name:</td><td><input type = text name = system value = " +sys[system].name+ "></td></tr><tr><td>IP:</td><td><input type = text name = sysIp value = " +sys[system].ip+ "></td></tr><tr><td>Passport:</td><td><input type = text name = sysPP value = " + sys[system].passport+ "></td></tr><tr><td>Port:</td><td><input type = number name = sysPort value = " + sys[system].port+ "></td></tr></table>";
//   console.info(system);
   SysDiv.appendChild(sysData);
  }
 }
}

function submit() {
 var PassChildren = document.getElementById('Passports').childNodes;
 var SysChildren = document.getElementById('Systems').childNodes;
 
 for (var i = 0; i < SysChildren.length; i++) { //iterates over each system
//  console.info(SysChildren[i]);
  if (SysChildren[i].className == "system") { 
   //             system class   table         table body    table rows    
   //console.info(SysChildren[i].childNodes[0].childNodes[0].childNodes);
   var rows = SysChildren[i].childNodes[0].childNodes[0].childNodes;
   for (var a = 0; a < rows.length; a++) { //iterates over the inputs for each system
    //console.info(rows[a].childNodes[1].childNodes[0].name);
    var input = rows[a].childNodes[1].childNodes[0]; //use .name and .value
   }
  }
 }

 for (var i = 0; i < PassChildren.length; i++) { //iterates over each system
//  console.info(SysChildren[i]);
  if (PassChildren[i].className == "passport") { 
   //             system class   table         table body    table rows    
   //console.info(PassChildren[i].childNodes[0].childNodes[0].childNodes);
   var rows = PassChildren[i].childNodes[0].childNodes[0].childNodes;
   for (var a = 0; a < rows.length; a++) { //iterates over the inputs for each system
    //console.info(rows[a].childNodes[1].childNodes[0].name);
    //console.info(rows[a].childNodes[1].childNodes[0].value);
    var input = rows[a].childNodes[1].childNodes[0]; //use .name and .value
   }
  }
 }

}
