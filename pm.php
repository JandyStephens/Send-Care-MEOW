<?php
    header("Access-Control-Allow-Origin: *");

    if ($_POST) {

        $customer_id = "";
        $sandbox_api_key = "";

        $curl = curl_init("https://api.postmates.com/v1/customers/" . $customer_id . "/deliveries");
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($_POST));
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                'Authorization: Basic ' . base64_encode($sandbox_api_key . ":")
            )
        );

        echo curl_exec($curl);

        curl_close($curl);
    }
    else {
        echo json_encode(
            array(
                'error' => TRUE,
                'message' => 'No post data found in request!'
            )
        );
    }

    exit;
?>