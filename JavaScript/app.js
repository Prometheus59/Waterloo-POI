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

// Creates infoWindow and attaches to marker
function initInfoWindow(marker) {
/*
    var infoWindow = new google.maps.InfoWindow({
        content: marker.title
    })
*/

    marker.addListener('click', function () {
        infoWindow.setContent(marker.title);
        infoWindow.open(map, marker);
    });
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

                /*                 marker.addListener('click', function () {
                                    infoWindow.open(map, marker);
                                }); */

                initInfoWindow(marker);
                return marker;
            })()
        };
        self.list().push(location);
        console.log(location.marker.title + " successfully added");
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
    self.openIW = function (location) {

        var marker = location.marker;
        var map = marker.map;
        infoWindow.setContent(marker.title);
        infoWindow.open(map, marker);
    }
}

function initApp() {
    ko.applyBindings(new viewModel());
}