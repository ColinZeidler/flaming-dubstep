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
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(function() {updateChart(false);});
var chart;
var options;
var data;

function updateChart(reDraw) {
 //get new data  formatted as ["Time, "out Rate", "in Rate]
 var xmlhttp = new XMLHttpRequest();
 xmlhttp.onreadystatechange=function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
   //dataArray.push(newdata)
   var temp = xmlhttp.responseText.split(", ");
   temp[0] = parseInt(temp[0]);
   temp[1] = parseInt(temp[1]);
   bitArray.push(temp);
   //dataArray.shift() //removes old data
   bitArray.shift();
   var newdata = [];
   for (var i = 0; i < xArray.length; i++ ) {
    newdata[i] = [xArray[i], bitArray[i][0], bitArray[i][1]];
   }
   var finalData = [['Time Past', 'Outgoing Bit Rate', 'Incoming Bit Rate']]
   finalData.push.apply(finalData, newdata);
   if (reDraw) {
    data = google.visualization.arrayToDataTable(finalData);
    chart.draw(data, options);
   } else {
    drawChart(finalData);
   }
   setTimeout(function() {updateChart(true);}, 2000)
  }
 }
 xmlhttp.open('GET', 'bitRate.php?system='+System, true);
 xmlhttp.send();
}


function drawChart(newdata) {
 data = google.visualization.arrayToDataTable(newdata);
 options = {title: 'System BitRate', hAxis: {title: 'Seconds Ago'}, vAxis: {title: 'kbps', minValue: 0}, backgroundColor: '#F1F1EB'};
 chart = new google.visualization.LineChart(document.getElementById('chart'));
 chart.draw(data, options);
}


function loadSysName(obj) {
 System = obj.options[obj.selectedIndex].value;
}


//graph object
function Graph(sys) {
 this.name = sys;
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
 this.chart = new google.visualization.LineChart(document.getElementById(this.name));
 this.options = {title: 'System Bit Rate', hAxis: {title: 'Seconds Ago'}, vAxis: {title: 'kbps', minValue: 0}, backgroundColor: '#F1F1EB'};
 console.info(this.name + " created");
}

Graph.prototype.drawChart = function () {
 chart.draw(this.data, this.options);
}

Graph.prototype.updateData = function() {
 var xmlhttp = new XMLHttpRequest();
 xmlhttp.onreadystatechange=function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
   //parse the system stat into ints
   var temp = xmlhttp.responseText.split(", ");
   temp[0] = parseInt(temp[0]);
   temp[1] = parseInt(temp[1]);

   //push new data onto the bit array
   this.bitArray.push(temp);
   //dataArray.shift() //removes old data
   this.bitArray.shift();
   
   //create new combined array with x pos and bit data
   var newdata = [];
   for (var i = 0; i < xArray.length; i++ ) {
    newdata[i] = [xArray[i], this.bitArray[i][0], this.bitArray[i][1]];
   }

   //create titles and push to top of array
   var finalData = [['Time Past', 'Outgoing Bit Rate', 'Incoming Bit Rate']]
   finalData.push.apply(finalData, newdata);

   this.data = google.visualization.arrayToDataTable(finalData)
   this.drawChart();
   
   setTimeout(function() {this.updateData();}, 2000)
  }
 }
 xmlhttp.open('GET', 'bitRate.php?system='+this.name, true);
 xmlhttp.send();
}

Graph.prototype.changeName = function(name) {
 this.name = name;
}

