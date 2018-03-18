// Location Model
var places = [{
        name: 'place1',
        lat: 111,
        lng: 111
    },
    {
        name: 'place2',
        lat: 222,
        lng: 222
    },
    {
        name: 'place3',
        lat: 333,
        lng: 333
    },
    {
        name: 'place4',
        lat: 444,
        lng: 444
    },
    {
        name: 'place5',
        lat: 444,
        lng: 444
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

    infoWindow = new google.maps.InfoWindow();
    bounds = new google.maps.LatLngBounds();
}

// location knockout observable
var Location = function (data) {
    var self = this;

    self.name = data.name;
    self.lat = data.lat;
    self.lng = data.lng;
    self.setVisible = ko.observable(true);
}



var viewModel = function () {
    initMap();
    var self = this;
    self.search = ko.observable('');
    self.list = ko.observableArray([]);

    // update and display list of places
    function updateList(locationItem) {
        self.list.push(new Location(locationItem));
    }
    places.forEach(updateList);


    // filter 1.1
    this.filteredList = ko.computed(function () {
        // filters the list, stores list in result, shows result
        var result = [];
        for (var i = 0; i < self.list().length; i++) {
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