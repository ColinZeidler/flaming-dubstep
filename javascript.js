var systemName = '';

function ready() {
	systemName = '';
	loadSysName();
	getStats(true);
}
function loadSysName() {
	var element = document.getElementById("systemSelector");
	systemName = element.options[element.selectedIndex].value;
	document.title = systemName;
	loadSysInfo();
	getStats(false);
	getBuild()
}
function getStats(multi) {
	var xmlhttp = new XMLHttpRequest();
	console.log("getStats called");

	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById("statsContent").innerHTML = xmlhttp.responseText;
			if (multi) {
				setTimeout('getStats(true)', 2000);
			}
		}
	}
	xmlhttp.open('GET', 'stats.php?system='+systemName);
	xmlhttp.send();
}
function getBuild() {
	var xmlhttp = new XMLHttpRequest();
	console.log("getBuild called");

	xmlhttp.onreadystatechange=function() {
		 console.log("get build readystatechanged");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log("getbuild State and status good");
			document.getElementById("buildInfo").innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.open('GET', 'getBuild.php?system='+systemName);
	xmlhttp.send();
}
function sysDropDown() {
	var tab=document.getElementById('sysDropDown');
	if (tab.clientHeight == 20) {
		tab.style.height = "150px";
		tab.style.width = "320px";
	} else {
		tab.style.height = "20px";
		tab.style.width = "90px";
	}
}
function loadSysInfo() {
	var xmlhttp = new XMLHttpRequest();
	console.log("loadSysInfo called");

	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById("systemInfo").innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.open('GET', 'getInfo.php?system='+systemName);
	xmlhttp.send();
	document.getElementById('systemInfo').innerHTML = "<img src=\"images/Loading.gif\" height=\"20\"/>";
}
function resize() {
	var stats = document.getElementById('stats');
	var img = document.getElementById('statButton');
	if (img.innerHTML.indexOf("expand") !== -1) {
		stats.style.left = "10px";
		img.innerHTML = "<img src=images/shrink.png width=36 />";
	} else {
		stats.style.left = "435px";
		img.innerHTML = "<img src=images/expand.png width=36 />";
	}
}
