<?php

echo 1;
exit;
echo '<pre>';
var_dump(shell_exec('git stash 2>&1'));


var_dump(shell_exec('git pull 2>&1'));


var_dump(shell_exec('php codehilite.php 2>&1'));

chdir('../');

var_dump(shell_exec('mkdocs build -c -d php 2>&1'));

echo '</pre>';
