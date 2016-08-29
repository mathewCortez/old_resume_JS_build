function ViewModel() {

    var self = this;
    var map, city, infoWindow;
    var jamBaseApi = '2c3r8g3yg69xqjsjbgy23h4c';
    var geocoder = new google.maps.Geocoder();

    //Getting date for Jambase Api
    //http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript - this is where I found out how to find the date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    //just need to format it this way for the api call
    today = yyyy + '-' + mm + '-' + dd;

    //pushing Jambase data into this array
    this.currentConcerts = ko.observableArray([]);

    //holds mapmarkers
    this.mapMarkerList = ko.observableArray([]);

    //binding for search input, status and location
    this.searchBar = ko.observable();
    this.searchLocation = ko.observable('02108');
    //value from search
    this.searchList = ko.observableArray([]);
    this.toggleVal = ko.observable('hide');
    this.changeClass = ko.observable(false);
    
    this.toggleClass = function () {
        console.log(this.changeClass());
        if (this.changeClass() === false) {
            this.changeClass(true);
            console.log(this.changeClass());
        }
        else {
            this.changeClass(false);
            console.log(this.changeClass());
        }
    };

    //When a concert is clicked, this function goes to corresponding marker and open its info window.
    this.findMarker = function(clickedConcert) {
        var clickedConcertName = clickedConcert.concertArtist;
        for (var key in self.mapMarkerList()) {
            if (clickedConcertName === self.mapMarkerList()[key].marker.title) {
               

                //adds bounce animation to marker
                google.maps.event.trigger(self.mapMarkerList()[key].marker, 'click');
            }
        }
    };

    this.searchLoc = function() {
        
        var newLat;
        var newLng;
        self.searchLocation();
        self.currentConcerts([]);
        self.searchList([]);
        console.log(self.currentConcerts());
        console.log(self.searchLocation());
        self.mapMarkerList([]);
//        mapMarkers(null);
//        markers = [];
        
        function clearMarkers() {
            
        }
        
        getMusic(self.searchLocation());
        
        zipToCoord(self.searchLocation());

        function zipToCoord(zipcode) {
            geocoder.geocode({'address': zipcode + ', USA'},
                function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var point = results[0].geometry.location;
                        newLat = point.lat();
                        newLng = point.lng();
                        console.log("new lat: " + newLat +" new lng: " + newLng);
                    }
                    moveMap(newLat, newLng);
                });
        }
        function moveMap(lat, lng) {
            console.log("Started recenter");
            var newLatLng = new google.maps.LatLng(lat, lng);
            map.panTo(newLatLng);
        }
        
    
    };
    
    this.searchResults = function() {
        var searchElem = self.searchBar().toLowerCase();
        console.log('search elem: ' + searchElem);
        var array = self.currentConcerts();

        //clear search array before starting
        self.searchList([]);

        //loop through array to find search results
        for (i = 0; i < array.length; i++) {
            if (array[i].concertArtist.toLowerCase().indexOf(searchElem) != -1) {
                self.mapMarkerList()[i].marker.setMap(map);
                self.searchList.push(array[i]);
                console.log('currentConcert listing' + array[i].concertArtist);
            } else {
                self.mapMarkerList()[i].marker.setMap(null);
            }
        }
    };

    //toggles lists to show concerts and can be toggled back
    this.toggleList = function() {
        console.log('toggleList called!');
        if (self.toggleVal() === 'hide') {
            self.toggleVal('show');
        } else {
            self.toggleVal('hide');
        }
    };

    //google maps error check 
    this.mapRequestTimeout = setTimeout(function() {
        alert('Error loading Google Maps.');
    });

    //initializes map and canvas, populates with info from api
    function initMap() {
        lat = 42.363885;
        lng = -71.101504;
        city = new google.maps.LatLng(lat, lng);
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: city,
            zoom: 12,
            zoomControlOptions: {
                //google maps buttons
                position: google.maps.ControlPosition.RIGTH_BOTTOM,
                style: google.maps.ZoomControlStyle.SMALL
            },
            streetViewControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            mapTypeControl: false,
            panControl: false
        });
        clearTimeout(self.mapRequestTimeout);

        google.maps.event.addDomListener(window, "resize", function() {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });

        infoWindow = new google.maps.InfoWindow({
            maxWidth: 250
        });

        getMusic('02108');

    }

    function getMusic(location) {
        var jamBaseUrl = 'http://api.jambase.com/events?zipCode=' + location + '&radius=25&startDate=' + today + '&page=0&api_key=' + jamBaseApi;

        $.ajax({
                url: jamBaseUrl,
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                    var concerts = data.Events;
                    var len = concerts.length;

                    for (var i = 0; i < len; i++) {
                        var venue = concerts[i].Venue;
                        var artist = concerts[i].Artists[0].Name;
                        var ticketUrl = concerts[i].TicketUrl;
                        venueLat = venue.Latitude;
                        venueLng = venue.Longitude;
                        venueName = venue.Name;
                        venueAddress = venue.Address;
                        venueCity = venue.City;
                        venueState = venue.State
                        venueZip = venue.ZipCode;
                        self.currentConcerts.push({
                            concertLat: venueLat,
                            concertLng: venueLng,
                            concertVenueName: venueName,
                            concertArtist: artist,
                            concertAddress: venueAddress,
                            concertCity: venueCity,
                            concertState: venueState,
                            concertZip: venueZip,
                            concertUrl: ticketUrl
                        });
                    }
                    console.log('currentconcerts object: ' + self.currentConcerts());
                    self.searchList(self.currentConcerts());
                    //loads mapmarkers.
                    mapMarkers(self.currentConcerts());
                }
            })
            .fail(function() {
                alert('Error loading JamBase Api');
            });

    }

    //creates loads map markers and info windows on the map from API
    function mapMarkers(array) {
        arrayVal = array[0];
        len = array.length;
        console.log('array length: ' + len);


        $.each(array, function(index, value) {
            var lat = value.concertLat;
            var lng = value.concertLng;
            
            if (lat === 0 && lng === 0) {
                var lat = 42.361476;
                var lng = -71.057690;
            }
            
            var geoLng = new google.maps.LatLng(lat, lng);
            var thisArtist = value.concertArtist;

            var contentString = '<div id="info-window">' + '<h4>    Artist: ' + value.concertArtist + '</h4>' + '<h5> Venue: ' + value.concertVenueName + '</h5>' + '<h6> Address: ' + value.concertAddress + ', ' + value.concertCity + ', ' + value.concertState + " " + value.concertZip + '</h6>';
            
            if ( value.concertUrl !== "" ) {
                contentString +=  '<a href="' + value.concertUrl + '">Get Tickets</a>';
            }
            contentString +='</div>';

            var marker = new google.maps.Marker({
                position: geoLng,
                title: thisArtist,
                //animation causes a flicker
                animation: google.maps.Animation.DROP,
                map: map
            });

            //this is used to grab data from list view
            self.mapMarkerList.push({
                marker: marker,
                content: contentString
            });

            //concert event listener, opens popup and bounces the marker
            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.setContent(contentString);
                infoWindow.open(map, marker);
                toggleBounce();
            });

            //function to bounce the marker
            function toggleBounce() {
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);

                    setTimeout(function() {
                        marker.setAnimation(null);
                    }, 800);
                }
            }
        });
    }
    initMap();
}

function loadApp() {
    ko.applyBindings(new ViewModel());
}

//error google alert
function googleError() {
    alert('Google Maps Load Error');
}