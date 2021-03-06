var systemCount = 0;
var expandedL = '';
var expandedW = '';
function ready() {
	newSystem();
	systemName = '';
	loadSysName(document.getElementById('systemSelector'));
	getStats(true, document.getElementById('systemSelector').parentNode);}
function loadSysName(obj) {
	var element = obj;
	obj.parentNode.id = element.options[element.selectedIndex].value;
	loadSysInfo(obj.parentNode);
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
function sysDropDown(obj) {
	var children = obj.childNodes;
	for (var i = 0; i < children.length; i++) {
		if (children[i].className == "sysDropTab")
			var dropTab = children[i];
		if (children[i].className == "systemInfo")
			var systemTab = children[i];
	}
	
	if (systemTab.clientHeight == 0) {
	systemTab.style.height = "120px";
	dropTab.innerHTML = "CLOSE <img src=images/info-up.png />";
	} else {
	systemTab.style.height = "0";
	dropTab.innerHTML = "OPEN <img src=images/info-arrow.png />";
	}

}
function loadSysInfo(obj) {
	var xmlhttp = new XMLHttpRequest();

	var children = obj.childNodes;

	for (var i = 0; i < children.length; i++) {
		if (children[i].className == "sysDropDown") {
		var drop = children[i];
		var children = drop.childNodes;
		for (var i = 0; i < children.length; i++) {
			if (children[i].className == "systemInfo")
				var systemTab = children[i];
		}
		}
	}

	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			systemTab.innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.open('GET', 'getInfo.php?system='+obj.id, true);
	xmlhttp.send();
	systemTab.innerHTML = "<img src=\"images/Loading.gif\" height=\"20\"/>";
}
function resize(obj) {
	var stats = obj.parentNode;
	var img = obj;
	if (img.innerHTML.indexOf("expand") !== -1) {
		expandedL = stats.style.left;
		expandedW = stats.style.width;
		stats.style.left = "1.3%";
		stats.style.width = "97.3958333%";
		stats.style.zIndex = "100";
		img.innerHTML = "<div class=statButtonTop><img src=images/shrink.png width=36 height=36 /></div><img src=images/shrink-bottom.png width=36 height=36 />";
	} else {
		stats.style.left = expandedL;
		stats.style.width = expandedW;
		stats.style.zIndex = "auto";
		img.innerHTML = "<div class=statButtonTop><img src=images/expand.png width=36 height=36 /></div><img src=images/expand-bottom.png width=36 height=36 />";
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
			loadSysInfo(child);
			getBuild(child);

			systemCount += 1;
			child.style.left = "100%";
			temp = child.clientWidth;	//forces the browser to ajust the position of the new element
			temp = null;

			//force all resize images to the expand version
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
