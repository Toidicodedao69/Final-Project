function init() {
    //define svg, margin
    var w = 600;
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
        console.table(dataset, ["date", "arrivals", "departures", "net"])
    });

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
        svg.append("path")
            .datum(dataset) //bind the data into a single path element, instead of using data() - bind single data value to different html element
            .attr("class", "line1")   
            .attr("d", line1);
        
        svg.append("path")
            .datum(dataset) //bind the data into a single path element, instead of using data() - bind single data value to different html element
            .attr("class", "line2")   
            .attr("d", line2);

        svg.append("path")
            .datum(dataset) //bind the data into a single path element, instead of using data() - bind single data value to different html element
            .attr("class", "line3")   
            .attr("d", line3);

        
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