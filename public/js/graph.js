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

    


    
    function g2()
    {
      var a = document.getElementById('harsh').value;
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
  type: 'lines',
  name: 'Write Throughput (Mb/sec)'
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
  
};

Plotly.newPlot('myDiv', data, layout);



    }


function g3()
    {
      var a = document.getElementById('abhishek').value;
        var decodedJson = decodeURIComponent(a);
    var jsonob=JSON.parse(decodedJson);
    var count=Object.keys(jsonob).length;
        var cr=[];
        var product=[];
        var ss=[];
        for(var i=0;i<count;i++)
        {  
          product.push(jsonob[i].product);
          cr.push(jsonob[i].current_stock);
          ss.push(jsonob[i].stock_sold);


        }


var trace1 = {
  x: cr,
  y: product,
  name:'Current Stock',
  orientation:'h',
  marker:{
    color:(0,0,128),
    width:1.2
  },
  type: 'bar'
  
};

var trace2 = {
   x: ss,
  y: product,
  name:'Stock Sold',
  orientation:'h',
  marker:{
    color:(255,0,0),
    width:0.8
  },
  type: 'bar'
  
};



var data = [trace1,trace2];

var layout = {
 title: 'Current Stock Vs Stock Sold(monthly)',
  barmode: 'stack',
   
 
  
};

Plotly.newPlot('myDiv', data, layout);



    }


    function g4()
    {
      var a = document.getElementById('yo').value;
        var decodedJson = decodeURIComponent(a);
    var jsonob=JSON.parse(decodedJson);
    var count=Object.keys(jsonob).length;
      var r=[];
      var product=[];
      var ss=[];
     for(var i=0;i<count;i++)
        {  
          product.push(jsonob[i].product);
          r.push(jsonob[i].rating);
          ss.push(jsonob[i].stock_sold);
        }
        var data = [{
  values: r,
  labels: product,
  domain: {
    x: [0, .48]
  },
  name: 'Rating Comparison',
  hoverinfo: 'label+value+name',
  hole: .4,
  type: 'pie'
},{
  values: ss,
  labels: product,
  text: 'Stock Sold',
  textposition: 'inside',
  domain: {x: [.52, 1]},
  name: 'Stock Sold Comparison',
  hoverinfo: 'label+value+name',
  hole: .4,
  type: 'pie'
}];

var layout = {
  title: 'Rating and Sold Stock Comparison',
  annotations: [
    {
      font: {
        size: 20
      },
      showarrow: false,
      text: 'Ratings',
      x: 0.17,
      y: 0.5
    },
    {
      font: {
        size: 20
      },
      showarrow: false,
      text: 'Stock Sold',
      x: 0.82,
      y: 0.5
    }
  ],
   
};
Plotly.newPlot('myDiv', data, layout);
}

function g5()
{
var a = document.getElementById('loc').value;
     console.log(a);
        var decodedJson = decodeURIComponent(a);
    var r=JSON.parse(decodedJson);
    var count=Object.keys(r).length;
        var product=[];
        var l=[];
        var status=[];
for(var i=0;i<count;i++)
        {
          l.push(r[i].state);
          status.push(0);

        }

 
var counter=0;
var occurence=[];
for(i=0;i<(count);i++)
{
   counter=0;
  var c_s=l[i];
  for(j=i;j<count;j++)
  {
    if(c_s==l[j]&&status[j]==0)
    {
       counter++;
       status[j]=1; 
       
  } 
}
    occurence.push(counter);
}

var data = [{
  values: occurence,
  labels:l,
  type: 'pie'
}];

var layout = {
   title: 'Rating and Sold Stock Comparison'
   
};


Plotly.newPlot('myDiv', data, layout);


}

 function g6()
 {

     var a = document.getElementById('anu').value;
     console.log(a);
        var decodedJson = decodeURIComponent(a);
    var jsonob=JSON.parse(decodedJson);
    var count=Object.keys(jsonob).length;
        var price=[];
        var product=[];
        var p=[];
         var l=[];
        for(var i=0;i<count;i++)
        {  
          price.push(jsonob[i].price);
          product.push(jsonob[i].productname);
        }
      
        
         
        for(var i=0;i<count;i++)
        {
          for( var j=i+1;j<count;j++)
          {
            if((price[i]<price[j])){
              
              var s=price[i];
              price[i]=jsonob[j].cost;
              jsonob[j].cost=s;

              s=product[i];
              product[i]=jsonob[i].name;
              jsonob[j].name=s;

              }
              }
              l.push((i+1)+"th");
        }
         
        
          
         
       
        var data = [{
  values: price,
  labels: product,
  domain: {
    x: [0, .50]
  },
  name: 'Price Comparison',
  hoverinfo: 'label+value',
  hole: .4,
  type: 'pie'
}];
var layout = {
  title: 'Price Comparison',
  annotations: [
    {
      font: {
        size: 25
      },
      showarrow: false,
      text: 'Price',
      x: 0.18,
      y: 0.55
    }]
  };
  Plotly.newPlot('myDiv', data, layout);





 }

 function g7()
 {

     var a = document.getElementById('an').value;
     console.log(a);
        var decodedJson = decodeURIComponent(a);
    var jsonob=JSON.parse(decodedJson);
    var count=Object.keys(jsonob).length;
        var price=[];
        var product=[];
        var p=[];
         var l=[];
        for(var i=0;i<count;i++)
        {  
          price.push(jsonob[i].stock_sold);
          product.push(jsonob[i].product);
        }
        price.sort(function( a, b ) { return b - a; });
        
         
        for(var i=0;i<count;i++)
        {
          for(var j=0;j<count;j++)
          {
            if((price[i]==jsonob[j].stock_sold)&&(product[i]==jsonob[j].product)){
              p.push(product[i]);
              }
              }
              l.push((i+1)+"th");
        }
         
        
          
       
       
        var data = [{
  values: price,
  labels: p,
  domain: {
    x: [0, .50]
  },
  name: 'Stock Sold Comparison',
  hoverinfo: 'label+value',
  hole: .4,
  type: 'pie'
}];
var layout = {
  title: 'Price Comparison',
  annotations: [
    {
      font: {
        size: 15
      },
      showarrow: false,
      text: 'Top Products by Stock Sold',
      x: 0.18,
      y: 0.55
    }],
    
  };
  Plotly.newPlot('myDiv', data, layout);





 }
function g8()
{
var a = document.getElementById('city').value;
     console.log(a);
        var decodedJson = decodeURIComponent(a);
    var r=JSON.parse(decodedJson);
    var count=Object.keys(r).length;
        var product=[];
        var l=[];
        var status=[];

for(var i=0;i<count;i++)
        {
          l.push(r[i].city);
          status.push(0);
        }

 
var counter=0;
var occurence=[];
for(i=0;i<count;i++)
{
   
  var c_s=l[i];
  for(j=i;j<count;j++)
  {
    if(c_s==l[j]&&status[j]==0){
       counter++;
        status[j]=1;
}
  } occurence.push(counter);
  counter=0;
}

var data = [{
  values: occurence,
  labels:l,
  type: 'pie'
}];

var layout = {

   title: 'City Wise Analysis'
  
   
};

Plotly.newPlot('myDiv', data, layout);


}
 
 function g9()
    {
      var a = document.getElementById('date').value;
            var decodedJson = decodeURIComponent(a);
    var jsonob=JSON.parse(decodedJson);
    var count=Object.keys(jsonob).length;
        var date=[];
        var product=[];
        for(var i=0;i<count;i++)
        {  
          date.push(jsonob[i].date);
          product.push(jsonob[i].productname);


        }


var trace1 = {
  type: "scatter",
  mode: "lines",
  name: 'Product Vs Date',
  x: product,
  y: name,
  line: {color: '#17BECF'}
}
var data=[trace1];
var layout = {
  title: 'Date Of Manufacture',
};



Plotly.newPlot('myDiv', data, layout);



    }
    function g10()
 {

     var a = document.getElementById('qty').value;
     console.log(a);
        var decodedJson = decodeURIComponent(a);
    var jsonob=JSON.parse(decodedJson);
    var count=Object.keys(jsonob).length;
        var qty=[];
        var product=[];
        var price=[];
         var l=[];
        for(var i=0;i<count;i++)
        {  
          qty.push(jsonob[i].quantity);
          product.push(jsonob[i].productname);
          price.push(jsonob[i].price);
        }
      
        
         
      /*  for(var i=0;i<count;i++)
        {
          for( var j=i+1;j<count;j++)
          {
            if((qty[i]<qty[j])){
              
              var s=qty[i];
              qty[i]=jsonob[j].quantity;
              jsonob[j].quantity=s;

              s=product[i];
              product[i]=jsonob[i].productname;
              jsonob[j].productname=s;

              }
              }
              l.push((i+1)+"th");
        }
        */ 
        
           
        var trace1 = {
  x: qty,
  y: product,
  name:'Quantity',
  orientation:'h',
  marker:{
    color:(0,0,128),
    width:1.2
  },
  type: 'bar'
  
};

var trace2 = {
   x: price,
  y: product,
  name:'Price',
  orientation:'h',
  marker:{
    color:(255,0,0),
    width:0.8
  },
  type: 'bar'
  
};



var data = [trace1,trace2];

var layout = {
 title: 'Price Vs Quantity Units(Added)',
  barmode: 'group', 
};
         
       
        
  Plotly.newPlot('myDiv', data, layout);





 }
