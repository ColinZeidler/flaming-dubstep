<?php
$text = $_POST['json'];
$return =  file_put_contents('/var/www/NewControl/systems.json', $text);
if ($return == false) {
 echo "failed";
} else {
 echo "Write completed";
}
?>
