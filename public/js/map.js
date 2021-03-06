function showmap(){
  var a = document.getElementById('anuj').value;    
  var decodedJson = decodeURIComponent(a);
  var jsonob=JSON.parse(decodedJson);
  var count=Object.keys(jsonob).length;
  var locations = [];
     for(var i=0;i<count;i++)
        {   
          var loc = [];
          var add  = jsonob[i].address + ','+ jsonob[i].city +',' + jsonob[i].state + ',' + jsonob[i].zip;  
          var name = jsonob[i].name;
          loc.push(name,add);
          locations.push(loc) ;          
        } 

        initialize(locations);
}

var geocoder;
var map;
var bounds = new google.maps.LatLngBounds();

 function initialize(locations) {
  map = new google.maps.Map(
    document.getElementById("map_canvas"), {
      center: new google.maps.LatLng(22.9734, 78.6569),
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  geocoder = new google.maps.Geocoder();

  for (i = 0; i < locations.length; i++) {


    geocodeAddress(locations, i);
  }
}
google.maps.event.addDomListener(window, "load", initialize);

function geocodeAddress(locations, i) {
  var title = locations[i][0];
  var address = locations[i][1];
  var url = locations[i][2];
  geocoder.geocode({
      'address': locations[i][1]
    },

    function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
          map: map,
          position: results[0].geometry.location,
          title: title,
          animation: google.maps.Animation.DROP,
          address: address,
          url: url
        })
        infoWindow(marker, map, title, address, url);
        bounds.extend(marker.getPosition());
        map.fitBounds(bounds);
      } else {
        alert("geocode of " + address + " failed:" + status);
      }
    });
}

function infoWindow(marker, map, title, address, url) {
  google.maps.event.addListener(marker, 'click', function() {
    var html = "<div><h3>" + title + "</h3><p>" + address + "<br></div></p></div>";
    iw = new google.maps.InfoWindow({
      content: html,
      maxWidth: 350
    });
    iw.open(map, marker);
  });
}

function createMarker(results) {
  var marker = new google.maps.Marker({
    icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
    map: map,
    position: results[0].geometry.location,
    title: title,
    animation: google.maps.Animation.DROP,
    address: address,
    url: url
  })
  bounds.extend(marker.getPosition());
  map.fitBounds(bounds);
  infoWindow(marker, map, title, address, url);
  return marker;
}