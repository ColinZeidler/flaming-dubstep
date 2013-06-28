var systemName = '';
var systemCount = 1;
function ready() {
	systemName = '';
	loadSysName(document.getElementById('systemSelector'));
	//getStats(true);
}
function loadSysName(obj) {
	var element = obj;
	systemName = element.options[element.selectedIndex].value;
	loadSysInfo();
	getStats(false, obj.parentNode);
	getBuild(obj.parentNode)
}
function getStats(multi, obj) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var children = obj.childNodes;
			for (var i = 0; i < children.length; i++) {
				if (children[i].id == "statsContent") {
					children[i].innerHTML = xmlhttp.responseText;
					break;
				}
			}
			if (multi) {
				setTimeout('getStats(true)', 2000);
			}
		}
	}
	xmlhttp.open('GET', 'stats.php?system='+systemName);
	xmlhttp.send();
}
function getBuild(obj) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var children = obj.childNodes;
			for (var i = 0; i < children.length; i++) {
				if (children[i].id == "buildInfo") {
					children[i].innerHTML = xmlhttp.responseText;
					break;
				}
			}
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

	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById("systemInfo").innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.open('GET', 'getInfo.php?system='+systemName);
	xmlhttp.send();
	document.getElementById('systemInfo').innerHTML = "<img src=\"images/Loading.gif\" height=\"20\"/>";
}
function resize(obj) {
	var stats = obj.parentNode;
	var img = obj;
	if (img.innerHTML.indexOf("expand") !== -1) {
		stats.style.left = "10px";
		img.innerHTML = "<img src=images/shrink.png width=36 />";
	} else {
		stats.style.left = "435px";
		img.innerHTML = "<img src=images/expand.png width=36 />";
	}
}
function newSystem() {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var master = document.getElementById("multiStat");
			var newContent = document.createElement('div');
			newContent.className = 'stats';
			newContent.innerHTML = xmlhttp.responseText;
			master.appendChild(newContent);
			
			systemCount += 1;

			var children = master.childNodes;
			var left = 10;
			var width = window.innerWidth;
			var diff = width / systemCount;
			var n = 0;
			for (var i = 0; i < children.length; i++) {
				console.info(children[i]);
				if (children[i].className == 'stats') {
				console.info(width + ", " + diff);
				console.info(left + (n*diff));
				children[i].style.left = left + (n*diff) + "px";
				children[i].style.width =diff - 25 + "px";
				n++;
				}
			}
		}
	}
	xmlhttp.open('GET', 'addStat.php');
	xmlhttp.send();
}
