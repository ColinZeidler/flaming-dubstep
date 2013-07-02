var systemCount = 1;
var expandedL = '';
var expandedW = '';
function ready() {
	systemName = '';
	loadSysName(document.getElementById('systemSelector'));
	getStats(true, document.getElementById('systemSelector').parentNode);
}
function loadSysName(obj) {
	var element = obj;
	obj.parentNode.id = element.options[element.selectedIndex].value;
	//loadSysInfo();
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
			if (multi && obj.id !== 'None') {
				setTimeout(function(){getStats(true, obj); obj = null}, 2000);
			}
		}
	}
	xmlhttp.open('GET', 'stats.php?system='+obj.id, true);
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
	xmlhttp.open('GET', 'getBuild.php?system='+obj.id, true);
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
/*function loadSysInfo() {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById("systemInfo").innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.open('GET', 'getInfo.php?system='+obj.id, true);
	xmlhttp.send();
	document.getElementById('systemInfo').innerHTML = "<img src=\"images/Loading.gif\" height=\"20\"/>";
}*/
function resize(obj) {
	var stats = obj.parentNode;
	var img = obj;
	if (img.innerHTML.indexOf("expand") !== -1) {
		expandedL = stats.style.left;
		expandedW = stats.style.width;
		stats.style.left = "1.3%";
		stats.style.width = "97.3958333%";
		stats.style.zIndex = "100";
		img.innerHTML = "<img src=images/shrink.png width=36 />";
	} else {
		stats.style.left = expandedL;
		stats.style.width = expandedW;
		stats.style.zIndex = "auto";
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
			newContent.id = "Avocado";
			var child = master.appendChild(newContent);
			getStats(true, child);
						
			systemCount += 1;

			var children = master.childNodes;
			var width = window.innerWidth;
			var percent = 0
			var width2 = width/systemCount;
			var diff = (width2-50)/width * 100;
			var n = 0;
			for (var i = 0; i < children.length; i++) {
				if (children[i].className == 'stats') {
				children[i].style.left = 1.3 + (2.6 * (n)) + (n*diff) + "%";
				children[i].style.width = diff + "%";
				n++;
				}
			}
		}
	}
	xmlhttp.open('GET', 'addStat.php');
	xmlhttp.send();
}
function closeStat(obj) {
	var statDiv = obj.parentNode;
	var statParent = statDiv.parentNode;

	statDiv.id = "None";	//allows the ending of ajax calls for this panel
	statParent.removeChild(statDiv);
	
	systemCount -= 1;

	var children = statParent.childNodes;
	var width = window.innerWidth;
	var percent = 0
	var width2 = width/systemCount;
	var diff = (width2-50)/width * 100;
	var n = 0;
	for (var i = 0; i < children.length; i++) {
		if (children[i].className == 'stats') {
			children[i].style.left = 1.3 + (2.6 * (n)) + (n*diff) + "%";
			children[i].style.width = diff + "%";
			n++;
		}
	}

}
