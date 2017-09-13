// var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    $('#location').val("");

    // $.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0fdc5bc7d09521073b12734e52baeec4`).then(function(response){
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0fdc5bc7d09521073b12734e52baeec4`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      body = JSON.parse(response);
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
    $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
  }, function(error) {
    $('.showErrors').text(`There was an error processing your request: ${error.responseText}. Please try again.`);
    });
  });
});

// $.ajax({
//   url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
//   type: 'GET',
//   data: {
//     format: 'json'
//   },
//   success: function(response) {
//     $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
//     $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp}.`);
//   },
//   error: function() {
//     $('.errors').text("There was an error processing your request. Please try again.")
//   }
// });
