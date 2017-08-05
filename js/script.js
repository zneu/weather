$( document ).ready(function() {
  var location = "http://ip-api.com/json";

  $.getJSON(location, function(data) {
    var lat = data.lat;
    var lon = data.lon;
    var city = data.city;
    var reg = data.regionName;
    console.log(lat, lon, city, reg);

    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=7d371912064d51524ab0d456961ebd9a';

    $.getJSON(url, function(data) {
      var tempK = data.main.temp;
      var condition = data.weather[0].main;
      var description = data.weather[0].description
      var tempC = Math.round(tempK - 273.15) + "°C and " + description;
      var tempF = Math.round(tempK * 1.8 - 459.67)+ "°F and " + description;

      console.log(tempK, tempC, tempF, condition);

      $("#location").html(city + ", " + reg);
      $("#temp").html(tempF);
      $("#convert").click(function() {
        var el = $("#temp")
        el.html() == tempF ? el.html(tempC) : el.html(tempF);
      });

      $(".search").submit(function(event) {
        var search = $("#query").val();
        var url = "http://www.openweathermap.org/find?q=" + search;
        console.log(url);
        window.location.href = url;
        event.preventDefault();
      })

      // https://unsplash.it/2560/1600?image=1045
      // #475 = Clouds
      // #1067 = Clear
      // #178 = Drizzle
      // #279 = Atmosphere
      // #256 = Snow
      // #171 = Rain
      // #475 = Extreme
      // #149 = Thunderstorm
      // #259 = Additional

      if (condition == "Clouds") {
        $("#image").html("<img src='https://unsplash.it/2560/1600?image=51'>")
      } else if (condition == "Clear") {
        $("#image").html("<img src='https://unsplash.it/2560/1600?image=1067'>")
      } else if (condition == "Drizzle") {
        $("#image").html("<img src='https://unsplash.it/2560/1600?image=1021'>")
      } else if (condition == "Atmosphere") {
        $("#image").html("<img src='https://unsplash.it/2560/1600?image=459'>")
      } else if (condition == "Snow") {
        $("#image").html("<img src='https://unsplash.it/2560/1600?image=256'>")
      } else if (condition == "Rain") {
        $("#image").html("<img src='https://unsplash.it/2560/1600?image=171'>")
      } else if (condition == "Extreme") {
        $("#image").html("<img src='https://unsplash.it/2560/1600?image=475'>")
      } else if (condition == "Thunderstorm") {
        $("#image").html("<img src='https://unsplash.it/2560/1600?image=149'>")
      } else {
        $("#image").html("<img src='https://unsplash.it/2560/1600?image=1006'>")
      }
    });
  });
});
