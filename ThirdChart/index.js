function chart(dataset) {
    var width = 700;
    var height = 300;

    var padding = 50;
    // Organize the data set by categories to generate stacked bar chart
    var stack = d3.stack()
                    .keys(["temp_visa", "aus_citizen", "perma_visa", "nz_citizen", "unknown"]);
    
    var series = stack(dataset);

    var canvas = d3.select("#third")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Bind the data to a group set
    var groups = canvas.selectAll("g")
            .data(series)
            .enter()
            .append("g")
            .style("fill", function(d, i) {
                return color(i);
            });

    var year = [];
    dataset.forEach(element => {
        year.push(element.year);
    });
    //console.log(year);
    var xScale = d3.scaleBand()
                    //.domain(d3.range(dataset.length))
                    .domain(year)
                    .rangeRound([padding, width-padding])
                    .paddingInner(0.2); // padding value = 5% of the band width
                    
    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function (d) {
                        return d.temp_visa + d.aus_citizen + d.perma_visa + d.nz_citizen + d.unknown;       // The height of a bar = sum of all categories
                        })
                    ])
                    .range([height-padding, padding]);

    var xAxis = d3.axisBottom()
                .scale(xScale)
                //.ticks()

    var yAxis = d3.axisLeft()
                .ticks()
                .scale(yScale);
                    
    var rects = groups.selectAll("rect")
                        .data(function(d) {return d;})
                        .enter()
                        .append("rect")
                        .attr("x", function(d, i) {
                            return xScale(year[i]);
                        })
                        .attr("y", function(d, i) {
                            return yScale(d[1]);
                        })
                        .attr("height", function(d) {
                            return yScale(d[0]) - yScale(d[1]);
                        })
                        .attr("width", xScale.bandwidth());
    
    // Draw X Axis
    canvas.append("g")
        .attr("transform", "translate(0, " + (height - padding) + ")")
        .call(xAxis);
    
    // Draw Y Axis
    canvas.append("g")
        .attr("transform", "translate(" + (padding) + ", 0)")
        .call(yAxis);
    
    // X Axis Label
    canvas.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width/2)
        .attr("y", height - 6)
        .text("Year");
    
    // Y Axis Label
    canvas.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", -height/3)
        .attr("y", 0)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Thousands");
    
};

function readFile(filename) {
    d3.csv(filename, function(d) {
        return {
            year: d.Year,
            temp_visa: +d["Temporary visa holders(b)"],
            aus_citizen: +d["Australian Citizen"],
            perma_visa: +d["Permanent visa holders(b)"],
            nz_citizen: +d["NZ Citizen (subclass 444)(c)"],
            unknown: +d["Unknown Visa"]
        };
    }).then(function(data) {
        dataset = data;

        // Check the input data
        console.table(dataset, ["year", "temp_visa", "aus_citizen", "perma_visa", "nz_citizen", "unknown"]);

        chart(dataset);
    });
}

function init() {
    var dataset;
    var filename = "Overseas migrant arrivals by major Visa groups.csv";

    d3.select("#arrival")
        .on("click", function() {
            filename = "Overseas migrant arrivals by major Visa groups.csv";
            d3.select("svg").remove();
            readFile(filename);
        });
    d3.select("#departure")
        .on("click", function() {
            filename = "Overseas migrant departures by major Visa groups.csv";
            d3.select("svg").remove();
            readFile(filename);
        });
    // Load data from csv file
    readFile(filename);
    
}
window.onload = init;

