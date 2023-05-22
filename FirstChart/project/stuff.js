"use strict";

//it will register functions that will respond to browser events
function init() {
    apply();
};
window.onload = init;


function apply() {
    
    const margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#chart")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    /*// Initialize the X axis
    const x = d3.scaleBand()
                .range([ 0, width ])
                .padding(1);
    const xAxis = svg.append("g")
                    .attr("transform", `translate(0, ${height})`)

    // Initialize the Y axis
    const y = d3.scaleLinear()
                    .range([ height, 0]);
    const yAxis = svg.append("g")
                    .attr("class", "myYaxis")*/
    

    //document.getElementById("demo").onclick = function() {update('var1')};
    //document.getElementById("demo2").onclick = function() {update('var2')};


    // A function that create / update the plot for a given variable:
    //function update(selectedVar) {

        // Parse the Data
        /*d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv").then( function(data) {

        var subgroups = data.columns.slice(1)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
        var groups = d3.map(data, function(d){return(d.group)}).keys()

  // Add X axis
        var x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSize(0));

  // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 40])
            .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y));

  // Another scale for subgroup position?
        var xSubgroup = d3.scaleBand()
            .domain(subgroups)
            .range([0, x.bandwidth()])
            .padding([0.05])

  // color palette = one color per subgroup
        var color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['#e41a1c','#377eb8','#4daf4a'])

  // Show the bars
        svg.append("g")
            .selectAll("g")
    // Enter in data = loop group per group
            .data(data)
            .enter()
            .append("g")
                .attr("transform", function(d) { return "translate(" + x(d.group) + ",0)"; })
            .selectAll("rect")
            .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
            .enter().append("rect")
                .attr("x", function(d) { return xSubgroup(d.key); })
                .attr("y", function(d) { return y(d.value); })
                .attr("width", xSubgroup.bandwidth())
                .attr("height", function(d) { return height - y(d.value); })
                .attr("fill", function(d) { return color(d.key); });
            })*/
            d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv", function(data) {

            // List of subgroups = header of the csv files = soil condition here
            var subgroups = data.columns.slice(1);
          
            // List of groups = species here = value of the first column called group -> I show them on the X axis
            var groups = d3.map(data, function(d){return(d.group)}).keys();
          
            // Add X axis
            var x = d3.scaleBand()
                .domain(groups)
                .range([0, width])
                .padding([0.2])
            svg.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x))
              .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");
          
            // Add Y axis
            var y = d3.scaleLinear()
              .domain([0, 40])
              .range([ height, 0 ]);
            svg.append("g")
              .call(d3.axisLeft(y));
          
            // Another scale for subgroup position?
            var xSubgroup = d3.scaleBand()
              .domain(subgroups)
              .range([0, x.bandwidth()])
              .padding([0.05])
          
            // color palette = one color per subgroup
            var color = d3.scaleOrdinal()
              .domain(subgroups)
              .range(['#e41a1c','#377eb8','#4daf4a'])
          
            // Show the bars
            svg.append("g")
              .selectAll("g")
              // Enter in data = loop group per group
              .data(data)
              .enter()
              .append("g")
                .attr("transform", function(d) { return "translate(" + x(d.group) + ",0)"; })
              .selectAll("rect")
              .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
              .enter().append("rect")
                .attr("x", function(d) { return xSubgroup(d.key); })
                .attr("y", function(d) { return y(d.value); })
                .attr("width", xSubgroup.bandwidth())
                .attr("height", function(d) { return height - y(d.value); })
                .attr("fill", function(d) { return color(d.key); });
          
          })
        }
    // Initialize plot
    //update('var1')
//};
