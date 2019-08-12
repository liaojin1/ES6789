<?php 
    $data = Array(
        'name' => 'liaojin',
        'age' => 20
    );
    $callback = $GET['callback'];
    echo $callback.'('.$data.')';
?>