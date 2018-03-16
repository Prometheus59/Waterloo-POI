// Location Model
var places = [{
        name: 'Student Life Centre',
        lat: 43.471753,
        lng: -80.545351
    },
    {
        name: 'GoodLife Fitness Centre',
        lat: 43.28484,
        lng: -80.31129
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
    var waterloo = {
        lat: 43.4668,
        lng: -80.51639
    };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: waterloo,
        mapTypeControl: false
    });

    //infoWindow = new google.maps.InfoWindow();
    // bounds = new google.maps.LatLngBounds();
}

/* location knockout observable
var Location = function(data) {
    var self = this;

    self.name = data.name;
    self.lat = data.lat;
    self.lng = data.lng;
    self.setVisible = ko.observable(true);
} */


var viewModel = function () {
    initMap();
    var self = this;
    self.search = ko.observable('');
    self.list = ko.observableArray([]);


    var location = places[i];
    for (var i = 0; i < places.length; i++) {
        var marker = new google.maps.Marker({
            title: location.name,
            map: map,
            position: {
                lat: location.lat,
                lng: location.lng
            },
            animation: google.maps.Animation.DROP
        });
        var infowindow = new google.maps.InfoWindow({
            content: title
        });
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    }


    // update and display list of places --> Change so that it updates map
    /*
    function updateList(locationItem) {
        self.list.push(new Location(locationItem));
    }
    places.forEach(updateList);
    */

    // filter 1.3
    this.filteredList = ko.computed(function () {
        var result = [];
        var len = self.list().length;
        for (var i = 0; i < len; i++) {
            var place = self.list()[i];
            if (place.name.toLowerCase().includes(this.search()
                    .toLowerCase())) {
                result.push(place);
                self.list()[i].setVisible(true);
            } else {
                self.list()[i].setVisible(false);
            }
        }
        return result;
    }, this);
}

function initApp() {
    ko.applyBindings(new viewModel());
}