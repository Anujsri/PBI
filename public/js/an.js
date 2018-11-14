$(document).ready(function() {
   
   





    graphs();
 function graphs(){
     var a = document.getElementById('anuj').value;
     console.log(a);
        var decodedJson = decodeURIComponent(a);
    var jsonob=JSON.parse(decodedJson);
    var count=Object.keys(jsonob).length;
        var price=[];
        var product=[];
        for(var i=0;i<count;i++)
        {  
          price.push(jsonob[i].price);
          product.push(jsonob[i].productname);


        }

var trace2 = {
  x: product,
  y: price,
  name: 'Price',
marker:{
  color:(128,101,128),
  width:1.0},
  type: 'bar'
};



var data = [trace2];

var layout = {
  title: 'Variation of Product Price Range.',
  xaxis: {
    title: 'Product Name'
  },
  yaxis: {
    title:'Product Price'
  },
  color:(128,118,101)
   
};

Plotly.newPlot('myDiv', data, layout);

    }
   
                $("#sidebar").mCustomScrollbar({
                    theme: "minimal"
                });
                   
                $('#sidebarCollapse').on('click', function () {
                   $('#sidebar, #content').toggleClass('active');
                    $('.collapse.in').toggleClass('in');
                    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
                });
             

 var panels = $('.user-infos');
    var panelsButton = $('.dropdown-user');
    panels.hide(); 

    kindProduct();

    function kindProduct(){
      axios.get('/admin/differentproduct/').then(function(response){
          document.getElementById('kind').innerHTML = response.data.length;
          console.log("Products : " + response.data[0].productname);   
      });
    }

    orderedProduct();

    function orderedProduct() {
        axios.get('/admin/orderedproduct/').then(function(response){
              document.getElementById('totalorder').innerHTML = response.data.length; 
                   
        });
    }
    allCustomer()
    function allCustomer(){
        axios.get('/admin/totalcustomer/').then(function(response){
            document.getElementById('totalcustomers').innerHTML = response.data.length; 
                   
       });
    } 

    vendorRequest();
    function vendorRequest(){
        axios.get('/admin/vendorrequest/').then(function(response){
            document.getElementById('vrequest').innerHTML = response.data.length;
        });
    }

    productRequset();
    function productRequset(){
        axios.get('/admin/productrequest/').then(function(response){
            document.getElementById('prequest').innerHTML = response.data.length;

        });
    }


 
});