// google maps init
var map;
function initMap() {
    var santaCruz = {
        lat: 36.9741171,
        lng: -122.0329903
    };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: santaCruz,
        mapTypeControl: false
    });

    infoWindow = new google.maps.InfoWindow();

    bounds = new google.maps.LatLngBounds();

    ko.applyBindings(viewModel);
}
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

var viewModel = {
    search: ko.observable("")
};