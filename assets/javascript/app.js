var states = [{
      "name": "Alabama",
      "abbreviation": "AL"
   },
   {
      "name": "Alaska",
      "abbreviation": "AK"
   },
   {
      "name": "Arizona",
      "abbreviation": "AZ"
   },
   {
      "name": "Arkansas",
      "abbreviation": "AR"
   },
   {
      "name": "California",
      "abbreviation": "CA"
   },
   {
      "name": "Colorado",
      "abbreviation": "CO"
   },
   {
      "name": "Connecticut",
      "abbreviation": "CT"
   },
   {
      "name": "Delaware",
      "abbreviation": "DE"
   },
   {
      "name": "Florida",
      "abbreviation": "FL"
   },
   {
      "name": "Georgia",
      "abbreviation": "GA"
   },
   {
      "name": "Hawaii",
      "abbreviation": "HI"
   },
   {
      "name": "Idaho",
      "abbreviation": "ID"
   },
   {
      "name": "Illinois",
      "abbreviation": "IL"
   },
   {
      "name": "Indiana",
      "abbreviation": "IN"
   },
   {
      "name": "Iowa",
      "abbreviation": "IA"
   },
   {
      "name": "Kansas",
      "abbreviation": "KS"
   },
   {
      "name": "Kentucky",
      "abbreviation": "KY"
   },
   {
      "name": "Louisiana",
      "abbreviation": "LA"
   },
   {
      "name": "Maine",
      "abbreviation": "ME"
   },
   {
      "name": "Maryland",
      "abbreviation": "MD"
   },
   {
      "name": "Massachusetts",
      "abbreviation": "MA"
   },
   {
      "name": "Michigan",
      "abbreviation": "MI"
   },
   {
      "name": "Minnesota",
      "abbreviation": "MN"
   },
   {
      "name": "Mississippi",
      "abbreviation": "MS"
   },
   {
      "name": "Missouri",
      "abbreviation": "MO"
   },
   {
      "name": "Montana",
      "abbreviation": "MT"
   },
   {
      "name": "Nebraska",
      "abbreviation": "NE"
   },
   {
      "name": "Nevada",
      "abbreviation": "NV"
   },
   {
      "name": "New Hampshire",
      "abbreviation": "NH"
   },
   {
      "name": "New Jersey",
      "abbreviation": "NJ"
   },
   {
      "name": "New Mexico",
      "abbreviation": "NM"
   },
   {
      "name": "New York",
      "abbreviation": "NY"
   },
   {
      "name": "North Carolina",
      "abbreviation": "NC"
   },
   {
      "name": "North Dakota",
      "abbreviation": "ND"
   },
   {
      "name": "Ohio",
      "abbreviation": "OH"
   },
   {
      "name": "Oklahoma",
      "abbreviation": "OK"
   },
   {
      "name": "Oregon",
      "abbreviation": "OR"
   },
   {
      "name": "Palau",
      "abbreviation": "PW"
   },
   {
      "name": "Pennsylvania",
      "abbreviation": "PA"
   },
   {
      "name": "Rhode Island",
      "abbreviation": "RI"
   },
   {
      "name": "South Carolina",
      "abbreviation": "SC"
   },
   {
      "name": "South Dakota",
      "abbreviation": "SD"
   },
   {
      "name": "Tennessee",
      "abbreviation": "TN"
   },
   {
      "name": "Texas",
      "abbreviation": "TX"
   },
   {
      "name": "Utah",
      "abbreviation": "UT"
   },
   {
      "name": "Vermont",
      "abbreviation": "VT"
   },
   {
      "name": "Virginia",
      "abbreviation": "VA"
   },
   {
      "name": "Washington",
      "abbreviation": "WA"
   },
   {
      "name": "West Virginia",
      "abbreviation": "WV"
   },
   {
      "name": "Wisconsin",
      "abbreviation": "WI"
   },
   {
      "name": "Wyoming",
      "abbreviation": "WY"
   }
];

$(document).ready(function () {

   var clientIDFoursquare = "QIQOY4DP1NMCYBBDMXYYQOYI0TQDGUX0WJRR5QUJZYV2NLUD";
   var clientSecret = "P34QO4OTCFM4J5LFMU3MXH4B4GCXDTZ3EGPZCU1QBCCWBZ0Y"

   var query = "restaurant"
   var responsesLimit = 30
   var searchInput = "";

   var schoolZip;

   for (var i = 0; i < states.length; i++) {
      stateChoice = $("<option>").text(states[i].name).attr("value", states[i].abbreviation);
      $("#state-selection").append(stateChoice);
   };

   $("#state-selection").change(function () {

      var stateSchools = [];
      var dataGovPageNumber = 0;
      var resultsTotal = 0;
      var totalNumberOfSchools = 0;

      $("#school-selection").empty();
      searchInput = $(this).val();
      $("#school-selection").append($("<option>").text("Choose an Institution"));
      $("#school-group").show();

      getInstitution(dataGovPageNumber);

      $("#search").on("click", function () {
         event.preventDefault();

         // Pulls stored school-id from option HTML element
         searchSchoolId = $("#school-selection option:selected").attr("data-id");

         // WORKING BY COLLEGE
         $.ajax({
            url: `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=B8ab3aPW1VmB52ZmHPMpgyftQXVVd1aRiDbYbnxl&id=${searchSchoolId}`,
            method: "GET"
         }).then(function (response) {
            var results = response.results[0];
            var schoolName = results.school.name;
            var schoolCostDiv = $("<div>").text(schoolName + " has an average year cost of " + results.latest.cost.avg_net_price.overall);
            var schoolSizeDiv = $("<div>").text(schoolName + " has " + results.latest.student.enrollment.all + " students currently enrolled.");
            schoolZip = results.school.zip;
            $("#results").append(schoolCostDiv, schoolSizeDiv);

            // OpenWeatherMap Search by School Zip
            $.ajax({
               url: `https://api.openweathermap.org/data/2.5/weather?q=${schoolZip}&APPID=9f948945c2a7499da3eb43a912f67a23`,
               method: "GET",
               success: function (response) {
                  console.log(response);
                  var tempF = (Math.floor((response.main.temp - 273.15) * 1.80 + 32));
                  $("#results").append("The current temp at " + schoolName + " is " + tempF + ".")
               },
               error: function () {
                  $("#results").append("Whoops! 😕 This is not a valid location.");
               }
            });

         });
 
      });

      function getInstitution(num) {
         $.ajax({
            url: `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=B8ab3aPW1VmB52ZmHPMpgyftQXVVd1aRiDbYbnxl&school.state=${searchInput}&_fields=school.name,id&_per_page=100&_page=${dataGovPageNumber}&_sort=school.name`,
            method: "GET"
         }).then(function (response) {
            var results = response.results;
            console.log(results);
            var resultsLength = response.results.length; // 100
            totalNumberOfSchools = response.metadata.total; // 176
            resultsTotal = resultsTotal + resultsLength;
            // Loops through the results to dynamically create dropdown menu options.
            for (var j = 0; j < results.length; j++) {
               schoolChoice = $("<option>").text(results[j]["school.name"]);
               schoolChoice.attr("value", results[j]["school.name"]);
               schoolChoice.attr("data-id", results[j]["id"]);
               $("#school-selection").append(schoolChoice);
            };
            // Increments the page request in order to pull the next sets of institutions.
            dataGovPageNumber++;
            console.log(resultsTotal);
            // The function calls itself if there are more schools than the result query max of 100.
            if (resultsTotal < totalNumberOfSchools) {
               getInstitution(num);
            }
         });
      };

   });

//On-Click function for when event topic card is clicked. Making call to FourSquare API for fitness in the area.
   $("#fitnessButton").on("click", function(){
      event.preventDefault();
      query = "fitness";
      schoolZip = "";
      var queryURL = `https://api.foursquare.com/v2/venues/explore?client_id=${clientIDFoursquare}&client_secret=${clientSecret}&v=20180323&limit=${responsesLimit}&near=${schoolZip}&query=${query}`;
      $.ajax({
         url: queryURL,
         method: 'GET',
         dataType: 'json',
         qs: {
            client_id: clientIDFoursquare,
            client_secret: clientSecret,
            near: schoolZip,
            query: query,
            limit: responsesLimit
         }
      }).then(function (response) {
         console.log(response);
      });
      $("#results").append() //<--Need card elements to append with results inserted into them

   });
});

