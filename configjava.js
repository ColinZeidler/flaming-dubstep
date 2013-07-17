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

   passData.innerHTML = "<table> <tr><td>Name:</td><td><input type = text name = " + passport+"Name value = " + passport + "></td></tr> <tr><td>IP:</td><td><input type  = text name = "+ passport +"IP value = \"" + pp[passport].ip + "\"></td></tr></table>";
   PassDiv.appendChild(passData);
  }
 }

 var sys = jsonFile.Systems;
 var SysDiv = document.getElementById('Systems');
 for (var system in sys) { //reads the properies of all the systems
  if (sys.hasOwnProperty(system)) {
   var sysData = document.createElement('div');
   sysData.className = "system";

   sysData.innerHTML = "<table><tr><td>Name:</td><td><input type = text name = system1 value = " +sys[system].name+ "></td></tr><tr><td>IP:</td><td><input type = text name = sysIp1 value = " +sys[system].ip+ "></td></tr><tr><td>Passport:</td><td><input type = text name = sysPP1 value = " + sys[system].passport+ "></td></tr><tr><td>Port:</td><td><input type = number name = sysPort1 value = " + sys[system].port+ "></td></tr></table>";
   console.info(system);
   SysDiv.appendChild(sysData);
  }
 }
}
