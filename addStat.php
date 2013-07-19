<?php
echo "<h2>System Stats</h2>" ;
include('config/systemList.php');
echo "<div class=statButton onclick='resize(this)'><div class=statButtonTop><img src=images/expand.png  width=36 /></div><img src=images/expand-bottom.png  width=36 /></div>
	<div id=\"buildInfo\">Build data</div>
	<div class=sysDropDown >
		<div class=systemInfo>Hi hi ipsum lorem toldar, ipsum loding index javascript</br> hi2</div>
		<div class=sysDropTab onclick='sysDropDown(this.parentNode)'>OPEN<img src=images/info-arrow.png  /> </div>
	</div>
	<div class=closeButtonBottom></div>
	<div class=closeButton onclick='closeStat(this)'></div>
	<div id=statsContent>
</div>";
?>
