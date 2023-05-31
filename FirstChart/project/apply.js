
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
                        .center([1445,-11.5])
                        .translate([w/2,h/2])
                        .scale([80]);// 1:2450;
    var path = d3.geoPath()
        .projection(projection);

    var svg = d3.selection("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("fill","grey");
    var thresholdScale = d3.scaleThreshold()
                  .domain([ 0,  50, 100, 150, 200])
                  .range(["#ccc","rgb(237,248,233)", "rgb(186,228,179)",
                "rgb(116,196,118)", "rgb(49,163,84)", "rgb(0,109,44)"]);


    var color = d3.scaleQuantize() .range(["rgb(237,248,233)", "rgb(186,228,179)",
                "rgb(116,196,118)", "rgb(49,163,84)", "rgb(0,109,44)"]);
    d3.csv("trials.csv").then(function(data){
        color.domain([
               d3.min(data, function(d){return d.arrives}),//take values from the unemployed
            d3.max(data, function(d){return d.arrives})
    ]);
    d3.json("continents.json").then(function(json){//take 2 argument, string point and callback function

        for(var i=0; i < data.length; i++) {
            var dataState = data[i].CONTINENT;//grap the state name

            var dataValue = parseFloat(data[i].arrives);// find

            for (var j = 0; j < json.features.length; j++){// find the correctsponding state from geoJson

                var jsonState = json.features[j].properties.CONTINENT;

                    if (dataState == jsonState) {
                        //copy data value into the Json
                        json.features[i].properties.value = dataValue;
                        //stop looking through JSOn
                        break;
                    }
            }
        }
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
                var value = d.properties.value;//data from json properties
                if (value > 200){
                    return "rgb(0,109,44)";
                } else if (value > 150){
                    return "rgb(49,163,84)";
                } else if (value > 100){
                    return "rgb(116,196,118)";
                } else if (value > 50){
                    return "rgb(186,228,179)";
                } else if (value > 0){
                    return "rgb(195,230,190)";
                } else {
                    return "#ccc";//gray
                }
        })
            .style("stroke", "transparent")
              .attr("class", function(d){ return "Country" } )
              .style("opacity", .8)
              .on("mouseover", mouseOver )
              .on("mouseleave", mouseLeave )
            .append("title")
            .text(function(d){
                var value = d.properties.value;
                return value;
            });
        svg.append("g")
              .attr("class", "legendQuant")
              .attr("transform", "translate(20,20)");
        var legend = d3.legendColor({title: "Age (years)"})
            .labelFormat(d3.format(".2f"))
            .labels(d3.legendHelpers.thresholdLabels)
            .scale(thresholdScale);
        svg.select(".legendQuant")
              .call(legend);
        });
    });
    d3.select("#data1")//add data
    .on("click", function(){
            d3.select("svg")
                .transition()
                .remove();
            svg.selectAll("path")
                .transition()
                .remove();
            svg = d3.selection("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("fill","grey");
            d3.csv("trials.csv").then(function(data){
            color.domain([
                   d3.min(data, function(d){return d.arrives}),//take values from the unemployed
                d3.max(data, function(d){return d.arrives})
            ]);
            d3.json("continents.json").then(function(json){//take 2 argument, string point and callback function

            for(var i=0; i < data.length; i++) {
                var dataState = data[i].CONTINENT;//grap the state name

                var dataValue = parseFloat(data[i].arrives);// find

                for (var j = 0; j < json.features.length; j++){// find the correctsponding state from geoJson

                    var jsonState = json.features[j].properties.CONTINENT;

                        if (dataState == jsonState) {
                            //copy data value into the Json
                            json.features[i].properties.value = dataValue;
                            //stop looking through JSOn
                            break;
                        }
                }
            }
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
                var value = d.properties.value;//data from json properties
                if (value > 200){
                    return "rgb(0,109,44)";
                } else if (value > 150){
                    return "rgb(49,163,84)";
                } else if (value > 100){
                    return "rgb(116,196,118)";
                } else if (value > 50){
                    return "rgb(186,228,179)";
                } else if (value > 0){
                    return "rgb(195,230,190)";
                } else {
                    return "#ccc";//gray
                }
        })
            .style("stroke", "transparent")
              .attr("class", function(d){ return "Country" } )
              .style("opacity", .8)
              .on("mouseover", mouseOver )
              .on("mouseleave", mouseLeave )
            .append("title")
            .text(function(d){
                var value = d.properties.value;
                return value;
            });
        svg.append("g")
              .attr("class", "legendQuant")
              .attr("transform", "translate(20,20)");
        var legend = d3.legendColor()
            .labelFormat(d3.format(".2f"))
            .labels(d3.legendHelpers.thresholdLabels)
            .scale(thresholdScale);
        svg.select(".legendQuant")
              .call(legend);
            
            });
        });
    });
    d3.select("#data2")//add data
    .on("click", function(){
        d3.select("svg")
            .transition()
            .remove();
        svg.selectAll("path")
            .transition()
            .remove();
            svg = d3.selection("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("fill","grey");			
            d3.csv("trials.csv").then(function(data){
            color.domain([
                d3.min(data, function(d){return d.arrives2}),//take values from the unemployed
                d3.max(data, function(d){return d.arrives2})
            ]);
            d3.json("continents.json").then(function(json){//take 2 argument, string point and callback function

            for(var i=0; i < data.length; i++) {
                var dataState = data[i].CONTINENT;//grap the state name

                var dataValue = parseFloat(data[i].arrives2);// find

                for (var j = 0; j < json.features.length; j++){// find the correctsponding state from geoJson

                    var jsonState = json.features[j].properties.CONTINENT;

                        if (dataState == jsonState) {
                            //copy data value into the Json
                            json.features[i].properties.value = dataValue;
                            //stop looking through JSOn
                            break;
                        }
                }
            }
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
                var value = d.properties.value;//data from json properties
                if (value > 200){
                    return "rgb(0,109,44)";
                } else if (value > 150){
                    return "rgb(49,163,84)";
                } else if (value > 100){
                    return "rgb(116,196,118)";
                } else if (value > 50){
                    return "rgb(186,228,179)";
                } else if (value > 0){
                    return "rgb(195,230,190)";
                } else {
                    return "#ccc";//gray
                }
        })
            .style("stroke", "transparent")
            .attr("class", function(d){ return "Country" } )
            .style("opacity", .8)
            .on("mouseover", mouseOver )
            .on("mouseleave", mouseLeave )
            .append("title")
            .text(function(d){
                var value = d.properties.value;
                return value;
            });
        svg.append("g")
              .attr("class", "legendQuant")
              .attr("transform", "translate(20,20)");
        var legend = d3.legendColor()
            .labelFormat(d3.format(".2f"))
            .labels(d3.legendHelpers.thresholdLabels)
            .scale(thresholdScale);
        svg.select(".legendQuant")
              .call(legend);
            });
        });
    });
    d3.select("#data3")//add data
    .on("click", function(){
            d3.select("svg")
                .transition()
                .remove();
            svg.selectAll("path")
                .transition()
                .remove();
            svg = d3.selection("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("fill","grey");			
            d3.csv("trials.csv").then(function(data){
            color.domain([
                d3.min(data, function(d){return d.arrives3}),//take values from the unemployed
                d3.max(data, function(d){return d.arrives3})
            ]);
            d3.json("continents.json").then(function(json){//take 2 argument, string point and callback function

            for(var i=0; i < data.length; i++) {
                var dataState = data[i].CONTINENT;//grap the state name

                var dataValue = parseFloat(data[i].arrives3);// find

                for (var j = 0; j < json.features.length; j++){// find the correctsponding state from geoJson

                    var jsonState = json.features[j].properties.CONTINENT;

                        if (dataState == jsonState) {
                            //copy data value into the Json
                            json.features[i].properties.value = dataValue;
                            //stop looking through JSOn
                            break;
                        }
                }
            }
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
                    var value = d.properties.value;//data from json properties
                    if (value > 200){
                        return "rgb(0,109,44)";
                    } else if (value > 150){
                        return "rgb(49,163,84)";
                    } else if (value > 100){
                        return "rgb(116,196,118)";
                    } else if (value > 50){
                        return "rgb(186,228,179)";
                    } else if (value > 0){
                        return "rgb(195,230,190)";
                    } else {
                        return "#ccc";//gray
                    }
            })
            .style("stroke", "transparent")
            .attr("class", function(d){ return "Country" } )
            .style("opacity", .8)
            .on("mouseover", mouseOver )
            .on("mouseleave", mouseLeave )
            .append("title")
            .text(function(d){
                var value = d.properties.value;
                return value;
            });
        svg.append("g")
              .attr("class", "legendQuant")
              .attr("transform", "translate(20,20)");
        var legend = d3.legendColor()
            .labelFormat(d3.format(".2f"))
            .labels(d3.legendHelpers.thresholdLabels)
            .scale(thresholdScale);
        svg.select(".legendQuant")
              .call(legend);
            });
        });
    });
};
