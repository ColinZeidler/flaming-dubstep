<?php
$filecont = file_get_contents('/var/www/NewControl/config/systems.json');
$json = json_decode($filecont, true);

echo '<select id="systemSelector" onchange=\'loadSysName(this)\'>';
foreach ($json['Systems'] as $system) {
 echo '<option value="'. $system['name'] . '">'.$system['name'].'</option>';
}
echo '</select>';
unset($system);
?>
