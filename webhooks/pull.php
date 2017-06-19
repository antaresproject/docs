<?php

echo '<pre>';
var_dump(shell_exec('git stash 2>&1'));


var_dump(shell_exec('git pull 2>&1'));


var_dump(shell_exec('php codehilite.php 2>&1'));

chdir('../');

var_dump(shell_exec('mkdocs build 2>&1'));

echo '</pre>';
