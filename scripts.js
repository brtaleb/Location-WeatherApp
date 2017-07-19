var lat;
var lon;
var tmp="°F";

function getLocation()
 {
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    } 
}

function showPosition(position) 
{	
	$("#home").fadeOut(500);
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    getWeather();

    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+lat+","+lon+"&zoom=14&size=300x225&sensor=false&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";

    $("#map").animate({
		opacity: 0
		}, 600,
		function(){
			$(this).animate({
				opacity: 1
			}, 600);
			$("#map").html("<img src='"+img_url+"'>");
		});
    $("#you").animate({
		opacity: 0
		}, 600,
		function(){
			$(this).animate({
				opacity: 1
			}, 600);
			$("#you").html("You are here");
		});
}

function getWeather()
{
	var url= "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID=4d635799c635bf4a234115af9d4001f5";
	$.getJSON(url, function(data){
		w=data.weather[0].main;
		t=Math.round(data.main.temp*9/5-459.67).toFixed(2);
		city=data.name;
		country=data.sys.country;
		ico=data.weather[0].icon;
		$("#temp").animate({
		opacity: 0
		}, 600,
		function(){
			$(this).animate({
				opacity: 1
			}, 600);
			$("#temp").html(t+tmp);
		});
		$("#coor").animate({
		opacity: 0
		}, 600,
		function(){
			$(this).animate({
				opacity: 1
			}, 600);
			$("#coor").html(" "+w+" </br>"+city+" "+country);
		});
		$("#ico").animate({
		opacity: 0
		}, 600,
		function(){
			$(this).animate({
				opacity: 1
			}, 600);
			$("#ico").html("<img src='http://openweathermap.org/img/w/"+ico+".png'>");
		});
	
		$("#but").animate({
		opacity: 0
		}, 600,
		function(){
			$(this).animate({
				opacity: 1
			}, 600);
			$("#but").css('display','block');
		});
						
		$("#but").on('click',function()
		{
			if (tmp=="°F")
			{
				$("#temp").fadeOut(500,function(){
					tmp="°C";
					t=Math.round((t-32)*5/9).toFixed(2);
					$("#temp").html(t+tmp);
					$("#temp").fadeIn(500);
				});
				$("#but").fadeOut(00,function(){
					$("#but").html("To Fahrenheit");
					$("#but").fadeIn(00);
				});
			}
			if (tmp=="°C")
			{
				$("#temp").fadeOut(500,function(){
					tmp="°F";
					t=Math.round(t*9/5+32).toFixed(2);
					$("#temp").html(t+tmp);
					$("#temp").fadeIn(500);
				});
				$("#but").fadeOut(00,function(){
					$("#but").html("To Celcius");
					$("#but").fadeIn(00);
				});
			}
		});			
	});
	
}

$("#home").on('click', function()
{
	getLocation();
});