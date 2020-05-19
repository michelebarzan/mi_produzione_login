<?php

    include "connessione.php";

    $applicazioni=[];

    $query2="SELECT * FROM applicazioni";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $applicazione["id_applicazione"]=$row2['id_applicazione'];
            $applicazione["nomeApplicazione"]=$row2['nomeApplicazione'];
            $applicazione["descrizione"]=$row2['descrizione'];
            $applicazione["icona"]=$row2['icona'];
            $applicazione["percorsoIndex"]=$row2['percorsoIndex'];
            
            array_push($applicazioni,$applicazione);
        }
    }

    $arraiResponse["serverName"]=$_SERVER["SERVER_ADDR"];
    $arraiResponse["applicazioni"]=$applicazioni;
    echo json_encode($arraiResponse);

?>