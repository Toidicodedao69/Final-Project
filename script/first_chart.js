
"use strict";
var w = 800;//width of 800px
var h = 600;//height of 600px
var padding = 20;

//it will register functions that will respond to browser events
function init() {
    apply();
};

window.addEventListener("load",init);

function apply() {
    
    var projection = d3.geoMercator()// make 3D shape in 2D surface
                        .center([135,-26.5])
                        .translate([w/2,h/2])
                        .scale([700]);// 1:2450;
    var path = d3.geoPath()
        .projection(projection);
    //declare svg
    var svg55 = d3.select("#first")
                .append("svg")
                .attr("id", "first_geo")
                .attr("width", w)
                .attr("height", h)
                .attr("fill","grey");
    //declare scale
    var thresholdScale = d3.scaleThreshold()
                  .domain([ -10000,-5000,-500,0,500,5000, 25000, 50000, 75000, 100000])
                  .range(["#8c510a","#bf812d","#dfc27d","#f6e8c3","#c7eae5","#d0d1e6","#a6bddb", "#80cdc1",
                "#35978f", "#01665e", "#003c30"]);
      //create margin
  var margin = {top: 30, right: 30, bottom: 70, left: 60},
  width = 660 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

    // create svg
    var svgdd = d3.select("#first")
                .append("svg")
                .attr("id", "first_loli")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // initialize the x axis
    var x5 = d3.scaleBand()
    .range([ 1, width + 10 ])
    .padding(1);
    var xAxis5 = svgdd.append("g")
    .attr("transform", `translate(0, ${height})`)

    // initializa the y axis
    var y5 = d3.scaleLinear()
    .range([ height, 0]);
    var yAxis5 = svgdd.append("g")
    .attr("class", "myYaxis");

    //declare current year
    var yr;
    
    //set button
    document.getElementById("data1").onclick = function()  {updateheatmap("./sources/20172018.csv","2017-2018")};
    document.getElementById("data2").onclick = function()  {updateheatmap("./sources/20182019.csv","2018-2019")};
    document.getElementById("data3").onclick = function()  {updateheatmap("./sources/20192020.csv","2019-2020")};
    document.getElementById("data4").onclick = function()  {updateheatmap("./sources/20202021.csv","2020-2021")};
    document.getElementById("data5").onclick = function()  {updateheatmap("./sources/20212022.csv","2021-2022")};

    updatelolipopchart("year1","var1","./sources/NSWaverageage.csv")
    initheatmap("./sources/20212022.csv","2021-2022");
    
    //color function
    var color = d3.scaleQuantize() .range(["#f6e8c3","#c7eae5","#d0d1e6","#a6bddb", "#80cdc1",
    "#35978f", "#01665e", "#003c30"]);
    
    //draw initial chart
    function initheatmap(arrivals,years) {
        yr = years; //get year
        document.getElementById("state").innerHTML = "Figure 1.1: Net oversea migration of states in " + years;//overwrite title
        d3.csv(arrivals).then(function(data){
            color.domain([//domain function
                   d3.min(data, function(d){return d.arrives;}),//take values from the arrives
                    d3.max(data, function(d){return d.arrives;})
        ]);
        //get the value
        d3.json("./sources/state.json").then(function(json){//take 2 argument, string point and callback function  
            for(var i=0; i < data.length; i++) {
                var dataState = data[i].STATE_NAME;//grap the state name 
                var dataValue = parseFloat(data[i].arrives);// find value
                for (var j = 0; j < json.features.length; j++){// find the correctsponding state from geoJson
                    var jsonState = json.features[j].properties.STATE_NAME;
                        if (dataState == jsonState) {
                            //copy data value into the Json
                            json.features[i].properties.value = dataValue;
                            //stop looking through JSOn
                            break;
                        }
                }
            }
            //declare tooltip
            var Tooltip = d3.select("#first")
                            .append("div")
                            .style("opacity", 0)
                            .attr("class", "tooltip")
                            .style("background-color", "white")
                            .style("border", "solid")
                            .style("border-width", "2px")
                            .style("border-radius", "5px")
                            .style("padding", "5px")
                            .style("position", "absolute");
            // mouse over function
            let mouseOver = (function(d){
                Tooltip
                    .style("opacity", 1)
                d3.selectAll(".Country")
                  .transition()
                  .duration(200)
                  .style("opacity", .5)
                d3.select(this)
                  .transition()
                  .duration(200)
                  .style("opacity", 1)
                  .style("stroke", "black")
            });
            //mouse leave function
            let mouseLeave = (function(d){
                Tooltip
                    .style("opacity", 0)
                d3.selectAll(".Country")
                    .transition()
                    .duration(200)
                    .style("opacity", .8)
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("stroke", "transparent")
            });   
            //create path
            svg55.selectAll("path")
                .data(json.features)//standard text-based format for representing structured data based on JavaScript object syntax.
                .enter()//enter data
                .append("path")
                .attr("d",path)//refer to path generator
                .style("fill", function(d){//grap color
                    var value = d.properties.value;//data from json properties
                    if (value > 100000) { //If value exists… 
                        return "#003c30"; 
                    }
                    else if (value > 75000){
                        return "#01665e";
                    }
                    else if (value > 50000){
                        return "#35978f";
                    }
                    else if (value > 25000){
                        return "#80cdc1";
                    }
                    else if (value > 5000){
                        return "#a6bddb";
                    }
                    else if (value > 500){
                        return "#d0d1e6";
                    }
                    else if (value > 0){
                        return "#c7eae5";
                    }
                    else if (value > -500){
                        return "#f6e8c3";
                    }
                    else if (value > -5000){
                        return "#dfc27d";
                    }
                    else if (value > -10000){
                        return "#bf812d";
                    }  
                    else { //If value is undefined… 
                        return "#8c510a"; 
                    }
                })//transparent color
                .style("stroke", "transparent")
                  .attr("class", function(d){ return "Country" } )
                  .style("opacity", .8)
                  .on("mouseover", mouseOver )
                  .on("mousemove", function(event, d){
                    var staten = d.properties.STATE_NAME;
                    var value = d.properties.value; 
                        Tooltip.html("The total net oversea migration <br> of "+staten+" in "+yr+" is: " + value)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px")
                } )
                  .on("mouseleave", mouseLeave )//mouses leave function
                  .on("click", function (event, d){//when click on state
                    var staten = d.properties.STATE_NAME;
                    var value = d.properties.value;
                    document.getElementById("state_chart").innerHTML = "Figure 1.2: Net oversea migration by country of birth of "+ staten +" in "+ yr;
                    if (staten == "New South Wales" ){//find correcstate
                        if(yr == "2017-2018"){
                            updatelolipopchart("year1","var1","./sources/NSWaverageage.csv");
                        }else if(yr == "2018-2019"){
                            updatelolipopchart("year2","var2","./sources/NSWaverageage.csv");
                        }else if(yr == "2019-2020"){
                            updatelolipopchart("year3","var3","./sources/NSWaverageage.csv");
                        }else if(yr == "2020-2021"){
                            updatelolipopchart("year4","var4","./sources/NSWaverageage.csv");
                        }else if(yr == "2021-2022"){
                            updatelolipopchart("year5","var5","./sources/NSWaverageage.csv");
                        }
                    } else if (staten == "Victoria" ){
                        if(yr == "2017-2018"){
                            updatelolipopchart("year1","var1","./sources/VICaverageage.csv");
                        }else if(yr == "2018-2019"){
                            updatelolipopchart("year2","var2","./sources/VICaverageage.csv");
                        }else if(yr == "2019-2020"){
                            updatelolipopchart("year3","var3","./sources/VICaverageage.csv");
                        }else if(yr == "2020-2021"){
                            updatelolipopchart("year4","var4","./sources/VICaverageage.csv");
                        }else if(yr == "2021-2022"){
                            updatelolipopchart("year5","var5","./sources/VICaverageage.csv");
                        }
                    } else if (staten == "Queensland" ){
                        if(yr == "2017-2018"){
                            updatelolipopchart("year1","var1","./sources/QLDaverageage.csv");
                        }else if(yr == "2018-2019"){
                            updatelolipopchart("year2","var2","./sources/QLDaverageage.csv");
                        }else if(yr == "2019-2020"){
                            updatelolipopchart("year3","var3","./sources/QLDaverageage.csv");
                        }else if(yr == "2020-2021"){
                            updatelolipopchart("year4","var4","./sources/QLDaverageage.csv");
                        }else if(yr == "2021-2022"){
                            updatelolipopchart("year5","var5","./sources/QLDaverageage.csv");
                        }
                    } else if (staten == "South Australia" ){
                        if(yr == "2017-2018"){
                            updatelolipopchart("year1","var1","./sources/SAaverageage.csv");
                        }else if(yr == "2018-2019"){
                            updatelolipopchart("year2","var2","./sources/SAaverageage.csv");
                        }else if(yr == "2019-2020"){
                            updatelolipopchart("year3","var3","./sources/SAaverageage.csv");
                        }else if(yr == "2020-2021"){
                            updatelolipopchart("year4","var4","./sources/SAaverageage.csv");
                        }else if(yr == "2021-2022"){
                            updatelolipopchart("year5","var5","./sources/SAaverageage.csv");
                        }
                    } else if (staten == "Western Australia" ){
                        if(yr == "2017-2018"){
                            updatelolipopchart("year1","var1","./sources/WAaverageage.csv");
                        }else if(yr == "2018-2019"){
                            updatelolipopchart("year2","var2","./sources/WAaverageage.csv");
                        }else if(yr == "2019-2020"){
                            updatelolipopchart("year3","var3","./sources/WAaverageage.csv");
                        }else if(yr == "2020-2021"){
                            updatelolipopchart("year4","var4","./sources/WAaverageage.csv");
                        }else if(yr == "2021-2022"){
                            updatelolipopchart("year5","var5","./sources/WAaverageage.csv");
                        }
                    }else if (staten == "Tasmania" ){
                        if(yr == "2017-2018"){
                            updatelolipopchart("year1","var1","./sources/TASaverageage.csv");
                        }else if(yr == "2018-2019"){
                            updatelolipopchart("year2","var2","./sources/TASaverageage.csv");
                        }else if(yr == "2019-2020"){
                            updatelolipopchart("year3","var3","./sources/TASaverageage.csv");
                        }else if(yr == "2020-2021"){
                            updatelolipopchart("year4","var4","./sources/TASaverageage.csv");
                        }else if(yr == "2021-2022"){
                            updatelolipopchart("year5","var5","./sources/TASaverageage.csv");
                        }
                    }else if (staten == "Northern Territory" ){
                        if(yr == "2017-2018"){
                            updatelolipopchart("year1","var1","./sources/NTaverageage.csv");
                        }else if(yr == "2018-2019"){
                            updatelolipopchart("year2","var2","./sources/NTaverageage.csv");
                        }else if(yr == "2019-2020"){
                            updatelolipopchart("year3","var3","./sources/NTaverageage.csv");
                        }else if(yr == "2020-2021"){
                            updatelolipopchart("year4","var4","./sources/NTaverageage.csv");
                        }else if(yr == "2021-2022"){
                            updatelolipopchart("year5","var5","./sources/NTaverageage.csv");
                        }
                    }
                }) 
                svg55.append("g")//legend for chart
                  .attr("class", "legendQuant")
                  .attr("transform", "translate(20,20)");
            var legend = d3.legendColor({title: "Age (years)"})//legend color
                .labelFormat(d3.format(".2f"))
                .labels(d3.legendHelpers.thresholdLabels)
                .scale(thresholdScale);
                svg55.select(".legendQuant")//layout legend
                  .call(legend);
            });
        });
    }
    //update function
    function updateheatmap(arrivals,years) {
        yr = years;//get the year
        document.getElementById("state").innerHTML = "Figure 1.1: Net oversea migration of states in " + years;//change the title
        d3.csv(arrivals).then(function(data){
            color.domain([
                   d3.min(data, function(d){return d.arrives}),//take values from the arrives
                d3.max(data, function(d){return d.arrives})
            ]);
            d3.json("./sources/state.json").then(function(json){//take 2 argument, string point and callback function

            for(var i=0; i < data.length; i++) {
                var dataState = data[i].STATE_NAME;//grap the state name

                var dataValue = parseFloat(data[i].arrives);// find

                for (var j = 0; j < json.features.length; j++){// find the correctsponding state from geoJson

                    var jsonState = json.features[j].properties.STATE_NAME;

                        if (dataState == jsonState) {
                            //copy data value into the Json
                            json.features[i].properties.value = dataValue;
                            //stop looking through JSOn
                            break;
                        }
                }
            };            

            var ell = svg55.selectAll("path")
                .data(json.features)//standard text-based format for representing structured data based on JavaScript object syntax.             //
                ell.enter()
                .append("path")
                .merge(ell)
                .transition()
                .attr("d",path)//refer to path generator
                .style("fill", function(d){
                    var value = d.properties.value;//data from json properties
                    if (value > 100000) { //If value exists… 
                        return "#003c30"; 
                    }
                    else if (value > 75000){
                        return "#01665e";
                    }
                    else if (value > 50000){
                        return "#35978f";
                    }
                    else if (value > 25000){
                        return "#80cdc1";
                    }
                    else if (value > 5000){
                        return "#a6bddb";
                    }
                    else if (value > 500){
                        return "#d0d1e6";
                    }
                    else if (value > 0){
                        return "#c7eae5";
                    }
                    else if (value > -500){
                        return "#f6e8c3";
                    }
                    else if (value > -5000){
                        return "#dfc27d";
                    }
                    else if (value > -10000){
                        return "#bf812d";
                    }  
                    else { //If value is undefined… 
                        return "#8c510a"; 
                    }
                })                      
            })           
        })
    }
    function updatelolipopchart(yearss,selectedVar,csvv) {

        // pass the Data from css file
        d3.csv(csvv).then( function(data) {
        
          // make y axis
          x5.domain(data.map(function(d) { return d[yearss] }))
          xAxis5.transition().duration(1000).call(d3.axisBottom(x5))
        
          // make y axis
          y5.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
          yAxis5.transition().duration(1000).call(d3.axisLeft(y5));
        
          // make line
          svgdd.selectAll(".myLine")
            .data(data)
            .join("line")
            .attr("class", "myLine")
            .transition()
            .duration(1000)
              .attr("x1", function(d) { return x5(d[yearss]); })
              .attr("x2", function(d) { return x5(d[yearss]); })
              .attr("y1", y5(0))
              .attr("y2", function(d) { return y5(d[selectedVar]); })
              .attr("stroke", "blue")
        
          // make circle
          svgdd.selectAll("circle")
            .data(data)
            .join("circle")
            .transition()
            .duration(1000)
              .attr("cx", function(d) { return x5(d[yearss]); })
              .attr("cy", function(d) { return y5(d[selectedVar]); })
              .attr("r", 10)
              .attr("fill", "#ccc");
        })
        
    }
};
