function allProduct(){
    axios.get('/admin/product/').then(function(response){
          console.log("all product");  
    });
}

function allManufacture(){
    axios.get('/admin/manufacturer/').then(function(response){
        console.log("Location : " + response.data[0].name);    
    });
}
  
var id2;                                              
function productDetail(id){
    axios.get('/product/productdetail/'+id).then(function(response){
        document.getElementById('pdescription').innerHTML = response.data.description;
        document.getElementById('pproductname').innerHTML = response.data.productname;
        document.getElementById('pcategory').innerHTML = response.data.category;
        document.getElementById('psubcategory').innerHTML =  response.data.subcategory;
        document.getElementById('pweight').innerHTML =  response.data.weight;
        document.getElementById('pquantity').innerHTML =  response.data.quantity;
        document.getElementById('pprice').innerHTML =  response.data.price;
        document.getElementById('pmanufacturingdate').innerHTML = response.data.manufacturingdate;
        document.getElementById('pbestbefore').innerHTML =  response.data.bestbefore;
        document.getElementById('plocation').innerHTML = response.data.location;
        document.getElementById('pcity').innerHTML ="<b>City : </b>" +  response.data.city;
        document.getElementById('pstate').innerHTML ="<b>State : </b>" +  response.data.state;
        document.getElementById('pzip').innerHTML ="<b>zip : </b>" + response.data.zip;

        //document.getElementById("image").src = "../uploads/"+response.data.product_image;
        id2 = response.data._id;
    });
}

function accept(){
  axios.get('/admin/accept/'+id2).then(function(response){
       $( "#reloadmanufacturer").load(window.location.href + "#reloadmanufacturer" );
  });  
}

function reject(){
    axios.get('/admin/reject/'+id2).then(function(response){
         $( "#reloadmanufacturer").load(window.location.href + "#reloadmanufacturer" );
    });  
}
var id3;
function vendorDetail(id){
  var id = id;
  axios.get('/admin/vendordetails/'+id).then(function(response){
      document.getElementById('mname').innerHTML    =  response.data.name;
      document.getElementById('memail').innerHTML   =  response.data.email;
      document.getElementById('mphone').innerHTML   =  response.data.phone;
      document.getElementById('maddress').innerHTML =  response.data.address;
      document.getElementById('mncity').innerHTML   =   response.data.city;
      document.getElementById('mstate').innerHTML   =  response.data.state;
      document.getElementById('mzip').innerHTML     =  response.data.zip;
      id3 = response.data._id;
  });  
}

function maccept(){
  axios.get('/admin/maccept/'+id3).then(function(response){
       $( "#reloadmanufacturer").load(window.location.href + "#reloadmanufacturer" );
  });  
}

function mreject(){
  axios.get('/admin/mreject/'+id3).then(function(response){
      $( "#reloadmanufacturer").load(window.location.href + "#reloadmanufacturer");
  });  
}

function manufactureName(){
    myVar = setTimeout(showPage, 2500); 
    axios.get('/manufacture/detail/'+ id2).then(function(response){
      document.getElementById('name').innerHTML =  response.data.name;
      document.getElementById('email').innerHTML =  response.data.email;
      document.getElementById('phone').innerHTML =  response.data.phone;
      document.getElementById('address').innerHTML =  response.data.address;
      document.getElementById('mcity').innerHTML =  response.data.city;
      document.getElementById('state').innerHTML =  response.data.state;
      document.getElementById('zip').innerHTML =  response.data.zip;  
  }); 
}
function showPage(){
      document.getElementById("loader").style.display = "none";
      document.getElementById("wait").style.display = "block";
    
}
