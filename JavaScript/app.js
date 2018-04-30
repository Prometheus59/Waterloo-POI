// Location Model
var places = [{
        name: 'Student Life Centre',
        lat: 43.471753,
        lng: -80.545351
    },
    {
        name: 'GoodLife Fitness Centre',
        lat: 43.480750,
        lng: -80.520274
    },
    {
        name: 'Walmart',
        lat: 43.470582,
        lng: -80.516222
    },
    {
        name: 'LCBO',
        lat: 43.462545,
        lng: -80.521887
    },
    {
        name: 'REV',
        lat: 43.470705,
        lng: -80.554095
    }
];

// google maps initialization
var map;

function initMap() {
    // Default location
    var waterloo = {
        lat: 43.4668,
        lng: -80.51639
    };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: waterloo,
        mapTypeControl: false
    });

    infoWindow = new google.maps.InfoWindow();
    bounds = new google.maps.LatLngBounds();
}

function attachListener(marker, content){
    marker.addListener('click', function () {
        infoWindow.setContent(content);
        infoWindow.open(marker.map, marker);
    });
}

// Initializes infowindow with data
// TODO: Self is causing all the options to be one location -> Need to change 'self' positioning
function initInfoWindow(marker) {

    var self = this;
    this.lat = marker.getPosition().lat();
    this.lng = marker.getPosition().lng();

    this.name = '';
    this.city = '';
    this.contact = '';
    this.address = '';

    var clientId = "UXTL0ME5FM14HX40LDSXO5OUOMJYRDOU1PDYECVGVYWZ1ETG";
    var clientSecret = "YN2CEQJKAAU5W01O4VTPO0P3PYCKJ4QAGEJEEHPJO5DSLDX0";
    var version = "20180429";
    var foursquare_url = "https://api.foursquare.com/v2/venues/search?ll=" + this.lat + "," + this.lng + "&client_id=" + clientId + "&client_secret=" + clientSecret + "&query=" + marker.title + "&v=" + version;

    // Reads the JSON response from foursquare, puts data into infowindow
    $.getJSON(foursquare_url).done(function (data) {
        var result = data.response.venues[0];
        self.result = data.url;
        self.name = marker.title;
        try {
            self.address = result.location.formattedAddress[0]
        } catch (err) {
            'No location provided'
        }
        //self.address = result.location.formattedAddress[0] || 'No location provided';
        self.city = result.location.formattedAddress[1] || 'No city provided';
        try {
            self.contact = result.contact.phone;
        } catch (err) {
            self.contact = 'No phone number provided';
        }

        // self.contact = result.contact.phone || 'No phone number provided';
        /* console.log(self.name + " is self.name inside");
        console.log(self.address + " is self.address inside");
        console.log(self.city + " is self.city inside"); */
        console.log(marker.title + " is the marker");

        self.content = "<div><b>" + self.name + "</b></div>" + "<div><b>" + self.address + "</b></div>" + "<div><b>" + self.city + "</b></div>" + "<div><b>" + self.contact + "</b></div>";

        attachListener(marker, self.content);

    }).fail(function () {
        alert("A problem has occurred with the foursquare api. Please refresh the page to continue.")
    });

    // Testing
    /* console.log(self.name + " is self.name");
    console.log(self.address + " is self.address");
    console.log(self.city + " is self.city");
    console.log("self.content is       : " + self.content); */

}


var viewModel = function () {
    initMap();
    var self = this;
    self.search = ko.observable('');
    self.list = ko.observableArray([]);

    // location knockout observable
    function initMarkers(data) {

        var location = {
            setVisible: ko.observable(true),
            marker: (function () {


                var myLatLng = {
                    lat: data.lat,
                    lng: data.lng
                };


                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    title: data.name
                })

                initInfoWindow(marker);
                return marker;
            })()
        };
        self.list().push(location);
        //console.log(location.marker.title + " successfully added");
    }

    places.forEach(initMarkers);

    // filter 1.1
    this.filteredList = ko.computed(function () {

        // filters the list, stores list in result, shows result

        for (var i = 0; i < self.list().length; i++) {
            var place = self.list()[i];
            if (place.marker.title.toLowerCase().includes(self.search()
                    .toLowerCase())) {

                place.setVisible(true);
                place.marker.setMap(map);
            } else {
                place.setVisible(false);
                place.marker.setMap(null);
            }
        }
    }, this);


    // allows list to be clickable
    // May want to move to the other infowindow open section
    // to allow for use of 'self.content(?)'
    self.openIW = function (location) {

        // TODO: Don't remake content, use other function.
        // This should only open infoWindows
        var marker = location.marker;
        var map = marker.map;
        infoWindow.setContent(marker.title);
        infoWindow.open(map, marker);
    }
}

function initApp() {
    ko.applyBindings(new viewModel());
}