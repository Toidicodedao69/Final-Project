function BarChart(dataset, canvas) {
    var width = 500;
    var height = 300;

    var padding = 50;
    canvas.selectAll("*").remove();
    var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length))
                    .rangeRound([padding, width-padding])
                    .paddingInner(0.2); // padding value = 5% of the band width
                    
    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function (d) {
                        return d;       
                        })
                    ])
                    .range([height-padding, padding]);

    var xAxis = d3.axisBottom()
                .ticks()
                .scale(xScale);

    var yAxis = d3.axisLeft()
                .ticks()
                .scale(yScale);
                    

    // Draw X Axis
    canvas.append("g")
        .attr("transform", "translate(0, " + (height - 10) + ")")
        .call(xAxis);
    
    // Draw Y Axis
    canvas.append("g")
        .attr("transform", "translate(" + (padding - 5) + ", 0)")
        .call(yAxis);
                        
    canvas.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function(d, i) {
                return xScale(i);
            })
            .attr("y", function(d) {
                return height - yScale(d);
            })
            .attr("width", function(d, i) {
                return xScale.bandwidth();
            })
            .attr("height", function(d) {
                return yScale(d);
            })
            .attr("fill", "orange");
};

function Update(dataset, canvas) {
    canvas.selectAll("rect")
        .data(dataset);
}

function init() {
    var w = 450;
    var h = 450;

    var canvas = d3.select("#side")
                    .append("svg")
                    .attr("width", 500)
                    .attr("height", 300);

    var dataset;

    var dataset2;       // Data for all visa types
    var data;       // Data for a single visa type
    
    var svg = d3.select("#third")
                .append("svg")
                .attr("width", w)
                .attr("height", h)

    var outerRadius = w / 2;
    var innerRadius = 0;

    //setup arc
    var arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

    //setup colorscheme
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    //setup pie value
    var pie = d3.pie()
                .sort(null)
                .value(function(d) {
        return d.percentage;
    });

    d3.csv("2017.csv", function(d) {
        return {
            type: d["Temporary Visas"],
            NSW: +d.NSW,
            VIC: +d.VIC,
            QLD: +d.QLD,
            SA: +d.SA,
            WA: +d.WA,
            TAS: +d.TAS,
            NT: +d.NT,
            ACT: +d.ACT
        };
    }).then(function(data) {
        dataset2 = data;
    });
    
    //load csv data
    d3.csv("Temporary_visas.csv").then(function(data) {
        console.log(data);
        console.log(pie(data));

        var arcs = svg.selectAll("g.arc")
                       .data(pie(data))
                       .enter()
                       .append("g")
                       .attr("class", "arc")
                       .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
                       
        arcs.append("path")
            .attr("fill", function(d, i) {
                return color(i);
            })   
            .attr("d", function(d, i) {
                return arc(d, i);
            })
            .on("mouseover", function(d) {
                d3.select(this).transition()
                  .duration('50')
                  .attr('opacity', '.85')
                  .attr("stroke", "black");
            })
            .on("mouseout", function(d) {
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '1')
                    .attr("stroke", "transparent");
            })
            .on("click", function(event, d) {

            //code for bar chart
                for(var i=0; i < dataset2.length; i++) {
                    if (dataset2[i].type == d.data.types) {
                        data = [dataset2[i].NSW, dataset2[i].VIC, dataset2[i].QLD, dataset2[i].SA, dataset2[i].WA, dataset2[i].TAS, dataset2[i].NT, dataset2[i].ACT];
                        console.log(data);
                        break;
                    }
                }
                BarChart(data, canvas);

            });
            
        arcs.append("text")
            .text(function(d) {
                return d.value; //access the value to display, since the array contains both the path data and the value
            })
            .attr("transform", function(d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .style("text-anchor", "middle")
            .style("font-size", 17);
    });

    // function PieChart(piee) {
        

    // }
}


window.onload = init;