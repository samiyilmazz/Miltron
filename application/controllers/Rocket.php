<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Rocket extends CI_Controller {

	public function index()
	{
		$view               = new stdClass();        

		// $service_port = 4008;
		// $address = gethostbyname('127.0.0.1');

		// $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
		// if ($socket === false) {
		// 	echo "socket_create() başısız oldu: sebep: " .
		// 	socket_strerror(socket_last_error()) . "\n";
		// }

		// $result = socket_connect($socket, $address, $service_port);
		// if ($result === false) {
		// 	echo "socket_connect() başısız oldu:\nSebep: ($result) " .
		// 	socket_strerror(socket_last_error($socket)) . "\n";
		// }

		// $in = "HEAD / HTTP/1.1\r\n";
		// $in .= "Host: www.example.com\r\n";
		// $in .= "Connection: Close\r\n\r\n";
		// $out = '';

		// socket_write($socket, $in, strlen($in));

		// $buf = '';
		// if (false !== ($bytes = socket_recv($socket, $buf, 2048, MSG_WAITALL))) {

		// } else {
		// 	echo "socket_recv() failed; reason: " .
		// 	socket_strerror(socket_last_error($socket)) . "\n";
		// }
		// socket_close($socket);
		
		// $res = hex_dump($buf);

		// print_r(handle_telemetry($res));

		$this->load->view("index",$view);

	}

	public function tcp_data($port)
	{
		$service_port = $port;
		$address = gethostbyname('127.0.0.1');

		$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
		if ($socket === false) {
			echo "socket_create() başısız oldu: sebep: " .
			socket_strerror(socket_last_error()) . "\n";
		}

		$result = socket_connect($socket, $address, $service_port);
		if ($result === false) {
			echo "socket_connect() başısız oldu:\nSebep: ($result) " .
			socket_strerror(socket_last_error($socket)) . "\n";
		}

		$in = "HEAD / HTTP/1.1\r\n";
		$in .= "Host: www.example.com\r\n";
		$in .= "Connection: Close\r\n\r\n";
		$out = '';

		socket_write($socket, $in, strlen($in));

		$buf = '';
		if (false !== ($bytes = socket_recv($socket, $buf, 2048, MSG_WAITALL))) {

		} else {
			echo "socket_recv() failed; reason: " .
			socket_strerror(socket_last_error($socket)) . "\n";
		}
		socket_close($socket);
		
		$res = hex_dump($buf);

		echo json_encode(handle_telemetry($res));
	}



	
}
