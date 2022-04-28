var settings = {
	url: "http://localhost:5000/rockets",
	method: "GET",
	timeout: 0,
	headers: {
		"X-API-Key": "API_KEY_1",
	},
};

setInterval(function () {
	$.ajax(settings).done(function (response) {
		$("#space").empty();
		for (var i = 0; i < response.length; i++) {
			$("#space").prepend(createRocketItem(response[i]));
		}
	});

	var set_weather = {
		url: "http://localhost:5000/weather",
		method: "GET",
		timeout: 0,
		headers: {
			"X-API-Key": "API_KEY_1",
		},
	};

	$.ajax(set_weather).done(function (response) {
		$("#weather").empty();
		$("#weather").append(createMenuItem("Temperature", response["temperature"]));
		$("#weather").append(createMenuItem("Humidity", response["humidity"]));
		$("#weather").append(createMenuItem("Pressure", response["pressure"]));
		$("#weather").append(
			createMenuItem("Precipitation Probability", response["precipitation"]["probability"])
		);
		$("#weather").append(
			createMenuItem("Precipitation", handle_weather(response["precipitation"]))
		);
		$("#weather").append(createMenuItem("Time", response["time"]));
		$("#weather").append(
			createMenuItem("Wind Speed", response["wind"]["speed"])
		);
		$("#weather").append(
			createMenuItem("Wind Angle", response["wind"]["angle"])
		);
		$("#weather").append(
			createMenuItem("Wind Direction", response["wind"]["direction"])
		);
	});
}, 4000);

setInterval(function () {
	$(".rockets").each(function (index) {
		var port_id = $(this).data("port");

		var set_socket = {
			url: "http://localhost/mt/rocket/tcp_data/" + port_id,
			method: "GET",
			timeout: 0,
			headers: {
				"X-API-Key": "API_KEY_1",
			},
		};

		$.ajax(set_socket).done(function (response) {
			var data = JSON.parse(response);

			acceleration =
				data.acceleration == "8.999999836405475e+24"
					? "Invalid Data"
					: data.acceleration;

			altitude =
				data.altitude == "8.999999836405475e+24"
					? "Invalid Data"
					: data.altitude;

			speed =
				data.speed == "8.999999836405475e+24" ? "Invalid Data" : data.speed;

			$("#acc" + port_id).html(acceleration);
			$("#alt" + port_id).html(altitude);
			$("#speed" + port_id).html(speed);
		});
	});
}, 1500);

function handle_weather(data) {
	type = "";
	if (data["rain"]) {
		type = "Rain";
	}

	if (data["snow"]) {
		type = "Snow";
	}

	if (data["sleet"]) {
		type = "Sleet";
	}

	if (data["hail"]) {
		type = "Hail";
	}

	return type;
}

function launch_rocket() {
	var settings = {
		url:
			"http://localhost:5000/rocket/" +
			event.srcElement.id +
			"/status/launched",
		method: "PUT",
		timeout: 0,
		headers: {
			"X-API-Key": "API_KEY_1",
		},
	};
	$.blockUI({ message: '<h1>Just a moment...</h1>' });


	$.ajax(settings).done(function (response) {
		console.log(response);
		$.unblockUI();

	}).fail(function(xhr, status, error) {
		$.unblockUI();
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'An error occurred while lifting the rocket, try again and again.!',
		  })
		  

	});
}

function deploy_rocket() {
	var settings = {
		url:
			"http://localhost:5000/rocket/" +
			event.srcElement.id +
			"/status/deployed",
		method: "PUT",
		timeout: 0,
		headers: {
			"X-API-Key": "API_KEY_1",
		},
	};
	$.blockUI({ message: '<h1>Just a moment...</h1>' });

	$.ajax(settings).done(function (response) {
		$.unblockUI();

		console.log(response);
	}).fail(function(xhr, status, error) {
		$.unblockUI();
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'An error occurred while deploying the rocket, try again and again.!',
		  })
	});
}

function cancel_launch() {
	console.log("cancel_launch");
	var settings = {
		url:
			"http://localhost:5000/rocket/" +
			event.srcElement.id +
			"/status/launched",
		method: "DELETE",
		timeout: 0,
		headers: {
			"X-API-Key": "API_KEY_1",
		},
	};
	$.blockUI({ message: '<h1>Just a moment...</h1>' });


	$.ajax(settings).done(function (response) {
		console.log(response);
		$.unblockUI();

	}).fail(function(xhr, status, error) {
		$.unblockUI();
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'An error occurred while stoping launch the rocket, try again and again.!',
		  })
		  

	});
}

function createMenuItem(text, value) {
	var newListItem = $("<li/>", {
		html:
			'<p style="text-align:left;">' +
			text +
			'<span style="float:right;">' +
			value +
			"</span></p>",
		class: "list-group-item",
	});
	return newListItem;
}

function createRocketItem(rocket) {
	var image = rocket["altitude"] > 0 ? "rocket_launch.png" : "rocket.png";
	var newListItem = $("<div/>", {
		html:
			'<div class="card rockets" data-port="' +
			rocket["telemetry"]["port"] +
			'" style="margin-top:5%">' +
			'<img src="assets/images/' +
			image +
			'" class="img-center" alt="Rocket Image">' +
			'<div class="card-body d-flex flex-column">' +
			'<h5 class="card-title text-center"><b>' +
			rocket["model"] +
			"</b></h5>" +
			'<ul class="list-group list-group-flush">' +
			'<table class="table">' +
			"<tbody>" +
			"<tr>" +
			'<th scope="row">Acceleration</th>' +
			"<td>" +
			rocket["acceleration"] +
			"</td>" +
			"</tr>" +
			"<tr>" +
			'<th scope="row">Telemetry Port</th>' +
			"<td id='acc" +
			rocket["telemetry"]["port"] +
			"'></td>" +
			"</tr>" +
			"<tr>" +
			'<th scope="row">Altitude</th>' +
			"<td>" +
			rocket["altitude"] +
			"</td>" +
			"</tr>" +
			"<tr>" +
			'<th scope="row">Telemetry Port</th>' +
			"<td id='alt" +
			rocket["telemetry"]["port"] +
			"'></td>" +
			"</tr>" +
			"<tr>" +
			'<th scope="row">Mass</th>' +
			"<td>" +
			rocket["mass"] +
			"</td>" +
			"</tr>" +
			"<tr>" +
			'<th scope="row">Description</th>' +
			"<td>" +
			rocket["payload"]["description"] +
			"</td>" +
			"</tr>" +
			"<tr>" +
			'<th scope="row">Weight</th>' +
			"<td>" +
			rocket["payload"]["weight"] +
			"</td>" +
			"</tr>" +
			"<tr>" +
			'<th scope="row">Speed</th>' +
			"<td>" +
			rocket["speed"] +
			"</td>" +
			"</tr>" +
			"<tr>" +
			'<th scope="row">Telemetry Speed</th>' +
			"<td id='speed" +
			rocket["telemetry"]["port"] +
			"'></td>" +
			"</tr>" +
			"<tr>" +
			'<th scope="row">Telemetry Port</th>' +
			"<td>" +
			rocket["telemetry"]["port"] +
			"</td>" +
			"</tr>" +
			"</tbody>" +
			"</table>" +
			"</ul>" +
			'<div class="row">' +
			'<div class="col-md-4">' +
			'<button class="btn btn-success" id="' +
			rocket["id"] +
			'" onClick="launch_rocket()">LAUNCH</button>' +
			"</div>" +
			'<div class="col-md-4">' +
			'<button class="btn btn-warning" id="' +
			rocket["id"] +
			'" onClick="deploy_rocket()">DEPLOY</button>' +
			"</div>" +
			'<div class="col-md-4">' +
			'<button class="btn btn-danger" id="' +
			rocket["id"] +
			'" onClick="cancel_launch()">CANCEL</button>' +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>",
		class: "col-lg-4 d-flex align-items-stretch",
	});
	return newListItem;
}
