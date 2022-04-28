<?php

function precipitation_handler($data)
{
    $type = "";
    if($data["rain"])
    {
        $type = "rain";
    }

    if($data["snow"])
    {
        $type = "snow";
    }

    if($data["sleet"])
    {
        $type="Sulu Sepen";
    }

    if($data["hail"])
    {
        $type="Dolu";
    }

    return $type;
}

function hex2float($strHex) {
    $hex = sscanf($strHex, "%02x%02x%02x%02x%02x%02x%02x%02x");
    $bin = implode('', array_map('chr', $hex));
    $array = unpack("Gnum", $bin);
    return $array['num'];
}

function hex_dump($string, array $options = null) {
    if (!is_scalar($string)) {
        throw new InvalidArgumentException('$string argument must be a string');
    }
    if (!is_array($options)) {
        $options = array();
    }
    $line_sep       = isset($options['line_sep'])   ? $options['line_sep']          : "\n";
    $bytes_per_line = @$options['bytes_per_line']   ? $options['bytes_per_line']    : 16;
    $pad_char       = isset($options['pad_char'])   ? $options['pad_char']          : '.'; # padding for non-readable characters

    $text_lines = str_split($string, $bytes_per_line);
    $hex_lines  = str_split(bin2hex($string), $bytes_per_line * 2);

    $offset = 0;
    $output = array();
    $bytes_per_line_div_2 = (int)($bytes_per_line / 2);

    foreach ($hex_lines as $i => $hex_line) {
        $text_line = $text_lines[$i];
        $output []=
            
            str_pad(
                strlen($text_line) > $bytes_per_line_div_2
                ?
                    implode(' ', str_split(substr($hex_line,0,$bytes_per_line),2)) . '  ' .
                    implode(' ', str_split(substr($hex_line,$bytes_per_line),2))
                :
                implode(' ', str_split($hex_line,2))
            , $bytes_per_line * 3) .
             '';
        $offset += $bytes_per_line;
    }
    $output []= sprintf('%08X', strlen($string));
    return @$options['want_array'] ? $output : join($line_sep, $output) . $line_sep;
}

function handle_telemetry($data)
	{
		
		$data_arr = explode('82',strval($data));
		if(count($data_arr)>0)
		{
			$string = str_replace(" ", "", $data_arr[1]);
			
			$id = substr($string, 0,20);
			$id = pack("H*", $id);
			
			$altitude = substr($string, 24,8);
			$altitude = hex2float($altitude);

			$speed = substr($string, 33,8);
			$speed = hex2float($speed);

			$acceleration = substr($string, 41,8);
			$acceleration = hex2float($acceleration);

			$thrust = substr($string, 49,8);
			$thrust = hex2float($thrust);

			$temperature = substr($string, 57,2);
			$temperature = hex2float($temperature);

			$return_value = array(
				"id"           => $id,
				"altitude"     => $altitude,
				"speed"        => $speed,
				"acceleration" => $acceleration,
				"thrust"       => $thrust,
				"temperature"  => $temperature
			);
		}
		else
		{
			$return_value = array(
				"id"           => null,
				"altitude"     => null,
				"speed"        => null,
				"acceleration" => null,
				"thrust"       => null,
				"temperature"  => null
			);
		}

		return $return_value;
		
	}