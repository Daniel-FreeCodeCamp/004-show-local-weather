var tempK_ = "999";
var showTempInC_ = 0;

function toggleTemp() {
	var t1 = 0;
	var suffix = "Z";
	if(showTempInC_ == 1) {
		t1 = KtoC(tempK_); 
		showTempInC_ = 0;
		suffix = "C";
	}
	else {
		t1 = KtoF(tempK_); 
		showTempInC_ = 1;
		suffix = "F";
	}
	document.getElementById("temperature").innerHTML = t1.toFixed(2) + suffix;
	return t1;  
}

function KtoC(K1) {
  var C1 = K1 - 273.15;
  return C1;
}

function KtoF(K1) {
  var F1 = K1 * (9/5) - 459.67;
  return F1;
}

$(document).ready(function() {
	var lat = 0;
	var lon = 0;

	var city = "";
	var icon = "";
	var country = "";
	
	// ------------------------------------------
	// this gets position in terms of lat/long
	// ------------------------------------------	
	$.getJSON("http://ip-api.com/json/?callback=?", function(data) 
	{
	  var table_body = "";
	  $.each(data, function(k, v) {		 
		 if(k == 'lat') {
			lat = v.toFixed(3);		
		 }
		 else if (k == 'lon') {       
			lon = v.toFixed(3);			
		 }
		 else if (k == 'country') {
			 country = v;
		 }
	  });                       
	}).done(function() 
	{   
		// ------------------------------------------	
		// this passes position into weather api, 
		// see http://openweathermap.org/current for response parms
		// icon url http://openweathermap.org/weather-conditions
		// ------------------------------------------
		
		/*  this works, don't delete, working on formatting  */
		var weatherAPI_URL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=80461a33d96cef29e5d05dc616257d11";  

		$.getJSON(weatherAPI_URL, function(result) {       

			city = result.name + "," + country;
			tempK_ = result.main.temp;
			icon = result.weather[0].icon;
			description = result.weather[0].description;
			
			var iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
			var iconImg = "<img src='" + iconURL + "'>";

			$("#city").html(city);
			$("#icon").html(iconImg);	
			$("#description").html(description);			
			
			// first time loading, want temp in C, set flag and manually toggle	
			showTempInC_ = 1;  
			var tx = toggleTemp();
				
		}); 
				
		// first time loading, want temp in C, set flag and manually toggle	
		//showTempInC_ = 1;  
		//var tx = toggleTemp();
	});
    
});