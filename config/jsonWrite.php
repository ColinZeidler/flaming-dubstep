<?php
$text = $_POST['json'];
$return =  file_put_contents('/var/www/NewControl/config/systems.json', $text);
if ($return == false) {
 echo "failed";
} else {
 echo "Write completed";
}
?>
