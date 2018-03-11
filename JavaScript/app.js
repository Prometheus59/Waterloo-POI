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
    self.vision = ko.observable(true);
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
    var filter = ko.computed(function () {

        var filtration = self.search().toLowerCase();

        if (!filtration) {
            //Show all list items since no filter is set
            self.list().forEach(function(locationItem){
                locationItem.vision(true); // This is being activated
            });
            console.log("Filter 1 completed");
        } else {
            //Filter list items according to search (http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html)
            ko.utils.arrayFilter(self.list(), function(locationItem) {
                var result = (locationItem.name.toLowerCase().includes(self.search().toLowerCase()));
                locationItem.vision(result); // This is not triggering
                console.log(result);
                console.log(locationItem.name + " is " + locationItem.vision());
            });
            console.log("Filter 2 completed");
        }
    })
};

function initApp() {
    ko.applyBindings(new viewModel());
}