<?php
echo "<h2>System Stats</h2>
	<select id=\"systemSelector\" onchange='loadSysName(this)'>
		<option value=\"Avocado\">Avocado</option>
		<option value=\"Banana\">Banana</option>
		<option value=\"Coconut\">Coconut</option>
		<option value=\"Duku\">Duku</option>
		<option value=\"Emblic\">Emblic</option>
		<option value=\"Fig\">Fig</option>
		<option value=\"Galia\">Galia</option>
		<option value=\"Honeydew\">Honeydew</option>
		<option value=\"Imbe\">Imbe</option>
		<option value=\"Jalapeno\">Jalapeno</option>
		<option value=\"Kiwi\">Kiwi</option>
		<option value=\"Loganberry\">Loganberry</option>
		<option value=\"Newton\">Newton</option>
		<option value=\"Papaya\">Papaya</option>
	</select>
	<div class=statButton onclick='resize(this)'><img src=images/expand.png  width=36 /></div>
	<div id=\"buildInfo\">Build data</div>
	<div class=closeButtonBottom></div>
	<div class=closeButton onclick='closeStat(this)'></div>
	<div id=statsContent>
</div>"
?>
