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
    var country = $$('#country').val();
    var city = $$('#city').val();
    var state = $$('#state').val();
    e.preventDefault();
    getzip(country,city,state);
  });
})

//capture zipcode data
myApp.onPageInit('get-city', function (page) {
  $$('#get-city-form').on('submit', function (e) {
    var country = $$('#country').val();
    var zip = $$('#zip').val();
    e.preventDefault();
    getcity(country,zip);
  });
})

//use the zippopotam.us api to get city
function getcity(country, zip) {
  $$.ajax({
    type: "GET",
    url: 'http://api.zippopotam.us/'+country+'/'+zip,
    error: function(xhr, statusText) {
      $$('#get-city-results').html('');
      $$('#get-city-results').append(`
        <li class="item-content">
          <div class="item-inner">
            <div class="item-title">
              <h5>OOPS! Zipcode not found in the selected country</h5>
            </div>
            <div class="item-after">

            </div>
          </div>
        </li>
        `);
    },
    success: function(data){
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
                  State: ${result.places[i]['state']}, ${result.places[i]['state abbreviation']}
                </div>
              </div>
            </li>
          `);
      }
    }
  });
}

//use the zippopotamus.us api to get zip and place name
function getzip(country, city, state) {
  $$.ajax({
    type: "GET",
    url: 'http://api.zippopotam.us/'+country+'/'+state+'/'+city,
    error: function(xhr, statusText) {
      $$('#get-zip-results').html('');
      $$('#get-zip-results').append(`
        <li class="item-content">
          <div class="item-inner">
            <div class="item-title">
              <h5>OOPS! City or State not found in the selected country</h5>
            </div>
            <div class="item-after">

            </div>
          </div>
        </li>
        `);
    },
    success: function(data){
      var result = JSON.parse(data);
      $$('#get-zip-results').html('');
      for (var i = 0; i < result.places.length; i++) {
        $$('#get-zip-results').append(`
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                    ${result.places[i]["place name"]}
                </div>
                <div class="item-after">
                  ${result.places[i]["post code"]}
                </div>
              </div>
            </li>
          `);
      }
    }
  });
}
