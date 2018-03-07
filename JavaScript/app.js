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
    self.vision = ko.observable(1);
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


    // filter using filter bar
    var filter = ko.computed(function () {
        var length = self.list().length; //Working

        for (var i = 0; i < length; i++) {
            var place = self.list()[i];
            if (place.name.toLowerCase().includes(self.search().toLowerCase())) {
                console.log("Filtered in " + place.name)
                place.vision(1); //This 'probably' isn't working either
            } else {
                console.log("Filtered out " + place.name)
                place.vision(0); // This isn't working TODO: change value to 0.
            }
        }
        console.log("Completed");
    })
    
};


function initApp() {
    ko.applyBindings(new viewModel());
}