"use strict";

//it will register functions that will respond to browser events
function init() {
    apply();
};
window.onload = init;


function apply() {
    //init settup
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#chart")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);
    //set the init data
    update("NSW",'1','3'); 

    document.getElementById("demo").onclick = function() {update('NSW','1','3')};
    document.getElementById("demo2").onclick = function() {update('VIC','3','5')};
    document.getElementById("demo3").onclick = function() {update('QSL','5','7')};
    document.getElementById("demo4").onclick = function() {update('SA','7','9')};
    document.getElementById("demo5").onclick = function() {update('WA','9','11')};
    document.getElementById("demo6").onclick = function() {update('TAS','11','13')};
    document.getElementById("demo7").onclick = function() {update('NT','13','15')};
    
    //draw function
    function update(state,selectedVar,selectedVar2) {
        document.getElementById("state").innerHTML = state +"Average age"; 
    d3.csv("trials2.csv").then( function(data) {

        

        svg.selectAll("*").remove();

        // List of subgroups = header of the csv files = soil condition here
        var subgroups = data.columns.slice(selectedVar,selectedVar2)
                  
        // List of groups = species here = value of the first column called group -> I show them on the X axis
        var groups = data.map(d => d.group)
                  
        console.log(groups)
                  
        // Add X axis
        var x = d3.scaleBand()
                    .domain(groups)
                    .range([0, width])
                    .padding([0.2])
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickSize(0))
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
                      .range(['#e41a1c','#377eb8'])

        /*var groups = svg.selectAll('.groups')  // Adjust the selector to match your specific structure
                      .data(data)
                      .join("g")
                      .attr("class", "group")
                      .attr("transform", d => `translate(${x(d.group)}, 0)`);

        var bars = groups.selectAll("rect")
                      .data(function(d) {
                        return subgroups.map(function(key) {
                          return { key: key, value: d[key] };
                        });
                      });

        bars.attr("x", d => xSubgroup(d.key))
                      .attr("y", d => y(d.value))
                      .attr("width", xSubgroup.bandwidth())
                      .attr("height", d => height - y(d.value))
                      .attr("fill", d => color(d.key)); 
             
        bars.exit()
            .remove();
        bars.enter()
            .append("rect")
            .attr("x", d => xSubgroup(d.key))
            .attr("y", d => y(d.value))
            .attr("width", xSubgroup.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", d => color(d.key))      
            .merge(bars)
            .transition()
            .duration(1000);*/
            
            
                  
        //create group for bars
        var u = svg.append("g")    
            .selectAll("g")
            //svg.exit().remove()
        // Enter in data = loop group per group
            .data(data)
            .join("g")
            .attr('class', 'groups')
            .attr("transform", d => `translate(${x(d.group)}, 0)`)
        // create rect for each data
        var a = u.append("g")
            .selectAll("rect")
            .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
            .join("rect")
            .transition()
            .duration(1000)
                .attr("x", d => xSubgroup(d.key))
                .attr("y", d => y(d.value))
                .attr("width", xSubgroup.bandwidth())
                .attr("height", d => height - y(d.value))
                    .attr("fill", d => color(d.key));


            })
        
    }            
};