// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):

//capture city and state data
myApp.onPageInit('get-zip', function (page) {
  $$('#get-zip-form').on('submit', function (e) {
    var city = $$('#city').val();
    var state = $$('#state').val();
    e.preventDefault();
    getzip(city,state);
  });
})

//capture zipcode date
myApp.onPageInit('get-city', function (page) {
  $$('#get-city-form').on('submit', function (e) {
    var zip = $$('#zip').val();
    e.preventDefault();
    getcity(zip);
  });
})
 
//use the zippopotam.us api to get city
function getcity(zip) {
  $$.get('http://api.zippopotam.us/us/'+zip, {}, function (data) {
    var result = JSON.parse(data);
    $$('#get-city-results').html('');
    for (var i = 0; i < result.places.length; i++) {
      $$('#get-city-results').append(`
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">
                ${result.places[i]["place name"]}
              </div>
              <div class="item-after">
                State: ${result.places[i]['state']}
              </div>
            </div>
          </li>
        `);
    }
  });
}

//use the zippopotamus.us api to get zip, lat and lng
function getzip(city, state) {
  $$.get('http://api.zippopotam.us/us/'+state+'/'+city, {}, function (data) {
    var result = JSON.parse(data);
    $$('#get-zip-results').html('');
    for (var i = 0; i < result.places.length; i++) {
      $$('#get-zip-results').append(`
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">
                ${result.places[i]["post code"]}
              </div>
              <div class="item-after">
                Lat: ${result.places[i]['latitude']}, Lng: ${result.places[i]['longitude']}
              </div>
            </div>
          </li>
        `);
    }
  });
}
