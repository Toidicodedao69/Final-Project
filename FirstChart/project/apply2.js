
"use strict";
var w = 800;//width of 800px
var h = 600;//height of 600px
var padding = 20;

//it will register functions that will respond to browser events
function init() {
    apply();
};
window.onload = init;

function mouseover(data){

}

function apply() {
    
    var projection = d3.geoMercator()// make 3D shape in 2D surface
                        .center([140,-26.5])
                        .translate([w/2,h/2])
                        .scale([700]);// 1:2450;
    var path = d3.geoPath()
        .projection(projection);

    var svg = d3.selection("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("fill","grey");
    var thresholdScale = d3.scaleOrdinal()
                  .domain([ "New South Wales",  "Victoria", "Queensland", "South Australia", "Western Australia", "Tasmania", "Northern Territory"])
                  .range(["#00ff00","#0000ff", "#ff0000",
                "#cc00af", "#007900", "#ff4600", "#ffff00"]);


    var color = d3.scaleQuantize() .range(["rgb(237,248,233)", "rgb(186,228,179)",
                "rgb(116,196,118)", "rgb(49,163,84)", "rgb(0,109,44)"]);
    d3.csv("trials1.csv").then(function(data){
        color.domain([
               d3.min(data, function(d){return d.arrives}),//take values from the unemployed
            d3.max(data, function(d){return d.arrives})
    ]);
    d3.json("state.json").then(function(json){//take 2 argument, string point and callback function

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
        }
        var Tooltip = d3.selectAll("path")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px");

            
        let mouseOver = (function(d){
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
        let mouseLeave = (function(d){
            d3.selectAll(".Country")
                .transition()
                .duration(200)
                .style("opacity", .8)
            d3.select(this)
                .transition()
                .duration(200)
                .style("stroke", "transparent")
        });

        svg.selectAll("path")
            .data(json.features)//standard text-based format for representing structured data based on JavaScript object syntax.
            .enter()
            .append("path")
            .attr("d",path)//refer to path generator
            .style("fill", function(d){
                var staten = d.properties.STATE_NAME;
                if (staten == "New South Wales" ){
                    return "#00ff00";
                } else if (staten == "Victoria" ){
                    return "#0000ff";
                } else if (staten == "Queensland" ){
                    return "#ff0000";
                } else if (staten == "South Australia" ){
                    return "#cc00af";
                } else if (staten == "Western Australia" ){
                    return "#007900";
                }else if (staten == "Tasmania" ){
                    return "#ff4600";
                }else if (staten == "Northern Territory" ){
                    return "#ffff00";
                }
            })
            .style("stroke", "transparent")
            .attr("class", function(d){ return "Country" } )
            .style("opacity", .8)
            .on("mouseover", mouseOver)
            .on("click", function (event, d){
                var staten = d.properties.STATE_NAME;
                if (staten == "New South Wales" ){
                    //function 1
                } else if (staten == "Victoria" ){
                    //function 2
                } else if (staten == "Queensland" ){
                    //function 3
                } else if (staten == "South Australia" ){
                    //function 4
                } else if (staten == "Western Australia" ){
                    //function 5
                }else if (staten == "Tasmania" ){
                    //function 6
                }else if (staten == "Northern Territory" ){
                    //function 7
                }
            })
            .on("mouseleave", mouseLeave)
            .append("title")
            .text(function(d){
                var value = d.properties.STATE_NAME;
                return value;
            });
        svg.append("g")
              .attr("class", "legendQuant")
              .attr("transform", "translate(20,20)");
        var legend = d3.legendColor({title: "Age (years)"})
            .labelFormat(d3.format(".2f"))
            .labels(d3.thresholdLabels)
            .scale(thresholdScale);
        svg.select(".legendQuant")
              .call(legend);
        });
    });
};
