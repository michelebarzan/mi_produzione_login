<?php
    /*$serverName = 'web.azure.servizioglobale.it';
    $connectionInfo=array("Database"=>"mi_linea_kit", "UID"=>"sa", "PWD"=>"Serglo123");
    $conn = sqlsrv_connect($serverName,$connectionInfo);*/
    
    $serverName = '192.168.6.196';
    $connectionInfo=array("Database"=>"mi_produzione", "UID"=>"sa", "PWD"=>"Serglo123");
    $conn = sqlsrv_connect($serverName,$connectionInfo);
?>