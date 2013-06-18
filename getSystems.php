<?php 
$system = $_GET['system'];

echo `source ~/python2.7-env/bin/activate`; //sets the environment for python torun
echo `python getSystems.py $system`; //runs the python script
?>

