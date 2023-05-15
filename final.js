function init() {
    //define svg, margin
    var w = 1200;
    var h = 300;

    var padding = 55;

    var dataset;

    //parse time
        var parseTime = d3.timeParse("%d/%m/%Y");

    d3.csv("overseas migration.csv", function(d) {
        return {

            date: parseTime(d.Date),

            arrivals: +d.Arrivals,

            departures: +d.Departures,

            net: +d.Net

        };
    }).then(function(data) {
        dataset = data;
        LineChart(dataset);
        //console.table(dataset, ["date", "arrivals", "departures", "net"])
    });

    var allGroup = ["Arrivals", "Departures", "Net"];

    function LineChart () {
        var xScale = d3.scaleTime()
                       .domain([
                        d3.min(dataset, function(d) { return d.date; }),
                        d3.max(dataset, function(d) { return d.date; })
                       ])
                       .range([padding, w - padding]);

        var yScale = d3.scaleLinear()
                       .domain([-400, d3.max(dataset, function(d) { return d.arrivals})])
                       .range([h - padding, padding]);
         
        var line1 = d3.line()
                      .x(function(d) { return xScale(d.date); })
                      .y(function(d) { return yScale(d.net); })
        
        var line2 = d3.line()
                      .x(function(d) { return xScale(d.date); })
                      .y(function(d) { return yScale(d.arrivals); })
        
        var line3 = d3.line()
                      .x(function(d) { return xScale(d.date); })
                      .y(function(d) { return yScale(d.departures); })

        //setup axis
        var xAxis = d3.axisBottom()
                       .scale(xScale);

        var yAxis = d3.axisLeft()
                       .scale(yScale);

        var svg = d3.select("#chart")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

        //code for line
        svg.append("path") //line 1
            .datum(dataset) //bind the data into a single path element, instead of using data() - bind single data value to different html element
            .attr("class", "line1")   
            .attr("d", line1);
        
        svg.append("path") //line 2
            .datum(dataset) //bind the data into a single path element, instead of using data() - bind single data value to different html element
            .attr("class", "line2")   
            .attr("d", line2);

        svg.append("path") //line 3
            .datum(dataset) //bind the data into a single path element, instead of using data() - bind single data value to different html element
            .attr("class", "line3")   
            .attr("d", line3);

         //code to add tooltip
         var tooltip = d3.select("#chart")
                .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip")
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "2px")
                .style("border-radius", "5px")
                .style("padding", "5px")

var mouseover = function(d) {
             tooltip
               .style("opacity", 1)
           }
var mousemove = function(d) {
            tooltip
               .html("Value: " + d.net)
               .style("left", (d3.mouse(this)[0]+70) + "px")
               .style("top", (d3.mouse(this)[1]) + "px")
           }
var mouseleave = function(d) {
             tooltip
               .style("opacity", 0)
           }

        //code for points
        svg.selectAll("myCircle1") //points for net
           .data(dataset)
           .enter()
           .append("circle")
           .attr("cx", function(d, i) {
                return xScale(d.date);
           })
           .attr("cy", function(d) {
                return yScale(d.net);
           })
           .attr("r", 4.5)
           .attr("fill", "slategrey")
           .on("mouseover", function(event, d) { //change the color of the selected circle
                d3.select(this)
                  .transition()
                  .duration(200)

                  var xPosition = parseFloat(d3.select(this).attr("x"))
                  var yPosition = parseFloat(d3.select(this).attr("y"))

                  svg.append("text")
                     .attr("id", "tooltip")
                     .attr("x", xScale(xPosition))
                     .attr("y", yScale(yPosition))
                     .attr("text-anchor", "middle")
                     .text(d);   
            
            })
            .on("mouseout", function() { //change the color when the mouse get out 
                d3.select(this)
                  .transition()
                  .duration(200)
                  .attr("fill", "slategrey");
              
                 d3.select("#tooltip").remove();
        });

        svg.selectAll("myCircle2") //points for arrivals
           .data(dataset)
           .enter()
           .append("circle")
           .attr("cx", function(d, i) {
                return xScale(d.date);
           })
           .attr("cy", function (d) {
                return yScale(d.arrivals);
           })
           .attr("r", 4.5)
           .attr("fill", "red");

        svg.selectAll("myCircle3") //points for departures
           .data(dataset)
           .enter()
           .append("circle")
           .attr("cx", function(d, i) {
                return xScale(d.date);
           })
           .attr("cy", function (d) {
                return yScale(d.departures);
           })
           .attr("r", 4.5)
           .attr("fill", "green");
        
        //code to add axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);
            
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);

    }
}
window.onload = init;