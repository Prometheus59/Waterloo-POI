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

var viewModel = function() {
    initMap();
    var self = this;
    this.search = ko.observable('');
    this.list = ko.observableArray([]);

    function updateList(locationItem) {
        self.list.push(locationItem);
    }

    places.forEach(updateList)
};  

function initApp() {
    ko.applyBindings(new viewModel());
}