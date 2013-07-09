var xArray = ["120","118","116","114","112","110","108","106","104","102","100",
               "98","96","94","92","90","88","86","84","82","80","78","76","74",
               "72","70","68","66","64","62","60","58","56","54","52","50","48",
               "46","44","42","40","38","36","34","32","30","28","27","26","24",
               "22","20","18","16","14","12","10","8","6","4","2","0"];
var bitArray = [[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],
                [0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],
                [0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],
                [0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],
                [0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],
                [0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],
                [0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],
                [0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],
                [0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]];
var System = "Avocado";
var graphList = [];
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(function() {newSection(System);});

function newSection(sys) {
 var parentDiv = document.getElementById('allSystems');
 var newContent = document.createElement('div');
 newContent.className = 'stats';
 newContent.innerHTML = "   <h1>Testing charts</h1>   <p>This is the test of the Google charts, with auto updates</p>   <div id=chart style=\"width:900px; height:600px;\"></div>"
 newContent.id = sys;
 var child = parentDiv.appendChild(newContent);
 graphList.push(new Graph(child));
 graphList[graphList.length-1].updateData();
}

//graph object
function Graph(sysDiv) {
 this.name = sysDiv.id;
 this.div = sysDiv;
 this.bitArray = [[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],
                [0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],
                [0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],
                [0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],
                [0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],
                [0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],
                [0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],
                [0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],
                [0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]];
 this.data;
 var children = this.div.childNodes;
 for (var i = 0; i < children; i++) {
  if (children[i].id == "chart") {
   var childDiv = children[i];
  }
 }
 this.chart = new google.visualization.LineChart(childDiv);
 this.options = {title: 'System Bit Rate', hAxis: {title: 'Seconds Ago'}, vAxis: {title: 'kbps', minValue: 0}, backgroundColor: '#F1F1EB'};
 console.info(this.name + " created");
}

Graph.prototype.drawChart = function () {
 this.chart.draw(this.data, this.options);
}

Graph.prototype.updateData = function() {
 var xmlhttp = new XMLHttpRequest();
 var graphItem = this;
 xmlhttp.onreadystatechange=function() {	//need to get instance of the Graph in use into sub function
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
   //parse the system stat into ints
   var temp = xmlhttp.responseText.split(", ");
   temp[0] = parseInt(temp[0]);
   temp[1] = parseInt(temp[1]);
   console.info(temp);
   console.info(graphItem.bitArray);
   console.info(graphItem.name);
   console.info(graphItem.div);
   //push new data onto the bit array
   graphItem.bitArray.push(temp);
   //dataArray.shift() //removes old data
   graphItem.bitArray.shift();
   
   //create new combined array with x pos and bit data
   var newdata = [];
   for (var i = 0; i < xArray.length; i++ ) {
    newdata[i] = [xArray[i], graphItem.bitArray[i][0], graphItem.bitArray[i][1]];
   }

   //create titles and push to top of array
   var finalData = [['Time Past', 'Outgoing Bit Rate', 'Incoming Bit Rate']]
   finalData.push.apply(finalData, newdata);

   graphItem.data = google.visualization.arrayToDataTable(finalData)
   graphItem.drawChart();
   
   setTimeout(function() {graphItem.updateData();}, 2000)
  }
 }
 xmlhttp.open('GET', 'bitRate.php?system='+this.name, true);
 xmlhttp.send();
}

Graph.prototype.changeName = function(name) {
 this.name = name;
}

