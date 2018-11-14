var loc = [];
var closest;
axios.get('/admin/locations').then(function(response){
    for(var i = 0 ; i<response.data.length ; i++){
        loc.push(response.data[i].location);
    }
});

//find latitude and longitude of cities
var locationForm = document.getElementById('location-form');
// Listen for submit
locationForm.addEventListener('submit', geocode);      
function geocode(e){
    var latcity = [];
    var langcity = [];
    var cities = [];
    var city_val = [];
    var lat;
    var lng;
    // Prevent actual submit
    e.preventDefault();
    for(var i = 0 ; i<loc.length;i++)
    {   
        var location =loc[i];
        axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
            params:{
                address:location,
                key:'AIzaSyCAQFA1nv7qPJQlXNWmXIDQD53MI9zB9U4'
           }
        })
        .then(function(response){
            lat = response.data.results[0].geometry.location.lat;
            lng = response.data.results[0].geometry.location.lng;
            city_val.push(location,lat,lng);
            cities.push(city_val);
        })
        .catch(function(error){
            console.log(error);
        });//console  
    }//end for
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
    function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude);
        console.log("Longitude: " + position.coords.longitude);
        NearestCity(position.coords.latitude, position.coords.longitude);
    }
    function Deg2Rad(deg) {
        return deg * Math.PI / 180;
    }
    function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
        lat1 = Deg2Rad(lat1);
        lat2 = Deg2Rad(lat2);
        lon1 = Deg2Rad(lon1);
        lon2 = Deg2Rad(lon2);
        var R = 6371; // km
        var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
        var y = (lat2 - lat1);
        var d = Math.sqrt(x * x + y * y) * R;
        return d;
    }

    function NearestCity(latitude, longitude) {
        var mindif = 99999;
        
        for (index = 0; index < cities.length; ++index) {
            var dif = PythagorasEquirectangular(latitude, longitude, cities[index][1], cities[index][2]);
            if (dif < mindif) {
                closest = cities[index][0];
                mindif = dif;
            }
        }    

        var near = document.getElementById('near');
        if(closest === undefined){
            near.innerHTML = "Click Again to get Nearest City";  
        } 
        else{
              
             var nearprice = document.getElementById('nearprice');
            axios.post("/admin/nearcity", { postContent: closest }).then(function(response){
                 
                 
                for(var i = 0 ; i<response.data.length ; i++){
                    var div = document.createElement('div');
                    div.setAttribute('class','well shadow');
                    div.textContent = "User Name : " + response.data[i].username + " , " + 
                    "Name  : " + response.data[i].name +" , " + "Price : " + response.data[i].price
                    + " , " + "Location :  " + response.data[i].location + " ," + 
                    "Manfacturing Date :  "  + response.data[i].manufacturing_date;
                    nearprice.appendChild(div);
                    }
            }); 

            near.innerHTML = "Nearest City : " + closest; 
             

            
        }   
       
        // echo the nearest city
    }//nearest city end
} //lat and lang code
                      
 

